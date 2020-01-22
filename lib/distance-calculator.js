const fs = require('fs');

const constants = require('./helper/constants'); 

/**
 * This function will convert given cordinates into radians.
 * @param {Number} degree 
 */
function toRadians(degree) {
  if(!degree) return 0;
  return degree * (Math.PI/180);
}

/**
 * This function will convert meters into Kms.
 * @param {Number} meters 
 */
function metersToKMs(meters) {
  if(!meters) return 0;
  return (meters/1000).toFixed(2);
}

/**
 * This function reads customer.txt file and return the customers listed
 * @returns {Array}
 * @param {String} filePath 
 */
function readCustomerRecord(filePath) {
  try {
    let result = fs.readFileSync(filePath, 'utf8');
    result  = result.toString().split('\n');
    return result;
  } catch(err) {
      console.log('File not found:', err);
      throw err;
  }
}

/**
 * This function will take list of customers within 100kms and sort the it in ascending order
 * @param {Number: user_id, String: name} customers
 */
function sortCustomersById(customers) {
  if(!customers) return [];
  return customers.sort((curr,next) => curr.user_id - next.user_id);
}
/**
 * Using the first formula from https://en.wikipedia.org/wiki/Great-circle_distance
 */
function applySphericalLawOfCosines(lat, lon) {
  const latitude = toRadians(constants.latitude);
  const longitude = toRadians(constants.longitude);
  lat = toRadians(lat);
  lon = toRadians(lon);
  let distance = Math.acos(Math.sin(latitude) * Math.sin(lat) + 
    Math.cos(latitude) * Math.cos(lat) * Math.cos(longitude-lon)) * constants.R;
  return metersToKMs(distance);
}
/**
 * This function takes customers array and returns only customers in given range.
 * Range is defined in constants class.
 * @param {Array} customers 
 */
function filterCustomersWithinRange(customers) {
  let customersInRange = [];
  customers.forEach(data => {
    data = JSON.parse(data);
    distance = applySphericalLawOfCosines(data.latitude,data.longitude);
    if(distance < constants.range)  {
      customersInRange.push({ user_id: data.user_id, name: data.name});
    }
  });
  return customersInRange;
}
/**
 * Writing sorted Customers into output.txt
 * @param {Array} sortedCustomers 
 */
function writeOutcomeIntoFile(sortedCustomers, filePath) {
  if(fs.existsSync(filePath)) {
    fs.truncateSync(filePath);
  }
  let stream = fs.createWriteStream(filePath, {
    flags: 'a',
    encoding: 'utf8'
  })
  sortedCustomers.forEach(el => stream.write(JSON.stringify(el)+'\n'));
  stream.end();
}

/**
 * This is the main function
 */
function calculateDistance() {
  let customers = readCustomerRecord(constants.inputFilePath);
  let outcome = sortCustomersById(
    filterCustomersWithinRange(customers)
  );
  writeOutcomeIntoFile(outcome, constants.outputFilePath);
  //Sucess Log statement
  console.log('Success!');
  return "Success!";
}
/**
 * Below line is commented intentionally! You can un-comment it to make it work independentyly.
 */
//calculateDistance();

module.exports = {
  calculateDistance,
  writeOutcomeIntoFile,
  filterCustomersWithinRange,
  applySphericalLawOfCosines,
  sortCustomersById,
  readCustomerRecord,
  metersToKMs,
  toRadians
}
