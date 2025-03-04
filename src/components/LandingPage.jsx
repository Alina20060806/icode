// src/components/LandingPage.jsx
import React from 'react';
import { Button, Typography, Row, Col, Card } from 'antd';
import {
  MedicineBoxOutlined,
  ExperimentOutlined,
  BookOutlined,
  ScheduleOutlined,
  LineChartOutlined,
  RobotOutlined
} from '@ant-design/icons';
import '../styles/LandingPage.css';

const { Title, Paragraph } = Typography;

export default function LandingPage({ onStart, onSelectFunction }) {
  // 功能菜单数据 - 已删除体质辨识、药材产地和名医荟萃，增加了人工智能助手
  const functions = [
    {
      id: 'herbs',
      title: '中药材库',
      icon: <MedicineBoxOutlined />,
      description: '查询各类中药材的功效与应用',
      color: '#1890ff'
    },
    {
      id: 'diagnostics',
      title: '舌诊分析',
      icon: <ExperimentOutlined />,
      description: '上传舌头照片进行智能分析',
      color: '#52c41a'
    },
    {
      id: 'prescriptions',
      title: '经方饮食查询',
      icon: <BookOutlined />,
      description: '中医经典饮食方案查询',
      color: '#fa8c16'
    },
    {
      id: 'calendar',
      title: '养生日历',
      icon: <ScheduleOutlined />,
      description: '按节气推荐的养生方案',
      color: '#722ed1'
    },
    {
      id: 'meridians',
      title: '经络图谱',
      icon: <LineChartOutlined />,
      description: '人体经络与穴位图解',
      color: '#faad14'
    },
    {
      id: 'ai-assistant',
      title: '人工智能助手',
      icon: <RobotOutlined />,
      description: '智能中医问诊与健康咨询',
      color: '#eb2f96'
    }
  ];

  // 将功能分为两行，每行三个
  const topRowFunctions = functions.slice(0, 3); // 前三个功能
  const bottomRowFunctions = functions.slice(3, 6); // 后三个功能

  return (
    <div className="landing-container">
      {/* 大图部分 - 半透明覆盖层 */}
      <div className="hero-section">
        <div className="hero-overlay">
          <div className="hero-content">
            <div className="logo-large">
              <span className="logo-icon-large">🌿</span>
              <h1>岐黄中医智能助手</h1>
            </div>
            <p className="hero-subtitle">传承千年智慧，融合现代科技</p>
            <Button
              type="primary"
              size="large"
              className="start-button"
              onClick={onStart}
            >
              点击开始与岐黄舌鉴的中医之旅
            </Button>
          </div>
        </div>
      </div>

      {/* 功能导航部分 - 3x2布局 */}
      <div className="features-section">
        <div className="features-header">
          <Title level={2}>功能导航</Title>
          <Paragraph>探索岐黄中医智能助手的多样化功能</Paragraph>
        </div>

        {/* 上面一行三个 */}
        <Row gutter={[24, 24]} className="features-grid">
          {topRowFunctions.map(func => (
            <Col xs={24} sm={24} md={8} key={func.id}>
              <Card
                hoverable
                className="feature-card"
                onClick={() => onSelectFunction(func.id)}
              >
                <div className="feature-icon" style={{ backgroundColor: func.color }}>
                  {func.icon}
                </div>
                <div className="feature-title">{func.title}</div>
                <div className="feature-desc">{func.description}</div>
              </Card>
            </Col>
          ))}
        </Row>

        {/* 下面一行三个 */}
        <Row gutter={[24, 24]} className="features-grid" style={{ marginTop: '16px' }}>
          {bottomRowFunctions.map(func => (
            <Col xs={24} sm={24} md={8} key={func.id}>
              <Card
                hoverable
                className="feature-card"
                onClick={() => onSelectFunction(func.id)}
              >
                <div className="feature-icon" style={{ backgroundColor: func.color }}>
                  {func.icon}
                </div>
                <div className="feature-title">{func.title}</div>
                <div className="feature-desc">{func.description}</div>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      {/* 底部说明 */}
      <div className="landing-footer">
        <p>注：本系统建议仅供参考，具体诊疗请咨询专业医师</p>
      </div>
    </div>
  );
}