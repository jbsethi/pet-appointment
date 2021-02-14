export const BASE_PROTOCOL = process.env.VUE_APP_PROTOCOL || 'http'
export const BASE_URL = process.env.VUE_APP_BASE_URL || '69ba189c199d.ngrok.io'

export const API_URL = `${BASE_PROTOCOL}://${BASE_URL}/api`