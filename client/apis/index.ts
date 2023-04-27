import request from 'superagent'

import { DBArt } from '../../common/art'

const artUrl = '/api/v1/art/'

// GET all art
export function getAllArt() {
  return request.get(artUrl)
    .then((res) => {
      return res.body
    })
    .catch((err)=> {
      console.log(err.message)
    })
}

// GET one art
export function getOneArt(id: number) {
  return request.get(artUrl + id)
    .then((res) => {
      return res.body
    })
    .catch((err)=> {
      console.log(err.message)
    })
}

// POST an art
export function postOneArt(art: DBArt) {
  return request.post(artUrl)
    .send(art)
    .then((res) => {
      return res.body
    })
    .catch((err)=> {
      console.log(err.message)
    })
}

// PATCH an art
export function patchOneArt(id: number, art: DBArt) {
  return request.patch(artUrl)
    .send(art)
    .then((res) => {
      return res.body
    })
    .catch((err)=> {
      console.log(err.message)
    })
}

// DELETE one art
export function deleteOneArt(id: number) {
  return request.delete(artUrl + id)
    .then(() => {
      return "Deleted"
    })
    .catch((err)=> {
      console.log(err.message)
    })
}