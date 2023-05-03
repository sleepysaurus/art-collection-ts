import { describe, it, expect, afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'
import matchers from '@testing-library/jest-dom/matchers'
import nock from 'nock'

import * as api from './art'
import { mockNewArtData, mockArtData, mockUpdateArtData } from '../../common/mockArtData'

expect.extend(matchers)
afterEach(cleanup)

const localHost = 'http://localhost'
const apiPath = '/api/v1/art/'

// GET all art
describe('GET all', () => {
  it('gets the list of all the art', async () => {
    const scope = nock(localHost)
      .get(apiPath)
      .reply(200, mockArtData)

    const result = await api.getAllArt()
    expect(result).toStrictEqual(mockArtData)
    expect(result).toHaveLength(3)
    expect(scope.isDone()).toBeTruthy()
  })

  it('responds with a 500 error if the server fails', async () => {
    const scope = nock(localHost)
      .get(apiPath)
      .reply(500)

    const result =  api.getAllArt()
    const expected = new Error('Internal Server Error')
    await expect(result).rejects.toEqual(expected)
    expect(scope.isDone()).toBeTruthy()
  })
})

// GET one art
describe('GET one art', () => {
  it('gets data for one art by id', async () => {
    const scope = nock(localHost)
      .get(apiPath.concat('1'))
      .reply(200, mockArtData[0])

    const result = await api.getOneArt(1)
    expect(result).toStrictEqual(mockArtData[0])
    expect(scope.isDone()).toBeTruthy()
  })
})

// POST an art
describe('POST', () => {
  it('adds one art', async () => {
    const scope = nock(localHost)
      .post(apiPath)
      .reply(200, { id: 4})

    const result = await api.postOneArt(mockNewArtData)
    expect(result).toStrictEqual({ id: 4})
    expect(scope.isDone()).toBeTruthy()
  })
})

// PATCH an art
describe('PATCH an art', () => {
  it('updates the values of one art', async () => {
    const scope = nock(localHost)
      .patch(apiPath)
      .reply(200)

    const result = await api.patchOneArt(mockUpdateArtData)
    expect(result).toStrictEqual(200)
    expect(scope.isDone()).toBeTruthy()
  })

  it('responds with a 500 error if the server fails', async () => {
    const scope = nock(localHost)
      .patch(apiPath)
      .reply(500)

    const result = api.patchOneArt(mockUpdateArtData)
    const expected = new Error('Internal Server Error')
    await expect(result).rejects.toEqual(expected)
    expect(scope.isDone()).toBeTruthy()
  })
})

// // DELETE an art
describe('DELETE an art', () => {
  it('removes an art from the list of all art', async () => {
    const scope = nock(localHost)
      .delete(apiPath.concat('1'))
      .reply(200)

    const result = await api.deleteOneArt(1)
    expect(result).toStrictEqual(200)
    expect(scope.isDone()).toBeTruthy()
  })
})