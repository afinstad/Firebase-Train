//Firebase here
var config = {
    apiKey: "AIzaSyBrbuK_0oyooEoqEpIZegge_xIXfpywL0E",
    authDomain: "train-project-fd4a1.firebaseapp.com",
    databaseURL: "https://train-project-fd4a1.firebaseio.com",
    projectId: "train-project-fd4a1",
    storageBucket: "train-project-fd4a1.appspot.com",
    messagingSenderId: "1096779865309"
  };
firebase.initializeApp(config);

//Variables for firebase database
var database = firebase.database();
var trainName = "";
var trainDestination = "";
var firstTrainHere = "";
var Trainfrequency = "";

 
$("#addTrain").on("click", function (event) {
//click button to add more trains
    event.preventDefault();
//using moment.js to display time in the table and form. Trying to figure out why table is not displaying correctly. Thinking that it has either to do with the variable being used or the moment.js. 
    trainName = $("#name-input").val().trim();
    trainDestination = $("#destination").val().trim();
    firstTrainHere = moment($("#first-input").val().trim(), "m mm").format("X");
    Trainfrequency = $("#frequency").val().trim();

// pushes the information to the firebase database
    database.ref().push({
        name: trainName,
        destination: trainDestination,
        firstTrain: firstTrainHere,
        frequency: Trainfrequency,
    });

});

database.ref().on("child_added", function (childSnapshot, prevChildKey) {

    console.log(childSnapshot.val().name);
    console.log(childSnapshot.val().destination);
    console.log(childSnapshot.val().firstTrain);
    console.log(childSnapshot.val().frequency);

//moment.js to display time in form and table
    var firstTrain = moment.unix(childSnapshot.val().frequency).format("HH:mm");

    var frequencyofTrain = moment.unix(childSnapshot.val().firstTrain, "X").format("minutes");
    console.log(frequencyofTrain);

    var trainMinAway = frequency % firstTrain;
    console.log(trainMinAway);
    
    var nextArrive = 

    $("#trainInfo").append("<tr>" +
        "<td>" + childSnapshot.val().name + "</td>" +
        "<td>" + childSnapshot.val().destination + "</td>" +
        "<td>" + childSnapshot.val().frequency + "</td>" +
        //"<td> </td>" +
        "<td>" + childSnapshot.val().minAway + "</td>" +
        //"<td> </td>" +
        "<td>" + trainMinAway + "</td>" +
        "</tr>");

    	nextArrival: () => {
            // First Time (pushed back 1 year to make sure it comes before current time)
            var trainDepartureCoverted = moment(firstTrainHere, "hh:mm").subtract(1, 'years');
            // get Current Time
            var currentTime = moment();
            //difference between the times
            var diffTime = moment().diff(moment(trainDepartureCoverted), "minutes");
            // Time apart (remainder)
            var timeRemainder = diffTime % firstTrainHere;
            //minutes until Train
            var timeInMinutesTillTrain = frequency - timeRemainder;
            //Next Train
            nextTrain = moment().add(timeInMinutesTillTrain, 'minutes');
            nextTrain = moment(nextTrain).format('h:mm A');
        };
    
        minutesAway: () => {
            // First Time (pushed back 1 year to make sure it comes before current time)
            var trainDepartureCoverted = moment(trainDeparture, "hh:mm").subtract(1, 'years');
            //Current Time
            var currentTime = moment();
            //difference between the times
            var diffTime = moment().diff(moment(trainDepartureCoverted), "minutes");
            // Time apart (remainder)
            var timeRemainder = diffTime % trainFrequency;
            //minutes until Train
            minutesAway = trainFrequency - timeRemainder;
            minutesAway = moment().startOf('day').add(minutesAway, 'minutes').format('HH:mm');
            return moment(minutesAway).format('HH:mm');
        };
        convertFrequency: () => {
            trainFrequency = moment().startOf('day').add(trainFrequency, 'minutes').format('HH:mm');
        }

}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
});

// This is where all the javascript will
 // live for the project that connects the view and model

// controller object
let controller = {

    // capture all the fields in the form area
    captureFormFields: () => {
        $('body').on("click", ".button-add", () => {
            // prevent form from submitting
             event.preventDefault();

             // variables from the form field values
            trainName = $('#name-input').val().trim();
            trainDestination = $('#destination').val().trim();
            firstTrainHere = $('#first-input').val().trim();
            frequency = $('#frequency').val().trim();
          

            // console log all the entries for testing
            // console.log(trainNumber)
            // console.log(trainLine)
            // console.log(trainDestination)
            // console.log(trainDeparture)
            // console.log(trainFrequency)
            // console.log(trainPlatform)
            controller.nextArrival();
            controller.minutesAway();

            // clear all the fields in the form
            $('.form-control').val("");

            model.pushaddTrain();
            // view.updateTrainScheduleTable();

        });
    },

    // Time Calculation functions 

    nextArrival: () => {
       // First Time (pushed back 1 year to make sure it comes before current time)
       var trainDepartureCoverted = moment(trainDeparture, "hh:mm").subtract(1, 'years');
       // get Current Time
       var currentTime = moment();
       //difference between the times
       var diffTime = moment().diff(moment(trainDepartureCoverted), "minutes");
       // Time apart (remainder)
       var timeRemainder = diffTime % trainFrequency;
       //minutes until Train
       var timeInMinutesTillTrain = trainFrequency - timeRemainder;
       //Next Train
       nextTrain = moment().add(timeInMinutesTillTrain, 'minutes');
       nextTrain = moment(nextTrain).format('h:mm A');
   },

   minutesAway: () => {
       // First Time (pushed back 1 year to make sure it comes before current time)
       var trainDepartureCoverted = moment(trainDeparture, "hh:mm").subtract(1, 'years');
       //Current Time
       var currentTime = moment();
       //difference between the times
       var diffTime = moment().diff(moment(trainDepartureCoverted), "minutes");
       // Time apart (remainder)
       var timeRemainder = diffTime % trainFrequency;
       //minutes until Train
       minutesAway = trainFrequency - timeRemainder;
       minutesAway = moment().startOf('day').add(minutesAway, 'minutes').format('HH:mm');
       return moment(minutesAway).format('HH:mm');
   },
   convertFrequency: () => {
       trainFrequency = moment().startOf('day').add(trainFrequency, 'minutes').format('HH:mm');
   }

};

//reset the form. not working. 
function myFunction() {
    document.getElementById("myForm").reset();
}