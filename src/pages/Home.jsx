// src/pages/Home.jsx
import React, { useState, useRef, useEffect } from 'react';
import { Layout, Input, Button, Avatar, Typography, Divider, Tooltip } from 'antd';
import {
  SendOutlined,
  UserOutlined,
  HistoryOutlined,
  UploadOutlined,
  MedicineBoxOutlined,
  HomeOutlined,
  MenuOutlined,
  CloseOutlined
} from '@ant-design/icons';
import LandingPage from '../components/LandingPage'; // 导入着陆页组件
import HerbGallery from '../components/HerbGallery'; // 导入中药材库组件
import SidePanel from '../components/SidePanel'; // 导入舌诊侧边栏组件
import '../styles/ModernChat.css';

const { Header, Content, Sider } = Layout;
const { Title, Paragraph, Text } = Typography;

export default function Home() {
  // 状态管理
  const [messages, setMessages] = useState([
    {
      text: '您好！我是中医AI助手岐黄，请问有什么可以帮您？',
      isBot: true
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [sending, setSending] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [currentView, setCurrentView] = useState('landing'); // 默认显示着陆页
  const [sideOpen, setSideOpen] = useState(false); // 控制舌诊侧边栏
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
    setShowSuggestions(false);

    try {
      const botResponse = await new Promise((resolve) => {
        setTimeout(() => {
          resolve(`关于您提到的"${inputText}"，中医建议：

1. 保持良好作息
2. 饮食清淡温和
3. 具体方案需结合舌诊结果

如果您需要更详细的解答，可以上传舌像进行进一步分析。`);
        }, 1000);
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

  // 选择建议问题
  const handleSelectSuggestion = (question) => {
    setInputText(question);
  };

  // 历史会话（模拟数据）
  const historySessions = [
    { id: 1, title: "关于脾胃调理的咨询", date: "今天" },
    { id: 2, title: "春季养生方案", date: "昨天" },
    { id: 3, title: "失眠问题解决方案", date: "3天前" }
  ];

  // 处理开始按钮点击 - 从着陆页进入聊天
  const handleStart = () => {
    setCurrentView('chat');
  };

  // 处理功能选择
  const handleFunctionSelect = (functionId) => {
    if (functionId === 'herbs') {
      setCurrentView('herbs');
    } else if (functionId === 'diagnostics') {
      setCurrentView('chat');
      setSideOpen(true); // 打开舌诊侧边栏
    } else {
      // 对于其他功能，默认跳转到聊天页面
      setCurrentView('chat');
      // 可以根据功能ID设置预填问题
      const functionQuestions = {
        'prescriptions': '请介绍常用的中医经方',
        'calendar': '本月有哪些养生建议？',
        'constitution': '如何判断自己是什么体质？',
        'doctors': '请介绍几位著名的中医',
        'meridians': '能简单介绍下人体经络吗？',
        'geomancy': '哪些地区出产道地药材？'
      };

      if (functionQuestions[functionId]) {
        setInputText(functionQuestions[functionId]);
      }
    }
  };

  // 如果当前是着陆页，直接渲染着陆页组件
  if (currentView === 'landing') {
    return <LandingPage onStart={handleStart} onSelectFunction={handleFunctionSelect} />;
  }

  // 渲染当前视图内容
  const renderCurrentView = () => {
    switch(currentView) {
      case 'herbs':
        return <HerbGallery />;
      case 'chat':
      default:
        return (
          <>
            {/* 问候语 */}
            <div className="greeting-section">
              <Title level={2}>欢迎使用岐黄中医智能助手</Title>
              <Paragraph className="greeting-subtitle">
                传承千年智慧，融合现代科技，为您提供专业的中医健康咨询
              </Paragraph>
            </div>

            {/* 消息列表 */}
            <div className="messages-list">
              {messages.map((msg, index) => (
                <div key={index} className={`message-row ${msg.isBot ? 'bot-row' : 'user-row'}`}>
                  <div className="message-wrapper">
                    {msg.isBot && (
                      <Avatar className="message-avatar" size={40}>🌿</Avatar>
                    )}
                    <div className={`message-bubble ${msg.isBot ? 'bot-bubble' : 'user-bubble'}`}>
                      <div className="message-content">
                        {msg.text.split('\n').map((line, i) => (
                          <p key={i}>{line.trim()}</p>
                        ))}
                      </div>
                    </div>
                    {!msg.isBot && (
                      <Avatar className="message-avatar" icon={<UserOutlined />} size={40} />
                    )}
                  </div>
                </div>
              ))}

              {/* 发送中动画 */}
              {sending && (
                <div className="message-row bot-row">
                  <div className="message-wrapper">
                    <Avatar className="message-avatar" size={40}>🌿</Avatar>
                    <div className="typing-indicator">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                </div>
              )}

              <div ref={chatEndRef} />
            </div>

            {/* 快捷提问建议 - 仅在初始状态显示 */}
            {showSuggestions && messages.length === 1 && !sending && (
              <div className="suggestions-container">
                <Text className="suggestions-title">您可以尝试询问：</Text>
                <div className="suggestions-list">
                  {sampleQuestions.map((question, index) => (
                    <div
                      key={index}
                      className="suggestion-pill"
                      onClick={() => handleSelectSuggestion(question)}
                    >
                      {question}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        );
    }
  };

  return (
    <Layout className="modern-layout">
      {/* 侧边栏 - 历史会话 */}
      <Sider
        className={`modern-sider ${sidebarVisible ? 'visible' : ''}`}
        width={280}
        theme="light"
      >
        <div className="sider-header">
          <Title level={4}>历史会话</Title>
          <Button
            type="text"
            icon={<CloseOutlined />}
            onClick={() => setSidebarVisible(false)}
            className="close-sidebar"
          />
        </div>
        <Divider style={{ margin: '0 0 16px 0' }} />
        <div className="history-list">
          {historySessions.map(session => (
            <div key={session.id} className="history-item">
              <HistoryOutlined className="history-icon" />
              <div className="history-content">
                <div className="history-title">{session.title}</div>
                <div className="history-date">{session.date}</div>
              </div>
            </div>
          ))}
        </div>
      </Sider>

      {/* 舌诊侧边栏 */}
      <SidePanel open={sideOpen} onClose={() => setSideOpen(false)} />

      {/* 主内容区域 */}
      <Layout className="chat-layout">
        {/* 顶部导航 */}
        <Header className="modern-header">
          <div className="header-left">
            <Button
              type="text"
              icon={<MenuOutlined />}
              onClick={() => setSidebarVisible(!sidebarVisible)}
              className="menu-button"
            />
            <div className="logo-wrapper">
              <span className="logo-icon">🌿</span>
              <Title level={3} className="app-title">岐黄中医智能助手</Title>
            </div>
          </div>
          <div className="header-right">
            <Tooltip title="返回首页">
              <Button
                type="text"
                icon={<HomeOutlined />}
                className="header-button"
                onClick={() => setCurrentView('landing')}
              />
            </Tooltip>
            <Tooltip title="中药材库">
              <Button
                type="text"
                icon={<MedicineBoxOutlined />}
                className={`header-button ${currentView === 'herbs' ? 'active-button' : ''}`}
                onClick={() => setCurrentView('herbs')}
              />
            </Tooltip>
            <Tooltip title="舌诊分析">
              <Button
                type="text"
                icon={<UploadOutlined />}
                className="header-button"
                onClick={() => setSideOpen(true)}
              />
            </Tooltip>
            <Tooltip title="问诊记录">
              <Button type="text" icon={<HistoryOutlined />} className="header-button" />
            </Tooltip>
          </div>
        </Header>

        {/* 聊天内容区域 */}
        <Content className="modern-content">
          <div className="message-container">
            {renderCurrentView()}
          </div>

          {/* 输入区域 - 仅在聊天视图中显示 */}
          {currentView === 'chat' && (
            <div className="input-area">
              <div className="input-container">
                <Input
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="请输入您的问题或健康咨询..."
                  onPressEnter={handleSend}
                  className="chat-input"
                />
                <Button
                  type="primary"
                  icon={<SendOutlined />}
                  onClick={handleSend}
                  className="send-button"
                  disabled={!inputText.trim() || sending}
                />
              </div>
              <div className="input-footer">
                <Text type="secondary" className="disclaimer">
                  本系统建议仅供参考，具体诊疗请咨询专业医师
                </Text>
              </div>
            </div>
          )}
        </Content>
      </Layout>
    </Layout>
  );
}