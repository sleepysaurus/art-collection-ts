import { describe, it, expect, afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'
import matchers from '@testing-library/jest-dom/matchers'
import nock from 'nock'

import * as api from './art'
import { DBArt } from '../../common/art'
import { mockNewArtData, mockArtData } from '../../common/artData'


expect.extend(matchers)
afterEach(cleanup)

const localHost = 'http://localhost'
const apiPath = '/api/v1/art/'

// GET all art
// /api/v1/art/
describe('all', ()=> {
  it('gets the list of all the art'), async () => {
    const scope = nock(localHost)
      .get(apiPath)
      .reply(200, mockArtData)

    const result = await api.getAllArt()
    expect(result).toStrictEqual(mockArtData)
    expect(scope.isDone()).toBeTruthy()
  }

  it('fails if the server fails'), async () => {
    const scope = nock(localHost)
      .get(localHost)
      .reply(500)

    const result = await api.getAllArt()
    expect(result).toThrowError()
    expect(result).rejects.toEqual(new Error())
    expect(scope.isDone()).toBeTruthy()
  }
})

// GET one art
// /api/v1/art/:id
describe('get one art', () => {
  it('gets data for one art by id'), async () => {
    const scope = nock(localHost)
      .get(apiPath.concat('/1'))
      .reply(200, mockArtData[0])

    const result = await api.getOneArt(1)
    expect(result).toStrictEqual(mockArtData[0])
    expect(scope.isDone()).toBeTruthy()
  }
})

// POST an art
// /api/v1/art
describe('adds an art', () => {
  it('adds data for one art'), async () => {
    const scope = nock(localHost)
      .post(apiPath)
      .reply(200, { id: 4})

    const result = await api.postOneArt(mockNewArtData)
    expect(result).toStrictEqual(mockArtData)
    expect(scope.isDone()).toBeTruthy()
  }
})

// PATCH an art
// /api/v1/art