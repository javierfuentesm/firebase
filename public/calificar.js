

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


  var CalificacionForm = document.getElementById('CalificacionForm');
  var grupo = document.getElementById('grupo');

  var alumno = document.getElementById('alumno');
  var tarea = document.getElementById('tarea');

  var calificacion = document.getElementById('calificacion');
  var comentario = document.getElementById('comentario');
  var logout = document.getElementById('logout');

  firebase.auth().onAuthStateChanged(function (user)
  {
      if (user)
      {
          console.log("Tenemos usuario");
          // console.log(user.uid);
          var administrador;
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
      else
      {
          console.log("No tenemos usuario");
          location.href ="login.html";

      }
  });

  logout.addEventListener("click",function(){
    firebase.auth().signOut();

  });






  var refGrupos= db2.ref('Grupos/');
  refGrupos.on("child_added",function(snapshot){
    var z = document.createElement("option");
    z.setAttribute("value", snapshot.key);
    var t = document.createTextNode(snapshot.val().name);
    z.appendChild(t);
    grupo.appendChild(z);
  });



// Metodos para eliminar las tareas del grupo seleccionado

//Funcion para que por cada grupo seleccioando despliegue los alumnos de ese Grupo
function selectalumno() {
  while (alumno.hasChildNodes()) {
      alumno.removeChild(alumno.firstChild);
  }
var refAlumno= db2.ref('Grupos/'+grupo.value+"/Alumnos/");
refAlumno.on("child_added",function(snapshot){


            var u = document.createElement("option");
            u.setAttribute("value",snapshot.key);
            var w = document.createTextNode(snapshot.val().Nombre);
            u.appendChild(w);
            alumno.appendChild(u);
  });

  //Para seleccionar la tarea
  while (tarea.hasChildNodes()) {
      tarea.removeChild(tarea.firstChild);
  }

  var refTarea= db2.ref('Grupos/'+grupo.value+"/Alumnos/"+alumno.value+"/Tareas");

  refTarea.on("child_added",function(snapshot){

    var x = document.createElement("option");
    x.setAttribute("value",snapshot.val().Nombre);
    var y = document.createTextNode(snapshot.val().Nombre);
    x.appendChild(y);
    tarea.appendChild(x);
    });



}

function selectcalificacion(){


      var refCalificacion= db2.ref('Grupos/'+grupo.value+"/Alumnos/"+alumno.value+"/Tareas/"+tarea.value);
      refCalificacion.once("value").then(function(snapshot) {
            comentario.value=snapshot.val().Comentario;
            calificacion.value=snapshot.val().Calificacion;
          //  var changedPost = snapshot.child("Calificacion").val(); Este metodo tambien funciona
        });


}

CalificacionForm.addEventListener('submit', (e) => {
  e.preventDefault();
  if (!calificacion.value || !comentario.value) return null

  var refCalificar= db2.ref('Grupos/'+grupo.value+"/Alumnos/"+alumno.value+"/Tareas/"+tarea.value).update({
    Nombre:tarea.value,
    Calificacion: calificacion.value,
    Comentario: comentario.value

  });

  alert("Actualizado con exito")


});
