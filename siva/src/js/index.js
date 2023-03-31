
async function  inicioSession(){	

        mail = document.getElementById('mail').value;
        contrasenia1 = document.getElementById('contrasenia').value;
        
  
        const result = await $.ajax({
          type: "POST",
          url: "http://wssiva.sivaweb.mx/ControlUsuarios/IniciarSesion",
          data: {API_USUARIO: {USUARIO:'ADMIN',CONTRASENIA:'Hola123'},USUARIO:{Correo:mail,Contrasenia:contrasenia1}},
          success: async  function (datos) {
  
            console.log(datos)
            console.log(datos.MSG)
            
            if(datos.MSG === "OK") {
            
              var pass1 = document.getElementById("contrasenia").value;
              console.log(pass1);
              localStorage.clear();
    
                  localStorage.setItem('usuario', datos.NOMBRE)
                  localStorage.setItem('email',datos.CORREO)
                  localStorage.setItem('apellidoM', datos.APELLIDO_MATERNO)
                  localStorage.setItem('apellidoP', datos.APELLIDO_PATERNO)
                  localStorage.setItem('celular',datos.TELEFONO)
                  localStorage.setItem('id',datos.ID)
                  localStorage.setItem('contra',contrasenia1)

                   await Swal.fire({
                        icon: 'success',
                        title: 'Inicio de Sesion exitoso',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    window.location.href ="./secciones/Sesion.html"
                    
                }else{
                  
    
                  Swal.fire({
                    icon: 'error',
                    title: 'Error de Inicio de Sesion',
                    showConfirmButton: false,
                    timer: 1500
                })
            console.log("Algo No funciona elws");
    
                    
                }
          }          
          }).fail(function (e) {
            console.log(e)
        });
        

}

