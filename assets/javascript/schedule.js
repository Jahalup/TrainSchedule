var config = {
    apiKey: "AIzaSyD611HrWf0i-iiMxKbKPgGmaCdmlItvSO8",
    authDomain: "trainschedul-53877.firebaseapp.com",
    databaseURL: "https://trainschedul-53877.firebaseio.com",
    projectId: "trainschedul-53877",
    storageBucket: "trainschedul-53877.appspot.com",
    messagingSenderId: "579877331910"
  };
  firebase.initializeApp(config);

  var database = firebase.database();
  var trainCount = 0;
//   var trains = [];
  var name = "";
    var destination = "";
    var firstTime = 0;
    var frequency = "";


    $("#add-train").on("click", function(event) {
        event.preventDefault();
        name = $("#name-input").val().trim();
      destination = $("#destination").val().trim();
      firsttrain = $("#first-train").val().trim();
      frequency = $("#frequency").val().trim();

   
      database.ref().set({
        name: name,
        destination: destination,
        firsttrain: firsttrain,
        frequency: frequency
      });
    });

    database.ref().on("value", function(snapshot) {

        console.log(snapshot.val());
        console.log(snapshot.val().name);
        console.log(snapshot.val().destination);
        console.log(snapshot.val().firsttrain);
        console.log(snapshot.val().frequency);
// New table row for each train
        var trainItem = $("<tr>");
// New table data
            var trainname = $("<td>");
            var traindest = $("<td>");
            var trainfreq = $("<td>");
            var trainfirst = $("<td>");
//  Giving each train a unique id
        trainItem.attr("id", "item-" + trainCount);
        $("#traintable").append(trainItem);
        trainname.attr("id", "item-" + trainCount);
        traindest.attr("id", "item-" + trainCount);
        trainfreq.attr("id", "item-" + trainCount);
        trainfirst.attr("id", "item-" + trainCount);
        trainCount++;

// Adding the text to the table from the database
        $(trainname).text(snapshot.val().name);
        $(traindest).text(snapshot.val().destination);
        $(trainfreq).text(snapshot.val().frequency);
        $(trainfirst).text(snapshot.val().firsttrain);

// Appending the items to the new row
        $(trainItem).append(trainname);
        $(trainItem).append(traindest);
        $(trainItem).append(trainfreq);
        $(trainItem).append(trainfirst);
    
    }, function(errorObject) {
        console.log("Errors handled: " + errorObject.code);
      });