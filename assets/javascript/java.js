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

//Variables for data base
var database = firebase.database();
var trainName = "";
var trainDestination = "";
var frequencyTrain = "";
var arriveNext = "";


$("#addTrain").on("click", function (event) {
//click button to add more trains
    event.preventDefault();
//using moment.js to display time in the table and form
    trainName = $("#name-input").val().trim();
    trainDestination = $("#destination").val().trim();
    frequencyTrain = moment($("#frequency").val().trim(), "m mm").format("X");
    arriveNext = moment($("#first-input").val().trim(), "m mm").format("X");


    database.ref().push({
        name: trainName,
        destination: trainDestination,
        firstTrain: frequencyTrain,
        next: arriveNext,
        //        dateAdded: firebase.database.ServerValue.TIMESTAMP
    });

});

database.ref().on("child_added", function (childSnapshot, prevChildKey) {

    console.log(childSnapshot.val().name);
    console.log(childSnapshot.val().role);
    console.log(childSnapshot.val().firstTrain);
    console.log(childSnapshot.val().next);

//moment.js to display time in form and table
    var originalTrainUniform = moment.unix(childSnapshot.val().firstTrain).format("HH:mm:ss");

    var frequencyofTrain = moment().diff(moment.unix(childSnapshot.val().firstTrain, "X"), "minutes");
    console.log(frequencyofTrain);

    var trainMinAway = moment.unix(childSnapshot.val().frequencyofTrain).format("HH:mm:ss");
    console.log(trainMinAway);

    $("#trainInfo").append("<tr>" +
        "<td>" + childSnapshot.val().name + "</td>" +
        "<td>" + childSnapshot.val().destination + "</td>" +
        "<td>" + originalTrainUniform + "</td>" +
        "<td>" + frequencyofTrain + "</td>" +
        //"<td> </td>" +
        "<td>" + childSnapshot.val().minAway + "</td>" +
        //"<td> </td>" +
        "<td>" + trainMinAway + "</td>" +
        "</tr>");

   

}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
});

