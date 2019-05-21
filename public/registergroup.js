
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
  var registrogrupo = document.getElementById('registrogrupo');
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

  
  
  



  //Se agrega un event listener para detectar el submit que esta en el html
  groupform.addEventListener('submit', (e) => {
    e.preventDefault();
    //se validan que no esten vacios los campos
    if (!groupname.value || !password.value) return null

//Se crea una refrencia a grupos ya que el key de cada grupo es diferente a su nombre tenemos que recorrerlos todos 
//para averiguar cual es 
    var refGrupos= db2.ref('Grupos/');
    
 
    refGrupos.once("value").then(function(snapshot)
    {
        //Recorremos todos los nodos
        snapshot.forEach(function(childSnapshot) {
        if(childSnapshot){
            //Se valida que los respectivos nodos hijos coincidan con los datos provistos por el alumno
            if (childSnapshot.child("contra").val()==password.value&&childSnapshot.child("name").val()==groupname.value)
            {
               // console.log("Bienvenido eres La contraseña es correcta");
                
                //uNA VEZ QUE YA SE ENCONTRO EL GRUPO SELECCIONADO Y COINCIDEN LOS DATOS
               
                  
                     
                 
                        //Se usa snapshot key porque no concoemos el key del grupo y se insertan los valores deseados
                                        //se obtiene el uid para poder insertarlo en el grupo correspondiente

                      db2.ref('Grupos/'+childSnapshot.key+ "/Alumnos/"+firebase.auth().currentUser.uid).set({
                        Nombre:studentname.value                      
                
                      });
                 
                    alert("El registro fue exitoso");
                    location.href ="alumno.html";

               
            }
            else
            {
                console.log("Contraseña incorrecta o nombre de grupo incorrecto");
            }

        }
             
    });   
}); 

});



  
  