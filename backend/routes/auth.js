const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../services/dbService");

const router = express.Router();

// 회원가입
router.post("/register", async (req, res) => {
  const { email, password } = req.body;
  try {
    const hashed = await bcrypt.hash(password, 10);
    await db.query("INSERT INTO users (email, password) VALUES (?, ?)", [email, hashed]);
    res.status(201).json({ message: "가입 완료" });
  } catch (err) {
    if (err.code === "ER_DUP_ENTRY") return res.status(409).json({ error: "이미 존재하는 이메일" });
    res.status(500).json({ error: "서버 오류" });
  }
});

// 로그인
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    const user = rows[0];
    if (!user) return res.status(401).json({ error: "이메일 또는 비밀번호 오류" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ error: "이메일 또는 비밀번호 오류" });

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.json({ token });
  } catch {
    res.status(500).json({ error: "서버 오류" });
  }
});

module.exports = router;
