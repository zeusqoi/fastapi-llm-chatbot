// App.jsx

import { useState } from 'react'
import './App.css'

function App() {
  // 사용자가 입력하는 텍스트 상태
  const [inputText, setInputText] = useState("")

  // 화면에 보여줄 대화 기록 상태
  const [messages, SetMessages] = useState([])

  // 전송 버튼을 눌렀을 때 실행되는 함수
  const sendMessage = async () => {
    if(!inputText.trim()) return;

    // 사용자 메시지를 화면에 추가
    const newMessages = [...messages, {sender:"user", text:inputText}]
    SetMessages(newMessages)

    // 입력 후 전송하면 입력창 비우기
    const currentInput = inputText
    setInputText("")
    try{
      // FastAPI 서버로 메시지 전송
      const response = await fetch("http://127.0.0.1:8080/api/chat", {
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body: JSON.stringify({message: currentInput})
      })

      // 서버로부터 받은 답변 처리
      const data = await response.json()

      // 봇의 답변을 대화 기록에 추가
      SetMessages((prev) => [...prev, {sender:"bot", text: data.reply}])
    }catch(error){
      console.error("서버 통신 에러:", error)
      SetMessages((prev) => [...prev, {sender:"bot", text:"서버와 연결할 수 없습니다."}])
    }
  }

  return (
    <>
    <div style={{ maxWidth: "500px", margin: "50px auto", fontFamily: "sans-serif" }}>
      <h2>langchain AI 챗봇</h2>

      {/* 채팅 내역 출력 영역 */}
      <div style={{ border: "1px solid #ccc", padding: "10px", height: "400px", overflowY: "auto", marginBottom: "10px" }}>
        {messages.map((msg, index) => (
          // 상대방 메시지(서버단에서 오는 메시지)는 왼쪽 정렬, 내가 보내는 메시지는 오른쪽 정렬
          <div key={index} style={{ textAlign:msg.sender=='user'?'right':'left', margin: "10px 0" }}>
            <span style={{ 
              background: msg.sender === "user" ? "#d1e7dd" : "#f8d7da", 
              padding: "8px 12px", 
              borderRadius: "10px",
              display: "inline-block"
            }}>
            {msg.text}
            </span>
          </div>
        ))}
      </div>

      {/* 입력 및 전송 영역 */}
      <div style={{ display: "flex", gap: "10px" }}>
        <input 
          type="text" 
          value={inputText}
          placeholder="메시지를 입력하세요."
          onChange={(e)=>setInputText(e.target.value)}
          onKeyDown={(e)=>e.key==="Enter"&&sendMessage()}
          style={{ flex: 1, padding: "10px" }}
        />
        <button onClick={sendMessage} style={{ padding: "10px 20px" }}>전송</button>
      </div>
    </div>
    </>
  )
}

export default App