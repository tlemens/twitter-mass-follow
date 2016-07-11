function observe(element, callback) {
  let observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      callback.call()
    })
  })
  observer.observe(element, { subtree: true, characterData: true, childList: true })
}

function observeTweetReactions(callback) {
  let element = document.getElementById('activity-popup-dialog')
  let contentEl = element.getElementsByClassName('activity-content')[0]
  observe(element, function() {
    if ( element.style.display != 'block' ) {
      contentEl.innerHTML = ''
    }
    callback.call()
  })
}

function observePageChange(callback) {
  observe(document.querySelector('head > title'), callback)
}

function observePageAction(callback) {
  observeTweetReactions(callback)
  observePageChange(callback)
}

function observeFollowLimitsMessage(callback) {
  let element = document.getElementById('message-drawer')
  observe(element, function() {
    // http://support.twitter.com/articles/66885-i-can-t-follow-people-follow-limits
    if ( element.innerHTML.includes('66885') ) {
      callback.call()
    }
  })
}

export { observePageAction, observeFollowLimitsMessage }
