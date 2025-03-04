// src/components/HerbGallery.jsx
import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Image, Typography, Divider, Tag, Input, Select, Spin } from 'antd';
import './HerbGallery.css';

const { Title, Paragraph } = Typography;
const { Search } = Input;
const { Option } = Select;

export default function HerbGallery() {
  const [loading, setLoading] = useState(false);
  const [herbs, setHerbs] = useState([]);
  const [filteredHerbs, setFilteredHerbs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  // 模拟获取药材数据
  useEffect(() => {
    setLoading(true);
    // 在实际应用中，这里应该是从API获取数据
    setTimeout(() => {
      setHerbs(herbData);
      setFilteredHerbs(herbData);
      setLoading(false);
    }, 1000);
  }, []);

  // 搜索和筛选功能
  useEffect(() => {
    const results = herbs.filter(herb => {
      const matchesSearch = herb.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           herb.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = filterType === 'all' || herb.type === filterType;
      return matchesSearch && matchesType;
    });
    setFilteredHerbs(results);
  }, [searchTerm, filterType, herbs]);

  const handleSearch = value => {
    setSearchTerm(value);
  };

  const handleTypeChange = value => {
    setFilterType(value);
  };

  return (
    <div className="herb-gallery">
      <div className="herb-header">
        <Title level={2}>中药材库</Title>
        <Paragraph>查询常用中药材的功效与应用</Paragraph>
        <Divider />
      </div>

      <div className="herb-filters">
        <Row gutter={16} align="middle">
          <Col xs={24} sm={16} md={12} lg={12}>
            <Search
              placeholder="搜索中药名称或功效..."
              onSearch={handleSearch}
              onChange={e => setSearchTerm(e.target.value)}
              style={{ width: '100%' }}
            />
          </Col>
          <Col xs={24} sm={8} md={6} lg={6}>
            <Select
              defaultValue="all"
              style={{ width: '100%' }}
              onChange={handleTypeChange}
            >
              <Option value="all">全部类别</Option>
              <Option value="补气">补气类</Option>
              <Option value="补血">补血类</Option>
              <Option value="补阴">补阴类</Option>
              <Option value="补阳">补阳类</Option>
              <Option value="清热">清热类</Option>
              <Option value="解表">解表类</Option>
              <Option value="祛湿">祛湿类</Option>
              <Option value="活血">活血类</Option>
              <Option value="安神">安神类</Option>
              <Option value="消食">消食类</Option>
            </Select>
          </Col>
        </Row>
      </div>

      <Spin spinning={loading} tip="加载中...">
        <Row gutter={[16, 16]} className="herb-grid">
          {filteredHerbs.map(herb => (
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
      </Spin>

      {filteredHerbs.length === 0 && !loading && (
        <div className="no-results">
          <Paragraph>未找到匹配的中药材，请尝试其他关键词</Paragraph>
        </div>
      )}
    </div>
  );
}

// 完整的中药材数据
const herbData = [
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
  },
  {
    id: 5,
    name: "熟地黄",
    image: "/api/placeholder/300/200",
    description: "补血滋阴，益精填髓。用于血虚萎黄，心悸怔忡，月经不调，眩晕耳鸣，内热消渴，阴虚潮热，盗汗遗精，腰膝酸软。",
    type: "补血",
    tags: ["补血", "滋阴", "益精"]
  },
  {
    id: 6,
    name: "白芍",
    image: "/api/placeholder/300/200",
    description: "养血敛阴，柔肝止痛，平抑肝阳。用于血虚萎黄，月经不调，崩漏，自汗，盗汗，胁痛腹痛，四肢挛痛，头痛眩晕。",
    type: "补血",
    tags: ["养血", "敛阴", "止痛"]
  },
  {
    id: 7,
    name: "川芎",
    image: "/api/placeholder/300/200",
    description: "活血行气，祛风止痛。用于月经不调，经闭痛经，症瘕腹痛，胸胁刺痛，跌打损伤，头痛，风湿痹痛。",
    type: "活血",
    tags: ["活血", "行气", "祛风"]
  },
  {
    id: 8,
    name: "人参",
    image: "/api/placeholder/300/200",
    description: "大补元气，复脉固脱，益气摄血，安神益智。用于体虚欲脱，肢冷脉微，气虚乏力，脾虚食少，肺虚喘咳，津伤口渴，内热消渴，久病虚羸，惊悸失眠，阳痿宫冷。",
    type: "补气",
    tags: ["补气", "固脱", "安神"]
  },
  {
    id: 9,
    name: "黄连",
    image: "/api/placeholder/300/200",
    description: "清热燥湿，泻火解毒。用于湿热痞满，呕吐吞酸，泻痢，黄疸，高热神昏，心火亢盛，心烦不寐，血热吐衄，目赤，牙痛，消渴，痈肿疔疮。",
    type: "清热",
    tags: ["清热", "燥湿", "泻火"]
  },
  {
    id: 10,
    name: "黄芩",
    image: "/api/placeholder/300/200",
    description: "清热燥湿，泻火解毒，止血，安胎。用于湿温，湿热痞满，泻痢，黄疸，肺热咳嗽，高热烦渴，血热吐衄，痈肿疮毒，胎动不安。",
    type: "清热",
    tags: ["清热", "燥湿", "解毒"]
  },
  {
    id: 11,
    name: "柴胡",
    image: "/api/placeholder/300/200",
    description: "和解表里，疏肝解郁，升阳举陷。用于感冒发热，寒热往来，疟疾，肝郁气滞，胸胁胀痛，月经不调，子宫脱垂，脱肛，慢性腹泻。",
    type: "解表",
    tags: ["和解", "疏肝", "升阳"]
  },
  {
    id: 12,
    name: "桂枝",
    image: "/api/placeholder/300/200",
    description: "发汗解表，温通经脉，助阳化气。用于风寒感冒，恶寒发热，头痛无汗，阳虚四肢厥冷，痛经经闭，风湿痹痛，痰饮，水肿，心悸，腹中冷痛。",
    type: "解表",
    tags: ["发汗", "温通", "助阳"]
  },
  {
    id: 13,
    name: "白芷",
    image: "/api/placeholder/300/200",
    description: "发散风寒，通窍止痛，燥湿止带。用于风寒感冒，头痛，鼻塞流涕，鼻渊，牙痛，风湿痹痛，痈疽肿毒，湿疹湿疮，白带过多。",
    type: "解表",
    tags: ["发散", "通窍", "燥湿"]
  },
  {
    id: 14,
    name: "茯苓",
    image: "/api/placeholder/300/200",
    description: "利水渗湿，健脾，安神。用于水肿尿少，痰饮眩悸，脾虚食少，便溏泄泻，心神不安，惊悸失眠。",
    type: "祛湿",
    tags: ["利水", "健脾", "安神"]
  },
  {
    id: 15,
    name: "泽泻",
    image: "/api/placeholder/300/200",
    description: "利水渗湿，泄热，利尿通淋。用于小便不利，水肿胀满，痰饮眩晕，暑湿吐泻，热淋涩痛。",
    type: "祛湿",
    tags: ["利水", "泄热", "利尿"]
  },
  {
    id: 16,
    name: "丹参",
    image: "/api/placeholder/300/200",
    description: "活血祛瘀，通经止痛，清心除烦，凉血消痈。用于胸痹心痛，脑血管疾病，肝脾肿大，月经不调，痛经经闭，疮疡肿痛，肋痛，烫伤。",
    type: "活血",
    tags: ["活血", "祛瘀", "止痛"]
  },
  {
    id: 17,
    name: "赤芍",
    image: "/api/placeholder/300/200",
    description: "清热凉血，散瘀止痛。用于热入营血，温毒发斑，吐血衄血，目赤肿痛，肝郁胁痛，经闭痛经，跌扑损伤，痈肿疮毒。",
    type: "活血",
    tags: ["清热", "散瘀", "止痛"]
  },
  {
    id: 18,
    name: "酸枣仁",
    image: "/api/placeholder/300/200",
    description: "养心安神，敛汗，生津。用于虚烦不眠，惊悸多梦，体虚多汗，津伤口渴。",
    type: "安神",
    tags: ["养心", "安神", "敛汗"]
  },
  {
    id: 19,
    name: "远志",
    image: "/api/placeholder/300/200",
    description: "安神益智，祛痰，消肿。用于心神不安，失眠多梦，健忘惊悸，神志恍惚，痰多咳嗽，乳痈肿痛。",
    type: "安神",
    tags: ["安神", "益智", "祛痰"]
  },
  {
    id: 20,
    name: "山药",
    image: "/api/placeholder/300/200",
    description: "补脾养胃，生津益肺，补肾涩精。用于脾虚食少，久泻不止，肺虚咳嗽，肾虚遗精，带下，尿频，虚热消渴。",
    type: "补气",
    tags: ["补脾", "益肺", "补肾"]
  },
  {
    id: 21,
    name: "陈皮",
    image: "/api/placeholder/300/200",
    description: "理气健脾，燥湿化痰。用于胸胁胀满，食少吐泻，咳嗽痰多。",
    type: "消食",
    tags: ["理气", "健脾", "化痰"]
  },
  {
    id: 22,
    name: "山楂",
    image: "/api/placeholder/300/200",
    description: "消食化积，行气散瘀。用于肉食积滞，胃脘胀满，泻痢腹痛，瘀血疼痛，高脂血症。",
    type: "消食",
    tags: ["消食", "散瘀", "行气"]
  },
  {
    id: 23,
    name: "麦冬",
    image: "/api/placeholder/300/200",
    description: "养阴生津，润肺清心。用于肺燥干咳，阴虚痨嗽，喉痹咽痛，津伤口渴，内热消渴，心烦失眠，肠燥便秘。",
    type: "补阴",
    tags: ["养阴", "生津", "润肺"]
  },
  {
    id: 24,
    name: "石斛",
    image: "/api/placeholder/300/200",
    description: "养阴生津，益胃，清热明目。用于阴虚发热，骨蒸劳热，胃阴不足，干呕口渴，目暗不明。",
    type: "补阴",
    tags: ["养阴", "益胃", "明目"]
  },
  {
    id: 25,
    name: "肉苁蓉",
    image: "/api/placeholder/300/200",
    description: "补肾阳，益精血，润肠通便。用于阳痿不育，腰膝酸软，筋骨无力，肠燥便秘。",
    type: "补阳",
    tags: ["补肾", "益精", "润肠"]
  },
  {
    id: 26,
    name: "巴戟天",
    image: "/api/placeholder/300/200",
    description: "补肾阳，强筋骨，祛风湿，止痹痛。用于肾阳不足，阳痿遗精，宫冷不孕，腰膝冷痛，风湿痹痛。",
    type: "补阳",
    tags: ["补肾", "强筋", "祛风"]
  },
  {
    id: 27,
    name: "大黄",
    image: "/api/placeholder/300/200",
    description: "泻下攻积，清热泻火，凉血解毒，活血祛瘀。用于实热便秘，积滞腹痛，血热吐衄，目赤，咽肿，疮疡肿毒，瘀血经闭，癓瘕腹痛。",
    type: "清热",
    tags: ["泻下", "清热", "活血"]
  },
  {
    id: 28,
    name: "甘草",
    image: "/api/placeholder/300/200",
    description: "补脾益气，清热解毒，祛痰止咳，缓急止痛，调和诸药。用于脾胃虚弱，倦怠乏力，心悸气短，咳嗽痰多，脘腹、四肢挛急疼痛，痈肿疮毒，缓解药物毒性。",
    type: "补气",
    tags: ["补脾", "解毒", "调和"]
  },
  {
    id: 29,
    name: "连翘",
    image: "/api/placeholder/300/200",
    description: "清热解毒，消肿散结，疏散风热。用于温热病发热，温毒发斑，热毒疮疡，瘰疬痰核。咽喉肿痛，目赤肿痛，疔疮肿毒。",
    type: "清热",
    tags: ["清热", "解毒", "散结"]
  },
  {
    id: 30,
    name: "枸杞子",
    image: "/api/placeholder/300/200",
    description: "滋补肝肾，益精明目。用于虚劳精亏，腰膝酸痛，眩晕耳鸣，内热消渴，血虚萎黄，目昏不明。",
    type: "补阴",
    tags: ["滋补", "益精", "明目"]
  }
];