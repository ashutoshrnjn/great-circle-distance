const should = require('chai').should();
const expect = require('chai').expect;
const assert = require('chai').assert;
const path = require('path');
const distanceCalculator = require('../lib/distance-calculator');
const constants = require('../lib/helper/constants');  
describe('Distance Calculator Test Suit', function() {
  describe('Should Test toRadians function', function() {
    it('Must be a function', function(done) {
      distanceCalculator.toRadians.should.be.a('function');
      done();
    });
    it('Should handle if no parameter is provided', function(done) {
      expect(distanceCalculator.toRadians()).to.equal(0);
      done();
    });
    it('Should convert degree to radians and return the result', function(done) {
      expect(distanceCalculator.toRadians(53.339428)).to.equal(0.9309486397304539);
      done();
    });
  });
  describe('Should Test metersToKMs function', function() {
    it('Must be a function', function(done) {
      distanceCalculator.metersToKMs.should.be.a('function');
      done();
    });
    it('Should handle if no parameter is provided', function(done) {
      expect(distanceCalculator.metersToKMs()).to.equal(0);
      done();
    });
    it('Should convert meters to Kms and return the result', function(done) {
      expect(distanceCalculator.metersToKMs(400)).to.equal('0.40');
      done();
    });
  });
  describe('Should Test readCustomerRecord function', function() {
    it('Must be a function', function(done) {
      distanceCalculator.readCustomerRecord.should.be.a('function');
      done();
    });
    it('Should throw error if filePath is not provided', function(done) {
      assert.throws(distanceCalculator.readCustomerRecord, Error, 'path must be a string or Buffer');
      done();
    });
    it('Should read customer data successfully', function(done) {
      expect(distanceCalculator.readCustomerRecord(constants.inputFilePath)).to.have.lengthOf(32);
      done();
    });
  });
  describe('Should Test sortCustomersById function', function() {
    it('Must be a function', function(done) {
      distanceCalculator.sortCustomersById.should.be.a('function');
      done();
    });
    it('Should return empty array if no parameter is passed', function(done) {
      expect(distanceCalculator.sortCustomersById()).to.have.lengthOf(0);
      done();
    });
    it('Must return sorted array', function(done) {
      const data = [
        { user_id: 4, name: 'Test4'},
        { user_id: 1, name: 'Test1'},
        { user_id: 3, name: 'Test3'},
        { user_id: 2, name: 'Test2'}
      ]
      const response = [
        { user_id: 1, name: 'Test1'},
        { user_id: 2, name: 'Test2'},
        { user_id: 3, name: 'Test3'},
        { user_id: 4, name: 'Test4'}        
      ] 
      expect(distanceCalculator.sortCustomersById(data)).to.eql(response);
      done();
    });
  });
  describe('Should Test applySphericalLawOfCosines function', function() {
    it('Must be a function', function(done) {
      distanceCalculator.applySphericalLawOfCosines.should.be.a('function');
      done();
    });
    it('Should return distance between source cordinates and destination cordinates', function(done) {
      expect(distanceCalculator.applySphericalLawOfCosines(52.986375, -6.043701)).to.equal('41.77');
      done();
    });
  });
  describe('Should Test filterCustomersWithinRange function', function() {
    it('Must be a function', function(done) {
      distanceCalculator.filterCustomersWithinRange.should.be.a('function');
      done();
    });
    it('Should filter customers within given range from source', function(done) {
      const data = [
        '{"latitude": "52.986375", "user_id": 12, "name": "Christina McArdle", "longitude": "-6.043701"}',
        '{"latitude": "51.92893", "user_id": 1, "name": "Alice Cahill", "longitude": "-10.27699"}',
        '{"latitude": "51.8856167", "user_id": 2, "name": "Ian McArdle", "longitude": "-10.4240951"}'
      ]
      const response = [
        { user_id: 12, name: 'Christina McArdle'}
      ]
      const result = distanceCalculator.filterCustomersWithinRange(data);
      expect(result).to.have.lengthOf(1);
      expect(result).to.eql(response);
      done();
    });
  });
  describe('Should Test writeOutcomeIntoFile function', function() {
    it('Must be a function', function(done) {
      distanceCalculator.writeOutcomeIntoFile.should.be.a('function');
      done();
    });
    it('Should write outcome into file', function(done) {
      const response = [
        { user_id: 12, name: 'Christina McArdle'}
      ];
      distanceCalculator.writeOutcomeIntoFile(response, path.resolve(__dirname, 'test-output.txt'));
      done();
    })
  });
  describe('Should Test Main function : calculateDistance', function() {
    it('Must be a function', function(done) {
      distanceCalculator.calculateDistance.should.be.a('function');
      done();
    });
    it('Should return Success', function(done) {
      expect(distanceCalculator.calculateDistance()).to.equal('Success!');
      done();
    })
  });
});