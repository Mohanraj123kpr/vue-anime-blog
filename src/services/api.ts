import axios from 'axios'

let token: string

const TOKEN_API = 'https://swsut62sse.execute-api.ap-south-1.amazonaws.com/prod/generateToken'
const CONTENT_API = 'https://tzab40im77.execute-api.ap-south-1.amazonaws.com/prod/getContent'

const api = axios.create({
  baseURL: CONTENT_API,
})

export const login = async (email: string): Promise<string> => {
  try {
    const response = await axios.post(TOKEN_API, { email })
    token = response.data.token
    return token
  } catch (error) {
    console.error('Token generation failed', error)
    throw error
  }
}

export const fetchContent = async () => {
  if (!token) {
    throw new Error('Token is Expired, please generate a new token')
  }

  return api.get('/content', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}
