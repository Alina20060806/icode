// src/pages/Home.jsx
import React, { useState, useRef, useEffect } from 'react';
import { Layout, Input, Button, FloatButton, Tooltip, Avatar } from 'antd';
import {
  MessageOutlined,
  UploadOutlined,
  HistoryOutlined,
  RobotOutlined,
  UserOutlined
} from '@ant-design/icons';
import SidePanel from '../components/SidePanel';
import ChatMessage from '../components/ChatMessage';
import './Home.css';

const { Header, Content } = Layout;

export default function Home() {
  // 状态管理
  const [messages, setMessages] = useState([
    { text: '您好！我是中医AI助手岐黄，请问有什么可以帮您？', isBot: true }
  ]);
  const [inputText, setInputText] = useState('');
  const [sideOpen, setSideOpen] = useState(false);
  const [sending, setSending] = useState(false);
  const chatEndRef = useRef(null);

  // 自动滚动处理
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // 消息发送处理
  const handleSend = async () => {
    if (!inputText.trim()) return;

    const userMsg = { text: inputText, isBot: false };
    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setSending(true);

    try {
      const botResponse = await new Promise((resolve) => {
        setTimeout(() => {
          resolve(`关于您提到的"${inputText}"，中医建议：
          1. 保持良好作息
          2. 饮食清淡温和
          3. 具体方案需结合舌诊结果`);
        }, 800);
      });

      const botMsg = { text: botResponse, isBot: true };
      setMessages(prev => [...prev, botMsg]);
    } catch {
      const errorMsg = { text: '服务暂时不可用，请稍后再试', isBot: true };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setSending(false);
    }
  };

  // 快捷问题示例
  const sampleQuestions = [
    "气虚体质如何调理？",
    "推荐适合冬季的养生食谱",
    "舌边有齿痕说明什么？",
    "经常头晕中医怎么看？"
  ];

  return (
    <Layout className="main-layout">
      {/* 右侧功能按钮组 */}
      <FloatButton.Group
        trigger="hover"
        style={{ right: 24, bottom: 24 }}
        icon={<RobotOutlined style={{ color: '#1890ff' }} />}
      >
        <Tooltip title="舌诊分析" placement="left">
          <FloatButton
            icon={<UploadOutlined />}
            type="primary"
            onClick={() => setSideOpen(true)}
          />
        </Tooltip>
        <Tooltip title="问诊记录" placement="left">
          <FloatButton icon={<HistoryOutlined />} />
        </Tooltip>
      </FloatButton.Group>

      {/* 舌诊侧边栏 */}
      <SidePanel open={sideOpen} onClose={() => setSideOpen(false)} />

      {/* 主内容区域 */}
      <Layout className="main-content">
        <Header className="app-header">
          <div className="brand-section">
            <div className="logo-wrapper">
              <div className="logo-icon">🌿</div>
              <h1>岐黄中医智能助手</h1>
            </div>
          </div>
        </Header>

        <Content className="chat-content">
          {/* 聊天消息容器 */}
          <div className="message-container">
            {/* 欢迎区域 - 仅在初始状态显示 */}
            {messages.length === 1 && !sending && (
              <div className="welcome-area">
                <h2>您可以尝试咨询：</h2>
                <div className="question-grid">
                  {sampleQuestions.map((question, index) => (
                    <Button
                      key={index}
                      className="sample-btn"
                      onClick={() => setInputText(question)}
                    >
                      {question}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* 消息列表 */}
            <div className="messages-list">
              {messages.map((msg, index) => (
                <div key={index} className={`message-wrapper ${msg.isBot ? 'bot' : 'user'}`}>
                  <Avatar
                    className="message-avatar"
                    icon={msg.isBot ? <RobotOutlined /> : <UserOutlined />}
                    style={{ backgroundColor: msg.isBot ? '#1890ff' : '#87d068' }}
                  />
                  <ChatMessage
                    text={msg.text}
                    isBot={msg.isBot}
                  />
                </div>
              ))}
              {sending && (
                <div className="message-wrapper bot">
                  <Avatar
                    className="message-avatar"
                    icon={<RobotOutlined />}
                    style={{ backgroundColor: '#1890ff' }}
                  />
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>
          </div>

          {/* 输入区域 */}
          <div className="input-container">
            <div className="input-box">
              <Input.TextArea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="请输入您的不适症状或健康疑问..."
                autoSize={{ minRows: 1, maxRows: 4 }}
                onPressEnter={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="ai-input"
                disabled={sending}
              />
              <Button
                type="primary"
                shape="circle"
                icon={<MessageOutlined />}
                onClick={handleSend}
                className="send-btn"
                size="large"
                disabled={sending || !inputText.trim()}
              />
            </div>
            <div className="input-footer">
              <span className="disclaimer">
                本系统建议仅供参考，具体诊疗请咨询专业医师
              </span>
            </div>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}