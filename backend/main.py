# main.py

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
# pip install fastapi

from pydantic import BaseModel
# pip install pydantic

from dotenv import load_dotenv
# pip install python-dotenv

from langchain_openai import ChatOpenAI
# pip install langchain-openai
# pip install openai

from langchain_classic.chains import ConversationChain
from langchain_classic.memory import ConversationBufferMemory
from langchain_core.prompts import PromptTemplate
# pip install langchain

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.get("/")
def read_root():
    return {"status": "FastAPI Server is running with LangChain memory!"}

# LangChain 설정
llm = ChatOpenAI(
    model="gpt-4o-mini",
    temperature=0.7  # 0에 가까울수록 진지/딱딱, 1에 가까울수록 창의적/톡톡 튀는 답변
)

memory = ConversationBufferMemory()

template = '''
당신은 친절하고 전문적인 IT 교육 도우미 챗봇입니다.
학생들이 프로그래밍 개념을 쉽게 이해할 수 있도록 명확하고 간결하게 한국어로 설명해주세요.
이전 대화 내용을 바탕으로 맥락에 맞는 자연스러운 답변을 이어가야 합니다.
이전 대화 기록 (여기에 지금까지의 대화가 자동으로 들어갑니다):{history}
학생의 새로운 질문: {input}
AI의 답변:
'''

prompt = PromptTemplate(
    input_variables=["history", "input"],
    template=template
)

conversation = ConversationChain(
    llm=llm,
    memory=memory,
    prompt=prompt,
    verbose=True
)

class MessageRequest(BaseModel):
    message: str

@app.post("/api/chat")
async def chat_endpoint(req: MessageRequest):
    try:
        bot_reply = conversation.predict(input=req.message)
    except Exception as e:
        bot_reply = f"오류가 발생했습니다: {str(e)}"
    return {"reply": bot_reply}