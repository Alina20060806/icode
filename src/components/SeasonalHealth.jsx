// src/components/SeasonalHealth.jsx
import React, { useState, useEffect } from 'react';
import { Calendar, Badge, Card, Typography, Spin, Empty, Divider, Alert, Button } from 'antd';
import axios from 'axios';
import './SeasonalHealth.css';

const { Title, Paragraph, Text } = Typography;

// API接口地址（这里只是示例，实际使用时需要替换为真实的API地址）
const API_ENDPOINT = '/api/seasonal-health';

export default function SeasonalHealth() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [healthData, setHealthData] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedDateInfo, setSelectedDateInfo] = useState(null);

  // 加载养生日历数据
  useEffect(() => {
    const fetchHealthData = async () => {
      setLoading(true);
      setError(null);

      try {
        // 这里是API调用，目前使用模拟数据
        // const response = await axios.get(API_ENDPOINT);
        // setHealthData(response.data);

        // 模拟API调用
        setTimeout(() => {
          setHealthData(mockHealthData);
          setLoading(false);
        }, 1000);
      } catch (err) {
        setError('无法加载养生日历数据，请稍后再试。');
        setLoading(false);
      }
    };

    fetchHealthData();
  }, []);

  // 当选择的日期变化时，更新对应的养生信息
  useEffect(() => {
    if (healthData) {
      const dateStr = selectedDate.toISOString().split('T')[0];
      const info = healthData.find(item => item.date === dateStr);
      setSelectedDateInfo(info || null);
    }
  }, [selectedDate, healthData]);

  // 日历单元格渲染函数
  const dateCellRender = (value) => {
    if (!healthData) return null;

    const date = value.format('YYYY-MM-DD');
    const currentData = healthData.find(item => item.date === date);

    if (!currentData) return null;

    return (
      <div className="date-cell-content">
        {currentData.solarTerm && (
          <Badge
            color="#1890ff"
            text={currentData.solarTerm}
            className="solar-term-badge"
          />
        )}
      </div>
    );
  };

  // 日期选择处理函数
  const handleDateSelect = (date) => {
    setSelectedDate(date.toDate());
  };

  // 手动刷新数据
  const handleRefresh = () => {
    setHealthData(null);
    const fetchHealthData = async () => {
      setLoading(true);
      setError(null);

      try {
        // 这里是API调用，目前使用模拟数据
        // const response = await axios.get(API_ENDPOINT);
        // setHealthData(response.data);

        // 模拟API调用
        setTimeout(() => {
          setHealthData(mockHealthData);
          setLoading(false);
        }, 1000);
      } catch (err) {
        setError('无法加载养生日历数据，请稍后再试。');
        setLoading(false);
      }
    };

    fetchHealthData();
  };

  return (
    <div className="seasonal-health-container">
      <div className="seasonal-health-header">
        <Title level={2}>养生日历</Title>
        <Paragraph>
          根据二十四节气和传统中医理论，为您提供按节气推荐的养生方案和健康指导
        </Paragraph>
        <Button type="primary" onClick={handleRefresh}>刷新数据</Button>
        <Divider />
      </div>

      <div className="seasonal-health-content">
        <Spin spinning={loading}>
          {error ? (
            <Alert
              message="数据加载失败"
              description={error}
              type="error"
              showIcon
            />
          ) : (
            <div className="calendar-container">
              <Calendar
                dateCellRender={dateCellRender}
                onSelect={handleDateSelect}
              />

              <div className="health-info-container">
                {selectedDateInfo ? (
                  <Card
                    title={`${selectedDate.toLocaleDateString()} 养生指南`}
                    className="health-info-card"
                  >
                    {selectedDateInfo.solarTerm && (
                      <div className="info-section">
                        <Title level={4}>节气</Title>
                        <Paragraph>{selectedDateInfo.solarTerm}</Paragraph>
                      </div>
                    )}

                    <div className="info-section">
                      <Title level={4}>中医养生建议</Title>
                      <Paragraph>{selectedDateInfo.healthTips}</Paragraph>
                    </div>

                    <div className="info-section">
                      <Title level={4}>饮食推荐</Title>
                      <ul className="food-list">
                        {selectedDateInfo.recommendedFoods.map((food, index) => (
                          <li key={index}>{food}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="info-section">
                      <Title level={4}>宜忌提示</Title>
                      <div className="do-dont-container">
                        <div className="do-section">
                          <Title level={5}>宜</Title>
                          <ul>
                            {selectedDateInfo.dos.map((item, index) => (
                              <li key={index}>{item}</li>
                            ))}
                          </ul>
                        </div>
                        <div className="dont-section">
                          <Title level={5}>忌</Title>
                          <ul>
                            {selectedDateInfo.donts.map((item, index) => (
                              <li key={index}>{item}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </Card>
                ) : (
                  <Empty
                    description="请选择日期查看养生信息"
                    className="empty-info"
                  />
                )}
              </div>
            </div>
          )}
        </Spin>
      </div>

      {/* API接口说明 */}
      <div className="api-documentation">
        <Divider>API 接口文档</Divider>
        <Card title="养生日历 API 接口">
          <Title level={5}>接口地址</Title>
          <Paragraph code>{API_ENDPOINT}</Paragraph>

          <Title level={5}>请求方式</Title>
          <Paragraph>GET</Paragraph>

          <Title level={5}>参数说明</Title>
          <ul>
            <li><Text strong>year</Text> (可选): 指定年份，如 2023</li>
            <li><Text strong>month</Text> (可选): 指定月份，1-12</li>
            <li><Text strong>date</Text> (可选): 指定日期，如 2023-05-01</li>
          </ul>

          <Title level={5}>返回数据格式</Title>
          <Paragraph>JSON 数组，包含养生日历数据</Paragraph>

          <Title level={5}>示例请求</Title>
          <Paragraph code>{`${API_ENDPOINT}?month=5&year=2023`}</Paragraph>

          <Title level={5}>示例响应</Title>
          <pre className="response-example">
            {JSON.stringify([{
              "date": "2023-05-05",
              "solarTerm": "立夏",
              "healthTips": "立夏养生重在养心，注意情志调养...",
              "recommendedFoods": ["绿豆汤", "苦瓜", "藕"],
              "dos": ["早睡早起", "适当运动"],
              "donts": ["过度劳累", "暴饮暴食"]
            }], null, 2)}
          </pre>
        </Card>
      </div>
    </div>
  );
}

// 模拟数据
const mockHealthData = [
  {
    date: "2025-03-01",
    solarTerm: null,
    healthTips: "春季养生，注意保持情绪舒畅，适当增加户外活动。",
    recommendedFoods: ["春笋", "菠菜", "芹菜", "山药"],
    dos: ["早睡早起", "户外散步", "梳头按摩"],
    donts: ["过度劳累", "熬夜", "食用过于寒凉食物"]
  },
  {
    date: "2025-03-05",
    solarTerm: "惊蛰",
    healthTips: "惊蛰时节，阳气开始上升，注意保持心情舒畅，预防感冒。",
    recommendedFoods: ["韭菜", "春笋", "荠菜", "蜂蜜"],
    dos: ["适当运动", "早睡早起", "保持心情舒畅"],
    donts: ["过度劳累", "受凉", "情绪激动"]
  },
  {
    date: "2025-03-20",
    solarTerm: "春分",
    healthTips: "春分时节阴阳平衡，白昼与黑夜等长，此时养生应顺应阳气生发的特点。",
    recommendedFoods: ["春笋", "荠菜", "香椿", "枸杞"],
    dos: ["早睡早起", "适量运动", "保持心情愉悦"],
    donts: ["过度劳累", "暴饮暴食", "情绪波动大"]
  },
  {
    date: "2025-04-04",
    solarTerm: "清明",
    healthTips: "清明时节，气温回升，阳气升发，养生应着重于疏肝理气，调畅情志。",
    recommendedFoods: ["青团", "荠菜", "香椿", "薄荷茶"],
    dos: ["户外活动", "情志疏导", "均衡饮食"],
    donts: ["过度劳累", "情绪抑郁", "过食生冷"]
  }
];