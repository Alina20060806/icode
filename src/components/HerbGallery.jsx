// src/components/HerbGallery.jsx
import React, { useState } from 'react';
import { Card, Row, Col, Image, Typography, Divider, Tag } from 'antd';
import './HerbGallery.css';

const { Title, Paragraph } = Typography;

export default function HerbGallery() {
  // 模拟药材数据
  const herbs = [
    {
      id: 1,
      name: "黄芪",
      image: "/api/placeholder/300/200",
      description: "补气固表，利水消肿，托毒排脓，生肌。用于气虚乏力，食少便溏，中气下陷，久泻脱肛，便血崩漏，表虚自汗，气虚水肿，痈疽难溃，久溃不敛。",
      type: "补气",
      tags: ["补气", "固表", "利水"]
    },
    {
      id: 2,
      name: "当归",
      image: "/api/placeholder/300/200",
      description: "补血活血，调经止痛，润肠通便。用于血虚萎黄，眩晕心悸，月经不调，经闭痛经，虚寒腹痛，肠燥便秘，风湿痹痛，跌扑损伤，痈疽疮疡。",
      type: "补血",
      tags: ["补血", "活血", "调经"]
    },
    {
      id: 3,
      name: "党参",
      image: "/api/placeholder/300/200",
      description: "补中益气，健脾益肺。用于脾肺虚弱，气短心悸，食少便溏，虚喘咳嗽，内热消渴，津伤口渴。",
      type: "补气",
      tags: ["补气", "健脾", "益肺"]
    },
    {
      id: 4,
      name: "白术",
      image: "/api/placeholder/300/200",
      description: "健脾益气，燥湿利水，止汗，安胎。用于脾虚食少，腹胀泄泻，痰饮眩悸，水肿，自汗，胎动不安。",
      type: "补气",
      tags: ["健脾", "益气", "燥湿"]
    }
  ];

  return (
    <div className="herb-gallery">
      <div className="herb-header">
        <Title level={2}>中药材库</Title>
        <Paragraph>查询常用中药材的功效与应用</Paragraph>
        <Divider />
      </div>

      <Row gutter={[16, 16]} className="herb-grid">
        {herbs.map(herb => (
          <Col xs={24} sm={12} md={8} lg={6} key={herb.id}>
            <Card
              hoverable
              className="herb-card"
              cover={
                <div className="herb-img-container">
                  <Image
                    alt={herb.name}
                    src={herb.image}
                    className="herb-image"
                  />
                </div>
              }
            >
              <Card.Meta
                title={<span className="herb-title">{herb.name}</span>}
                description={
                  <div className="herb-content">
                    <div className="herb-tags">
                      {herb.tags.map(tag => (
                        <Tag color="blue" key={tag}>{tag}</Tag>
                      ))}
                    </div>
                    <div className="herb-description">
                      {herb.description.length > 80
                        ? `${herb.description.substring(0, 80)}...`
                        : herb.description}
                    </div>
                  </div>
                }
              />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}