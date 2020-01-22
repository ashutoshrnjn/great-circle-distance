/**
 * Keeping constants together
 * R : Radius of the spherical earth
 * latitude and longitude: The GPS coordinates of Dublin office.
 * inputFilePath: file path of customer data
 * outputFilePath: output file path
 * range: Range in KMs.
 */
const path = require('path');
module.exports = {
  R: 6371e3,
  latitude: 53.339428,
  longitude: -6.257664,
  inputFilePath: path.resolve(__dirname, '../../input/customer.txt'),
  outputFilePath: path.resolve(__dirname, '../../output/output.txt'),
  range: 100,
}