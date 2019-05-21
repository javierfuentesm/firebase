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
var btnlogin = document.getElementById("btn-login");
var email = document.getElementById("login-username");
var password = document.getElementById("login-password");


btnlogin.addEventListener("click",function()
{
    event.preventDefault();
   
    console.log(email.value);

      firebase.auth().createUserWithEmailAndPassword(email.value, password.value)
      .then((authData) => {
          console.log("User created successfully with payload-", authData);
                  location.href ="alumno.html";

          //Write code to use authData to add to Users
      }).catch((_error) => {
          console.log(" Se produjo un error", _error);
      })
    
});
