const express = require('express')
const app = express()
const port = 3200

app.use(function (req, res, next) {
  res.append("Access-Control-Allow-Origin", "*");
  res.append("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


const {execFile} = require('child_process');
const pyprog = execFile('python3', ['-u','./python/Adafruit_Python_DHT/examples/simpletest.py']);


let runPy = new Promise((resolve, reject) => {

  pyprog.stdout.on('data', function (data) {
   resolve(data);
  });

  pyprog.stderr.on('data', (data) => {
    reject(data, 'NoWork');
  });

  pyprog.on('close', (code) =>{
    console.log(code)
  })

})


app.get('/', (req, res) => {

  runPy.then(function (fromRunpy) {
    console.log(fromRunpy.toString())
    console.log( pyprog.stdout.on('data', function (data) {
      console.log(data.toString())}))
    res.end(fromRunpy)
  }).catch((err) => {
    console.log(err.toString())
  });

})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))