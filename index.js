// Load config
var config = require('./config.json');

// Load modules
var request = require('request');
var objectHash = require('object-hash');
var HashTable = require('hashtable');
var AWS = require('aws-sdk');
var firehose = new AWS.Firehose({
	apiVersion: '2015-08-04',
	region: 'us-east-1',
	accessKeyId: config.awsAccessKeyId,
	secretAccessKey: config.awsSecretAccessKey
});

// Set up module
exports = module.exports;

// Build URL
var url = 'http://' + config.host + ':' + config.port + '/' + config.file;

// Run-time variables
var scanningInterval, flightHash;
var flightHashMap = new HashTable();
var totalSent = 0;

// Start scanning
exports.startScanning = function() {
	var that = this;

	// Set up an interval
	scanningInterval = setInterval(function() {
		// Make request
		request(url, function (error, response, body) {
			// No error?
			if (!error && response.statusCode == 200) {
				// Get raw response and parse it
				var data = JSON.parse(body);
				var flights = [];
				var observedHashes = [];

				// Clean up data
				data.forEach(function(obj) {
					// Trim string fields
					for (var key in obj) {
						if (obj.hasOwnProperty(key) && (typeof(obj[key]) == 'string')) {
							obj[key] = obj[key].trim();
						}
					}

					// Hash
					flightHash = that.hashFlightObject(obj);

					// Is this a new message?
					if (!flightHashMap.has(flightHash))
					{
						// Add flight object
						flights.push(obj);
					}

					// Note that this was observed
					observedHashes.push(flightHash);
				});

				// Update the map
				flightHashMap.clear();
				for (var i=0; i<observedHashes.length; i++)
					flightHashMap.put(observedHashes[i], 1);

				// Not empty?
				if (flights.length > 0)
				{
					// Send to firehose
					that.sendFlightsToFirehose(flights);
				}
			}
		});
	}, config.frequencyMs);
};

// Stop scanning
exports.stopScanning = function() {
	clearInterval(scanningInterval);
};

// Hash flight object
exports.hashFlightObject = function(obj) {
	return objectHash(obj);
};

// Send flights to firehose
exports.sendFlightsToFirehose = function(flightObjs) {
	// TODO: Support more than 500 records.
	if (flightObjs.length == 0 || flightObjs.length > 500)
		return;

	// Create records
	var records = [];
	flightObjs.forEach(function(obj) {
		records.push({
			Data: new Buffer(JSON.stringify(flightObjs)+"\n")
		});
	});

	// Build parameters
	var params = {
		DeliveryStreamName: config.deliveryStreamName, /* required */
		Records: records
	};

	// Send to firehose
	firehose.putRecordBatch(params, function(err, data) {
		// Debug?
		if (config.debug)
		{
			if (err)
				console.log(err, err.stack);
			else
			{
				totalSent += data.RequestResponses.length;
				console.log('Successfully posted ' + data.RequestResponses.length + ' messages to Firehose (' + totalSent + ' total).');
			}
		}
	});
};

// Start scanning?
if (config.autoStart)
	this.startScanning();