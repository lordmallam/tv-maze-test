import { API_URL } from './constants'
import { NotFoundError, HTTPError } from './errors'

const methods = ['get', 'post', 'put', 'patch', 'delete']

export default class ApiClient {
  constructor () {
    methods.forEach(method => {
      this[method] = (path, headers, { params, data } = {}) => {
        const appendParams = (path, params) => {
          if (!params || Object.keys(params).length === 0) {
            return path
          }

          const queryString = Object.keys(params)
            .filter(key => (
              params[key] !== undefined &&
              params[key] !== null &&
              params[key].toString().trim() !== ''
            ))
            .map(key => [encodeURIComponent(key), encodeURIComponent(params[key])])
            .map(([name, value]) => `${name}=${value}`)
            .join('&')

          if (queryString === '') {
            return path
          }

          return path + (path.includes('?') ? '&' : '?') + queryString
        }

        const options = {
          method,
          headers: headers,
          mode: 'cors',
          body: JSON.stringify(data)
        }
        path = appendParams(path, params)

        const url = `${API_URL}${path}`

        return new Promise((resolve, reject) => {
          fetch(url, options)
            .then(response => {
              if (response.ok) {
                // `DELETE` method returns a 204 status code without response content
                if (response.status === 204) {
                  return resolve() // NO-CONTENT response
                }

                return response.json()
                  .then(content => { resolve(content) })
                  // Should be extended to cater for content-types other than json
                  .catch(error => { reject(error) })
              } else {
                const defaultError = new HTTPError(response.statusText, response, response.status)

                if (response.status === 404) {
                  return reject(new NotFoundError('Resource Not Found'))
                }

                if (!response.body) {
                  return reject(defaultError)
                }

                response.json()
                  .then(error => { reject(new HTTPError(error.detail, error, response.status)) })
                  // Should be extended to cater for content-types other than json
                  .catch(() => { reject(defaultError) })
              }
            })
            .catch(err => { reject(err) })
        })
      }
    })
  }
}
