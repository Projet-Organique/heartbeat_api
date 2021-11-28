
/**
 * Get a random RGB color
 * @return {string} return random RGB color
 */
async function getRandomColor(){
    var num = Math.round(0xffffff * Math.random());
    var r = num >> 16;
    var g = num >> 8 & 255;
    var b = num & 255;
    return `${r}, ${g}, ${b}`;
 }
 exports.getRandomColor = getRandomColor;