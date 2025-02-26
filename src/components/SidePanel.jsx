import React, { useState } from 'react'
import { Drawer, Upload, Button, Image, Spin, Alert } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import axios from 'axios'

export default function SidePanel({ open, onClose }) {
  const [imageUrl, setImageUrl] = useState(null)
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleUpload = (file) => {
    const isImage = file.type.startsWith('image/')
    const isLt2M = file.size / 1024 / 1024 < 2

    if (!isImage || !isLt2M) {
      setError(isImage ? '图片需小于2MB' : '请上传图片文件')
      return false
    }

    const reader = new FileReader()
    reader.onload = () => {
      setImageUrl(reader.result)
      setError(null)
      analyzeTongue(reader.result)
    }
    reader.readAsDataURL(file)
    return false
  }

  const analyzeTongue = (base64) => {
    setLoading(true)
    setTimeout(() => {
      setResult({
        quality: '舌质红',
        coating: '苔薄白',
        syndrome: '阴虚火旺',
        advice: '建议食用银耳百合粥，避免辛辣食物'
      })
      setLoading(false)
    }, 1500)
  }

  return (
    <Drawer
      title="AI舌诊分析"
      placement="right"
      width={400}
      open={open}
      onClose={onClose}
      maskClosable
    >
      <div className="side-panel">
        <Upload
          beforeUpload={handleUpload}
          showUploadList={false}
          accept="image/*"
        >
          <Button block icon={<UploadOutlined />} size="large">
            上传舌像
          </Button>
        </Upload>

        {error && <Alert message={error} type="error" style={{ marginTop: 15 }} />}

        <Spin spinning={loading} tip="分析中..." style={{ marginTop: 20 }}>
          {imageUrl && (
            <>
              <Image src={imageUrl} style={{ marginTop: 15, borderRadius: 4 }} />
              {result && (
                <div className="result-card">
                  <h3>分析报告</h3>
                  <p><strong>舌质：</strong>{result.quality}</p>
                  <p><strong>舌苔：</strong>{result.coating}</p>
                  <p><strong>辨证：</strong>{result.syndrome}</p>
                  <p><strong>建议：</strong>{result.advice}</p>
                </div>
              )}
            </>
          )}
        </Spin>
      </div>
    </Drawer>
  )
}