import TwitterMassFollow from './twitter_mass_follow.js'
import { observePageAction, observeFollowLimitsMessage } from './page_observer.js'

let extension = new TwitterMassFollow()

extension.load().then(() => {
  extension.showOrHide()
  observePageAction(() => {
    extension.showOrHide()
  })
  observeFollowLimitsMessage(() => {
    extension.wait()
  })
})
