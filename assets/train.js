var config = {
  apiKey: "AIzaSyBQDySBImhKtbqpD3jqu0F_nT5oKK4mH5U",
  authDomain: "abbeys-project.firebaseapp.com",
  databaseURL: "https://abbeys-project.firebaseio.com",
  projectId: "abbeys-project",
  storageBucket: "abbeys-project.appspot.com",
  messagingSenderId: "569797437929"
};
firebase.initializeApp(config);

var database = firebase.database();

var trainName = "";
var destination = "";
var frequency = "";
var firstTrain = 0;

$("#add-train").on("click", function() {
  trainName = $("#train-name-input").val().trim();
  destination = $("#destination-input").val().trim();
  firstTrain = moment($("#time-input").val().trim(), "hh:mm").format("h:mm a");
  frequency = $("#frequency-input").val().trim();

  database.ref().push({
    trainName: trainName,
    destination: destination,
    firstTrain: firstTrain,
    frequency: frequency
  });
});

database.ref().on("child_added", function(snapshot) {
  trainName = snapshot.val().trainName;
  snapshot.val().trainName;
  destination = snapshot.val().destination;
  firstTrain = snapshot.val().firstTrain;
  frequency = snapshot.val().frequency;

  
  var firstTrainConverted = moment(firstTrain, "HH:mm").subtract(1, "years");

  var difference = moment().diff(moment(firstTrainConverted), "minutes");

  var remainder = difference % frequency;

  var minutesTilTrain = frequency - remainder;

  var nextTrain = moment().add(moment(minutesTilTrain, "minutes"));

  console.log(nextTrain);

  $(".data").append(
    "<tr><td>" +
      snapshot.val().trainName +
      "</td><td>" +
      snapshot.val().destination +
      "</td><td>" +
      snapshot.val().firstTrain +
      "</td><td>" +
      snapshot.val().frequency +
      "</td><td>" +
      minutesTilTrain +
      "</td></td>" + 
      nextTrain +
      "</td></tr>"
  );
});
