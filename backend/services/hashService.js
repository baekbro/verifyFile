const crypto = require("crypto");

/**
 * 파일 버퍼를 받아 SHA-256 해시 반환
 * @param {Buffer} buffer
 * @returns {string} hex 해시
 */
function hashFile(buffer) {
  return crypto.createHash("sha256").update(buffer).digest("hex");
}

/**
 * hex 해시를 bytes32 형식으로 변환 (컨트랙트 호출용)
 * @param {string} hexHash
 * @returns {string} 0x prefixed bytes32
 */
function toBytes32(hexHash) {
  return "0x" + hexHash;
}

module.exports = { hashFile, toBytes32 };
