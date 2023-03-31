
  
function datosiniciales() {

  const name = localStorage.getItem('usuario')
  const SNombre = localStorage.getItem('SNom')
  const apellidoP = localStorage.getItem('apellidoP')
  const apellidoM = localStorage.getItem('apellidoM')
  const salario = localStorage.getItem('salario')
  const celular = localStorage.getItem('celular')
  const email = localStorage.getItem('email')
  const monto = localStorage.getItem('MontoPaga')
  //const rol = localStorage.getItem('rol')
  console.log(monto)
  console.log(name +" "+ apellidoP)

  str = monto.replace(',', '');
console.log(str)
  let indice = str.indexOf(".");
// Cortar desde 0 hasta la aparición del primer espacio
  let extraida = str.substring(0, indice);
  console.log("Extraída: ", extraida);

    document.getElementById('Nombre').value = name
    document.getElementById('ApPaterno').value = apellidoP ;
    document.getElementById('ApMaterno').value = apellidoM;
    document.getElementById('Celular').value = celular;
    document.getElementById('monto').value = monto;
    document.getElementById('LTRabajo').value = "Seguro Inteligente";
    document.getElementById('OtrosIngre').value = "NO";
    document.getElementById('GMensual').value = "1000";
    document.getElementById('OtrosDesc').value = "NO";
    document.getElementById('OtrosCred').value = "NO";
    document.getElementById('Casa').value = "5931077407";
    document.getElementById('mail').value = email;
    localStorage.setItem('montobien', extraida)

    if(SNombre != null){
      document.getElementById('SegNombre').value = name
    }else{
      document.getElementById('SegNombre').value = "N/A"
    }

    if(salario != null){
      document.getElementById('NetoMensual').value = salario
    }else{
      document.getElementById('NetoMensual').value = "30000"
    }
  }
datosiniciales();

function iniciarWF(){
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("company_code", "WlOEu7J");
    myHeaders.append("api_key", "3f6f8d46-858d-468c-a12a-9db510539f24");
    myHeaders.append("Cookie", "JSESSIONID=82604B6E1BB08D8089CD0BF98893521D; oam.Flash.RENDERMAP.TOKEN=mryi36ejo");
    
    var raw = JSON.stringify({
      "login": "iortega@va-financiera.mx",
      "workflowName": "Credito de Nomina"
    });
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
   const iniWF = async() =>{
    try {
       const iniciadora = await fetch("https://test.unykoo.com/workfloo/api/v1/workfloo", requestOptions)
       const datos = await iniciadora.json();
        console.log(datos)
        console.log(datos)
       console.log(datos.data)
       console.log(datos.data.idUnykoo)
       console.log(datos.success)
        localStorage.setItem('idUnykoo', datos.data.idUnykoo)

    } catch (error) {
        
    }
   }
   iniWF();
   
}

$('#formInicial').on('submit', function (evt) { 
    evt.preventDefault();
    
    const id = localStorage.getItem('idUnykoo')
    console.log(id)
    console.log("Taco")
    
    pNombre = document.getElementById('Nombre').value
    sNombre = document.getElementById('SegNombre').value
    ApPaterno = document.getElementById('ApPaterno').value
    ApMaterno = document.getElementById('ApMaterno').value
    mail = document.getElementById('mail').value;
    rfc = document.getElementById('RFCC').value;
    CURP = document.getElementById('CURP').value;
    fnaci = document.getElementById('FNacimiento').value;
    celular = document.getElementById('Celular').value;
    LTrabajo = document.getElementById('LTRabajo').value;
    cepe = document.getElementById('cepe').value;
    domi = document.getElementById('Direccion').value;
    montopedido = localStorage.getItem('montobien')
    console.log(fnaci)

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("company_code", "WlOEu7J");
    myHeaders.append("api_key", "3f6f8d46-858d-468c-a12a-9db510539f24");
    
    var raw = JSON.stringify({ 
        "login": "iortega@va-financiera.mx",
        "idUnykoo": id,
        "formName": "Credito de nomina PF",
        "data": {
            "primer_nombre":pNombre,
            "segundo_nombre": "Jose",
            "apellido_paterno":ApPaterno,
            "apellido_materno": ApMaterno,
            "rfc": rfc,
            "72": CURP,  // CURP
            "73": fnaci,  // Fecha de nacimienot
            "direccion": "C.TONATICO MZ4 LT 33 COL. EDO MEX IXTAPALUCA MEXICO",
            "codigo_postal": "56576",
            "bc_pf_caso_ficticio":"SCORE MAYOR A 600",
            "bc_cc_importe": "20000",
            "78": LTrabajo, // Empresa donde labora
            "79":"24 Quincenas", // Periodicidad del credito
            "80":"20000", // Sueldo neto mensual
            "81":"10000", // Otros ingresos mensuales
            "82":"1000", // Gastos mensuales
            "83":"NO", // Otros Creditos
            "75":"+525559860998", //  Tel domicilio
            "84":"NO", //  Tienes otros descuentos via nomina
            "telefono_celular":"+52"+celular, 
            "email": mail
        }
        
    });
    console.log(raw)
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    
      const iniFormulario = async() =>{
        try {
            const iniciadora = await fetch("https://test.unykoo.com/workfloo/api/v1/form", requestOptions)
            const datos = await iniciadora.json();
            console.log(datos)
            console.log(datos.data.idUnykoo)
            
            if(datos.data.idUnykoo != null){
                console.log(datos.data.idUnykoo)
                window.location="../secciones/terminosCond.html"
            }
      } catch (error) {
            
      }
     }
     iniFormulario();     
    
    
 }); 


  function crearcuenta() {
    id1 = localStorage.getItem('idUnykoo')
    id = Math.floor(id1)
        console.log(id1)
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("company_code", "WlOEu7J");
    myHeaders.append("api_key", "3f6f8d46-858d-468c-a12a-9db510539f24");

    var raw = JSON.stringify({
      "login": "iortega@va-financiera.mx",
      "idUnykoo": id
    });
 console.log(raw)
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    const iniWF = async() =>{
        try {
            const iniciadora = await fetch("https://test.unykoo.com/workfloo/api/v2/nip/createCuenta", requestOptions)
            
            console.log(iniciadora)
            if(iniciadora.status === 200){
                console.log("todo bien vamonos")
                window.location="../secciones/validadorNIP.html"
            }else{
                console.log("Algo esta mal")
            }
      } catch (error) {
            
      }
    }
    iniWF();

}

function validadorNIP() {  

  id1 = localStorage.getItem('idUnykoo')
  id = Math.floor(id1)
const nip = document.getElementById('nipi').value
const nip2 = document.getElementById('nipi2').value
console.log( id +nip + nip2)

if(nip === nip2){
  nipF1();
}else{
  alert('Los Nip, no coindicen')
}


  function nipF1() {

    const nip = document.getElementById('nipi').value
    var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append("company_code", "WlOEu7J");
myHeaders.append("api_key", "3f6f8d46-858d-468c-a12a-9db510539f24");
id1 = localStorage.getItem('idUnykoo')
id = Math.floor(id1)
nipB = Math.floor(nip)
var raw = JSON.stringify({
  "login": "iortega@va-financiera.mx",
  "idUnykoo": id,
  "nip": nipB,
});
console.log(raw)
var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

 const carga = async() => {
   const datos = await fetch("https://test.unykoo.com/workfloo/api/v2/nip/firstConfirm", requestOptions)
    console.log(datos)
    console.log(datos.status)
    if(datos.status === 200){
      nipF2();
    }else{
      alert("nip Erroneo")
    }

  }
  carga();
  }


  function nipF2() {

    const nip = document.getElementById('nipi').value
    var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("company_code", "WlOEu7J");
  myHeaders.append("api_key", "3f6f8d46-858d-468c-a12a-9db510539f24");
  myHeaders.append("Cookie", "JSESSIONID=82604B6E1BB08D8089CD0BF98893521D; oam.Flash.RENDERMAP.TOKEN=mryi36ejo");
  id1 = localStorage.getItem('idUnykoo')
  id = Math.floor(id1)
  nipB = Math.floor(nip)
var raw = JSON.stringify({
  "login": "iortega@va-financiera.mx",
  "idUnykoo": id,
  "nip": nipB,
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};
const carga = async() => {
   const datos = await fetch("https://test.unykoo.com/workfloo/api/v2/nip/secondConfirm", requestOptions)
    console.log(datos)
    if(datos.status === 200){
        validarResultado();

    }
  }
  carga();
}


function validarResultado() {


  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("company_code", "WlOEu7J");
  myHeaders.append("api_key", "3f6f8d46-858d-468c-a12a-9db510539f24");
  myHeaders.append("Cookie", "JSESSIONID=82604B6E1BB08D8089CD0BF98893521D");
  
  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };
  
  fetch("https://test.unykoo.com/workfloo/api/v2/workfloo/232", requestOptions)
  .then(response => response.json())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
}
}


  

