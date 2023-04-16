import type { ThunkAction } from '../store'
import { Art, DBArt } from '../../common/art'
import { fetchAllArt, fetchOneArt, deleteOne, postTheArt } from '../apis'

export const SHOW_ALL_ART = 'SHOW_ALL_ART'
export const SHOW_ONE_ART = 'SHOW_ONE_ART'
export const SAVE_ART = 'SAVE_ART'
export const DELETE_ONE_ART = 'DELETE_ONE_ART'


// ACTION TYPES
export type ArtAction = 
| { type: typeof SHOW_ALL_ART; payload: Art}
| { type: typeof SHOW_ONE_ART; payload: Art}
| { type: typeof SAVE_ART; payload: DBArt}
| { type: typeof DELETE_ONE_ART; payload: number}


// ACTION CREATORS
export function showAllArt(art: Art): ArtAction{
  return {
    type: SHOW_ALL_ART,
    payload: art
  }
}

export function showOneArt(art: Art): ArtAction{
  return {
    type: SHOW_ONE_ART,
    payload: art
  }
}

export function deleteArt(id: number): ArtAction{
  return {
    type: DELETE_ONE_ART,
    payload: Number(id)
  }
}

export function saveArt(art: DBArt): ArtAction{
  return {
    type: SAVE_ART,
    payload: art
  }
}

// THUNK ACTIONS
// Get all
export function getArtThunk(): ThunkAction {
  return (dispatch) => {
    fetchAllArt()
      .then((art) => {
        dispatch(showAllArt(art))
      })
      .catch((err) => {
        console.log(err.message)
      })
  }
}

// Get one art
export function getOneArtThunk(id: number) : ThunkAction {
  return (dispatch) => {
    fetchOneArt(id)
      .then((oneArt) => {
        dispatch(showOneArt(oneArt))
      })
      .catch((err) => {
        console.log(err.message)
      })
  }
}

// Delete one art 
export function removeArt(id: number) : ThunkAction {
  return (dispatch) => {
    deleteOne(id)
      .then(() => {
        dispatch(deleteArt(id))
      })
      .catch((err) => {
        console.log(err.message)
      })
  }
}

// Add one art
export function saveArtThunk(art: DBArt) : ThunkAction {
  return (dispatch) => {
    postTheArt(art)
      .then(()=>{
        // Save art will show added art
        dispatch(saveArt(art))
      })
      .catch((err) => {
        console.log(err.message)
      })
  }
}