import DataMigration from './data_migration'

const el = document.createElement('aside')
el.classList.add('tmf', 'tmf--initial')

document.body.appendChild(el)

export default {
  show () {
    const el = document.getElementById('tmf')
    el.innerHTML = `
      <strong>How to update Mass follow for new Twitter</strong><br>
      <ol>
        <li>(optional) <a href="javascript:void(0)" id="tmf-migrate">Migrate your old data first</a></li>
        <li>Install <a href="https://chrome.google.com/webstore/detail/mass-follow-for-new-twitt/fppndcbifafladddggjjhoopbkakjdlc" target="_blank">the new extension</a></li>
        <li>Remove <a href="https://chrome.google.com/webstore/detail/mass-follow-for-twitter/lfmanfkmmgfigbnjibfemdnnfjboficn" href="_blank">the old extension</a></li>
      </ol>
    `
    el.classList.remove('tmf--initial')
    el.classList.add('tmf--show')
    DataMigration.initialize()
  }
}
