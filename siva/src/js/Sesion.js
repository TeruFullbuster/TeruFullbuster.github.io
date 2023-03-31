


$('.menu #inicio').hover(function() {
  $('#inicio img').attr('src','./src/menu-inicio2.svg');
}, function() {
$('#inicio img').last().attr('src','./src/menu-inicio1.svg');
});

$('.menu #perfil').hover(function() {
  $('#perfil img').attr('src','./src/menu-perfil2.svg');
}, function() {
$('#perfil img').last().attr('src','./src/menu-perfil1.svg');
});

$('.menu #nueva-cotizacion').hover(function() {
  $('#nueva-cotizacion img').attr('src','./src/menu-nueva-cotizacion2.svg');
}, function() {
$('#nueva-cotizacion img').last().attr('src','./src/menu-nueva-cotizacion1.svg');
});

$('.menu #prospectos').hover(function() {
  $('#prospectos img').attr('src','./src/menu-prospectos2.svg');
}, function() {
$('#prospectos img').last().attr('src','./src/menu-prospectos1.svg');
});

$('.menu #ventas').hover(function() {
  $('#ventas img').attr('src','./src/menu-ventas2.svg');
}, function() {
$('#ventas img').last().attr('src','./src/menu-ventas1.svg');
});

$('.menu #incentivos').hover(function() {
  $('#incentivos img').attr('src','./src/menu-incentivos2.svg');
}, function() {
$('#incentivos img').last().attr('src','./src/menu-incentivos1.svg');
});

$('.menu #notificaciones').hover(function() {
  $('#notificaciones img').attr('src','./src/menu-notificaciones2.svg');
}, function() {
$('#notificaciones img').last().attr('src','./src/menu-notificaciones1.svg');
});

$('.menu #cerrar-sesion').hover(function() {
  $('#cerrar-sesion img').attr('src','./src/menu-cerrar-sesion2.svg');
}, function() {
$('#cerrar-sesion img').last().attr('src','./src/menu-cerrar-sesion1.svg');
});
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