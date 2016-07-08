class Session {
  pageChanged(callback) {
    this._observeDocumentTitle(callback)
    this._observeActivityStream(callback)
  }
  limitExceeded(callback) {
    let messageDrawer = document.getElementById('message-drawer')
    let observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        // http://support.twitter.com/articles/66885-i-can-t-follow-people-follow-limits
        if ( messageDrawer.innerHTML.includes('66885') ) {
          callback.call()
        }
      })
    })
    observer.observe(messageDrawer, { subtree: true, characterData: true, childList: true })
  }
  _observeDocumentTitle(callback) {
    let observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        console.log(mutation)
        callback.call()
      })
    })
    observer.observe(document.querySelector('head > title'), { subtree: true, characterData: true, childList: true })
  }
  _observeActivityStream(callback) {
    let observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if ( document.getElementsByClassName('activity-popup-users') > 0 ) {
          console.log(mutation)
          callback.call()
        }
      })
    })
    observer.observe(document.getElementById('activity-popup-dialog'), { subtree: true, characterData: true, childList: true })
  }
}
export default Session
