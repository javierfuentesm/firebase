var config = {
  apiKey: "AIzaSyAhfE_suTjV7EsT-gOluBtnecTeCiI6TKk",
  authDomain: "polilibro.firebaseapp.com",
  databaseURL: "https://polilibro.firebaseio.com",
  projectId: "polilibro",
  storageBucket: "polilibro.appspot.com",
  messagingSenderId: "616532161554"
};
firebase.initializeApp(config);
var db = firebase.database();

var ref = db.ref("admin/");


var groupForm = document.getElementById('groupForm');
var groupname = document.getElementById('groupname');
var password = document.getElementById('password');
var hiddenId   = document.getElementById('hiddenId');
var logout = document.getElementById('logout');


firebase.auth().onAuthStateChanged(function (user)
{
    if (user)
    {
        console.log("Tenemos usuario");
        // console.log(user.uid);

        var user=firebase.auth().currentUser;
           
                var email_id=user.email;
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
                          console.log("Eres alumno no profesor no puedes acceder aqui");
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


groupForm.addEventListener('submit', (e) => {
  e.preventDefault();

  if (!groupname.value || !password.value) return null

  var id = hiddenId.value || Date.now()

  db.ref('Grupos/'+ id).set({
    contra: password.value,
    name: groupname.value

  });

  groupname.value = '';
  password.value = '';
  hiddenId.value = '';
});


var grupos = document.getElementById('grupos');
var gruposRef = db.ref('/Grupos');

gruposRef.on('child_added', (data) => {
  var li = document.createElement('li')
  li.id = data.key;
  li.innerHTML = gruposTemplate(data.val())
  grupos.appendChild(li);
})


gruposRef.on('child_changed', (data) => {
  var grupoNode = document.getElementById(data.key);
  grupoNode.innerHTML = gruposTemplate(data.val());
});

gruposRef.on('child_removed', (data) => {
  var grupoNode = document.getElementById(data.key);
  grupoNode.parentNode.removeChild(grupoNode);
});

grupos.addEventListener('click', (e) => {
  var grupoNode = e.target.parentNode;
  // UPDATE REVEIW
  if (e.target.classList.contains('edit')) {
    password.value = grupoNode.querySelector('.contra').innerText;
   groupname.value= grupoNode.querySelector('.name').innerText;
    hiddenId.value = grupoNode.id;

  }

  // DELETE REVEIW
  if (e.target.classList.contains('delete')) {
    var id = grupoNode.id;
    console.log(id);
    db.ref('Grupos/' + id).remove();
  }
});



function gruposTemplate({name,contra}) {
  return `
    <div class='name'>${name}</div>
    <div class='contra'>${contra}</div>
    <button class='delete'>Delete</button>
    <button class='edit'>Edit</button>
  `
}
