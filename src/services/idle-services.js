// This manages when a user has gone idle.

let _timeoutId
let _idleCallback = null
let _notIdleEvents = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart']
let _FIVE_MINUTES_IN_MS = 5 * 60 * 1000

const IdleService = {
  setIdleCallback(idleCallback) {
    _idleCallback = idleCallback
  },
  resetIdleTimer(e) {
    clearTimeout(_timeoutId)
    _timeoutId = setTimeout(_idleCallback, _FIVE_MINUTES_IN_MS)
  },
  registerIdleTimeResets() {
    _notIdleEvents.forEach(event =>
      document.addEventListener(event, IdleService.resetIdleTimer, true)
    )
  },
  unRegisterIdleResets() {
    clearTimeout(_timeoutId)
    _notIdleEvents.forEach(event =>
      document.removeEventListener(event, IdleService.resetIdleTimer, true)
    )
  },
}

export default IdleService