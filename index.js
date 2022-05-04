
/**
 * Returns email Html markup
 * @param {Object} data => email data object
 */
function logEmailHtml(data){
  return `
  <html>
    <head>
    <title>${data.subject}</title>
    </head>
    <body>
      <h1> ${data.subject} </h1>
      <p> ${data.message} </p>
    </body>
  </html>
  `
}

/**
 * @description This function sends a log email
 * @param { Object } info => email information object
**/
async function sendLogEmail(info){
  const FROM = {
    Email: MDR_DEV_EMAIL,
    Name: "My Daily Reads"
  };
  const HEADERS = {
    Authorization:
      'Basic ' + btoa(`${MAILJET_API_KEY}:${MAILJET_API_SECRET}`),
    'Content-Type': 'application/json',
  };
  const data = {
    Messages:[
      {
        From: FROM,
        To: [
          {
            Email: info.user.email,
            Name: info.user.name
          }
        ],
        Subject: info.message.subject,
        TextPart: info.message.message,
        HTMLPart: logEmailHtml(info.message)
      }
    ]
  };
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
