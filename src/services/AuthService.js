import axios from 'axios'
import { API_URL } from '../.env.js'
import { ErrorWrapper, ResponseWrapper } from './utils.js'

const roleMap = {
  1: 'super',
  2: 'administrator',
  3: 'doctor',
  4: 'receiptionist'
}

class AuthService {
  static async login ({ username, password }) {
    try {
      const response = await axios.post(`${API_URL}/authentication/login`,
        { username, password },
        { withCredentials: false })

        const responseData = _parseTokenData(response.data.token)

        _setAuthData({
          accessToken: response.data.token,
          exp: responseData.exp
        })

        console.log(responseData)

        localStorage.setItem('user', JSON.stringify(responseData))
        localStorage.setItem('role', roleMap[responseData.role.id])

      return new ResponseWrapper(response, responseData)
    } catch (error) {
      throw new ErrorWrapper(error)
    }
  }

  static setAccessToken (token) {
    localStorage.setItem('accessToken', token)
  }

  static removeAccessToken () {
    localStorage.removeItem('accessToken')
  }
  static removeUser () {
    localStorage.removeItem('user')
  }
  static removeRole () {
    localStorage.removeItem('role')
  }
}

function _parseTokenData (accessToken) {
  let payload = ''
  let tokenData = {}

  try {
    payload = accessToken.split('.')[1]
    tokenData = JSON.parse(atob(payload))
  } catch (error) {
    throw new Error(error)
  }

  return tokenData
}

function _setAuthData ({ accessToken } = {}) {
  AuthService.setAccessToken(accessToken)
}

export default AuthService