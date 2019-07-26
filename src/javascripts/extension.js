import TwitterMassFollow from './twitter_mass_follow.js'
import { observePageAction, observeFollowLimitsMessage } from './page_observer.js'
import isNewTwitter from './new_twitter/is_new_twitter'
import NewTwitterNotification from './new_twitter/notification'

let extension = new TwitterMassFollow()

extension.load().then(() => {
  if (isNewTwitter()) {
    NewTwitterNotification.show()
  } else {
    extension.showOrHide()
    observePageAction(() => {
      extension.showOrHide()
    })
    observeFollowLimitsMessage(() => {
      extension.wait()
    })
  }
})
