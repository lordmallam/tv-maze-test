import ApiClient from '../../utils/api'

const apiClient = new ApiClient()

export default () => (next) => (action) => {
  const { promise, types, ...rest } = action
  if (!promise) {
    return next(action)
  }

  const [REQUEST, SUCCESS, FAILURE] = types
  next({ ...rest, type: REQUEST, loading: true })

  return promise(apiClient)
    .then(payload => {
      next({ ...rest, payload, type: SUCCESS, loading: false })
    })
    .catch(({ message, error, status }) => {
      next({ ...rest, error: { message, error, status }, type: FAILURE, loading: false })
    })
}
