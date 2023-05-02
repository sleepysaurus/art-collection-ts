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

const stub = [
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

describe('/', () => {
  it('respinds with the list of art', async() => {
    vi.mocked(selectAllArt).mockResolvedValue(stub)

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