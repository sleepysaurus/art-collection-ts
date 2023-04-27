import { SHOW_ALL_ART, SHOW_ONE_ART, ADD_ART, UPDATE_ART, DELETE_ART, ArtAction } from "../actions/art"

import { DBArt } from '../../common/art'

const artCollection = (state = [] as DBArt[], action: ArtAction) => {
  const { type, payload } = action

  switch (type) {
    case SHOW_ALL_ART:
    //case SHOW_ONE_ART:
      return payload
    case ADD_ART:
    case SHOW_ONE_ART:
      return state
    case UPDATE_ART:
      return state
    case DELETE_ART:
      return state.filter(art => art.id !== payload)
    default:
      return state
  }
}

export default artCollection