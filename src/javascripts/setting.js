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
    this._animateSaved()
    return this.storage.save(this._value)
  }
  _showSavedNotification() {
    let controlGroupEl = this.element.closest('.control-group');
    controlGroupEl.classList.add('tmf-saved')
    setTimeout(() => { controlGroupEl.classList.remove('tmf-saved') }, 1000)
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
    this.element.value = newValue
    this._value = newValue
  }
}

export { CheckboxSetting, TextSetting }
