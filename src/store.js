import { createStore } from "vuex" 
import AuthService from './services/AuthService.js'
import UserService from './services/UserService.js'
import PatientService from './services/PatientService.js'
import OrderService from './services/OrderService.js'

const roleMap = {
  1: 'super',
  2: 'administrator',
  3: 'doctor',
  4: 'receiptionist'
}

const store = createStore({
  state:{
    currentUser: JSON.parse(localStorage.getItem('user')) || null,
    currentRole: localStorage.getItem('role') || null
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

    async logout ({ commit }) {
      return new Promise(async (resolve, reject) => {
        try {
          AuthService.removeAccessToken()
          AuthService.removeUser()
          AuthService.removeRole()

          commit('set', ['currentUser', {}])
          commit('set', ['currentRole', ''])

          resolve(true)
        } catch (_) {
          reject(false)
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

    getAllPatientUsers({ state }) {
      return new Promise(async (resolve, reject) => {
        try {
          const role = state.currentRole
          console.log(role)
          let result
          if (role == 'doctor') {
            result = await UserService.getAllTodayAppointments()

            result.data.rows = result.data.rows.map(row => {
              return { ...row.Patient, orderId: row.id }
            })


          } else {
            result = await UserService.getAllPatientUsers()
          }

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

    addPetTreatmentHistory (_, payload) {
      return new Promise(async (resolve, reject) => {
        try {
          const result = await PatientService.addPetTreatmentHistory(payload)

          resolve(result)
        } catch (error) {
          reject(error)
        }
      })
    },

    loadPetDoctorHistory (_, payload) {
      return new Promise(async (resolve, reject) => {
        try {
          const result = await PatientService.loadPetDoctorHistory(payload)

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

    getOrders (_) {
      return new Promise(async (resolve, reject) => {
        try {
          const result = await OrderService.getOrders()

          resolve(result)
        } catch (error) {
          reject(error)
        }
      })
    }
  },
})

export default store