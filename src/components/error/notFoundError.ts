export class NotFoundError extends Error {
  constructor() {
    super('Not Found')
    this.name = 'NotFoundError'
    Object.setPrototypeOf(this, NotFoundError.prototype)
  }
}
