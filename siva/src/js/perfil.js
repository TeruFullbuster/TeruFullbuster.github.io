
function cargadatos() {  
    
    const name = localStorage.getItem('usuario')
    const apellidoP = localStorage.getItem('apellidoP')
    const apellidoM = localStorage.getItem('apellidoM')
    const salario = localStorage.getItem('salario')
    const celular = localStorage.getItem('celular')
    const email = localStorage.getItem('email')
    const rol = localStorage.getItem('rol')

    console.log(name +" "+ apellidoM + "" + apellidoP)
    document.getElementById('nombre').textContent = (" "+ name +" "+ apellidoP + " " + apellidoM)
    document.getElementById('salario').textContent = "$" +salario;
    document.getElementById('email').textContent = email;
    document.getElementById('celular').textContent = celular;

    document.getElementById('nombreBloc').value = (" "+ name +" "+ apellidoP + " " + apellidoM)
    document.getElementById('salarioedit').value = salario;
    document.getElementById('email').value = email;
    document.getElementById('celular').value = celular;
 
}
cargadatos();