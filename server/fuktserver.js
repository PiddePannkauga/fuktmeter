const express = require('express')
const app = express()
const port = 3000

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.get('/', (req, res) =>{
  const {spawn} = require('child_process')
  const pyProg = spawn('python', ['./python/Adafruit_Python_DHT/examples/simpletest.py']);
  pyProg.stdout.on('data', function(data){

    console.log(data.toString());
    res.write(data);
    res.end('end')
  })
   res.send(test('fuktet'))});

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