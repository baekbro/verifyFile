const express = require("express");
const multer = require("multer");
const { hashFile, toBytes32 } = require("../services/hashService");
const { registerDocument, verifyDocument } = require("../services/web3Service");
const db = require("../services/dbService");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 10 * 1024 * 1024 } }); // 10MB

// 문서 등록 (인증 필요)
router.post("/register", authMiddleware, upload.single("file"), async (req, res) => {
  try {
    const fileHash = hashFile(req.file.buffer);
    const bytes32Hash = toBytes32(fileHash);

    const txHash = await registerDocument(bytes32Hash);

    await db.query(
      "INSERT INTO documents (user_id, file_name, file_hash, tx_hash) VALUES (?, ?, ?, ?)",
      [req.user.id, req.file.originalname, fileHash, txHash]
    );

    res.json({ fileHash, txHash, message: "블록체인 등록 완료" });
  } catch (err) {
    if (err.message?.includes("Already registered")) return res.status(409).json({ error: "이미 등록된 문서" });
    res.status(500).json({ error: "등록 실패", detail: err.message });
  }
});

// 문서 검증
router.post("/verify", upload.single("file"), async (req, res) => {
  try {
    const fileHash = hashFile(req.file.buffer);
    const bytes32Hash = toBytes32(fileHash);

    const { exists, registeredAt } = await verifyDocument(bytes32Hash);

    let meta = null;
    if (exists) {
      const [rows] = await db.query(
        "SELECT d.file_name, d.tx_hash, d.registered_at, u.email FROM documents d JOIN users u ON d.user_id = u.id WHERE d.file_hash = ?",
        [fileHash]
      );
      meta = rows[0] || null;
    }

    // 검증 로그 저장
    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
    await db.query("INSERT INTO verify_logs (file_hash, result, ip_address) VALUES (?, ?, ?)", [
      fileHash,
      exists ? "VALID" : "INVALID",
      ip,
    ]);

    res.json({ exists, registeredAt, fileHash, meta });
  } catch (err) {
    res.status(500).json({ error: "검증 실패", detail: err.message });
  }
});

// 내 문서 이력
router.get("/history", authMiddleware, async (req, res) => {
  const [rows] = await db.query(
    "SELECT id, file_name, file_hash, tx_hash, registered_at FROM documents WHERE user_id = ? ORDER BY registered_at DESC",
    [req.user.id]
  );
  res.json(rows);
});

module.exports = router;
