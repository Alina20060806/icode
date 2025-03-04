// src/components/MeridianChart.jsx
import React, { useState } from 'react';
import { Typography, Tabs, Card, Row, Col, Divider } from 'antd';
import './MeridianChart.css';

const { Title, Paragraph, Text } = Typography;
const { TabPane } = Tabs;

export default function MeridianChart() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="meridian-container">
      <div className="meridian-header">
        <Title level={2}>经络图谱</Title>
        <Paragraph>
          经络是中医理论的重要组成部分，是气血运行的通道，连接脏腑、体表、四肢、百骸。
          经络系统包括十二正经、奇经八脉、十五络脉、十二经别、十二经筋、十二皮部等组成。
        </Paragraph>
        <Divider />
      </div>

      <Tabs activeKey={activeTab} onChange={setActiveTab} centered>
        <TabPane tab="经络概述" key="overview">
          <div className="meridian-content">
            <Row gutter={[24, 24]}>
              <Col xs={24} lg={12}>
                <div className="meridian-image-container">
                  <img
                    src="/api/placeholder/600/800"
                    alt="人体经络总图"
                    className="meridian-image"
                  />
                  <div className="image-caption">人体经络总图示意</div>
                </div>
              </Col>
              <Col xs={24} lg={12}>
                <Card className="meridian-info-card">
                  <Title level={4}>经络系统简介</Title>
                  <Paragraph>
                    经络系统是人体的一个复杂网络，承担着沟通内外、联系上下、调节气血、平衡阴阳的重要功能。主要由以下几部分组成：
                  </Paragraph>
                  <ul className="meridian-list">
                    <li>
                      <Text strong>十二正经</Text>：包括手三阴经（肺、心包、心）、手三阳经（大肠、三焦、小肠）、足三阴经（脾、肝、肾）和足三阳经（胃、胆、膀胱）
                    </li>
                    <li>
                      <Text strong>奇经八脉</Text>：包括督脉、任脉、冲脉、带脉、阴跷脉、阳跷脉、阴维脉、阳维脉
                    </li>
                    <li>
                      <Text strong>十五络脉</Text>：包括十二经别、十二经筋、十二皮部等
                    </li>
                  </ul>
                  <Paragraph>
                    经络连接着人体内部的脏腑和外部的皮肤、肌肉、骨骼等组织，是气血运行的通道。通过经络，人体内部的脏腑功能状态可以反映到体表，而体表的刺激也可以传导至相应的脏腑，这就是中医"内外相连、上下相通"的理论基础。
                  </Paragraph>
                  <Paragraph>
                    经络学说是针灸、推拿、气功等中医治疗方法的理论基础，也是中医诊断和养生保健的重要指导原则。了解经络系统，有助于我们更好地理解中医理论和实践。
                  </Paragraph>
                </Card>
              </Col>
            </Row>
          </div>
        </TabPane>
        <TabPane tab="十二正经" key="twelve-meridians">
          <div className="meridian-content">
            <Row gutter={[24, 24]}>
              <Col xs={24} lg={12}>
                <div className="meridian-image-container">
                  <img
                    src="/api/placeholder/600/800"
                    alt="十二正经图"
                    className="meridian-image"
                  />
                  <div className="image-caption">十二正经循行示意图</div>
                </div>
              </Col>
              <Col xs={24} lg={12}>
                <Card className="meridian-info-card">
                  <Title level={4}>十二正经</Title>
                  <Paragraph>
                    十二正经是经络系统的主体，包括手三阴经、手三阳经、足三阴经和足三阳经，共十二条经脉。它们各有特定的循行路线和对应的脏腑，具体如下：
                  </Paragraph>
                  <Title level={5}>手三阴经</Title>
                  <ul className="meridian-list">
                    <li><Text strong>手太阴肺经</Text>：起于中焦，下络大肠，上膈属肺，沿上臂内侧下行至拇指端</li>
                    <li><Text strong>手厥阴心包经</Text>：起于胸中，出属心包络，沿上臂内侧下行至中指端</li>
                    <li><Text strong>手少阴心经</Text>：起于心中，下络小肠，沿上臂内侧下行至小指端</li>
                  </ul>
                  <Title level={5}>手三阳经</Title>
                  <ul className="meridian-list">
                    <li><Text strong>手阳明大肠经</Text>：起于食指端，沿上臂外侧上行至面部</li>
                    <li><Text strong>手少阳三焦经</Text>：起于环指端，沿上臂外侧上行至耳后</li>
                    <li><Text strong>手太阳小肠经</Text>：起于小指端，沿上臂外侧上行至面部</li>
                  </ul>
                  <Title level={5}>足三阴经</Title>
                  <ul className="meridian-list">
                    <li><Text strong>足太阴脾经</Text>：起于大脚趾端，沿腿内侧上行至腹部</li>
                    <li><Text strong>足厥阴肝经</Text>：起于足大趾端，沿腿内侧上行至胸部</li>
                    <li><Text strong>足少阴肾经</Text>：起于足小趾端，沿腿内侧上行至胸部</li>
                  </ul>
                  <Title level={5}>足三阳经</Title>
                  <ul className="meridian-list">
                    <li><Text strong>足阳明胃经</Text>：起于面部，沿胸腹前下行至足第二趾</li>
                    <li><Text strong>足少阳胆经</Text>：起于目外眦，沿体侧下行至足第四趾</li>
                    <li><Text strong>足太阳膀胱经</Text>：起于目内眦，沿头部、背部下行至足小趾</li>
                  </ul>
                </Card>
              </Col>
            </Row>
          </div>
        </TabPane>
        <TabPane tab="奇经八脉" key="eight-vessels">
          <div className="meridian-content">
            <Row gutter={[24, 24]}>
              <Col xs={24} lg={12}>
                <div className="meridian-image-container">
                  <img
                    src="/api/placeholder/600/800"
                    alt="奇经八脉图"
                    className="meridian-image"
                  />
                  <div className="image-caption">奇经八脉示意图</div>
                </div>
              </Col>
              <Col xs={24} lg={12}>
                <Card className="meridian-info-card">
                  <Title level={4}>奇经八脉</Title>
                  <Paragraph>
                    奇经八脉是经络系统中的特殊部分，与十二正经相比，它们没有直接联系的脏腑，主要起着联系、调节十二正经气血运行的作用。
                  </Paragraph>
                  <ul className="meridian-list">
                    <li>
                      <Text strong>督脉</Text>：又称"阳脉之海"，起于下极，沿脊柱正中上行，至头顶，再至鼻柱。主一身之阳气。
                    </li>
                    <li>
                      <Text strong>任脉</Text>：又称"阴脉之海"，起于会阴，沿腹部正中线上行至下颏。主一身之阴气，主要调节全身阴经的气血。
                    </li>
                    <li>
                      <Text strong>冲脉</Text>：又称"十二经脉之海"，起于少腹，沿腹部上行至胸中。主要调节十二正经的气血。
                    </li>
                    <li>
                      <Text strong>带脉</Text>：环绕腰部一周，如同束带，约束纵行诸经，防止经气上泛。
                    </li>
                    <li>
                      <Text strong>阴跷脉</Text>：起于足跟内侧，沿腿内侧上行至目内眦。
                    </li>
                    <li>
                      <Text strong>阳跷脉</Text>：起于足跟外侧，沿腿外侧上行至目外眦。
                    </li>
                    <li>
                      <Text strong>阴维脉</Text>：起于足内踝，沿腿内侧上行，连接诸阴经。
                    </li>
                    <li>
                      <Text strong>阳维脉</Text>：起于足外踝，沿腿外侧上行，连接诸阳经。
                    </li>
                  </ul>
                  <Paragraph>
                    奇经八脉中，督脉和任脉最为重要，被称为"奇经之纲"，它们与冲脉合称为"三奇经"，是气血生化的源泉所在。
                  </Paragraph>
                </Card>
              </Col>
            </Row>
          </div>
        </TabPane>
        <TabPane tab="经络穴位" key="acupoints">
          <div className="meridian-content">
            <Row gutter={[24, 24]}>
              <Col xs={24} lg={12}>
                <div className="meridian-image-container">
                  <img
                    src="/api/placeholder/600/800"
                    alt="常用穴位图"
                    className="meridian-image"
                  />
                  <div className="image-caption">常用穴位示意图</div>
                </div>
              </Col>
              <Col xs={24} lg={12}>
                <Card className="meridian-info-card">
                  <Title level={4}>经络穴位</Title>
                  <Paragraph>
                    穴位是经络循行路线上的特定点，也是气血输注出入的门户，在这些特定部位进行针灸、推拿等治疗，可以调节人体内脏功能，防治疾病。
                  </Paragraph>
                  <Title level={5}>常用要穴</Title>
                  <ul className="meridian-list">
                    <li><Text strong>合谷穴</Text>：位于手背第一、二掌骨之间，为手阳明大肠经原穴，有解表、通络、止痛等作用。</li>
                    <li><Text strong>足三里</Text>：位于膝下三寸，胫骨外侧，为足阳明胃经合穴，有调理脾胃、补中益气等作用。</li>
                    <li><Text strong>关元穴</Text>：位于脐下三寸，任脉穴位，有补肾培元、理气和血等作用。</li>
                    <li><Text strong>太冲穴</Text>：位于足背第一、二跖骨间，为足厥阴肝经原穴，有疏肝理气、清肝明目等作用。</li>
                    <li><Text strong>内关穴</Text>：位于腕横纹上二寸，两筋之间，为手厥阴心包经络穴，有宁心安神、理气止痛等作用。</li>
                  </ul>
                  <Paragraph>
                    穴位按其性质和作用可分为：原穴、络穴、背俞穴、募穴、郄穴、八会穴、八脉交会穴等。不同类型的穴位有不同的特性和应用范围。
                  </Paragraph>
                  <Paragraph>
                    中医认为，通过对穴位的刺激可以疏通经络，调和气血，平衡阴阳，从而达到防病治病的目的。在日常保健中，可以通过按摩、敲打、艾灸等方法刺激穴位，增强体质，预防疾病。
                  </Paragraph>
                </Card>
              </Col>
            </Row>
          </div>
        </TabPane>
      </Tabs>
    </div>
  );
}