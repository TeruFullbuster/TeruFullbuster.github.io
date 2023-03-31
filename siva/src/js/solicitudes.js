const usuarioActivo = localStorage.getItem('usuario')
var usuario = document.getElementById("nombreusuario")
usuario.innerHTML = usuarioActivo;
window.onload = function(){
  var f = new Date();
  console.log(f)
  document.getElementById("FechaActual").innerHTML = (" "+ f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear());
}


function Calculadora() { 
            
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
    const montonMaximo = localStorage.getItem('salario')
    const montoSolicitado  = document.getElementById('monto').value;
    const plazos = document.getElementById('plazos').value;
    const tasa = document.getElementById('tasa').value;
    url = ("https://sivaweb.mx/CalculadoraSIVA/Calcula?MontoSolicitado="+ montoSolicitado + "&Plasos="+ plazos + "&TipoTasa="+tasa+"&TasaAnual=30.0")
    console.log(url)
      const pambazo = async() =>{
       
      try {

        const suadero = await fetch(url, requestOptions)
       
          const datos = await suadero.json();

          console.log(datos[0])

          console.log(datos[0].tablaCLS[0])
          console.log(datos[0].tablaCLS[1])

          const indice =  datos[0].tablaCLS.length;
            console.log(indice)
          
            
            var pplzos = document.getElementById("PPago")
            pplzos.innerHTML = datos[0].pagoCLS;
            var totalapagar = document.getElementById("totalapagar")
            totalapagar.innerHTML = datos[0].montoTotalApagarCLS;
            var PmontoR = document.getElementById("PmontoR")
            PmontoR.innerHTML = datos[0].montoCreditoCLS;
            localStorage.setItem('MontoPaga', datos[0].montoCreditoCLS )
            
        

            let crearTabla = function (lista) {
          

              let stringtabla = "<tr><th>No. de Pago</th><th>AMORTIZACIÓN</th><th>INTERES</th><th>IVA INTERES</th><th>AMORT+INT</th><th>PAGO</th><th>SALDO</th></tr>";
      
              for(let elem of lista){
                if((isNaN(Number(elem.clsSaldo).toFixed(2))) === true){
                  var valor =  "$ " + datos[0].montoTotalApagarCLS;
                 }else{
                   var valor1 = ((Number(elem.clsSaldo).toFixed(2)))
                   var myNumeral = numeral (valor1);
                   var currencyString = myNumeral.format('$ 0,0.00');
                   valor = currencyString + " MXN";
                 }
                let fila = "<tr> <td>"
                fila += elem.clsnPagos;
                fila += "</td>";
      
                fila += "<td>";
                fila += elem.clsAmortizacion;
                fila += "</td>";
      
                fila += "<td>";
                fila += elem.clsIntereses;
                fila += "</td>";
                
                fila += "<td>";
                fila += elem.clsivAinteres;
                fila += "</td>";

                fila += "<td>";
                fila += elem.clsAmortInt;
                fila += "</td>";

                fila += "<td>";
                fila += elem.clsPago;
                fila += "</td>";

                fila += "<td>";
                fila += valor ;  
                fila += "</td>";
    
                fila += "</tr>";
            
                stringtabla += fila;
                //console.log(stringtabla)
              }
                 return stringtabla;
              }
    
              document.getElementById('amortiza').innerHTML =  crearTabla(datos[0].tablaCLS);
          
            await Swal.fire({
              icon: 'success',
              title: 'Cotización exitosa revise su tabla de amortización',
              showConfirmButton: false,
              timer: 2500
          })

      }catch (error) {
      console.log(error)
     } 
    }
    pambazo();
}


function captura(){
  var element = document.getElementById('printe');
  html2pdf(element);
}
