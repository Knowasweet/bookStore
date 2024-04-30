import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faHeart, faUser, faStar as regularStar } from '@fortawesome/free-regular-svg-icons'
import {
  faMagnifyingGlass,
  faStar,
  faStarHalfStroke,
  faSpinner,
  faArrowRightFromBracket,
  faHouse,
  faHeart as solidHeart,
} from '@fortawesome/free-solid-svg-icons'

library.add(
  faHeart,
  solidHeart,
  faUser,
  faHouse,
  faMagnifyingGlass,
  faStar,
  regularStar,
  faStarHalfStroke,
  faSpinner,
  faArrowRightFromBracket,
)

export const initFontawesome = (app) => {
  app.component('FontAwesomeIcon', FontAwesomeIcon)
}
