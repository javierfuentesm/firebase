var config = {
    apiKey: "AIzaSyAhfE_suTjV7EsT-gOluBtnecTeCiI6TKk",
    authDomain: "polilibro.firebaseapp.com",
    databaseURL: "https://polilibro.firebaseio.com",
    projectId: "polilibro",
    storageBucket: "polilibro.appspot.com",
    messagingSenderId: "616532161554"
  };
  firebase.initializeApp(config);
  var contador=0;

var db2 = firebase.database();
var ref = db2.ref("admin/");


var studentname = document.getElementById('studentname');
  var groupname = document.getElementById('groupname');
  var password = document.getElementById('password');
  var groupform = document.getElementById('groupform');
  var subetarea = document.getElementById('subetarea');
  var logout = document.getElementById('logout');


  

firebase.auth().onAuthStateChanged(function (user)
{            

    if (user)
    {
        console.log("Tenemos usuario");
        var refgrupo =db2.ref('Grupos/');
     
        refgrupo.once("value").then(function(snapshot) {
      
          snapshot.forEach(function(childSnapshot) {
          var refalumno =db2.ref('Grupos/'+childSnapshot.key+ "/Alumnos/");
          refalumno.once("value").then(function(childchildsnapshot) {
      
          if(childchildsnapshot.child(firebase.auth().currentUser.uid).exists()){
              console.log("Print adentro")
              registrogrupo.style.display = "none";
      
      
          } 
         
          });
            
          });
         
      });    
     

    }
    else
    {
        alert("No has iniciado sesion");
        location.href ="login.html";

    }
});
logout.addEventListener("click",function(){
  firebase.auth().signOut();

});
