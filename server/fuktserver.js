const express = require('express')
const app = express()
const port = 3200

app.use(function(req, res,next) {
  res.append("Access-Control-Allow-Origin", "*");
  res.append("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});






app.get('/', (req, res) =>{
  const { spawn } = require('child_process');
  const pyprog = spawn('python3', ['./python/Adafruit_Python_DHT/examples/simpletest.py']);
  let runPy = new Promise((resolve, reject) => {

    pyprog.stdout.on('data', function(data) {
        console.log("Inside Resolve")
        resolve(data);
        
    });
  
    pyprog.stderr.on('data', (data) => {
  
        reject(data,'NoWork');
    });

  })

    runPy.then(function(fromRunpy) {
        console.log(fromRunpy.toString());
        res.send(fromRunpy);
        pyprog.kill('SIGINT')
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