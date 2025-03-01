// src/components/LandingPage.jsx
import React from 'react';
import { Button, Typography, Row, Col, Card } from 'antd';
import {
  MedicineBoxOutlined,
  ExperimentOutlined,
  BookOutlined,
  ScheduleOutlined,
  IdcardOutlined,
  TeamOutlined,
  LineChartOutlined,
  EnvironmentOutlined
} from '@ant-design/icons';
import '../styles/LandingPage.css';

const { Title, Paragraph } = Typography;

export default function LandingPage({ onStart, onSelectFunction }) {
  // 功能菜单数据
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
      title: '经方查询',
      icon: <BookOutlined />,
      description: '古代经典处方的查询与解析',
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
      id: 'constitution',
      title: '体质辨识',
      icon: <IdcardOutlined />,
      description: '中医九种体质的辨别与调养',
      color: '#eb2f96'
    },
    {
      id: 'doctors',
      title: '名医荟萃',
      icon: <TeamOutlined />,
      description: '历代著名中医及其学术成就',
      color: '#13c2c2'
    },
    {
      id: 'meridians',
      title: '经络图谱',
      icon: <LineChartOutlined />,
      description: '人体经络与穴位图解',
      color: '#faad14'
    },
    {
      id: 'geomancy',
      title: '药材产地',
      icon: <EnvironmentOutlined />,
      description: '各地道地药材分布查询',
      color: '#1d39c4'
    }
  ];

  return (
    <div className="landing-container">
      {/* 大图部分 - 移除白色方块，改为半透明覆盖层 */}
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

      {/* 功能导航部分 */}
      <div className="features-section">
        <div className="features-header">
          <Title level={2}>功能导航</Title>
          <Paragraph>探索岐黄中医智能助手的多样化功能</Paragraph>
        </div>

        <Row gutter={[16, 16]} className="features-grid">
          {functions.map(func => (
            <Col xs={12} sm={8} md={6} key={func.id}>
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