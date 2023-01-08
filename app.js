const express = require('express');
let axios = require('axios');
var app = express();

// Parse request bodies for JSON
app.use(express.json());

app.get('/', async function (req, res, next) {
  console.log('req.body.developers- ', req.body.developers)
  // let numbers = [1,2,3,4]
  // let numberInfo = numbers.map(async num =>
  //   axios.get(`http://numbersapi.com/${num}`));
  // console.log("numberInfo-", await Promise.all(numberInfo))
  // debugger;

  let results = req.body.developers.map(async d => axios.get(`https://api.github.com/users/${d}`))
  let returnedResults = await Promise.all(results)
  debugger;
  // let out = results.map(r => ({ "name": r.data.name, "bio": r.data.bio }));
  // console.log("out- ", out)

});

// async function getUsersData(userName){
//   for()
//   return await axios.get(`https://api.github.com/users/${username}`)

// }


app.listen(3000);
