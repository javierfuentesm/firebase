
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


  var groupname = document.getElementById('groupname');
  var password = document.getElementById('password');
  var groupform = document.getElementById('groupform');
  var registrogrupo = document.getElementById('registrogrupo');
  var logout = document.getElementById('logout');
  var about = document.getElementById('about');
  var fileButton = document.getElementById('fileButton');

  var subetarea;

  
  


firebase.auth().onAuthStateChanged(function (user)
  {            

      if (user)
      {
          console.log("Tenemos usuario");



          
        var user=firebase.auth().currentUser;
           
        var email_verified=user.emailVerified;
        if(email_verified){

      
         

          var refmaterial =db2.ref('Archivos/');
         
         
          



              refmaterial.on("value",function(materialessnapshot) {                      
                                  
                  
                  subetarea=document.createElement("div");
                  subetarea.id="subetarea";
                  subetarea.setAttribute("class","container");
                  about.appendChild(subetarea);
                


                  materialessnapshot.forEach(function(childtareassnapshot) {                    

                   

                   var h = document.createElement("H1");
                   var t = document.createTextNode(childtareassnapshot.child("nombre").val());
                   var x = document.createElement("H4");
                 

                
                 
                   // var j = document.createTextNode("Archivo :" + childtareassnapshot.child("Archivo").val());

                   var linkElement = document.createElement('a');
                    linkElement.href = childtareassnapshot.child("ruta").val();
                    var j = document.createElement("img");
                    j.setAttribute("src", "img/folder.png");
                    linkElement.appendChild(j);
                   
                    var br = document.createElement("br"); 

               
 
 
                    x.appendChild(br);
 
                  
                    h.appendChild(t);
                    h.appendChild(br)
 
                  
                    
                    subetarea.appendChild(document.body.appendChild(h));
                    subetarea.appendChild(document.body.appendChild(x));
                    subetarea.appendChild(linkElement);

 

                   
                  
               



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
        
        
          
      
    
        
      


          
          
              
           
       