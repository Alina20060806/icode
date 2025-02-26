import React from 'react'
import { Card } from 'antd'

export default function ChatMessage({ text, isBot }) {
  return (
    <div className={`message-wrapper ${isBot ? 'bot' : 'user'}`}>
      <Card
        bordered={false}
        className={`message-card ${isBot ? 'bot' : 'user'}`}
      >
        <div className="message-text">
          {text.split('\n').map((line, i) => (
            <p key={i}>{line}</p>
          ))}
        </div>
      </Card>
    </div>
  )
}