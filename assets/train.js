//Firebase
var config = {
    apiKey: "AIzaSyBrbuK_0oyooEoqEpIZegge_xIXfpywL0E",
    authDomain: "train-project-fd4a1.firebaseapp.com",
    databaseURL: "https://train-project-fd4a1.firebaseio.com",
    projectId: "train-project-fd4a1",
    storageBucket: "train-project-fd4a1.appspot.com",
    messagingSenderId: "1096779865309"
  };
firebase.initializeApp(config);

//Variables for form and firebase
var database = firebase.database();
var trainName = "";
var trainDestination = "";
var firstTrain = "";
var trainFrequency = "";

//to add a new train from form. 
$("#add-train").on("click", function (event) {

    event.preventDefault();
//moment.js entering the date
    trainName = $("#name-input").val().trim();
    trainDestination = $("#destination-input").val().trim();
    firstTrain = moment($("#first-input").val().trim(), "DD/MM/YY").format("X");
    trainFrequency = $("#frequency-input").val().trim();
//pusing info to firebase database
    database.ref().push({
        name: trainName,
        destination: trainDestination,
        originalTrain: firstTrain,
        frequency: trainFrequency,
      
    });

});

database.ref().on("child_added", function (childSnapshot, prevChildKey) {

    console.log(childSnapshot.val().name);
    console.log(childSnapshot.val().destination);
    console.log(childSnapshot.val().originalTrain);
    console.log(childSnapshot.val().frquency);

//moment.js to do the math for the in-class example (employee data management)
    var firstTrainTime = moment.unix(childSnapshot.val().originalTrain).format("MM/DD/YY");

    var FrequencyTrain = moment().diff(moment.unix(childSnapshot.val().originalTrain, "X"), "months");
    console.log(FrequencyTrain);

    var minAway = FrequencyTrainWorked * childSnapshot.val().frequency;
    console.log(minAway);

    $("#TrainInfo").append("<tr>" +
        "<td>" + childSnapshot.val().name + "</td>" +
        "<td>" + childSnapshot.val().destination + "</td>" +
        "<td>" + firstTrainTime + "</td>" +
        "<td>" + FrequencyTrain + "</td>" +
        //"<td> </td>" +
        "<td>" + childSnapshot.val().frequency + "</td>" +
        //"<td> </td>" +
        "<td>" + minAway + "</td>" +
        "</tr>");



}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
});

