var config =
{
    apiKey: "AIzaSyAhfE_suTjV7EsT-gOluBtnecTeCiI6TKk",
    authDomain: "polilibro.firebaseapp.com",
    databaseURL: "https://polilibro.firebaseio.com",
    projectId: "polilibro",
    storageBucket: "polilibro.appspot.com",
    messagingSenderId: "616532161554"
};
firebase.initializeApp(config);
var db = firebase.database();
var btnlogin = document.getElementById("boton");
var nombre = document.getElementById("nombre");
var logout = document.getElementById('logout');


var email = document.getElementById("email");
var password = document.getElementById("password");
var ref = db.ref("administrador/");





  
btnlogin.addEventListener("click",function()
{
    event.preventDefault();

    console.log(nombre.value);
    console.log(email.value);
    console.log(password.value);
    firebase.auth().onAuthStateChanged(function (user)
{
    if (user)
    {
        console.log("Tenemos usuario");
        // console.log(user.uid);

        var user=firebase.auth().currentUser;
           
                var email_verified=user.emailVerified;
                if(email_verified){
                    ref.once("value").then(function(snapshot)
                    {
                        if (snapshot.hasChild(user.uid))
                        {
                            console.log("Bienvenido eres administrador");
                        }
                        else
                        {
                          console.log("Eres alumno o profesor no puedes acceder aqui");
                          firebase.auth().signOut();
                        }
                    });               
                   }
                else{
                
                    alert("Aun no has verificado tu correo");

                    location.href ="login.html";

                }         
                
            
        
    }
    else
    {
        console.log("No tenemos usuario");
        location.href ="login.html";

    }
});
logout.addEventListener("click",function(){
    firebase.auth().signOut();

  });

      firebase.auth().createUserWithEmailAndPassword(email.value, password.value)
      .then((authData) => {
          console.log("User created successfully with payload-", authData);
          var user=firebase.auth().currentUser;
          user.sendEmailVerification().then(function(){
             alert("La verificacion fue enviada al correo ingresado,verifica antes de inciar sesion")
             
          
             
             db.ref('admin/'+firebase.auth().currentUser.uid).set({
                Nombre:nombre.value                      
        
              });

              
         

             //location.href ="index.html";

          }).catch(function(error){
              window.alert("Error: "+error.message)
          });

        
      }).catch((_error) => {
          console.log(" Se produjo un error", _error);
      })
    
});
