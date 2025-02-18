import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import weatherCurrent from './api/v1/weather/callcurrent.js'

const app = new Hono()

// สร้าง CORS middleware ที่กำหนดเอง
app.use('*', async (c, next) => {
  c.res.headers.set('Access-Control-Allow-Origin', 'https://weather-app.tony219y.com/');
  c.res.headers.set('Access-Control-Allow-Methods', 'GET, POST');
  c.res.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // ถ้าเป็น preflight request (OPTIONS)
  if (c.req.method === 'OPTIONS') {
    return c.status(204); // ส่งกลับ 204 No Content
  }

  await next();
});

app.route('/api/v1/weather/current', weatherCurrent)

app.get('/', (c) => {
  return c.json({
    message: 'Hello Hono!'
  }, 201)
})

const port = 3000
console.log(`Server is running on http://localhost:${port}`)
serve({
  fetch: app.fetch,
  port
})
