var config = {
    apiKey: "AIzaSyALFpcpOD3eARi7XWpNUjVx9_YpVFGovpE",
    authDomain: "trainschedule-37e01.firebaseapp.com",
    databaseURL: "https://trainschedule-37e01.firebaseio.com",
    projectId: "trainschedule-37e01",
    storageBucket: "",
    messagingSenderId: "391108227282"
  };
  firebase.initializeApp(config);
  
  var getplacephoto = "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=CnRtAAAATLZNl354RwP_9UKbQ_5Psy40texXePv4oAlgP4qNEkdIrkyse7rPXYGd9D_Uj1rVsQdWT4oRz4QrYAJNpFX7rzqqMlZw2h2E2y5IKMUZ7ouD_SlcHxYq1yL4KbKUv3qtWgTK0A6QbGh87GB3sscrHRIQiG2RrmU_jF4tENr9wGS_YxoUSSDrYjWmrNfeEHSGSc3FyhNLlBU&key=AIzaSyCszsmnxskb-X0fIPmiEBfDc2okUgY5jFw";

  var database = firebase.database();


  var name = "";
    var destination = "";
    var firstTime = "";
    var frequency = "";
   
    
    $("#add-train").on("click", function(event) {
        event.preventDefault();
        name = $("#name-input").val().trim();
      destination = $("#destination").val().trim();
      firstTime = $("#first-train").val().trim();
      frequency = $("#frequency").val().trim();
         
   
        database.ref().push({
        name: name,
        destination: destination,
        frequency: frequency,
        firstTime: firstTime,
        
      });
    });

    database.ref().on('child_added', function(childSnapshot, prevChildKey) {

        console.log(childSnapshot.val());
        console.log(childSnapshot.val().name);
        console.log(childSnapshot.val().destination);
        console.log(childSnapshot.val().firstTime);
        console.log(childSnapshot.val().frequency);
       
           


var Time = moment(childSnapshot.val().firstTime, 'HH:mm');
var trainTime = moment(Time).format('HH:mm');
var Frequency = childSnapshot.val().frequency;
            
           
var timediff = moment().diff(moment(trainTime, 'HH:mm'), "minutes");
console.log("time difference: " + timediff);
var MinutesToArrive = Frequency - timediff % Frequency;
console.log("minutes till arrival: " + MinutesToArrive);
var nextTrain = moment().add(MinutesToArrive, 'minutes').format('HH:mm');
console.log("next train: " + nextTrain);


 $("#traintable1").append("<tr><td>" + childSnapshot.val().name + 
                        "</td><td>" + childSnapshot.val().destination +
                        "</td><td>" + childSnapshot.val().frequency + 
                        "</td><td>" + childSnapshot.val().firstTime +
                        "</td><td>" + nextTrain + 
                        "</td><td>" + MinutesToArrive + "</td></tr>")
    }, function(errorObject) {
        console.log("Errors handled: " + errorObject.code);
      });

