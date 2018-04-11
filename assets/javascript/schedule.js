var config = {
    apiKey: "AIzaSyALFpcpOD3eARi7XWpNUjVx9_YpVFGovpE",
    authDomain: "trainschedule-37e01.firebaseapp.com",
    databaseURL: "https://trainschedule-37e01.firebaseio.com",
    projectId: "trainschedule-37e01",
    storageBucket: "",
    messagingSenderId: "391108227282"
  };
  firebase.initializeApp(config);
  

  var database = firebase.database();


    var name = "";
    var destination = "";
    var firstTime = "";
    var frequency = "";
   
// Trimming and storing user input
    $("#add-train").on("click", function(event) {
        event.preventDefault();
        name = $("#name-input").val().trim();
      destination = $("#destination").val().trim();
      firstTime = $("#first-train").val().trim();
      frequency = $("#frequency").val().trim();
         
//    Pushing to the database
        database.ref().push({
        name: name,
        destination: destination,
        frequency: frequency,
        firstTime: firstTime
        
      });

//   Clearing the form input
      $("#traininput")[0].reset();
    });


database.ref().on('child_added', function(childSnapshot, prevChildKey) {

        console.log(childSnapshot.val());
        console.log(childSnapshot.val().name);
        console.log(childSnapshot.val().destination);
        console.log(childSnapshot.val().firstTime);
        console.log(childSnapshot.val().frequency);
       

// Formatting the time for moment
var Time = moment(childSnapshot.val().firstTime, 'HH:mm');
console.log("TIME" + Time);
var trainTime = moment(Time).format('HH:mm');
console.log("converted time" + trainTime);
var trainTime2 = moment(trainTime,'HH:mm').subtract(1, 'years');
var Frequency = childSnapshot.val().frequency;

// Calculating the time remaining until next train arrival
var timediff = moment().diff(moment(trainTime2, 'HH:mm'), "minutes");
var MinutesToArrive = Frequency - timediff % Frequency;

// Calculating the time of next arrival
var nextTrain = moment().add(MinutesToArrive, 'minutes').format('HH:mm');

console.log("time difference: " + timediff);
console.log("minutes till arrival: " + MinutesToArrive);
console.log("next train: " + nextTrain);



// Appending data to the html card and table
$("#bound").text(childSnapshot.val().destination);
$("#arrive").text(nextTrain);
$("#minsaway").text(MinutesToArrive);
 $("#traintable1").append("<tr><td>" + childSnapshot.val().name + 
                        "</td><td>" + childSnapshot.val().destination +
                        "</td><td>" + childSnapshot.val().frequency + 
                        "</td><td>" + childSnapshot.val().firstTime +
                        "</td><td>" + nextTrain + 
                        "</td><td>" + MinutesToArrive + "</td></tr>")
    }, function(errorObject) {
        console.log("Errors handled: " + errorObject.code);
      });

