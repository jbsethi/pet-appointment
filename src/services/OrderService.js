import { by, get } from './CustomService'
import { ErrorWrapper, ResponseWrapper } from './utils.js'

class OrderService {
  static async getOrders () {
    try {
      const response = await get(`/orders`)

      return new ResponseWrapper(response, response.data)
    } catch (error) {
      throw new ErrorWrapper(error)
    }
  }

  static async getOrder ({ id = null }) {
    try {
      const response = await get(`/orders/${id}`)

      return new ResponseWrapper(response, response.data)
    } catch (error) {
      throw new ErrorWrapper(error)
    }
  }
}

export default OrderService