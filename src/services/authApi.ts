// src/services/authApi.ts
import api from '@/api' // твой axios instance с baseURL

export const authApi = {
  async sendCode(email: string, name: string, siteUrl: string = 'https://votevibe.club') {
    return api.post('/auth/send-code', { email, name, siteUrl })
  },

  async verifyCode(email: string, code: string) {
    return api.post('/auth/verify-code', { email, code }, {
      withCredentials: true, // КЛЮЧЕВОЕ! Чтобы кука прилетела
    })
  },
}