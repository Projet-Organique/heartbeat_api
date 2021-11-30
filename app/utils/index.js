
const axios = require('axios');

/**
 * Get a random RGB color
 * @return {string} return random RGB color
 */
async function getRandomColor() {
  return new Promise(async (resolve) => {
    var data = '{"model":"default"}';
    var config = {
      method: 'get',
      url: 'http://colormind.io/api/',
      headers: {
        'Content-Type': 'text/plain'
      },
      data: data
    };
    axios(config)
      .then(function (response) {
        var colorArray = response.data.result
        var item = JSON.stringify(colorArray[Math.floor(Math.random() * colorArray.length)]);
        var color = item.replace(/[\[\]']+/g, '');
        console.log(color);
        resolve(color)
      })
      .catch(function (error) {
        console.log(error);
      });
  });
}
exports.getRandomColor = getRandomColor;