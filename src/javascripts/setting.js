import StorageRecord from './storage_record.js'

class Setting extends StorageRecord {
  constructor(domId, defaultValue) {
    super(domId)
    this.element = document.getElementById(domId)
    this.value = defaultValue
    super.fetch().then((storageValue) => {
      console.log('storageValue:' + storageValue)
      this.value = storageValue
    })
  }
  set value(newValue) {
    this._value = newValue
  }
  get value() {
    return this._value
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
    this.element.checked = newValue
    super.value = newValue
  }
  get value() {
    return super.value
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
    this.element.value = newValue
    super.value = newValue
  }
  get value() {
    return super.value
  }
}

export { CheckboxSetting, TextSetting }
