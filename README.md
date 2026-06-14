# 블록체인 문서 위변조 검증 시스템

## 기술 스택
- **Frontend**: Next.js 14 (App Router)
- **Backend**: Node.js + Express
- **DB**: MySQL
- **Blockchain**: Solidity + Hardhat (Sepolia 테스트넷)

## 프로젝트 구조
```
project/
├── frontend/   # Next.js
├── backend/    # Node.js API 서버
└── contract/   # Solidity 스마트컨트랙트
```

## 시작하기

### 1. Contract
```bash
cd contract
npm install
npx hardhat compile
npx hardhat run scripts/deploy.js --network sepolia
```

### 2. Backend
```bash
cd backend
npm install
npm run dev
```

### 3. Frontend
```bash
cd frontend
npm install
npm run dev
```
