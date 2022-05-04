
/**
 * Respond with index html
 * @param {Request} request
 */
async function handleRequest(request) {
  const index = `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width,initial-scale=1">
      <title>Cron Manager</title>
      <style>*{text-align: center; padding: 0.5em}</style>
    </head>
    <body>
      <h1>CRON MANAGER</h1>
      <p>Hello! I am a cron jobs manager. I mainly manage cron jobs associated with <a href="https://jamesinkala.com" title="jamesinkala.com">jamesinkala.com</a>.</p>
    </body>
  </html>
  `
  return new Response(index, {
    headers: { 'content-type': 'text/html' },
  })
}

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})
