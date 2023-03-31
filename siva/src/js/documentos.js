const select = document.querySelector("#usuarios").value;
const exped = document.querySelector("#expediente").value;
const usuarioActivo = localStorage.getItem('usuario')
var usuario = document.getElementById("nombreusuario")
usuario.innerHTML = usuarioActivo;

console.log(usuarioActivo)

$("#usuarios").one("click", function () {
$.ajax({
  type: "GET",
  url: "https://nodejsapisiva-production.up.railway.app/empleados/",
  async: true,
  success: function (datos) {
      let options = "<option value='0' selected disabled>Selecciona un usuario</option>"
      console.log(datos)
      $.map(datos, function (a) {
          options += ` 
          <option value="${a.id}">${a.nombre}</option>
         `
      })

      $("#usuarios").empty().append(options);
     
  }
}).fail(function (e) {
  console.log(e)
});
})

$("#expediente").one("click", function () {
  const agarrado = document.querySelector("#usuarios").value;
  const url1 = "https://nodejsapisiva-production.up.railway.app/documentos/"+ agarrado +"";
  console.log(url1)
  $.ajax({
    type: "GET",
    url: url1,
    async: true,
    success: function (datos) {
      console.log(datos)
    var cargaD = document.getElementById("comprobanteDomicilio")
    cargaD.innerHTML = datos.CompDomicilio
    var carga1 = document.getElementById("caratulaEdoC")
    carga1.innerHTML = datos.caratulaEdoC
    var carga2 = document.getElementById("nominaC")
    carga2.innerHTML = datos.ComNomina
    var carga3 = document.getElementById("clabePer")
    carga3.innerHTML = datos.clabeP
      

      /*let options = "<option value='0' selected disabled>Selecciona un usuario</option>"
        $.map(datos, function (a) {
            options += ` 
            <option value="${a.id_usuario}">${a}</option>
           `
        })
  
        $("#expediente").empty().append(options);
        const aprobado = console.log(datos.aprobadoCdD.data[0])
        */
        
    }
  }).fail(function (e) {
    console.log(e)
  });
  })

function aver() {
  const select = document.querySelector("#usuarios").value;
  console.log(select)

  const nombreocupado = document.getElementById("usuarios");
  const seleccionado = nombreocupado.options[nombreocupado.selectedIndex].text;
      localStorage.setItem('nombre',seleccionado)
      const name = localStorage.getItem('nombre')
        console.log(name + " Si sirvio")

  
  }

  
