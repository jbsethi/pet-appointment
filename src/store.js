import { createStore } from "vuex" 
import AuthService from './services/AuthService.js'
import UserService from './services/UserService.js'
import PatientService from './services/PatientService.js'

const roleMap = {
  1: 'Super'
}

const store = createStore({
  state:{
    currentUser: {},
    currentRole: 'receiptionist'
  },

  mutations: {
    set (state, payload) {
      state[payload[0]] = payload[1]
    }
  },

  actions: {
    login ({ commit }, payload) {
      return new Promise(async (resolve, reject) => {
        try {
          const result = await AuthService.login(payload)

          commit('set', ['currentUser', result.data])
          commit('set', ['currentRole', roleMap[result.data.role.id]])

          resolve(result)
        } catch (error) {
          reject(error)
        }
      })
    },

    storeUser (_, payload) {
      return new Promise(async (resolve, reject) => {
        try {
          const result = await UserService.storeUser(payload)

          resolve(result)
        } catch (error) {
          reject(error)
        }
      })
    },

    getUsers (_) {
      return new Promise(async (resolve, reject) => {
        try {
          const result = await UserService.getAllUsers()

          resolve(result)
        } catch (error) {
          reject(error)
        }
      })
    },

    storePatientUser (_, payload) {
      return new Promise(async (resolve, reject) => {
        try {
          const result = await UserService.storePatientUser(payload)

          resolve(result)
        } catch (error) {
          reject(error)
        }
      })
    },

    getAllPatientUsers(_) {
      return new Promise(async (resolve, reject) => {
        try {
          const result = await UserService.getAllPatientUsers()

          resolve(result)
        } catch (error) {
          reject(error)
        }
      })
    },

    searchPatientUser (_, payload) {
      return new Promise(async (resolve, reject) => {
        try {
          const result = await UserService.searchPatientUsers(payload)

          resolve(result)
        } catch (error) {
          reject(error)
        }
      })
    },

    storeNewAppointmentRecord (_, payload) {
      return new Promise(async (resolve, reject) => {
        try {
          const result = await PatientService.storeNewAppointmentRecord(payload)

          resolve(result)
        } catch (error) {
          reject(error)
        }
      })
    },

    loadPatientPets (_, payload) {
      return new Promise(async (resolve, reject) => {
        try {
          const result = await PatientService.loadPatientPets(payload)

          resolve(result)
        } catch (error) {
          reject(error)
        }
      })
    },

    createPatientPet (_, payload) {
      return new Promise(async (resolve, reject) => {
        try {
          const result = await PatientService.createPatientPet(payload)

          resolve(result)
        } catch (error) {
          reject(error)
        }
      })
    },

    loadUserHistory (_, payload) {
      return new Promise(async (resolve, reject) => {
        try {
          const result = await PatientService.getPatientHistory(payload)

          resolve(result)
        } catch (error) {
          reject(error)
        }
      })
    },
  }
})

export default store