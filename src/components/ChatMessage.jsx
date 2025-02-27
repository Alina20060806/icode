// src/components/ChatMessage.jsx
import React from 'react';
import { Card } from 'antd';
import './ChatMessage.css';

export default function ChatMessage({ text, isBot }) {
  return (
    <Card
      bordered={false}
      className={`message-card ${isBot ? 'bot' : 'user'}`}
      style={{ maxWidth: '85%' }}
    >
      <div className="message-text">
        {text.split('\n').map((line, i) => (
          <p key={i}>{line.trim()}</p>
        ))}
      </div>
    </Card>
  );
}