// src/components/PrescriptionFood.jsx
import React, { useState, useEffect } from 'react';
import {
  Input, Button, Card, Typography, Divider, Tag, Table,
  Empty, Spin, Alert, List, Tabs, Collapse, Space, Row, Col
} from 'antd';
import { SearchOutlined, ExperimentOutlined, HistoryOutlined, FilterOutlined } from '@ant-design/icons';
import axios from 'axios';
import './PrescriptionFood.css';

const { Title, Paragraph, Text } = Typography;
const { Search } = Input;
const { TabPane } = Tabs;
const { Panel } = Collapse;

// API接口地址（这里只是示例，实际使用时需要替换为真实的API地址）
const API_ENDPOINT = '/api/prescription-food';

export default function PrescriptionFood() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [activeTab, setActiveTab] = useState('1');
  const [selectedPrescription, setSelectedPrescription] = useState(null);
  const [recentSearches, setRecentSearches] = useState([]);

  // 模拟搜索经方饮食
  const handleSearch = async (value) => {
    setSearchTerm(value);
    if (!value.trim()) return;

    setLoading(true);
    setError(null);

    try {
      // 在实际应用中，应该是从API获取数据
      // const response = await axios.get(`${API_ENDPOINT}?query=${value}`);
      // setSearchResults(response.data);

      // 模拟API调用
      setTimeout(() => {
        const filtered = mockPrescriptions.filter(
          p => p.name.includes(value) ||
               p.description.includes(value) ||
               p.ingredients.some(i => i.name.includes(value))
        );
        setSearchResults(filtered);

        // 添加到最近搜索
        if (!recentSearches.includes(value)) {
          setRecentSearches(prev => [value, ...prev].slice(0, 5));
        }

        setLoading(false);
      }, 800);
    } catch (err) {
      setError('搜索失败，请稍后再试');
      setLoading(false);
    }
  };

  // 选择经方
  const handleSelectPrescription = (prescription) => {
    setSelectedPrescription(prescription);
    setActiveTab('2'); // 切换到详情标签页
  };

  // 使用最近搜索
  const handleUseRecentSearch = (term) => {
    setSearchTerm(term);
    handleSearch(term);
  };

  // 搜索结果渲染
  const renderSearchResults = () => {
    if (loading) {
      return <Spin tip="搜索中..." />;
    }

    if (error) {
      return <Alert message={error} type="error" showIcon />;
    }

    if (searchResults.length === 0 && searchTerm) {
      return <Empty description="没有找到相关经方食谱" />;
    }

    return (
      <List
        itemLayout="vertical"
        dataSource={searchResults}
        renderItem={item => (
          <List.Item
            key={item.id}
            onClick={() => handleSelectPrescription(item)}
            className="prescription-item"
            actions={[
              <Space>
                <Text type="secondary">分类:</Text>
                {item.categories.map(cat => (
                  <Tag color="blue" key={cat}>{cat}</Tag>
                ))}
              </Space>,
              <Space>
                <Text type="secondary">功效:</Text>
                {item.effects.map(effect => (
                  <Tag color="green" key={effect}>{effect}</Tag>
                ))}
              </Space>
            ]}
          >
            <List.Item.Meta
              title={<a href="#" onClick={(e) => e.preventDefault()}>{item.name}</a>}
              description={item.description}
            />
            <div className="ingredients-preview">
              <Text type="secondary">主要食材: </Text>
              {item.ingredients.slice(0, 3).map(ing => ing.name).join('、')}
              {item.ingredients.length > 3 && '...'}
            </div>
          </List.Item>
        )}
      />
    );
  };

  // 渲染经方详情
  const renderPrescriptionDetail = () => {
    if (!selectedPrescription) {
      return <Empty description="请先从搜索结果中选择一个经方食谱" />;
    }

    const { name, description, source, categories, effects, ingredients, preparation, usage, notes } = selectedPrescription;

    return (
      <div className="prescription-detail">
        <Card className="detail-card">
          <Title level={3}>{name}</Title>
          <Paragraph className="description">{description}</Paragraph>

          <Divider orientation="left">分类与功效</Divider>
          <Row gutter={16}>
            <Col span={12}>
              <Text strong>分类: </Text>
              <div className="tag-container">
                {categories.map(cat => (
                  <Tag color="blue" key={cat}>{cat}</Tag>
                ))}
              </div>
            </Col>
            <Col span={12}>
              <Text strong>功效: </Text>
              <div className="tag-container">
                {effects.map(effect => (
                  <Tag color="green" key={effect}>{effect}</Tag>
                ))}
              </div>
            </Col>
          </Row>

          <Divider orientation="left">食材配方</Divider>
          <Table
            dataSource={ingredients}
            rowKey="name"
            pagination={false}
            size="small"
            className="ingredients-table"
            columns={[
              {
                title: '名称',
                dataIndex: 'name',
                key: 'name',
                width: '30%',
              },
              {
                title: '用量',
                dataIndex: 'amount',
                key: 'amount',
                width: '20%',
              },
              {
                title: '功效',
                dataIndex: 'effect',
                key: 'effect',
                ellipsis: true,
              },
            ]}
          />

          <Divider orientation="left">制作方法</Divider>
          <Collapse defaultActiveKey={['1']} className="preparation-collapse">
            <Panel header="详细步骤" key="1">
              <ol className="preparation-steps">
                {preparation.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ol>
            </Panel>
          </Collapse>

          <Divider orientation="left">食用方法</Divider>
          <Paragraph>{usage}</Paragraph>

          {notes && (
            <>
              <Divider orientation="left">注意事项</Divider>
              <Alert message={notes} type="warning" showIcon />
            </>
          )}

          <Divider orientation="left">参考来源</Divider>
          <Paragraph className="source-text">
            <HistoryOutlined /> {source}
          </Paragraph>
        </Card>
      </div>
    );
  };

  // 渲染API文档
  const renderApiDocumentation = () => {
    return (
      <div className="api-documentation">
        <Card title="经方饮食查询 API 接口文档">
          <Title level={5}>接口地址</Title>
          <Paragraph code>{API_ENDPOINT}</Paragraph>

          <Title level={5}>请求方式</Title>
          <Paragraph>GET</Paragraph>

          <Title level={5}>参数说明</Title>
          <Table
            pagination={false}
            size="small"
            dataSource={[
              {
                param: 'query',
                required: '否',
                type: 'string',
                description: '搜索关键词，可以是经方名称、功效、食材等'
              },
              {
                param: 'category',
                required: '否',
                type: 'string',
                description: '按分类筛选，如"补气"、"养阴"等'
              },
              {
                param: 'effect',
                required: '否',
                type: 'string',
                description: '按功效筛选，如"健脾"、"益气"等'
              },
              {
                param: 'id',
                required: '否',
                type: 'number',
                description: '根据ID获取特定经方饮食的详细信息'
              }
            ]}
            columns={[
              {
                title: '参数名',
                dataIndex: 'param',
                key: 'param',
              },
              {
                title: '必填',
                dataIndex: 'required',
                key: 'required',
              },
              {
                title: '类型',
                dataIndex: 'type',
                key: 'type',
              },
              {
                title: '说明',
                dataIndex: 'description',
                key: 'description',
              },
            ]}
          />

          <Title level={5}>返回数据格式</Title>
          <Paragraph>JSON 数组或对象，包含经方饮食信息</Paragraph>

          <Title level={5}>示例请求</Title>
          <Paragraph code>{`${API_ENDPOINT}?query=参芪`}</Paragraph>

          <Title level={5}>示例响应</Title>
          <pre className="response-example">
            {JSON.stringify([{
              "id": 1,
              "name": "参芪鸡汤",
              "description": "补气养血的经典食疗方",
              "categories": ["补气", "养血"],
              "effects": ["益气", "健脾", "养血"]
            }], null, 2)}
          </pre>
        </Card>
      </div>
    );
  };

  return (
    <div className="prescription-food-container">
      <div className="prescription-header">
        <Title level={2}>经方饮食查询</Title>
        <Paragraph>
          基于中医经典方剂理论的食疗方案，为您提供日常养生保健的饮食指导
        </Paragraph>
        <Divider />
      </div>

      <div className="search-section">
        <Search
          placeholder="搜索经方名称、功效或食材..."
          allowClear
          enterButton={<><SearchOutlined /> 搜索</>}
          size="large"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onSearch={handleSearch}
          className="search-input"
        />

        {recentSearches.length > 0 && (
          <div className="recent-searches">
            <Text type="secondary">最近搜索: </Text>
            {recentSearches.map((term, index) => (
              <Tag
                key={index}
                className="recent-tag"
                onClick={() => handleUseRecentSearch(term)}
              >
                {term}
              </Tag>
            ))}
          </div>
        )}
      </div>

      <Tabs activeKey={activeTab} onChange={setActiveTab} className="main-tabs">
        <TabPane
          tab={<span><SearchOutlined />搜索结果</span>}
          key="1"
        >
          <div className="results-container">
            {renderSearchResults()}
          </div>
        </TabPane>

        <TabPane
          tab={<span><ExperimentOutlined />经方详情</span>}
          key="2"
          disabled={!selectedPrescription}
        >
          {renderPrescriptionDetail()}
        </TabPane>

        <TabPane
          tab={<span><FilterOutlined />API接口</span>}
          key="3"
        >
          {renderApiDocumentation()}
        </TabPane>
      </Tabs>
    </div>
  );
}

// 模拟经方饮食数据
const mockPrescriptions = [
  {
    id: 1,
    name: "参芪鸡汤",
    description: "人参黄芪鸡汤是一道传统的药膳，具有补气养血、健脾益肺的功效，适合气血两虚、面色萎黄、乏力食少等症状的人群。",
    source: "《食疗本草》",
    categories: ["补气", "养血"],
    effects: ["补气", "健脾", "益肺"],
    ingredients: [
      { name: "人参", amount: "10克", effect: "大补元气，复脉固脱" },
      { name: "黄芪", amount: "20克", effect: "补气固表，利水消肿" },
      { name: "鸡肉", amount: "500克", effect: "补气养血，温中健脾" },
      { name: "枸杞", amount: "15克", effect: "滋补肝肾，益精明目" },
      { name: "大枣", amount: "5枚", effect: "补脾和胃，益气生津" }
    ],
    preparation: [
      "鸡肉洗净，切块，焯水去血水",
      "人参、黄芪洗净，用纱布包好",
      "锅中加入适量清水，放入鸡肉和药包",
      "大火煮沸后转小火炖煮1.5小时",
      "加入枸杞和大枣，继续炖煮30分钟",
      "加入适量盐调味即可"
    ],
    usage: "每日1次，连服7-10天为一疗程，适合气虚体质的人长期食用。",
    notes: "阴虚火旺、实热症状者慎用，服用期间应避免辛辣刺激性食物。"
  },
  {
    id: 2,
    name: "四神汤",
    description: "四神汤是一道传统的养生汤品，由四种具有健脾益气功效的食材组成，对脾胃虚弱、腹泻、消化不良有良好的调理作用。",
    source: "《本草纲目》",
    categories: ["健脾", "益气"],
    effects: ["健脾", "止泻", "养胃"],
    ingredients: [
      { name: "淮山药", amount: "30克", effect: "补脾养胃，滋肾益精" },
      { name: "茯苓", amount: "15克", effect: "利水渗湿，健脾宁心" },
      { name: "莲子", amount: "20克", effect: "补脾止泻，养心安神" },
      { name: "芡实", amount: "15克", effect: "固肾补脾，止泻止带" },
      { name: "瘦肉", amount: "100克", effect: "补充蛋白质，增强营养" }
    ],
    preparation: [
      "所有食材洗净，莲子去芯",
      "将淮山药、茯苓、莲子、芡实和瘦肉放入锅中",
      "加入适量清水，大火煮沸",
      "转小火慢炖2小时",
      "加入适量盐调味即可"
    ],
    usage: "早晚各一碗，空腹食用效果最佳，长期食用可健脾养胃。",
    notes: "体热者应减少食用次数，怀孕初期慎用莲子。"
  },
  {
    id: 3,
    name: "当归生姜羊肉汤",
    description: "当归生姜羊肉汤是一道温补气血的经典食疗，特别适合寒冬时节食用，对于手脚冰凉、畏寒怕冷的虚寒体质人群尤为适宜。",
    source: "《金匮要略》",
    categories: ["温补", "养血"],
    effects: ["温中散寒", "补血", "活血"],
    ingredients: [
      { name: "当归", amount: "10克", effect: "补血活血，调经止痛" },
      { name: "生姜", amount: "30克", effect: "温中散寒，解表发汗" },
      { name: "羊肉", amount: "500克", effect: "温中补虚，滋养气血" },
      { name: "葱白", amount: "3根", effect: "发汗解表，温通阳气" },
      { name: "黄酒", amount: "适量", effect: "活血行气，温经散寒" }
    ],
    preparation: [
      "羊肉洗净，切块，焯水去血水",
      "当归洗净，生姜切片，葱白切段",
      "锅中加入适量清水，放入羊肉、当归、生姜",
      "大火煮沸后转小火炖煮1.5小时",
      "加入葱白和黄酒，继续炖煮30分钟",
      "加入适量盐调味即可"
    ],
    usage: "每周2-3次，每次一碗，冬季食用尤佳，有温补气血、驱寒暖胃的功效。",
    notes: "阴虚火旺、高血压患者慎用，服用期间应避免生冷食物。"
  },
  {
    id: 4,
    name: "百合莲子粥",
    description: "百合莲子粥是一道滋阴清热、安神的食疗方，特别适合心烦失眠、口干舌燥、虚热盗汗等阴虚内热症状的人群。",
    source: "《饮膳正要》",
    categories: ["滋阴", "清热"],
    effects: ["滋阴", "清热", "安神"],
    ingredients: [
      { name: "百合", amount: "30克", effect: "养阴润肺，清心安神" },
      { name: "莲子", amount: "30克", effect: "补脾止泻，养心安神" },
      { name: "粳米", amount: "100克", effect: "健脾和胃，补中益气" },
      { name: "冰糖", amount: "适量", effect: "润肺止咳，和胃生津" }
    ],
    preparation: [
      "百合、莲子提前浸泡4小时，莲子去芯",
      "粳米淘洗干净",
      "锅中加入适量清水，放入粳米煮至半熟",
      "加入百合、莲子继续煮至粥稠",
      "加入冰糖调味即可"
    ],
    usage: "早晚各一碗，连续食用7-10天为一疗程，适合失眠多梦、心烦不安的人群。",
    notes: "脾胃虚寒、腹泻者慎用，不宜与辛辣刺激性食物同食。"
  },
  {
    id: 5,
    name: "薏米红豆粥",
    description: "薏米红豆粥是一道健脾利湿的传统食疗，对湿热困脾、水肿浮肿、关节疼痛等症状有良好的调理作用。",
    source: "《本草求真》",
    categories: ["健脾", "利湿"],
    effects: ["健脾", "利湿", "清热"],
    ingredients: [
      { name: "薏米", amount: "50克", effect: "利水渗湿，健脾去湿" },
      { name: "红豆", amount: "30克", effect: "利水消肿，解毒排脓" },
      { name: "糯米", amount: "30克", effect: "补脾益胃，滋养强壮" },
      { name: "陈皮", amount: "5克", effect: "理气健脾，燥湿化痰" }
    ],
    preparation: [
      "薏米、红豆提前浸泡4小时",
      "糯米淘洗干净",
      "锅中加入适量清水，放入所有材料",
      "大火煮沸后转小火煮至粥稠",
      "加入适量冰糖或蜂蜜调味即可"
    ],
    usage: "每日1-2次，早晨空腹食用效果最佳，适合湿热体质长期食用。",
    notes: "体质虚寒、脾胃虚弱的人群不宜过量食用，孕妇慎用。"
  }
];