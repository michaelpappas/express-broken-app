const express = require('express');
let axios = require('axios');
var app = express();

// Parse request bodies for JSON
app.use(express.json());

app.post('/', async function (req, res, next) {
  let results = await Promise.all(req.body.developers.map(async d =>
              axios.get(`https://api.github.com/users/${d}`)));

  let out = results.map(r => ({ "name": r.data.name, "bio": r.data.bio }));

  return res.send(JSON.stringify(out));
});



app.listen(3000);
