class HTTPError extends Error {
  constructor (message, error, status) {
    super(message)
    this.error = error
    this.status = status
  }
}

class NotFoundError extends HTTPError {
  constructor (message) {
    super(message, 'Not Found', 404)
  }
}

export { NotFoundError, HTTPError }
