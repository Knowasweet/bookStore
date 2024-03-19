import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faHeart, faUser } from '@fortawesome/free-regular-svg-icons'
import { faMagnifyingGlass, faHeart as solidHeart, faStar, faSpinner } from '@fortawesome/free-solid-svg-icons'

library.add(faHeart, faUser, faMagnifyingGlass, solidHeart, faStar, faSpinner)

export const initFontawesome = (app) => {
  app.component('FontAwesomeIcon', FontAwesomeIcon)
}
