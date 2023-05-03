// @vitest-environment node
import { describe, it, expect, beforeEach, vi } from 'vitest'
import request from 'supertest'

import server from '../server'
import { selectAllArt, selectOneArt, insertArt, updateArt, deleteArt, } from '../db/artDb'
import { mockNewArtData, mockArtData } from '../../common/artData'

vi.mock('../db/artDb')

beforeEach(() => {
  vi.resetAllMocks()
})

const api = '/api/v1/art'

// GET all art
// /api/v1/art
describe('/', () => {
  it('responds with the list of art', async() => {
    vi.mocked(selectAllArt).mockResolvedValue(mockArtData)

    const result = await request(server).get(api)
    expect(result.body).toHaveLength(3)
    expect(result.body[0]).toMatchInlineSnapshot(`
      {
        "id": 1,
        "image": "https://cdn.testsite.com/images/flower.jpg",
        "text": "A beautiful rose picture with lots of pinks and some peach hues.",
        "title": "Rose",
      }
    `)
  })
})


// GET one art
// /api/v1/art/:id
describe('/:id', () => {
  it('responds with a specific art', async() => {
    vi.mocked(selectOneArt).mockResolvedValue(mockArtData[1])

    const result = await request(server).get(api.concat('/2'))
    expect(result.body).toMatchInlineSnapshot(`
      {
        "id": 2,
        "image": "https://cdn.testsite.com/images/star.jpg",
        "text": "Dahliaaaaaaaahs with peach and cream tones, with a blue background.",
        "title": "Dahlias",
      }
    `)
  })

  it('responds with a 500', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {})

    vi.mocked(selectOneArt).mockRejectedValue(new Error())
    const result = await request(server).get(api.concat('/123'))
    expect(result.statusCode).toBe(500)
  })
})

// POST art
// /api/v1/art
describe('creating an art', () => {
  it('adds an art to the database', async() => {
    vi.mocked(insertArt).mockResolvedValue(4) //id 4

    const result = await request(server).post(api).send(mockNewArtData)

    expect(result.statusCode).toBe(200)
    expect(result.body).toEqual(4)
  })

  it('responds with a 500', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {})

    vi.mocked(insertArt).mockRejectedValue(new Error())
    const result = await request(server).get(api)
    expect(result.statusCode).toBe(500)
  })
})

// PATCH art
// /api/v1/art/:id
describe('updating an art', () => {
  it('updates an art', async() => {
    vi.mocked(updateArt).mockResolvedValue(1)

    const result = await request(server).patch(api)

    expect(result.statusCode).toBe(200)
    expect(result.body).toEqual({})
  })

  it('responds with a 500', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {})

    vi.mocked(updateArt).mockRejectedValue(new Error())
    const result = await request(server).patch(api)
    expect(result.statusCode).toBe(500)
  })
})

// DELETE art
// /api/v1/art/:id
describe('deleting an art', () => {
  it('deletes an art from the database', async() => {
    vi.mocked(deleteArt).mockResolvedValue(1)

    const result = await request(server).delete(api.concat('/3'))

    expect(result.statusCode).toBe(200)
    expect(result.body).toEqual({})
    expect(deleteArt).toHaveBeenCalledWith(3)
  })

  it('responds with a 500', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {})

    vi.mocked(deleteArt).mockRejectedValue(new Error())
    const result = await request(server).delete(api.concat('/3'))
    expect(result.statusCode).toBe(500)
  })
})