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
}

export default UserService