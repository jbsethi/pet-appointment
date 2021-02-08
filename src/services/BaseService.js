import axios from 'axios'
import { API_URL } from '../.env.js'

export const HTTP = axios.create({
  baseURL: API_URL,
  timeout: 7000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export function get (url) {
  addToken()
  return HTTP.get(url)
}

export function post (url, data) {
  addToken()
  return HTTP.post(url, data)
}

export function put (url, data) {
  addToken()
  return HTTP.put(url, data)
}

export function del (url) {
  addToken()
  return HTTP.delete(url)
}

function addToken () {
  const jwt = window.localStorage.getItem('accessToken') || ''
  if (jwt.length > 0) {
    HTTP.defaults.headers.common.Authorization = `Bearer ${jwt}`
  }
}