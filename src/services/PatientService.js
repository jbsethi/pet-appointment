import { by, get } from './CustomService'
import { ErrorWrapper, ResponseWrapper } from './utils.js'

class PatientService {
  static async storeNewAppointmentRecord ({ record, id = null }) {
    try {
      const response = await by(`/orders`, record, id)

      return new ResponseWrapper(response, response.data)
    } catch (error) {
      throw new ErrorWrapper(error)
    }
  }

  static async loadPatientPets (payload) {
    try {
      const response = await by(`/pets/all/patients`, payload)

      return new ResponseWrapper(response, response.data)
    } catch (error) {
      throw new ErrorWrapper(error)
    }
  }

  static async createPatientPet ({ pet, id = null }) {
    try {
      const response = await by(`/pets`, pet, id)

      return new ResponseWrapper(response, response.data)
    } catch (error) {
      throw new ErrorWrapper(error)
    }
  }

  static async addPetTreatmentHistory ({ data, id = null }) {
    try {
      const response = await by(`/treatments`, data, id)

      return new ResponseWrapper(response, response.data)
    } catch (error) {
      throw new ErrorWrapper(error)
    }
  }

  static async loadPetDoctorHistory (query) {
    try {
      const response = await by(`/treatments/all/pets`, query)

      return new ResponseWrapper(response, response.data)
    } catch (error) {
      throw new ErrorWrapper(error)
    }
  }

  static async getPatientHistory ({ search }) {
    try {
      const response = await get(`/orders?search=${search}`)

      return new ResponseWrapper(response, response.data)
    } catch (error) {
      throw new ErrorWrapper(error)
    }
  }
}

export default PatientService