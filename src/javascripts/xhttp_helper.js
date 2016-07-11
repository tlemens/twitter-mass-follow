function get(url) {
  let xhttp = new XMLHttpRequest()
  xhttp.open('GET', url, true)
  return new Promise((resolve, reject) => {
    xhttp.onreadystatechange = () => {
      if (xhttp.readyState == 4) {
        if (xhttp.status == 200) {
          resolve(xhttp.responseText)
        } else {
          reject(xhttp.statusText)
        }
      }
    }
    xhttp.send(null)
  })
}

export default get
