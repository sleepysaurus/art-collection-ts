// @vitest-environment node
import { describe, it, expect, beforeEach, vi } from 'vitest'
import request from 'supertest'

import server from '../server'
import { selectAllArt, selectOneArt, insertArt, updateArt, deleteArt, } from '../db/artDb'

vi.mock('../db/artDb')

beforeEach(() => {
  vi.resetAllMocks()
})

// CONSTANTS
const api = '/api/v1/art'

const stubNewArt = {
  title: 'Sunbird', 
  text: 'Summer',  
  image: 'https://cdn.testsite.com/images/summer.jpg' 
}

const stubGetAll = [
  { 
    id: 1, 
    title: 'Rose', 
    text: 'A beautiful rose picture with lots of pinks and some peach hues.', 
    image: 'https://cdn.testsite.com/images/flower.jpg'
  },
  { 
    id: 2, 
    title: 'Dahlias', 
    text: 'Dahliaaaaaaaahs with peach and cream tones, with a blue background.',  
    image: 'https://cdn.testsite.com/images/star.jpg' 
  },
  { 
    id: 3, 
    title: 'Mucha', 
    text: 'Lovely art by Mucha',  
    image: 'https://cdn.testsite.com/images/hamburger.jpg' 
  }
]

// GET all art
// /api/v1/art
describe('/', () => {
  it('responds with the list of art', async() => {
    vi.mocked(selectAllArt).mockResolvedValue(stubGetAll)

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
    vi.mocked(selectOneArt).mockResolvedValue(stubGetAll[1])

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

  it('responds with a 404', async() => {
    vi.mocked(selectOneArt).mockResolvedValue(undefined)

    const result = await request(server).get(api.concat('/123'))
    expect(result.statusCode).toBe(404)
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

    const result = await request(server).post(api).send(stubNewArt)

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
describe('creating an art', () => {
  it('updates an art', async() => {
    vi.mocked(updateArt).mockResolvedValue(1)

    const result = await request(server).patch(api)

    expect(result.statusCode).toBe(200)
    expect(result.body).toEqual({})
  })

  it('responds with a 500', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {})

    vi.mocked(insertArt).mockRejectedValue(new Error())
    const result = await request(server).get(api)
    expect(result.statusCode).toBe(500)
  })
})