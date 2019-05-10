
  var config = {
    apiKey: "AIzaSyAhfE_suTjV7EsT-gOluBtnecTeCiI6TKk",
    authDomain: "polilibro.firebaseapp.com",
    databaseURL: "https://polilibro.firebaseio.com",
    projectId: "polilibro",
    storageBucket: "polilibro.appspot.com",
    messagingSenderId: "616532161554"
  };
  firebase.initializeApp(config);

var db2 = firebase.database();
var ref = db2.ref("admin/");



  var groupname = document.getElementById('groupname');
  var password = document.getElementById('password');
  var groupform = document.getElementById('groupform');


firebase.auth().onAuthStateChanged(function (user)
  {
      if (user)
      {
          console.log("Tenemos usuario");
          
      }
      else
      {
          console.log("No has iniciado sesion");
          location.href ="login.html";

      }
  });



  
  groupform.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!groupname.value || !password.value) return null



    var refGrupos= db2.ref('Grupos/');
    
 
    refGrupos.once("value").then(function(snapshot)
    {
        snapshot.forEach(function(childSnapshot) {
        if(childSnapshot){
            if (childSnapshot.child("contra").val()==password.value&&childSnapshot.child("name").val()==groupname.value)
            {
                console.log("Bienvenido eres La contraseña es correcta");
            }
            else
            {
                console.log("Contraseña incorrecta");
            }

        }
        else
        console.log("No existe el grupo");


       
    });   
}); 

});

  
  