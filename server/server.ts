import express from 'express'
import path from 'path'

// matches to export default router in artRoutes
import art from './routes/artRoutes'

// matches to module.exports = router in artRoutes 
//const art = require('./routes/artRoutes')

const server = express()

server.use(express.json())
server.use(express.static(path.join(__dirname, 'public')))

server.use('/api/v1/art', art)

server.get('*', (req, res) => {
  res.sendFile(path.resolve('server/public/index.html'))
})

export default server
