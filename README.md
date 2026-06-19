### FastAPI LLM Chatbot
FastAPI와 React를 활용한 LLM(Large Language Model) 기반 AI 챗봇 실습 프로젝트

### 프로젝트 소개
백엔드는 FastAPI를 사용하여 REST API 서버를 구축하고, 프론트엔드는 React(Vite)를 사용하여 사용자 인터페이스를 구현하였다. OpenAI API와 LangChain을 활용하여 사용자와 자연스러운 대화를 수행하며, 대화 메모리 기능을 통해 이전 대화 내용을 유지할 수 있는 AI 챗봇 프로젝트이다.

### 기술 스택
#### Backend
- Python
- FastAPI
- LangChain
- OpenAI API
- Python-dotenv

#### Frontend
- React
- Vite
- JavaScript
- CSS

### 실행 방법
#### Backend
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```
#### Frontend
```bash
cd frontend/product-app
npm install
npm run dev
```

### 주요 기능
- OpenAI API 기반 AI 채팅
- LangChain Conversation Memory 활용
- 사용자와 실시간 대화
- FastAPI와 React 연동
- REST API 기반 데이터 통신
- CORS를 활용한 프론트엔드-백엔드 연결

### 프로젝트 목적
- FastAPI를 활용한 REST API 개발
- React 기반 프론트엔드 구현
- OpenAI API를 활용한 LLM 서비스 개발
- LangChain을 이용한 대화 메모리 기능 학습
- 백엔드와 프론트엔드 연동 학습
