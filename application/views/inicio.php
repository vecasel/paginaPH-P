<!DOCTYPE html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MEXLEASING</title>
    <link rel="stylesheet" href="https://cdn.materialdesignicons.com/2.4.85/css/materialdesignicons.min.css">
    <link href="https://fonts.googleapis.com/css?family=Roboto+Slab" rel="stylesheet">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" integrity="sha384-WskhaSGFgHYWDcbwN70/dfYBj47jz9qbsMId/iRN3ewGhXQFZCSftd1LZCfmhktB" crossorigin="anonymous">
    <link rel="stylesheet" type="text/css" media="all" href="<?php echo base_url(); ?>src/css/mexleasing.css">
    <link rel='shortcut icon' type='image/x-icon' href='<?php echo base_url(); ?>src/img/favicon.png' />
</head>
<body>
    <div id="menu-mobile">
        <nav>
            <ul>
                <li>
                    <a href="#inicio">Inicio</a>
                </li>
                <li>
                    <a href="#beneficios">Beneficios por arrendar</a>
                </li>
                <li>
                    <a href="#bienes">Que bienes se arrendan</a>
                </li>
                <li>
                    <a href="#nosotros">Nosotros</a>
                </li>
                <li>
                    <a href="#contacto">Contacto</a>
                </li>
            </ul>
        </nav>
    </div>
    <header>
        <nav id="menu" class="navbar navbar-expand-md">
            <div class="collapse navbar-collapse">
                <ul class="navbar-nav">
                    <li class="nav-item active">
                        <a class="nav-link" href="#inicio">Inicio</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#beneficios">Beneficios por arrendar</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#bienes">Que bienes se arrendan</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#nosotros">Nosotros</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#contacto">Contacto</a>
                    </li>
                </ul>
            </div>
        </nav>
    </header>
    <div id="body">
        <section id="inicio">
            <div class="contenedor-logo">
                <img src="src/img/logo_video.png" alt="">
                <span>Especialistas en el arrendamiento puro</span>
            </div>
            <button id="btn-menu-mobile">
                <i class="mdi mdi-menu"></i>
            </button>
            <video poster="<? echo base_url('src/video/video-preview.png')?>" id="bgvid" playsinline autoplay muted loop>
				<source src="<? echo base_url('src/video/video.mp4')?>" type="video/mp4">
				<!-- <source src="<? echo base_url('src/video/video.webm')?>" type="video/webm"> -->
            </video>
        </section>
        <section id="beneficios">
            <h2>Beneficios por arrendar</h2>
            <div class="adorno-titulo"><div></div></div>
            <div class="container">
                <div class="row">
                    <div class="col-md-3 col-xs-12">
                        <figure>
                            <img src="src/img/icono_mexleasing.png" alt="">
                            <caption>
                                <div>1. No distrae el capital de trabajo.</div>
                            </caption>
                        </figure>
                    </div>
                    <div class="col-md-3 col-xs-12">
                        <figure>
                            <img src="src/img/icono_mexleasing.png" alt="">
                            <caption>
                                <div>2. Diversifica la forma de adquisición de activos.</div>
                            </caption>
                        </figure>
                    </div>
                    <div class="col-md-3 col-xs-12">
                        <figure>
                            <img src="src/img/icono_mexleasing.png" alt="">
                            <caption>
                                <div>3. Es un pasivo no registrado.</div>
                            </caption>
                        </figure>
                    </div>
                    <div class="col-md-3 col-xs-12">
                        <figure>
                            <img src="src/img/icono_mexleasing.png" alt="">
                            <caption>
                                <div>4. Mantiene actualizado su equipo e imagen.</div>
                            </caption>
                        </figure>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-3 col-xs-12">
                        <figure>
                            <img src="src/img/icono_mexleasing.png" alt="">
                            <caption>
                                <div>5. ​No te preocupas por la depreciación del activo.</div>
                            </caption>
                        </figure>
                    </div>
                    <div class="col-md-3 col-xs-12">
                        <figure>
                            <img src="src/img/icono_mexleasing.png" alt="">
                            <caption>
                                <div>6. Rentas directamente al gasto.</div>
                            </caption>
                        </figure>
                    </div>
                    <div class="col-md-3 col-xs-12">
                        <figure>
                            <img src="src/img/icono_mexleasing.png" alt="">
                            <caption>
                                <div>7. Una vez terminado el contrato, opción de adquirir el bien.</div>
                            </caption>
                        </figure>
                    </div>
                    <div class="col-md-3 col-xs-12">
                        <figure>
                            <img src="src/img/icono_mexleasing.png" alt="">
                            <caption>
                                <div>8. Renovación constante de activos.</div>
                            </caption>
                        </figure>
                    </div>
                </div>
            </div>
        </section>
        <section id="bienes">
            <h2>Bienes por arrendar</h2>
            <div class="adorno-titulo"><div></div></div>
            <div class="row">
                <div class="col-md-6 offset-md-3 col-sm-12">
                    En el sector del Arrendamiento Puro, lo que nos ha obligado a estar cada día más cerca de usted ofreciéndole planes a la medida de sus necesidades.
                </div>
            </div>
            <div class="container">
                <div id="galeria">
                    <figure>
                        <img src="src/img/1_vehiculos.jpg">
                        <div>Vehículos</div>
                    </figure>
                    <figure>
                        <img src="src/img/2_oficina.jpg">
                        <div>Equipo de oficina</div>
                    </figure>
                    <figure>
                        <img src="src/img/3_computo.jpg">
                        <div>Equipo de cómputo</div>
                    </figure>
                    <figure>
                        <img src="src/img/4_recreativo.jpg">
                        <div>Equipo recreativo</div>
                    </figure>
                    <figure>
                        <img src="src/img/5_cuarto.jpg">
                        <div>Mobiliario para hoteles</div>
                    </figure>
                    <figure>
                        <img src="src/img/6_medico.jpg">
                        <div>Equipo médico</div>
                    </figure>
                    <figure>
                        <img src="src/img/7_maquinaria.jpg">
                        <div>Maquinaria para construcción</div>
                    </figure>
                    <figure>
                        <img src="src/img/8_restaurantes.jpg">
                        <div>Mobiliario para restaurantes</div>
                    </figure>
                    <figure>
                        <img src="src/img/9_industrial.jpg">
                        <div>Equipo Industrial</div>
                    </figure>
                </div>
            </div>
            
        </section>
        <section id="nosotros">
            <div class="contenedor-titulo">
                <h4>¿Por qué comprar nuestros productos?</h4> 
                <div class="adorno-titulo"><div></div></div>
            </div>
            <div class="contenedor-imagen">
                <div class="col-md-6 col-sm-12">
                    <div class="contenedor-texto">
                        <!-- <div class="titulo-1996">Desde 1996 somos</div>  -->
                        <div class="titulo-lider">LA EMPRESA LÍDER</div>
                        <p>Contamos con más de <span>25 años de experiencia</span> ofreciendo a nuestros clientes un <span>excelente servicio personalizado</span> así como una gran gama de activos para diversos sectores.</p>
                    </div>
                </div>
            </div>
            <div class="contenedor-servicios">
                <h4>¿Qué otros servicios ofrecemos?</h4> 
                <div class="adorno-titulo"><div></div></div>
                <div class="container">
                    <div class="row">
                        <div class="col-md-7 col-sm-12 contenedor-imagen">
                            <img src="src/img/iconos_servicios.png" alt="">
                        </div>
                        <div class="col-md-5 col-sm-12">
                            <p>En <span class="estilo-oscuro">MEX Leasing</span> también contamos con los servicios de <span class="estilo-oscuro">exportación e importación</span> para toda clase de bienes y también las <span class="estilo-upper">mejores opciones</span> en <span class="estilo-oscuro">seguros y fianzas</span>, para que usted pueda estar seguro de que sus bienes quedarán <span class="estilo-oscuro">asegurados</span> con <span class="estilo-upper">una de las mejores compañías del país.</span></p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="contenedor-mision-vision">
                <div class="container">
                    <div>Nuestra <span class="estilo-upper">misión y visión</span> es hacer que el cliente entienda que tal utilidad proviene del uso del gozo del bien, no de su propiedad.</div> 
                    <div class="estilo-upper">Renta, no compres</div>
                </div>
            </div>
        </section>
        <section id="contacto">
           <div class="container">
                <div class="contenedor-formulario">
                    <h4>Contáctanos</h4>
                    <div class="adorno-titulo"><div></div></div>
                    <div class="row">
                        <div class="col-md-5 col-sm-12">
                            <div class="row">
                                <div class="contendor-texto col-md-8 col-sm-12">
                                    <address>
                                        Av. Bonampak <span>#53 SM 3</span>
                                        <span>contacto@mexleasing.mx</span><br>
                                        Tel: <span>01 (800) 841 7949</span>
                                    </address>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-8 col-sm-12">
                                    <div class="contendor-texto">
                                        <label>Sucursales</label>
										<ul>
											<li>Cancún</li>
											<li>Riviera Maya</li>
											<li>Querétaro</li>
											<li>Aguascalientes</li>
											<li>Ciudad de México</li>
											<li>Villahermosa</li>
										</ul>
                                        <!-- Cancún, Riviera Maya, Chiapas, Veracruz, Querétaro, Aguascalientes, León, San Luis Potosí, Ciudad de México, y Nuevo León -->
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-7 col-sm-12">
                            <form id="frm-contacto">
							<div class="col-12">
                                    <input type="text" class="form-control" name="nombre" placeholder="Nombre*" required>
                                </div>
                                <div class="col-12">
                                    <input type="email" class="form-control" name="correo" placeholder="Correo*" required>
                                </div>
                                <div class="col-12">
                                    <input type="text" class="form-control" name="asunto" placeholder="Asunto">
                                </div>
                                <div class="col-12">
                                    <textarea placeholder="Mensaje" name="mensaje" class="form-control" cols="30" rows="5"></textarea>
                                </div>
                                <div class="col-12">
                                    <button class="btn " type="submit">Enviar</button>
                                </div>
                                
                            </form>
                        </div>

                    </div>
                </div>
           </div>
        </section>
        <section id="mapa"></section>
        <div id="footer">
            <img src="<?php echo base_url(); ?>src/img/icono_mexleasing_gris.png">   <span class="linkAviso">Aviso de privacidad</span>
        </div>
    </div>
    <div id="avisoPrivacidad">
        <img src="<?php echo base_url(); ?>src/img/logo_gris.png">
        <i class="linkAviso mdi mdi-close-circle"></i>
        <div class="contenedor-texto">
            <div class="text-center"><span>Aviso de privacidad</span></div>
            <p>
                En cumplimiento con  lo establecido   en  la Ley Federal  de  Protección  de  Datos  Personales   en  Posesión de  los Particulares y su Reglamento (en  lo sucesivo la ("Ley"), publicada  en el Diario Oficial de la Federación el 5 de Julio de 2010, y con la finalidad  de garantizar  la  privacidad   de nuestros  Clientes en compartir sus datos personales, le informamos  lo s1guiente:
            </p>
            <div>Identidad y domicilio del responsable:</div>
            <p>
            Arrendadora Pura del Caribe. S.A: de C.V. (en lo  sucesivo  "MEX  Leasing"),   con domicilio  en Av. Bonampak Nº 53, Mza. 15, Lote 53, Smza. 3, C.P. 77500, Benito Juárez, Cancún, Quintan Roo,  y con teléfono  998 8844323,  informa a sus Clientes  que los datos  personales  que hayan proporcionado, incluyendo sin limitar:   nombre;   domicilio; RFC; compañía y cargo  que ocupa; teléfono;  correo  electrónico; y datos financieros, le comunicamos  por este medio, que MEX  Leasing es el único responsable  del tratamiento, uso, almacenamiento y/o divulgación de sus datos personales conforme a lo establecido en la Ley.    
            </p>
            <div>Finalidades   del  tratamiento  de datos personales  recabados:</div>
            <p>
                Los datos personales de nuestros Clientes, serán utilizados para  fines:  informativos a través  del  envío  información relevante para el  Cliente; administrativos; y, en general  para  la  ejecución  de  las operaciones  o servicios  solicitados  por  los  Clientes.  los datos  personales  recabados  serán almacenados   en  una  base  datos   exclusiva de  MEX  Leasing,   los  cuales  permanecerán durante el periodo  necesario para cumplir con la finalidad específica para los cuales fueron recabados y de acuerdo a lo establecido  en la Ley.
            </p>
            <div>Medios  para ejercer  los derechos  ARCO:</div>
            <p>
                El  Cliente, en relación con sus datos personales,  podrá ejercer sus derechos  de acceder a sus datos personales que MEX Leasing  posee,  rectificar  sus datos personales cuando sean inexactos o incompletos,  cancelar  sus  datos personales cuando considere que son excesivos o innecesarios para las finalidades del tratamiento o haya  finalizado la relación contractual o de servicio u oponerse a proporcionar sus datos personales para los fines aquí mencionadas, así como revocar su consentimiento para el tratamiento de sus datos personales a fin de que MEX  Leasing   deje de hacer uso de los mismos.
            </p>
            <div>Lo anterior podrá realizarse a través del Cliente o de su representante legal mediante la presentación de los formatos de solicitudes  que se indican a continuación:</div>
            <ul>
                <li>Solicitud   de Derecho de Acceso</li>
                <li>Solicitud   de Derecho de Rectificación</li>
                <li>Solicitud de Derecho de Oposición</li>
                <li>Solicitud de Derecho de Cancelación</li>
            </ul>
            <div>Dichos formatos de solicitudes podrán requerirse y presentarse en cualquiera de las  siguientes opciones:</div>
            <div>a) Por correo electrónico a la siguiente dirección: operaciones@mexleasing.mx para lo cual tendría  que acreditar su identidad  mediante  el  envío de:</div>
            <ol>
                <li>Fotocopia   de identificación oficial  (credencial   de elector, pasaporte o cedula profesional):</li>
                <li>En caso de actuar  en representación   de  algún   Cliente,   deberá  presentar  copia  de  la escritura  pública   del  poder o carta  poder  simple  otorgada  al representante  legal   del Cliente, según corresponda,   así como su identificación  correspondiente;</li>
            </ol>
            <div>b) Directamente en las oficinas de MEX Leasing con la acreditación  correspondiente mencionada en el  inciso a) anterior.</div>
            <p>
                MEX Leasing tendrá un  plazo de 20 (veinte) días naturales, contados a partir de la fecha en que recibió la solicitud de acceso, rectificación, cancelación u oposición, para comunicarle al  Cliente, por el medio en que recibió la solicitud, si se acepta o no la misma, y en casa de  que así sea, MEX Leasing tiene un plazo de 15  (quince) días siguientes   a la fecha en que se comunica la respuesta al Cliente para realizar las modificaciones correspondientes. Los plazos antes referidos podrán ser ampliados una sola vez por un periodo igual, siempre y cuando así MEX Leasing  lo justifique.
            </p>
            <div>MEX Leasing podrá negar el acceso, rectificación, cancelación u oposición a los datos personales del Cliente, cuando:</div>
            <ol>
                <li>EI   Cliente no sea el titular de los datos personales, o el representante  legal no esté debidamente  acreditado  para ello;</li>
                <li>Cuando en  su base de datos,  no se  encuentren  los datos personales del solicitante;</li>
                <li>Cuando se lesionen  los derechos  de un tercero;</li>
                <li>Cuando  exista  un impedimento legal,  o la  resolución de una autoridad competente, que restrinja el acceso a los datos personales del Cliente,  o no permita la rectificación, cancelación u oposición de los  mismos; </li>
                <li>Cuando la rectificación,, cancelación u oposición haya sido previamente realizada.</li>
            </ol>
            <p>
                En todos  los casos  anteriores,, MEX  Leasing le  informará  al Cliente o al representante  legal,   según  sea el caso, el  motivo de  su decisión  por el  mismo medio por el que se llevó a cabo la solicitud, acompañado en su caso, las pruebas que resulten   pertinentes,
            </p>
            <div>Medidas de seguridad:</div>
            <p>
                MEX Leasing garantiza en este acto que los  datos personales del Cliente se almacenaran en las bases de datos correspondientes y se trataran con las medidas de seguridad   necesarias  y establecidas  en la  Ley, siento el Cliente  el único responsable de la veracidad de los datos que proporciona.
            </p>
            <div>Transferencia de los datos personales:</div>
            <p>
                Los datos personales  recabados por MEX Leasing,  no serán cedidos,  vendidos, compartidos o transferidos a un tercero sin que el Cliente sea previamente informado y otorgue su consentimiento, según  lo establecido  en la Ley.
            </p>
            <div>Modificaciones al Aviso de Privacidad</div>
            <p>
                MEX Leasing se reserva el derecho de efectuar en cualquier momento modificaciones o actualizaciones al  presente Aviso de Privacidad, derivado de cualquier reforma o modificación de la Ley, por política interna o por algún requerimiento para la prestación de nuestros servicios, en todo momento los Clientes podrán verificar cualquier  modificación    al presente Aviso..
            </p>
            <div class="text-center">Última actualización:    01 de enero de 2015 </div>
        </div>
    </div>
    <div id="loader">
        <img src="<?php echo base_url(); ?>src/img/icono_mexleasing.png" class="girar">
    </div>
</body>
<footer>
	<script>
		if(!sessionStorage.base_url)
			sessionStorage.base_url  	= '<?php echo base_url();?>';
	</script>
    <script src="https://code.jquery.com/jquery-3.3.1.min.js" integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js" integrity="sha384-smHYKdLADwkXOn1EmN1qk/HfnUcbVRZyYmZ4qpPea6sjB/pTJ0euyQp0Mk8ck+5T" crossorigin="anonymous"></script>  

    <script src="<?php echo base_url(); ?>src/js/menu.js"></script>
    <script src="<?php echo base_url(); ?>src/js/ncMaps.js"></script>
    <script src="<?php echo base_url(); ?>src/js/mapa.js"></script>
   
</footer>
</html>