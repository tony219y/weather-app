import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import weatherCurrent from './api/v1/weather/callcurrent.js'
import { cors } from 'hono/cors'
const app = new Hono()

// ใช้ CORS middleware จาก hono
app.use(cors({
  origin: 'https://weather-app.tony219y.com/',  // หรือระบุโดเมนที่อนุญาต
  allowHeaders: ['Content-Type', 'Authorization']  // กำหนด headers ที่อนุญาต
}))


app.route('/api/v1/weather/current', weatherCurrent)

app.get('/', (c) => {
  return c.json({
    message: 'Hello Hono!'
  },201)
})

const port = 3000
console.log(`Server is running on http://localhost:${port}`)
serve({
  fetch: app.fetch,
  port
})
