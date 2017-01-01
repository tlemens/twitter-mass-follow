# Mass follow for Twitter

[A feature-rich Chrome extension to mass follow and unfollow on Twitter.](http://www.clemensteichmann.com/mass-follow-for-twitter.html)

![Twitter Mass Follow](https://github.com/tlemens/twitter-mass-follow/blob/master/extension/icon128.png)

Powered by ES6

## Development

Install npm packages:

```console
npm i --save-dev
```

Build the extension:

```console
gulp
```

You can now [load the extension](https://developer.chrome.com/extensions/getstarted#unpackedt).

For testing purposes you can comment out the click in Profile#clickBtn, so it won't actually follow/unfollow: 

```js
 clickBtn() {
    //this.btn.click()
  }
```

There is also a production build task to minimize the files and remove the logs:

```console
gulp production
```

Further reading:

* [What are extensions? - Google Chrome](https://developer.chrome.com/extensions)
* [Getting Started: Building a Chrome Extension](https://developer.chrome.com/extensions/getstarted)
