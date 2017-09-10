const express = require('express');
const path = require('path');

const server = express();
const root = path.resolve(process.cwd(), 'dist');
const port = process.env.PORT || 3000;

function fallback(req, res) {
  return res.sendFile('index.html', { root }, (err) => {
    if (err) console.log('Error send index.html', err);
  });
}

server.use(express.static(root));
server.get('*', fallback);

server.listen(port, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  console.log(`Server is running on port ${port}`);
});
