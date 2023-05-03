import request from 'superagent'

import { DBArt } from '../../common/art'

const apiPath = '/api/v1/art/'

// GET all art
export function getAllArt() {
  return request.get(apiPath)
    .then((res) => {
      return res.body
    })
    .catch((err)=> {
      return new Error(`There was an error getting the list of art: ${err.message}`)
    })
}

// GET one art
export function getOneArt(id: number) {
  return request.get(apiPath + id)
    .then((res) => {
      return res.body
    })
    .catch((err)=> {
      console.log(err.message)
      //return new Error(`There was an error getting an artwork: ${err.message}`)
    })
}

// POST an art
export function postOneArt(art: DBArt) {
  return request.post(apiPath)
    .send(art)
    .then((res) => {
      return res.body
    })
    .catch((err)=> {
      return new Error(`There was an error creating an artwork: ${err.message}`)
    })
}

// PATCH an art
export function patchOneArt(art: DBArt) {
  return request.patch(apiPath)
    .send(art)
    .then((res) => {
      return res.statusCode
    })
    .catch((err)=> {
      return new Error(`There was an error updating an artwork: ${err.message}`)
    })
}

// DELETE one art
export function deleteOneArt(id: number) {
  return request.delete(apiPath + id)
    .then(() => {
      return "Deleted"
    })
    .catch((err)=> {
      return new Error(`There was an error deleting an artwork: ${err.message}`)
    })
}