const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("DocumentRegistry", function () {
  let registry;

  beforeEach(async function () {
    const DocumentRegistry = await ethers.getContractFactory("DocumentRegistry");
    registry = await DocumentRegistry.deploy();
  });

  it("문서 등록 후 검증 성공", async function () {
    const hash = ethers.keccak256(ethers.toUtf8Bytes("test document"));
    await registry.registerDocument(hash);
    const [exists] = await registry.verifyDocument(hash);
    expect(exists).to.equal(true);
  });

  it("미등록 문서 검증 실패", async function () {
    const hash = ethers.keccak256(ethers.toUtf8Bytes("fake document"));
    const [exists] = await registry.verifyDocument(hash);
    expect(exists).to.equal(false);
  });

  it("중복 등록 차단", async function () {
    const hash = ethers.keccak256(ethers.toUtf8Bytes("test document"));
    await registry.registerDocument(hash);
    await expect(registry.registerDocument(hash)).to.be.revertedWith("Already registered");
  });
});
