import sinon from 'sinon'
import { getNow } from '../date'

describe('getNow', () => {
  it('should get now mocked 2018-01-01', () => {
    const clock = sinon.useFakeTimers(new Date('2018-01-01'))
    expect(getNow()).toBe('2018-01-01T00:00:00.000Z')
    clock.restore()
  })
})
