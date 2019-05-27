
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
  var about = document.getElementById('about');
  var subetarea;

  
  


firebase.auth().onAuthStateChanged(function (user)
  {            

      if (user)
      {
          console.log("Tenemos usuario");



          
        var user=firebase.auth().currentUser;
           
        var email_verified=user.emailVerified;
        if(email_verified){

          var refgrupo =db2.ref('Grupos/');
         
          refgrupo.once("value").then(function(snapshot) {
        
            snapshot.forEach(function(childSnapshot) {
            var refalumno =db2.ref('Grupos/'+childSnapshot.key+ "/Alumnos/");
            refalumno.once("value").then(function(childchildsnapshot) {
        
            if(childchildsnapshot.child(firebase.auth().currentUser.uid).exists()){
                registrogrupo.style.display = "none";

                var reftarea =db2.ref('Grupos/'+childSnapshot.key+ "/Alumnos/"+firebase.auth().currentUser.uid+"/Tareas");


                reftarea.on("value",function(tareassnapshot) {                      
                                  
                  
                  subetarea=document.createElement("div");
                  subetarea.id="subetarea";
                  subetarea.setAttribute("class","container");
                  about.appendChild(subetarea);
                


                  tareassnapshot.forEach(function(childtareassnapshot) {                    

                   

                   var h = document.createElement("H1");
                   var t = document.createTextNode(childtareassnapshot.child("Nombre").val());
                   var x = document.createElement("H4");
                   var l = document.createElement("H4");
                   var k = document.createElement("H4");


                   var y = document.createTextNode("Calificacion :"+ childtareassnapshot.child("Calificacion").val());
                   var z = document.createTextNode("Comentario :" + childtareassnapshot.child("Comentario").val());

                   if(childtareassnapshot.child("Archivo").val()==null){
                    var j = document.createTextNode("Archivo :" + "Aún no has subido tu tarea");

                    var br = document.createElement("br"); 

                    var fileButton =document.createElement('input');
                    fileButton.type="file";
 
 
                    x.appendChild(y);
                    x.appendChild(br);
 
                    l.appendChild(z);
                    l.appendChild(br)
 
                    h.appendChild(t);
                    h.appendChild(br)
 
                    k.appendChild(j);
                    k.appendChild(br)
 
                    
                    
                    subetarea.appendChild(document.body.appendChild(h));
                    subetarea.appendChild(document.body.appendChild(x));
                    subetarea.appendChild(document.body.appendChild(l));                   
                    subetarea.appendChild(document.body.appendChild(k));                 
 
                    subetarea.appendChild(fileButton);

                   }else{
                   // var j = document.createTextNode("Archivo :" + childtareassnapshot.child("Archivo").val());

                   var linkElement = document.createElement('a');
                    linkElement.href = childtareassnapshot.child("Archivo").val();
                    var j = document.createElement("img");
                    j.setAttribute("src", "img/folder.png");
                    linkElement.appendChild(j);
                   
                    var br = document.createElement("br"); 

                    var fileButton =document.createElement('input');
                    fileButton.type="file";
 
 
                    x.appendChild(y);
                    x.appendChild(br);
 
                    l.appendChild(z);
                    l.appendChild(br)
 
                    h.appendChild(t);
                    h.appendChild(br)
 
                  
                    
                    subetarea.appendChild(document.body.appendChild(h));
                    subetarea.appendChild(document.body.appendChild(x));
                    subetarea.appendChild(document.body.appendChild(l));                   
                    subetarea.appendChild(linkElement);            
 
                    subetarea.appendChild(fileButton);

                   }
                  
               



                   fileButton.addEventListener('change', function(e){
                    var storage=firebase.storage();
                    var file=e.target.files[0];     
                    var storageRef=storage.ref('carpeta/'+file.name);
                    var uploadTask=storageRef.put(file);
                       
                        uploadTask.on('state_changed', function(snapshot){
                        },function(error){
                        },function(){
                            uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                            
                              var reftarea2 =db2.ref('Grupos/'+childSnapshot.key+ "/Alumnos/"+firebase.auth().currentUser.uid+"/Tareas/"+childtareassnapshot.child("Nombre").val());
                             console.log(reftarea2);
                              reftarea2.update({
                              Archivo:downloadURL                      
                            });
                            alert("Se subio exitosamente tu tarea");                 
                            document.getElementById("subetarea").remove();
                                                 
                          });
                            
                        });
                           
                      });
                            
                    });
                            
                  });
                } 
              });
            });
          });    
                        
           }
        else{
        
            alert("Aun no has verificado tu correo");
            location.href ="login.html";

        }         
        
    
        
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
        
        
        
          
          
              
           
       