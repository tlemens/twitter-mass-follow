import StorageRecord from './storage_record.js'

class Setting {
  constructor(domId, defaultValue) {
    this.element = document.getElementById(domId)
    this.storage = new StorageRecord(domId)
    this.storage.fetch()
      .then((storageValue) => {
        this.value = storageValue
      }, () => {
        this.value = defaultValue
      })
  }
  save() {
    this.successMessage = 'saving...'
    return this.storage.save(this._value)
  }
  set successMessage(message) {
    let el = this.element.closest('.control-group')
    el.classList.add('tmf-setting-success')
    el.getElementsByClassName('control-label')[0].dataset.successMessage = message
    clearTimeout(this.successTimeout)
    this.successTimeout = setTimeout(() => {
      el.classList.remove('tmf-setting-success')
    }, 1000)
  }
  toString() {
    return `${this.constructor.name} ${this.element.id}`
  }
}

class CheckboxSetting extends Setting {
  constructor(domId, defaultValue) {
    super(domId, defaultValue)
    this.element.addEventListener("change", () => {
      this._value = this.element.checked
      super.save()
    })
  }
  set value(newValue) {
    console.log(this.toString())
    console.log(`<= ${newValue}`)
    this.element.checked = newValue
    this._value = newValue
  }
}

class TextSetting extends Setting {
  constructor(domId, defaultValue) {
    super(domId, defaultValue)
    this.element.addEventListener("input", () => {
      this._value = this.element.value
      super.save()
    })
  }
  set value(newValue) {
    console.log(this.toString())
    console.log(`<= ${newValue}`)
    this.element.value = newValue
    this._value = newValue
  }
}

export { CheckboxSetting, TextSetting }
