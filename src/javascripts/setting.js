import StorageRecord from './storage_record.js'

class Setting extends StorageRecord {
  constructor(ID, defaultValue) {
    super(ID)
    this.element = document.getElementById(ID)
    this.value = defaultValue
    super.value.then((storageValue) => {
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
  constructor(ID, defaultValue) {
    super(ID, defaultValue)
    this.element.addEventListener("change", () => {
      this._value = this.element.checked
      super.save()
    })
  }
  set value(newValue) {
    this.element.checked = newValue
    super.value = newValue
  }
}

class TextSetting extends Setting {
  constructor(ID, defaultValue) {
    super(ID, defaultValue)
    this.element.addEventListener("input", () => {
      this._value = this.element.value
      super.save()
    })
  }
  set value(newValue) {
    this.element.value = newValue
    super.value = newValue
  }
}

export { CheckboxSetting, TextSetting }
