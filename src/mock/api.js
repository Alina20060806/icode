import axios from 'axios'

// 统一模拟接口
axios.interceptors.request.use(config => {
  // 舌诊分析接口
  if (config.url.includes('/analyze-tongue')) {
    return Promise.resolve({
      data: {
        quality: '舌质红',
        coating: '苔薄白',
        syndrome: '阴虚火旺',
        advice: '建议多食滋阴食物'
      }
    })
  }
  return config
})