const express = require('express');
const app = express();
const axios = require('axios');
const { NotFoundError } = require("./expressError");


// Parse request bodies for JSON
app.use(express.json());

/** takes in the usernames in the developers array from the request
   * returns json with the name and bio of each developer
   */
app.post('/', async function (req, res, next) {

  const developers = req.body.developers

  // let developerData = await Promise.all(developers.map(async d =>
  //             axios.get(`https://api.github.com/users/${d}`)));
  let developerData = await developerInfo(developers)
  console.log(developerData)
  let devDataJson = developerData.map(dev => ({ name: dev.data.name, bio: dev.data.bio }));

  return res.send(JSON.stringify(devDataJson));
});

async function developerInfo(input){
  let results = await Promise.all(input.map(async d =>
                 axios.get(`https://api.github.com/users/${d}`)));
    // try {
    //   await axios.get(`https://api.github.com/users/${d}`);
    // }
    // catch {
    //   throw new NotFoundError(`Cannot find user with username ${d}`);
    // }})
  return results
}


app.listen(3000);
