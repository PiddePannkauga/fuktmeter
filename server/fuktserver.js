const express = require('express')
const app = express()
const port = 3200

app.use(function (req, res, next) {
  res.append("Access-Control-Allow-Origin", "*");
  res.append("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});




let runPy = new Promise((resolve, reject) => {

  const {execFile} = require('child_process');
  const pyprog = execFile('python3', ['./python/Adafruit_Python_DHT/examples/simpletest.py']);

  pyprog.stdout.on('data', function (data) {
    console.log(data.toString(), pyprog.pid)
    resolve(data);
  });

  pyprog.stderr.on('data', (data) => {
    reject(data, 'NoWork');
  });

})


app.get('/', (req, res) => {

  runPy.then(function (fromRunpy) {
    console.log(fromRunpy.toString())
    res.end(fromRunpy)
  }).catch((err) => {
    console.log(err.toString())
  });

})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))