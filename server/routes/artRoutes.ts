import express from 'express'

import { selectAllArt, selectOneArt, insertArt, updateArt, deleteArt, } from '../db/artDb'

const router = express.Router()

// GET all art
// /api/v1/art/
router.get('/', (req, res) => {
  selectAllArt()
    .then((art) => {
      return res.json(art)
    })
    .catch((err) => {
      console.log(err.message)
      res.sendStatus(500)
    })
})

// GET one art
// /api/v1/art/:id
router.get('/:id', (req, res) => {
  const id = Number(req.params.id)
  selectOneArt(id)
    .then((art) => {
      if (art == null) {
        res.sendStatus(404)
      } else {
        return res.json(art)
      }
    })
    .catch((err) => {
      console.log(err.message)
      res.sendStatus(500)
    })
})

// POST art
// /api/v1/art
router.post('/', (req, res) => {
  const art = req.body
  insertArt(art)
    .then((id) => {
      return res.json(id)
    })
    .catch((err) => {
      console.log(err.message)
      res.sendStatus(500)
    })
})

// PATCH art
// /api/v1/art/:id
router.patch('/', (req, res) => {
  const art = req.body
  
  updateArt(art)
    .then(() => {
      return res.sendStatus(200)
    })
    .catch((err) => {
      console.log(err.message)
      res.sendStatus(500)
    })
})

// DELETE art
// /api/v1/art/:id
router.delete('/:id', (req, res) => {
  const id = Number(req.params.id)
  deleteArt(id)
    .then(() => {
      return res.sendStatus(200)
    })
    .catch((err) => {
      console.log(err.message)
      res.sendStatus(500)
    })
})

// matches to require when imported
// module.exports = router 

// matches to import
export default router