import type { ThunkAction } from '../store'
import { Art, DBArt } from '../../common/art'
import { getAllArt, getOneArt, postOneArt, patchOneArt, deleteOneArt } from '../apis'

export const SHOW_ALL_ART = 'SHOW_ALL_ART'
export const SHOW_ONE_ART = 'SHOW_ONE_ART'
export const SAVE_ART = 'SAVE_ART'
export const UPDATE_ART = 'UPDATE_ART'
export const DELETE_ONE_ART = 'DELETE_ONE_ART'


// ACTION TYPES
export type ArtAction = 
| { type: typeof SHOW_ALL_ART; payload: Art}
| { type: typeof SHOW_ONE_ART; payload: Art}
| { type: typeof SAVE_ART; payload: DBArt}
| { type: typeof UPDATE_ART; payload: DBArt}
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

export function saveArt(art: DBArt): ArtAction{
  return {
    type: SAVE_ART,
    payload: art
  }
}

export function updateArt(art: DBArt): ArtAction{
  return {
    type: UPDATE_ART,
    payload: art
  }
}

export function deleteArt(id: number): ArtAction{
  return {
    type: DELETE_ONE_ART,
    payload: Number(id)
  }
}

// THUNK ACTIONS
// Get all
export function getArtThunk(): ThunkAction {
  return (dispatch) => {
    getAllArt()
      .then((art) => {
        dispatch(showAllArt(art))
      })
      .catch((err) => {
        console.log(err.message)
      })
  }
}

// READ: Get one art
export function getOneArtThunk(id: number) : ThunkAction {
  return (dispatch) => {
    getOneArt(id)
      .then((oneArt) => {
        dispatch(showOneArt(oneArt))
      })
      .catch((err) => {
        console.log(err.message)
      })
  }
}

// CREATE: one art
export function saveArtThunk(art: DBArt) : ThunkAction {
  return (dispatch) => {
    postOneArt(art)
      .then(()=>{
        // Save art will show added art
        dispatch(saveArt(art))
      })
      .catch((err) => {
        console.log(err.message)
      })
  }
}

// UPDATE: one art
export function updateArtThunk(id: number, art: DBArt) : ThunkAction {
  return (dispatch) => {
    patchOneArt(id, art)
      .then(()=>{
        dispatch(updateArt(art))
      })
      .catch((err) => {
        console.log(err.message)
      })
  }
}

// DELETE: one art 
export function removeArt(id: number) : ThunkAction {
  return (dispatch) => {
    deleteOneArt(id)
      .then(() => {
        dispatch(deleteArt(id))
      })
      .catch((err) => {
        console.log(err.message)
      })
  }
}