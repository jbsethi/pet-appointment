import { by, get } from './CustomService'
import { ErrorWrapper, ResponseWrapper } from './utils.js'

class UserService {
  static async storeUser ({ user, id = null }) {
    try {
      const response = await by(`/users`, user, id)

      return new ResponseWrapper(response, response.data)
    } catch (error) {
      throw new ErrorWrapper(error)
    }
  }

  static async getAllUsers () {
    try {
      const response = await get(`/users`)

      return new ResponseWrapper(response, response.data)
    } catch (error) {
      throw new ErrorWrapper(error)
    }
  }

  static async storePatientUser ({ user, id = null }) {
    try {
      const response = await by(`/patients`, user, id)

      return new ResponseWrapper(response, response.data)
    } catch (error) {
      throw new ErrorWrapper(error)
    }
  }

  static async getAllPatientUsers () {
    try {
      const response = await get(`/patients`)

      return new ResponseWrapper(response, response.data)
    } catch (error) {
      throw new ErrorWrapper(error)
    }
  }

  static async getAllTodayAppointments () {
    try {
      const appointment = 1
      let date = new Date()
      date = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`

      const response = await get(`/orders?appointment=${appointment}&date=${date}`)

      return new ResponseWrapper(response, response.data)
    } catch (error) {
      throw new ErrorWrapper(error)
    }
  }

  static async searchPatientUsers ({ query }) {
    try {
      const response = await get(`/patients?search=${query}`)

      return new ResponseWrapper(response, response.data)
    } catch (error) {
      throw new ErrorWrapper(error)
    }
  }
}

export default UserService