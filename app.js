const express = require('express');
const app = express();
const axios = require('axios');
const { NotFoundError } = require("./expressError");


// Parse request bodies for JSON
app.use(express.json());

/** Takes in the usernames in the developers array from the request
   * returns json with the name and bio of each developer
   */
app.post('/', async function (req, res, next) {
  const developers = req.body.developers

  let developerData = await developerInfo(developers)

  let devDataJson = parseGithubData(developerData)

  return res.send(JSON.stringify(devDataJson));
});

/** Takes array of usernames and returns array of the response data from github
 * if a bad username is provided it will throw a NotFoundError
*/
async function developerInfo(input){

  let results = await Promise.all(input.map(async d =>
    axios.get(`https://api.github.com/users/${d}`)));

  console.log("in developerInfo- ", results)
  for(let i=0; i<results.length; i++){
      if (results[i].data.name === null){
        throw new NotFoundError(`Cannot find user with username ${input[i]}`)
      }
    }

  return results
}
/** Parses name and bio from array of Github API responses
 * returns array of objects
 */
function parseGithubData(data){
  return data.map(dev => ({ name: dev.data.name, bio: dev.data.bio }));
}




app.listen(3000);
