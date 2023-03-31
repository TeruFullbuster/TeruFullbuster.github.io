
//import javascriptLogo from './javascript.svg'


document.querySelector('#menu').innerHTML = `
<div>
<ul class="menu" id="menu">
    <li id="inicio" onclick="window.location.href='Sesion.html'">
        <img src="../src/img/menu-inicio1.svg" > Inicio
    </li>
    <li id="perfil" onclick="window.location.href='perfil.html'">
        <img src="../src/img/menu-perfil1.svg" >Mi Perfil
    </li>
    <li id="prospectos" onclick="window.location.href='solicitudes.html'">
        <img src="../src/img/menu-prospectos1.svg" > Solicitudes
    </li>
    <li id="nueva-cotizacion" onclick="window.location.href='documentos.html'">
        <img src="../src/img/menu-nueva-cotizacion1.svg" > Documentos
    </li>
    <li id="ventas" onclick="window.location.href='mis-ventas.php'">
        <img src="../src/img/menu-ventas1.svg"> Aprobaciones
    </li>
    <li id="incentivos" onclick="window.location.href='incentivos.php'">
        <img src="../src/img/menu-incentivos1.svg" > Oportunidades
    </li>
    <li id="notificaciones" onclick="window.location.href='notificaciones.php'">
        <img src="../src/img/menu-notificaciones1.svg" > Centro de notificaciones
    </li>
    <li id="cerrar-sesion" onclick="CerrarS();">
        <img src="../src/img/menu-cerrar-sesion1.svg" > Cerrar sesión
    </li>
</ul>

</div>

<script>
$('.menu #inicio').hover(function() {
      $('#inicio img').attr('src','../src/img/menu-inicio2.svg');
}, function() {
    $('#inicio img').last().attr('src','../src/img/menu-inicio1.svg');
  });

  $('.menu #perfil').hover(function() {
      $('#perfil img').attr('src','../src/img/menu-perfil2.svg');
}, function() {
    $('#perfil img').last().attr('src','../src/img/menu-perfil1.svg');
  });

  $('.menu #nueva-cotizacion').hover(function() {
      $('#nueva-cotizacion img').attr('src','../src/img/menu-nueva-cotizacion2.svg');
}, function() {
    $('#nueva-cotizacion img').last().attr('src','../src/img/menu-nueva-cotizacion1.svg');
  });

  $('.menu #prospectos').hover(function() {
      $('#prospectos img').attr('src','../src/img/menu-prospectos2.svg');
}, function() {
    $('#prospectos img').last().attr('src','../src/img/menu-prospectos1.svg');
  });

  $('.menu #ventas').hover(function() {
      $('#ventas img').attr('src','../src/img/menu-ventas2.svg');
}, function() {
    $('#ventas img').last().attr('src','../src/img/menu-ventas1.svg');
  });

  $('.menu #incentivos').hover(function() {
      $('#incentivos img').attr('src','../src/img/menu-incentivos2.svg');
}, function() {
    $('#incentivos img').last().attr('src','../src/img/menu-incentivos1.svg');
  });

  $('.menu #notificaciones').hover(function() {
      $('#notificaciones img').attr('src','../src/img/menu-notificaciones2.svg');
}, function() {
    $('#notificaciones img').last().attr('src','../src/img/menu-notificaciones1.svg');
  });

  $('.menu #cerrar-sesion').hover(function() {
      $('#cerrar-sesion img').attr('src','../src/img/menu-cerrar-sesion2.svg');
}, function() {
    $('#cerrar-sesion img').last().attr('src','../src/img/menu-cerrar-sesion1.svg');
  });
    
</script>
<script>
function openMenu(){
    $("#menu").css('display','block');
    $("#menu").css('position','absolute');
    $("#bar").css('display','none');
    $("#close").css('display','block');
}
function closeMenu(){
    $("#menu").css('display','none');
    $("#bar").css('display','block');
    $("#close").css('display','none');
}
</script>
<script src ="../src/js/index.js"></script>
`

function CerrarS(){  

    var email = localStorage.getItem('email')
    var pass = localStorage.getItem('contra')
    console.log(email)
    $.ajax({
    type: "POST",
    url: `https://wssiva.sivaweb.mx/ControlUsuarios/CerrarSesion`,
    data: {API_USUARIO: {USUARIO:'ADMIN' ,CONTRASENIA:'Hola123'},USUARIO:{Correo:email,Contrasenia:pass}},
    success: async function (datos) {
        console.log(datos)
        var obj =  datos;
        var Respuesta = obj['Mensaje'];
        
          if( Respuesta === 'SESION CERRADA') {
             await  Swal.fire({
                icon: 'success',
                title: 'Cierre de Sesion exitoso',
                showConfirmButton: false,
                timer: 1000
            })
            console.log("Todo Chido Mi rey "+ Respuesta)
            window.location="../InicioSesion.html";
            }
               
    }
  }).fail(function (e) {
    console.log(e)
  });

}  
  

     
