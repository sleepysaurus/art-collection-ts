import express from 'express'

// matches to export default router in artRoutes
import art from './routes/artRoutes'

// matches to module.exports = router in artRoutes 
//const art = require('./routes/artRoutes')
const server = express()

server.use(express.json())
server.use('/api/v1/art', art)

if (process.env.NODE_ENV === 'production') {
  server.use('/assets', express.static('/app/dist/assets'))
  server.get('*', (req, res) => {
    res.sendFile('/app/dist/index.html')
  })
}

export default server
