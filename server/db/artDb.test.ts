// @vitest-environment node
import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest'
import connection from './connection'
import * as art from './artDb'

// before all tests
beforeAll(() => {
  return connection.migrate.latest()
})

// before each test
beforeEach(async () => {
  await connection.seed.run()
})

// after all the tests
afterAll(async () => {
  await connection.migrate.rollback()
  await connection.destroy()
})


describe('Art DB', () => {
  // ALL
  describe('.selectAllArt', () => {
    it('fetches the art list', async () => {
      expect.assertions(2)
      const result = await art.selectAllArt()

      expect(result).toHaveLength(6) // items in the array
      expect(result[0]).toMatchInlineSnapshot(`
      {
        "id": 1,
        "image": "https://i.icanvas.com/list-square/floral-close-ups-YPH41.jpg",
        "text": "A beautiful rose picture with lots of pinks and some peach hues.",
        "title": "Rose",
      }
      `)
    })
  })

  // ONE ART
  describe('.selectOneArt', () => {
    it('fetches one art by id', async () => {
      expect.assertions(1)
      const result = await art.selectOneArt(2)

      expect(result).toMatchInlineSnapshot(`
      {
        "id": 2,
        "image": "https://cdn1.bigcommerce.com/n-ww20x/azetto/products/850/images/3612/6_square_dahlia_HOPE_closeup__71814.1589944049.1280.1280.jpg?c=2",
        "text": "Dahliaaaaaaaahs with peach and cream tones, with a blue background.",
        "title": "Dahlias",
      }
      `)
    })
  })
})

