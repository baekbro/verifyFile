const { ethers } = require("ethers");
const abi = [
  "function registerDocument(bytes32 _hash) external",
  "function verifyDocument(bytes32 _hash) external view returns (bool exists, uint256 registeredAt)",
];

function getContract() {
  const provider = new ethers.JsonRpcProvider(process.env.ALCHEMY_SEPOLIA_URL);
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
  return new ethers.Contract(process.env.CONTRACT_ADDRESS, abi, wallet);
}

async function registerDocument(bytes32Hash) {
  const contract = getContract();
  const tx = await contract.registerDocument(bytes32Hash);
  const receipt = await tx.wait();
  return receipt.hash; // tx_hash
}

async function verifyDocument(bytes32Hash) {
  const contract = getContract();
  const [exists, registeredAt] = await contract.verifyDocument(bytes32Hash);
  return { exists, registeredAt: Number(registeredAt) };
}

module.exports = { registerDocument, verifyDocument };
