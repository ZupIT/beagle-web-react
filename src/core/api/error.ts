class ApiError extends Error {
  status: any
  data: any

  constructor(status: any, data: any) {
    super('Network Error')
    this.status = status
    this.data = data
  }
}

export default ApiError
