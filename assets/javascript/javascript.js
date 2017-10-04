// Initialize Firebase
var config = {
    apiKey: "AIzaSyCAoNVY1mvRGdv8Bn_geLFkIlD7AxIn1xI",
    authDomain: "train-9303c.firebaseapp.com",
    databaseURL: "https://train-9303c.firebaseio.com",
    projectId: "train-9303c",
    storageBucket: "",
    messagingSenderId: "838334174115"
  };

  firebase.initializeApp(config);

var dataRef = firebase.database();

// Initial values
var trainName = "";
var destination = "";
var firstTrainTime = "";
var frequency = "";

$('#why').on('click', function(event) {
	event.preventDefault();
	console.log('hey');
});

// Capture button click and collect user input
$('#addTrainButton').on('click', function(event) {
	event.preventDefault();
	console.log('hey');
	var trainName = $('#trainNameInput').val().trim();
	var destination = $('#destinationInput').val().trim();
	var firstTrainTime = $('#trainTimeInput').val().trim();
	var frequency = $('#frequencyInput').val().trim();


// Push user input to database
dataRef.ref().push({

train: trainName,
		destination: destination,
		trainTime: firstTrainTime,
		frequency: frequency

})

$('#trainNameInput').val("");
$('#destinationInput').val("");
$('#trainTimeInput').val("");
$('#frequencyInput').val("");

return false;

});

// Firebase watcher + initial loader
dataRef.ref().on("child_added", function(childSnapshot) {

	console.log(childSnapshot.val());

	var trainName = childSnapshot.val().train;
	var destination = childSnapshot.val().destination;
	var firstTrainTime = childSnapshot.val().trainTime;
	var frequency = childSnapshot.val().frequency;

	var trainFrequency = frequency;
	var firstTime = firstTrainTime;

	var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "y");

	// Current time
	var currentTime = moment();
	console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

	// Difference between the times
	var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
	console.log("DIFFERENCE IN TIME: " + diffTime);

	// Time apart (remainder)
	var tRemainder = diffTime % trainFrequency;
	console.log(tRemainder);

	// Minutes until train
	var minutesTillTrain = trainFrequency - tRemainder;

	// Next train
	var nextTrain = moment().add(minutesTillTrain, "minutes");
	var arrival = moment(nextTrain).format("hh:mm a");
	console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

	//Append values to table
	$('#trainTable > tbody').append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + arrival + "</td><td>" + minutesTillTrain + "</td></tr>");
});
