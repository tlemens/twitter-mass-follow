class Button {
  constructor(element) {
    this.element = element
    this.titleEl = this.element.getElementsByClassName('tmf-btn__title')[0]
    this.textEl = this.element.getElementsByClassName('tmf-btn__text')[0]
  }
  set title(string) {
    this.titleEl.innerHTML = string
  }
  set text(string) {
    this.textEl.innerHTML = string
  }
  countDown(minutes) {
    let seconds = parseInt(minutes) * 60
    return new Promise((resolve, reject) => {
      this.countDownInterval = setInterval(() => {
        if (0 === seconds) {
          resolve()
        } else {
          this.text = `Continuing in ${seconds} seconds...`
          seconds--
        }
      }, 1000)
    })
  }
}
export default Button;
