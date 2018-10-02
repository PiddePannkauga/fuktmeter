const express = require('express')
const app = express()
const port = 3200

let runPy = new Promise((resolve, reject) => {

  const { spawn } = require('child_process');
  const pyprog = spawn('python', ['./python/Adafruit_Python_DHT/examples/simpletest.py']);

  pyprog.stdout.on('data', function(data) {
      console.log("Inside Resolve")
      resolve(data);
  });

  pyprog.stderr.on('data', (data) => {

      reject(data,'NoWork');
  });
});

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.get('/', (req, res) =>{
  res.write('welcome\n');

    runPy.then(function(fromRunpy) {
        console.log(fromRunpy.toString());
        res.send(fromRunpy);
    }).catch((err) => {
      console.log(err.toString())
    });
  })
    
app.listen(port, () => console.log(`Example app listening on port ${port}!`))

// const SerialPort = require('serialport')
// const arduinoPort = new SerialPort('/dev/ttyACM0', function (err) {
//   if (err) {
//     return console.log('Error: ', err.message)
//   }
// })
// const Readline = require('@serialport/parser-readline')
// const parser = arduinoPort.pipe(new Readline({ delimiter: '\r\n' }))
// parser.on('data', test)

// function test(data){
//   var humidity = data;
//   return humidity;
// }