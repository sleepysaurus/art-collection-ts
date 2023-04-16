import express from 'express'

import { selectAllArt, selectOneArt, deleteArtwork, insertArt} from '../db/artDb'

const router = express.Router()

// GET all art
// /api/v1/art/
router.get('/', (req, res) => {
  selectAllArt()
    .then((art) => {
      res.json(art)
    })
    .catch((err) => {
      console.log(err.message)
    })
})

// GET one art
// /api/v1/art/:id
router.get('/:id', (req, res) => {
  const id = Number(req.params.id)
  selectOneArt(id)
    .then((art) => {
      res.json(art)
    })
    .catch((err) => {
      console.log(err.message)
    })
})

// DELETE one art
// /api/v1/art/:id
router.delete('/:id', (req, res) => {
  const id = Number(req.params.id)
  deleteArtwork(id)
    .then(() => {
      return res.sendStatus(200)
    })
    .catch((err) => {
      console.log(err.message)
    })
})

// POST an art
// /api/v1/art
router.post('/', (req, res) => {
  const art = req.body
  insertArt(art)
    .then((art) => {
      res.json(art)
    })
    .catch((err) => {
      console.log(err.message)
    })
})

// matches to require when imported
// module.exports = router 

// matches to import
export default router