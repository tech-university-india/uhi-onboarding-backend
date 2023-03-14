const HTTPError = require('../../util/error')

describe('HTTPError', () => {
  it('should be an instance of Error', () => {
    const error = new HTTPError('test', 500)
    expect(error).toBeInstanceOf(Error)
  })
})
