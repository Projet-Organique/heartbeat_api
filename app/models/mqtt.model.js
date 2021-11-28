module.exports = () => {
  var mqtt = require('mqtt')
  const host = '192.168.1.13'
  const port = '1883'
  var client = mqtt.connect(`mqtt://${host}:${port}`)
  client.port = port;
  client.host = host;
  client.on('connect', function () {
    console.log(`Connected to MQTT: mqtt://${client.host}:${client.port}`)
  })
  return client;
};