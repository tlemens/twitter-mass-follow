import Button from './button.js'
class TwitterMassFollow {
  constructor() {
  }
  load() {
    let xhttp = new XMLHttpRequest()
    xhttp.open('GET', chrome.extension.getURL('extension.html'), true)
    return new Promise((resolve, reject) => {
      xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4) {
          if (xhttp.status == 200) {
            this.element = document.createElement('div')
            this.element.className = 'twitter-mass-follow'
            this.element.innerHTML = xhttp.responseText
            document.body.appendChild(this.element)
            resolve()
          } else {
            reject(xhttp.statusText)
          }
        }
      }
      xhttp.send(null)
    })
  }
}
export default TwitterMassFollow;
