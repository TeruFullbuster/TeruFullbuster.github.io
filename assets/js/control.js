$(document).ready(function () {

    
    /*$("#slc-anio").hide()
    $("#slc-descripcion").hide()
    $("#slc-descripcionCompleta").hide()*/


    $("#slc-marcas").load("click", function () {
        $.ajax({
            type: "GET",
            url: "https://gen_wsapp.segurointeligente.mx/WsGenericoSI.svc/GetMarcas?Usuario=&Pass=",
            async: true,
            success: function (datos) {
                let options = "<option value='' >Selecciona una marca</option>"
                $.map(datos, function (a) {
                    options += ` 
                    <option value="${a.MARHOM}">${a.MARHOM}</option>
                   `
                })

                $("#slc-marcas").empty().append(options);
                
            }
        }).fail(function (e) {
            console.log(e)
        });
    })
   
    $("#slc-marcas").change(function () {
       
        localStorage.clear();
        
        $("#pasoId").val(parseInt($("#pasoId").val()) + 1)
        
        let paso = parseInt($("#pasoId").val())
        let id = this.value.replace(/ /g, '')
        let optionSelected = ` 
        <span id="descript-${id}" class="badge text-bg-primary position-relative" style="font-size:120%; border-radius: 10px; background-color: #002D74; color:#FFffff"; ">. ${this.value} .
            <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger btn-quitar-item paso-${paso} " onclick="restarPaso()" style="font-size:120%;" id="r-descript-${id}" >
                x
            </span>
        </span>
        `
        if (paso == 0) {
            $(".descript_options").empty().append(optionSelected)
            
        } else {
            $(`.btn-quitar-item`).hide();
            $(".descript_options").append(optionSelected)
        }
        //$("#slc-marcas").hide()
        //$("#slc-anio").show()
        $("#slc-anio").focus();
       

        
        
        
        

        localStorage.setItem('marca', $("#slc-marcas").val());
        localStorage.setItem('vecesConsultaAnio', 0);

        
        $(".btn-quitar-item").click(function () {
            let paso = parseInt($("#pasoId").val())
            let idbadge = this.id.replace("r-", '')

            $(`#${idbadge}`).remove()
            $(`.paso-${paso}`).show()
            console.log(idbadge)
            
        })
        
    })
    
    $("#slc-marcas").change(function () {
        
        let marca = $("#slc-marcas").val()
        if (marca !== localStorage.getItem('marca')) {
            $.ajax({
                type: "GET",
                url: `https://gen_wsapp.segurointeligente.mx/WsGenericoSI.svc/GetModelo?Usuario=SIWS&Pass=Gmag2020*&RangoModelo=2005&Marca=${marca}`,
                async: true,
                success: function (datos) {
                    
                    let options = "<option value='' >Selecciona un modelo</option>"
                    $.map(datos, function (a) {
                        options += ` 
                        <option value="${a.MODMIN}">${a.MODMIN}</option>
                       `
                    })

                    $("#slc-anio").empty().append(options);
                   
                }
            }).fail(function (e) {
                console.log(e)
            });
        } else {
            if (localStorage.getItem('vecesConsultaAnio') == 0) {
                $.ajax({
                    type: "GET",
                    url: `https://gen_wsapp.segurointeligente.mx/WsGenericoSI.svc/GetModelo?Usuario=SIWS&Pass=Gmag2020*&RangoModelo=2005&Marca=${marca}`,
                    async: true,
                    success: function (datos) {

                        let options = "<option value='' >Selecciona un modelo</option>"
                        $.map(datos, function (a) {
                            options += ` 
                            <option value="${a.MODMIN}">${a.MODMIN}</option>
                           `
                        })
                        localStorage.setItem('vecesConsultaAnio', 1);

                        $("#slc-anio").empty().append(options);

                    }
                }).fail(function (e) {
                    console.log(e)
                });
            } else {
                console.log("es igual")
            }
        }
    })
    
    
    $("#slc-anio").change(function () {
        $("#pasoId").val(parseInt($("#pasoId").val()) + 1)
        let paso = parseInt($("#pasoId").val())
        let id = this.value.replace(/ /g, '')
        let optionSelected = ` 
        <span id="descript-${id}" class="badge text-bg-primary position-relative" style="font-size:120%; border-radius: 10px; background-color: #002D74; color:#FFffff"; ">. ${this.value} .
            <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger btn-quitar-item paso-${paso} " onclick="restarPaso()"  style="font-size:120%;" id="r-descript-${id}" >
                x
            </span>
        </span>
        `
        if (paso == 0) {
            $(".descript_options").empty().append(optionSelected)
        } else {
            $(`.btn-quitar-item`).hide();
            $(".descript_options").append(optionSelected)
        }

        //$("#slc-anio").hide()
        //$("#slc-descripcion").show()
        $("#slc-descripcion").focus();

        localStorage.setItem('modelo', $("#slc-anio").val());
        localStorage.setItem('vecesConsultaDescripcion', 0);
        localStorage.setItem('vecesConsultaAnio', 1);

        $(".btn-quitar-item").click(function () {
            let paso = parseInt($("#pasoId").val())
            let idbadge = this.id.replace("r-", '')

            $(`#${idbadge}`).remove()
            $(`.paso-${paso}`).show()
            console.log(idbadge)
        })

    })

    $("#slc-anio").change(function (e) {
        let marca = $("#slc-marcas").val()
        let anio = $("#slc-anio").val()

        if (marca !== localStorage.getItem('marca') || anio !== localStorage.getItem('modelo')) {
            $.ajax({
                type: "GET",
                url: `https://gen_wsapp.segurointeligente.mx/WsGenericoSI.svc/GetSubMarcas?Usuario=SIWS&Pass=Gmag2020*&Marca=${marca}&Modelo=${anio}`,
                async: true,
                success: function (datos) {
                    let options = "<option value='' >Selecciona una descripción</option>"
                    $.map(datos, function (a) {
                        options += ` 
                        
                        <option value="${a.SUBMARHOM}">${a.SUBMARHOM}</option>
                       `
                    })



                    $("#slc-descripcion").empty().append(options);

                }
            }).fail(function (e) {
                console.log(e)
            });
        } else {
            if (localStorage.getItem('vecesConsultaDescripcion') == 0) {
                $.ajax({
                    type: "GET",
                    url: `https://gen_wsapp.segurointeligente.mx/WsGenericoSI.svc/GetSubMarcas?Usuario=SIWS&Pass=Gmag2020*&Marca=${marca}&Modelo=${anio}`,
                    async: true,
                    success: function (datos) {
                        let options = "<option value='' >Selecciona una descripción</option>"
                        $.map(datos, function (a) {
                            options += `
                            
                            <option  value="${a.SUBMARHOM}">${a.SUBMARHOM}</option>`
                        })
                        localStorage.setItem('vecesConsultaDescripcion', 1);


                        $("#slc-descripcion").empty().append(options);

                    }
                }).fail(function (e) {
                    console.log(e)
                });
            } else {
                //console.log("Es igual")
            }
        }
    })

    $("#slc-descripcion").change(function () {
        $("#pasoId").val(parseInt($("#pasoId").val()) + 1)
        let paso = parseInt($("#pasoId").val())
        let id = this.value.replace(/ /g, '')
        let optionSelected = ` 
        <span id="descript-${id}" class="badge text-bg-primary position-relative" style="font-size:120%; border-radius: 10px; background-color: #002D74; color:#FFffff"; ">. ${this.value} .
            <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger btn-quitar-item paso-${paso} " onclick="restarPaso()"  style="font-size:120%;" id="r-descript-${id}" >
                x
            </span>
        </span>
        `
        if (paso == 0) {
            $(".descript_options").empty().append(optionSelected)
        } else {
            $(`.btn-quitar-item`).hide();
            $(".descript_options").append(optionSelected)
        }

        //$("#slc-descripcion").hide()
        //$("#slc-descripcionCompleta").show()
        $("#slc-descripcionCompleta").focus();
        localStorage.setItem('descripcion', $("#slc-descripcion").val());
        localStorage.setItem('vecesConsultaDescripcion', 1);
        localStorage.setItem('vecesConsultaDescripcionCompleta', 0);


        $(".btn-quitar-item").click(function () {
            let paso = parseInt($("#pasoId").val())
            let idbadge = this.id.replace("r-", '')

            $(`#${idbadge}`).remove()
            $(`.paso-${paso}`).show()
        })

    })



    $("#slc-descripcion").change(function (e) {
        let marca = $("#slc-marcas").val()
        let anio = $("#slc-anio").val()
        let desc = $("#slc-descripcion").val()
        

        if (marca !== localStorage.getItem('marca') || anio !== localStorage.getItem('modelo') || desc !== localStorage.getItem('descripcion')) {
            $.ajax({
                type: "GET",
                url: `https://wscotizacion.segurointeligente.mx/Cotizacion.svc/ObtenerDescripcionesCompleta?Usuario=SIWS&Pass=Gmag2020*&Marca=${marca}&Modelo=${anio}&Des=${desc}&IDGrupo=466&Cobertura=AMPLIA&Aseguradora=AXA`,
                async: true,
                success: function (datos) {
                    let options = ""
                    $.map(datos, function (a) {
                        options += `
                        <option value="${a.CEVIC}">${a.Descripcion}</option>`
                    })
                    
                    
                    $("#slc-descripcionCompletaAXA").show()
                    $("#slc-descripcionCompletaAXA").empty().append(options);
                    $("#divAXA1").show();

                }
            }).fail(function (e) {
                console.log(e)
            });
        } else {
            if (localStorage.getItem('vecesConsultaDescripcionCompleta') == 0) {
                $.ajax({
                    type: "GET",
                    url: `https://wscotizacion.segurointeligente.mx/Cotizacion.svc/ObtenerDescripcionesCompleta?Usuario=SIWS&Pass=Gmag2020*&Marca=${marca}&Modelo=${anio}&Des=${desc}&IDGrupo=466&Cobertura=AMPLIA&Aseguradora=AXA`,
                    async: true,
                    success: function (datos) {
                        if(datos.length != 0 ){
                            console.log(datos)
                            let options = ""
                        $.map(datos, function (a) {
                            options += `
                            <option value="${a.CEVIC}">${a.Descripcion}</option>`
                        })
                        localStorage.setItem('vecesConsultaDescripcionC', 1);

                            $("#slc-descripcionCompletaAXA").empty().append(options);
                             $("#divAXA1").show();
                        }else{
                            document.getElementById('BanderaAXA').style.display = "none";
                            document.getElementById('slc-descripcionCompletaAXA').style.display = "none";
                        }
                    }
                }).fail(function (e) {
                    console.log(e)
                });
            }
        }
    })


    $("#slc-descripcion").change(function (e) {
        let marca = $("#slc-marcas").val()
        let anio = $("#slc-anio").val()
        let desc = $("#slc-descripcion").val()
        
        if (marca !== localStorage.getItem('marca') || anio !== localStorage.getItem('modelo') || desc !== localStorage.getItem('descripcion')) {
            $.ajax({
                type: "GET",
                url: `https://wscotizacion.segurointeligente.mx/Cotizacion.svc/ObtenerDescripcionesCompleta?Usuario=SIWS&Pass=Gmag2020*&Marca=${marca}&Modelo=${anio}&Des=${desc}&IDGrupo=466&Cobertura=AMPLIA&Aseguradora=Qualitas`,
                async: true,
                success: function (datos) {
                    let options = ""
                    $.map(datos, function (a) {
                        options += `
                        <option value="${a.CEVIC}">${a.Descripcion}</option>`
                    })

                    $("#divQua1").show();
                    $("#slc-descripcionCompletaQua").empty().append(options);

                }
            }).fail(function (e) {
                console.log(e)
            });
        } else {
            if (localStorage.getItem('vecesConsultaDescripcionCompleta') == 0) {
                $.ajax({
                    type: "GET",
                    url: `https://wscotizacion.segurointeligente.mx/Cotizacion.svc/ObtenerDescripcionesCompleta?Usuario=SIWS&Pass=Gmag2020*&Marca=${marca}&Modelo=${anio}&Des=${desc}&IDGrupo=466&Cobertura=AMPLIA&Aseguradora=Qualitas`,
                    async: true,
                    success: function (datos) {
                        if(datos.length != 0 ){
                            console.log(datos)
                            let options = ""
                        $.map(datos, function (a) {
                            options += `
                            <option value="${a.CEVIC}">${a.Descripcion}</option>`
                        })
                        localStorage.setItem('vecesConsultaDescripcionC', 1);

                        $("#slc-descripcionCompletaQua").empty().append(options);
                        $("#divQua1").show();

                        }else{
                 
                            document.getElementById('slc-descripcionCompletaQua').style.display = "none";
                        }
                    }
                }).fail(function (e) {
                    console.log(e)
                });
            }
        }
    })


    $("#slc-descripcion").change(function (e) {
        let marca = $("#slc-marcas").val()
        let anio = $("#slc-anio").val()
        let desc = $("#slc-descripcion").val()
        
        if (marca !== localStorage.getItem('marca') || anio !== localStorage.getItem('modelo') || desc !== localStorage.getItem('descripcion')) {
            $.ajax({
                type: "GET",
                url: `https://wscotizacion.segurointeligente.mx/Cotizacion.svc/ObtenerDescripcionesCompleta?Usuario=SIWS&Pass=Gmag2020*&Marca=${marca}&Modelo=${anio}&Des=${desc}&IDGrupo=466&Cobertura=AMPLIA&Aseguradora=GNP`,
                async: true,
                success: function (datos) {
                    let options = ""
                    $.map(datos, function (a) {
                        options += `
                        <option value="${a.CEVIC}">${a.Descripcion}</option>`
                    })

                    $("#divGNP1").show();
                    $("#slc-descripcionCompletaGNP").empty().append(options);

                }
            }).fail(function (e) {
                console.log(e)
            });
        } else {
            if (localStorage.getItem('vecesConsultaDescripcionCompleta') == 0) {
                $.ajax({
                    type: "GET",
                    url: `https://wscotizacion.segurointeligente.mx/Cotizacion.svc/ObtenerDescripcionesCompleta?Usuario=SIWS&Pass=Gmag2020*&Marca=${marca}&Modelo=${anio}&Des=${desc}&IDGrupo=466&Cobertura=AMPLIA&Aseguradora=GNP`,
                    async: true,
                    success: function (datos) {
                        if(datos.length != 0 ){
                            console.log(datos)
                            let options = ""
                        $.map(datos, function (a) {
                            options += `
                            <option value="${a.CEVIC}">${a.Descripcion}</option>`
                        })
                        localStorage.setItem('vecesConsultaDescripcionC', 1);

                        $("#slc-descripcionCompletaGNP").empty().append(options);
                        $("#divGNP1").show();

                        }else{
                            document.getElementById('BanderaGNP').style.display = "none";
                            document.getElementById('slc-descripcionCompletaGNP').style.display = "none";
                        }
                    }
                }).fail(function (e) {
                    console.log(e)
                });
            }
        }
    })


    $("#multicoti").on('submit', function (evt) {
            evt.preventDefault();    
            marca = document.getElementById('slc-marcas').value
            anio = document.getElementById('slc-anio').value
            descri = document.getElementById('slc-descripcion').value
            cvicAXA = document.getElementById('slc-descripcionCompletaAXA').value || "0"
            cvicQua = document.getElementById('slc-descripcionCompletaQua').value || "0"
            cvicGNP = document.getElementById('slc-descripcionCompletaGNP').value || "0"
            CP = document.getElementById('cepe').value;

            var FNaci = $("#Fnaci").val();
            var genero = $('#genero').val();
       
            
            $('.loader').css("display","flex");

            if(cvicAXA != null && cvicAXA != "0"){
                $.ajax({
                    type: "GET",
                    url: `https://wscotizacion.segurointeligente.mx/Cotizacion.svc/ObtenerCotizacionAseg?Usuario=SIWS&Pass=Gmag2020*&Marca=${marca}&Modelo=${anio}&Des=${descri}&IDGrupo=466&Cobertura=AMPLIA&Aseguradora=AXA&Cevic=${cvicAXA}&CPostal=${CP}&NombreFPago=CONTADO&Fnacimiento=${FNaci}&Genero=${genero}`,
                    async: true,
                    success: function (datos) {
                        console.log(datos)
                        console.log("AXA")
                        if(datos.CotAI.PrimaTotal != null){
                        document.getElementById('DatoAXA').textContent = datos.CotAI.PrimaTotal;
                        $('.loader').css("display","none");
                    }else{
                        document.getElementById('BanderaAXA').style.display = "none";
                        document.getElementById('slc-descripcionCompletaAXA').style.display = "none";
                        $('.loader').css("display","none");
                    }
                    }
            })
            }else{
                alert("AXA no asegura ese vehiculo")
                
            }
            if(cvicQua != null && cvicQua != "0"){
                $.ajax({
                    type: "GET",
                    url: `https://wscotizacion.segurointeligente.mx/Cotizacion.svc/ObtenerCotizacionAseg?Usuario=SIWS&Pass=Gmag2020*&Marca=${marca}&Modelo=${anio}&Des=${descri}&IDGrupo=466&Cobertura=AMPLIA&Aseguradora=Qualitas&Cevic=${cvicQua}&CPostal=${CP}&NombreFPago=CONTADO&Fnacimiento=${FNaci}&Genero=${genero}`,
                    async: true,
                    success: function (datos) {
                        console.log(datos)
                        console.log("Qua")
                        if(datos.CotAI.PrimaTotal != null){
                            document.getElementById('DatoQua').textContent = datos.CotAI.PrimaTotal;
                            $('.loader').css("display","none");
                        }else{
                            document.getElementById('BanderaQua').style.display = "none";
                            document.getElementById('slc-descripcionCompletaQua').style.display = "none";
                            $('.loader').css("display","none");
                        }
                        
                    }
                })
            }else{
                alert("Qualitas no asegura ese vehiculo")
                
            }
            if(cvicGNP != null && cvicGNP != "0"){
                $.ajax({
                    type: "GET",
                    url: `https://wscotizacion.segurointeligente.mx/Cotizacion.svc/ObtenerCotizacionAseg?Usuario=SIWS&Pass=Gmag2020*&Marca=${marca}&Modelo=${anio}&Des=${descri}&IDGrupo=466&Cobertura=AMPLIA&Aseguradora=GNP&Cevic=${cvicGNP}&CPostal=${CP}&NombreFPago=CONTADO&Fnacimiento=${FNaci}&Genero=${genero}`,
                    async: true,
                    success: function (datos) {
                        console.log(datos)
                        console.log("GNP")
                        if(datos.CotAI.PrimaTotal != null){
                        document.getElementById('DatoGNP').textContent = datos.CotAI.PrimaTotal;
                        $('.loader').css("display","none");
                    }else{
                            
                        document.getElementById('BanderaGNP').style.display = "none";
                        document.getElementById('slc-descripcionCompletaGNP').style.display = "none";
                        $('.loader').css("display","none");
                    }
                    }
            })
            }else{
                alert("GNP no asegura ese vehiculo")
                
            }

    });





    $("#formCotizacion").on('submit', function (evt) {
        evt.preventDefault();
        
        let data = $(this).serializeArray()
        if (validForm(data)) {
            if (document.getElementById('pill3').checked)
            {
            $('.loader').css("display","flex");
            let cot = createObjCotizacion(data)
            $('#etiqueaaa').css('display','none');
            $.ajax({
                type: "GET",
                url: `https://wscotizacion.segurointeligente.mx/Cotizacion.svc/ObtenerCotizacionAseg?Usuario=SIWS&Pass=Gmag2020*&Marca=${cot.marca}&Modelo=${cot.modelo}&Des=${cot.descripcion}&IDGrupo=466&Cobertura=AMPLIA&Aseguradora=AXA&Cevic=${cot.cvic}&CPostal=${cot.CP}&NombreFPago=CONTADO&Fnacimiento=${cot.FNacimiento}&Genero=${cot.genero}`,
                async: true,
                success: function (datos) {
                    console.log(datos)
                    if(datos.CotAI.ErrorWs != true){
                        localStorage.setItem('precio', datos.CotAI.PrimaTotal)
                        $.ajax({
                            type: "POST",
                            url: `controls/control.php`,
                            data: {
                                action: 'GuardarCotizacion',
                                nombre: cot.nombre,
                                apellido: cot.apellido,
                                marca: cot.marca,
                                modelo: cot.modelo,
                                descripcion: cot.descripcion,
                                precio: datos.CotAI.PrimaTotal,
                                descC: datos.CotAI.Des,
                                ceviche: cot.cvic,
                                FNacimiento: cot.FNacimiento,
                                Mail : cot.correo,
                                Cp : cot.CP,
                                Celular : cot.Tel,
                                genero : cot.genero,
                                utm : cot.utm,
                            },
                            dataType: "json",
                            success: function (e) {
                                if(e.response = 'OK'){

                                    window.location="Comparador.php";
                                }   
                            }
                        }).fail(function (e) {
                            console.log(e)
                        });
                    }else{
                        alert("El Vehiculo que intenta cotizar requiere atención especializada, nos pondremos en contacto con usted")
                        console.log(cot)
                        Prospecto();
                        function  Prospecto(){	
				
                            var myHeaders = new Headers();
                            myHeaders.append("Content-Type", "application/json");
                            const nombrePros = cot.nombre;
                            const Apellido = cot.apellido
                            const MarcaPros = cot.marca
                            const ModeloL =  cot.modelo
                            const DescripcionCompleta = cot.descripcion
                            const PrecioPT =  datos.CotAI.PrimaTotal || "No cotizo"
                            const cepe = cot.CP
                            const Mail = cot.correo    
                            const Fnaci = cot.FNacimiento
                            const Celular = cot.Tel   
                            const GeneroN = cot.genero    
                            const campana = cot.utm  
                               
                                if (GeneroN == 0){
                                    GeneroT = "Masculino";
                                }else{
                                    GeneroT = "Femenino";
                                }
                                if (campana === "N/A") {
                                    var campaign = "";
                                } else {
                                    var campaign = campana;
                                }
                    
                            var raw = JSON.stringify({
                                "usuario": "MAG",
                                "pass": "MAG2022*",
                                "email": Mail,
                                "ramo": "VEHICULOS",
                                "cpostal": cepe,
                                "celular": Celular,
                                "nombre": nombrePros,
                                "fnacimiento": Fnaci,
                                "ap": Apellido,
                                "nombreCompleto": nombrePros + " " + Apellido,
                                "genero": GeneroT,
                                "leadsource": "LP-AXA-SS",
                                "marca": MarcaPros,
                                "modelo": ModeloL,
                                "FirstPage": "https://axaseguroauto.com",
                                "des": "El usuario selecciono un vehiculo con los siguiente datos Descripción: "
                                 + DescripcionCompleta + " Marca: " + MarcaPros + " Modelo: " + ModeloL
                                 + " Fecha de nacimiento: " + Fnaci + " Genero: " + GeneroT + " Y Codigo Postal: " +cepe + " Prima Total: " + PrecioPT ,
                                "Departamento": "General",
                                "Campaing": campaign,
                                "AseguradoraCampania":"AXA",
                                "ID_SAM":"Ejemplo de ID SAM",
                                "ID_CLIENTE":"Ejemplo de ID CLIENTE"
                                });
                                console.log(raw);
                                var requestOptions = {
                                method: 'POST',
                                headers: myHeaders,
                                body: raw,
                                redirect: 'follow'
                                };
                                const cargaProspecto = async() => {
                                        try{
                                            const tacopastor = await fetch("https://axa.segurointeligente.mx/CrearProspecto", requestOptions);
                                  
                                            const datos = await tacopastor.json();
                                            console.log(datos)
                                            if(datos.errorP.isError === false){
                                                window.location="Comparador.php";
                                            }else {
                                                window.location="Comparador.php";
                                            }
                    
                                        }catch(error){
                                            console.log(error);
                                        }
                                
                                    }
                                
                            cargaProspecto();
                            }
                    }
                    
                }
            }).fail(function (e) {
                console.log(e)
                alert("El sistema esta presentando fallas, intentalo mas tarde")
                        console.log(cot)
                        Prospecto();
            });
        

    }else{
        alert("Debe aceptar los terminos y condiciones para poder realizar su cotización")
    }
}
            });

    


    $('.soloNumeros').on('input', function () {
        this.value = this.value.replace(/[^0-9]/g, '');
    });

    $(".soloLetras").bind('keypress', function (event) {
        var regex = new RegExp("^[a-zA-Z ]+$");
        var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
        if (!regex.test(key)) {
            event.preventDefault();
            return false;
        }
    });


    
});
