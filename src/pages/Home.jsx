import React, { useState, useRef, useEffect } from 'react'
import { Layout, Input, Button, FloatButton } from 'antd'
import { MessageOutlined, UploadOutlined } from '@ant-design/icons'
import SidePanel from '../components/SidePanel'
import ChatMessage from '../components/ChatMessage'

const { Header, Content } = Layout

export default function Home() {
  const [messages, setMessages] = useState([
    { text: '您好！我是中医AI助手岐黄，请问有什么可以帮您？', isBot: true }
  ])
  const [inputText, setInputText] = useState('')
  const [sideOpen, setSideOpen] = useState(false)
  const chatEndRef = useRef(null)

  // 自动滚动到底部
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // 发送消息处理
  const handleSend = async () => {
    if (!inputText.trim()) return

    // 用户消息
    const userMsg = { text: inputText, isBot: false }
    setMessages(prev => [...prev, userMsg])
    setInputText('')

    try {
      // 模拟AI回复
      const botResponse = await simulateAI(inputText)
      const botMsg = { text: botResponse, isBot: true }
      setMessages(prev => [...prev, botMsg])
    } catch {
      const errorMsg = { text: '服务暂时不可用，请稍后再试', isBot: true }
      setMessages(prev => [...prev, errorMsg])
    }
  }

  // 模拟AI回复
  const simulateAI = (text) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(`关于您提到的"${text}"，中医认为可能与以下证型相关：
        \n• 肝火旺盛：建议菊花决明子茶
        \n• 气血不足：推荐黄芪当归炖鸡
        \n（本结果仅供参考，请咨询专业医师）`)
      }, 800)
    })
  }

  return (
    <Layout className="main-layout">
      {/* 侧边栏触发按钮 */}
      <FloatButton
        icon={<UploadOutlined />}
        type="primary"
        onClick={() => setSideOpen(true)}
        style={{ right: 24, bottom: 24 }}
      />

      {/* 舌诊侧边栏 */}
      <SidePanel open={sideOpen} onClose={() => setSideOpen(false)} />

      {/* 主内容区 */}
      <Layout>
        <Header className="app-header">
          <h1>中医AI助手·岐黄</h1>
          <p className="welcome-text">传承千年智慧，守护您的健康</p>
        </Header>

        <Content className="chat-content">
          {/* 聊天记录区 */}
          <div className="message-container">
            {messages.map((msg, index) => (
              <ChatMessage key={index} text={msg.text} isBot={msg.isBot} />
            ))}
            <div ref={chatEndRef} />
          </div>

          {/* 输入区 */}
          <div className="input-box">
            <Input.TextArea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="请输入您的不适症状或健康疑问..."
              autoSize={{ minRows: 1, maxRows: 4 }}
              onPressEnter={(e) => { e.preventDefault(); handleSend() }}
            />
            <Button
              type="primary"
              icon={<MessageOutlined />}
              onClick={handleSend}
              className="send-btn"
            >
              发送
            </Button>
          </div>
        </Content>
      </Layout>
    </Layout>
  )
}