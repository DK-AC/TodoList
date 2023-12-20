import axios from 'axios'

export const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.1/',
  withCredentials: true,
  headers: {
    'API-KEY': 'eb10d690-8b76-4a31-ab08-f6f85aa64f03'
  }
});