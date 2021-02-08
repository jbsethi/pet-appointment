import * as baseService from './BaseService.js'

export function by (url, data, id = null) {
  if (id) {
    return baseService.put(url + `/${id}`, data)
  } else {
    return baseService.post(url, data)
  }
}

export function get (url, id = null) {
  if (id) {
    return baseService.get(`${url}/${id}`)
  } else {
    return baseService.get(url)
  }
}

export function del (url, id) {
  return baseService.del(url + `/${id}`)
}