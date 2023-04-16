import request from 'superagent'

import { DBArt } from '../../common/art'

const artUrl = '/api/v1/art/'

// GET all art
export function fetchAllArt() {
  return request.get(artUrl)
    .then((res) => {
      return res.body
    })
    .catch((err)=> {
      console.log(err.message)
    })
}

// GET one art
export function fetchOneArt(id: number) {
  return request.get(artUrl + id)
    .then((res) => {
      return res.body
    })
    .catch((err)=> {
      console.log(err.message)
    })
}

// DELETE one art
export function deleteOne(id: number) {
  return request.delete(artUrl + id)
    .then(() => {
      return "Deleted"
    })
    .catch((err)=> {
      console.log(err.message)
    })
}

// POST an art
export function postTheArt(art: DBArt) {
  return request.post(artUrl)
    .send(art)
    .then((res) => {
      return res.body
    })
    .catch((err)=> {
      console.log(err.message)
    })
}