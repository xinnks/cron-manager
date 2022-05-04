
/**
 * readRequestBody reads in the incoming request body
 * Use await readRequestBody(..) in an async function to get the string
 * @param {Request} request the incoming request to read from
 */
 async function readRequestBody(request) {
  const { headers } = request;
  const contentType = headers.get('content-type') || '';

  if (contentType.includes('application/json')) {
    return await request.json();
  } else if (contentType.includes('form')) {
    const formData = await request.formData();
    let body = {};
    for (const entry of formData.entries()) {
      body[entry[0]] = entry[1];
    }
    return body;
  } else {
    return null;
  }
}

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

  return fetch(`https://api.mailjet.com/v3.1/send`, {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify(data),
  })
  .then(x => {
    console.log("SENT EMAILS: ", JSON.stringify(x.json()));
    return true;
  })
  .catch( e => {
    return false;
  })
}

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
