"use strict";
var ncMaps = (function () {
    function ncMaps(mc, optMap) {
        this.idMapa = '';
        this.apiKey = '';
        this.markerArray = [];
        this.circuloArray = [];
        this.polyArray = [];
        this.polyGonArray = [];
        this.polylineArray = [];
        this.zoom = 10;
        this.estilizado = false;
        this.originalZoom = 10;
        if (typeof mc != 'object') {
            this._mensaje("oMissing");
        }
        else if (!mc.idMapa) {
            this._mensaje("c-1");
        }
        else {
            mc.apiKey == undefined ? this._mensaje("c-2") : '';
            mc.cargarMaps !== false ? mc.cargarMaps = true : '';
            this.apiKey = mc.apiKey;
            this.idMapa = mc.idMapa;
            this._iniciaVariablesInternas();
            if (!window.google && mc.cargarMaps)
                this._cargaGoogleMaps(mc, optMap);
            else if (optMap)
                this.iniciaMapa(optMap);
        }
    }
    ncMaps.prototype.ready = function (callback) {
        var App = this;
        var timer;
        if (window.google)
            callback(this);
        else
            timer = setInterval(function () {
                if (window.google) {
                    clearInterval(timer);
                    callback(App);
                }
            }, 500);
    };
    ncMaps.prototype._cargaGoogleMaps = function (mc, optMap) {
        var _this = this;
        var librerias = '';
        if (mc.libraries) {
            librerias = 'libraries=';
            mc.libraries.forEach(function (libreria, i) {
                var c = ',';
                if (i == mc.libraries.length - 1)
                    c = '';
                librerias += libreria + c;
            });
            librerias += '&';
        }
        var apiKey = '';
        if (mc.apiKey)
            apiKey = 'key=' + mc.apiKey;
        this.loadScript('https://maps.googleapis.com/maps/api/js?' + librerias + apiKey, function () { return _this.iniciaMapa(optMap); });
        return;
    };
    ncMaps.prototype._iniciaVariablesInternas = function () {
        this.mapa = null;
        this.markerArray = [];
        this.circuloArray = [];
        this.polyArray = [];
        this.polyGonArray = [];
        this.polylineArray = [];
        this.direcArray = [];
        this.zoom = 10;
        this.callback = null;
        this.estilizado = false;
    };
    ncMaps.prototype.iniciaMapa = function (mpOpt) {
        if (mpOpt === void 0) { mpOpt = {}; }
        !mpOpt.lat ? this._mensaje('oDefault') : "";
        !   pOpt.lat ? mpOpt.lat = 21.161985 : "";
        !mpOpt.lng ? mpOpt.lng = -86.851523 : "";
        !mpOpt.zoom ? mpOpt.zoom = 10 : "";
        mpOpt.zoomCtr == undefined ? mpOpt.zoomCtr = true : "";
        mpOpt.ui == undefined ? mpOpt.ui = true : "";
        mpOpt.tipoCtr == undefined ? mpOpt.tipoCtr = true : "";
        mpOpt.streetView == undefined ? mpOpt.streetView = true : "";
        !mpOpt.controles ? mpOpt.controles = {} : "";
        !mpOpt.latLng ? mpOpt.latLng = new google.maps.LatLng(mpOpt.lat, mpOpt.lng) : "";
        !mpOpt.style ? mpOpt.style = [] : "";
        this.originalPosition = mpOpt.latLng;
        this.originalZoom = mpOpt.zoom;
        var controles = {
            zoom: { position: '' },
            streetView: { position: '' },
            mapType: { position: '' }
        };
        controles.mapType.position = mpOpt.controles.mapType || 'RIGHT_BOTTOM';
        controles.streetView.position = mpOpt.controles.streetView || 'RIGHT_BOTTOM';
        controles.zoom.position = mpOpt.controles.zoom || 'RIGHT_CENTER';
        var getPosition = function (pos) {
            var position;
            position = parseInt(google.maps.ControlPosition[pos]);
            return position;
        };
        var mapOptions = {
            zoom: mpOpt.zoom,
            disableDefaultUI: mpOpt.ui,
            mapTypeControl: mpOpt.tipoCtr,
            mapTypeControlOptions: {
                position: getPosition(controles.mapType.position)
            },
            streetViewControl: mpOpt.streetView,
            streetViewControlOptions: {
                position: getPosition(controles.streetView.position)
            },
            zoomControl: mpOpt.zoomCtr,
            zoomControlOptions: {
                style: google.maps.ZoomControlStyle.LARGE,
                position: getPosition(controles.zoom.position)
            },
            center: mpOpt.latLng,
            styles: mpOpt.style,
            fullscreenControl: false,
        };
        this.mapa = new google.maps.Map(document.getElementById(this.idMapa), mapOptions);
    };
    ncMaps.prototype.getLatLngUsuario = function (callback, timeout) {
        if (timeout === void 0) { timeout = 30000; }
        var ncMap = this;
        var latLng = this.mapa.getCenter();
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                latLng = ncMap.latLng(position.coords.latitude, position.coords.longitude);
                callback({ latLng: latLng, estado: true });
            }, function (err) {
                callback({ latLng: latLng, estado: false, err: err });
            }, { timeout: timeout });
        }
        else {
            callback({ latLng: latLng, estado: false, err: "Geolocation is not supported by this browser." });
        }
    };
    ncMaps.prototype.agregarCirculo = function (circOpt) {
        if (circOpt === void 0) { circOpt = {}; }
        if (!circOpt.lat && !circOpt.latLng)
            this._mensaje('oDefault');
        circOpt.lat = circOpt.lat || 21.161985;
        circOpt.lng = circOpt.lng || -86.851523;
        circOpt.latLng = circOpt.latLng || this.latLng(circOpt.lat, circOpt.lng);
        circOpt.mover = circOpt.mover || true;
        var circulo = new google.maps.Circle({
            center: circOpt.latLng,
            radius: circOpt.radio || 1000,
            strokeColor: circOpt.colorBorde || '#66F',
            strokeOpacity: circOpt.opacidadBorde || 0.5,
            editable: circOpt.editable || false,
            clickable: circOpt.clickable || false,
            strokeWeight: circOpt.anchoBorde || 2,
            fillColor: circOpt.color || '#66CCFF',
            draggable: circOpt.arrastrable || false,
            fillOpacity: circOpt.opacidadColor || 0.5,
            map: circOpt.mapa || this.mapa
        });
        if (circOpt.mover)
            this.moverMapa({ latLng: circulo.getCenter() });
        this.circuloArray.push(circulo);
        return circulo;
    };
    ncMaps.prototype.agregarInfoWindow = function (infoWD) {
        if (!infoWD || !infoWD.marker) {
            this._mensaje("ai-1");
            return;
        }
        else {
            !infoWD.contenido ? infoWD.contenido = infoWD.marker.getTitle() : '';
            !infoWD.autoPan ? infoWD.autoPan = false : '';
            !infoWD.clickable ? infoWD.clickable = true : '';
            var info_1 = new google.maps.InfoWindow({
                disableAutoPan: infoWD.autoPan
            });
            if (infoWD.clickable) {
                google.maps.event.addListener(infoWD.marker, "click", function () {
                    info_1.setContent(infoWD.contenido);
                    info_1.open(infoWD.marker.getMap(), infoWD.marker);
                });
            }
            return info_1;
        }
    };
    ncMaps.prototype.agregarMarcador = function (markOpt) {
        if (markOpt === void 0) { markOpt = {}; }
        !markOpt.lat ? markOpt.lat = 21.161985 : '';
        !markOpt.lng ? markOpt.lng = -86.851523 : '';
        !markOpt.latLng ? markOpt.latLng = new google.maps.LatLng(markOpt.lat, markOpt.lng) : '';
        !markOpt.arrastrable ? markOpt.arrastrable = false : '';
        !markOpt.urlIcon ? markOpt.urlIcon = '' : '';
        !markOpt.titulo ? markOpt.titulo = "Marcador" : '';
        !markOpt.mapa ? markOpt.mapa = this.mapa : '';
        !markOpt.mover ? markOpt.mover = false : '';
        !markOpt.clickable ? markOpt.clickable = true : '';
        !markOpt.infoWindow ? markOpt.infoWindow = false : '';
        !markOpt.contenidoInfo ? markOpt.contenidoInfo = markOpt.titulo : '';
        !markOpt.zIndex ? markOpt.zIndex = 1 : '';
        markOpt.log === undefined ? markOpt.log = true : '';
        markOpt.optimized == undefined ? markOpt.optimized = true : '';
        var opcionesMarca = {
            position: markOpt.latLng,
            icon: markOpt.urlIcon,
            title: markOpt.titulo,
            draggable: markOpt.arrastrable,
            map: markOpt.mapa,
            clickable: markOpt.clickable,
            zIndex: markOpt.zIndex,
            optimized: markOpt.optimized
        };
        var marker = new google.maps.Marker(opcionesMarca);
        if (markOpt.mover) {
            this.moverMapa({ latLng: marker.getPosition() });
        }
        marker.destacar = function (tiempo) {
            if (tiempo === void 0) { tiempo = 2000; }
            marker.setAnimation(google.maps.Animation.BOUNCE);
            setTimeout(function () {
                marker.setAnimation(null);
            }, tiempo);
        };
        marker.close = function () {
            if (marker.infoWindow)
                marker.infoWindow.setMap(null);
            marker.setMap(null);
        }.bind(marker);
        if (markOpt.infoWindow) {
            marker.infoWindow = this.agregarInfoWindow({
                marker: marker,
                contenido: markOpt.contenidoInfo
            });
            marker.open = function (contenido) {
                if (contenido)
                    markOpt.contenidoInfo = contenido;
                marker.infoWindow.setContent(markOpt.contenidoInfo);
                marker.infoWindow.open(markOpt.mapa, marker);
            };
        }
        if (markOpt.log)
            this.markerArray.push(marker);
        return marker;
    };
    ncMaps.prototype.agregaPolygon = function (polyOpt) {
        if (typeof polyOpt != 'object')
            return this._mensaje("oMissing");
        if (!polyOpt.path)
            return this._mensaje("oMissing");
        !polyOpt.mapa ? polyOpt.mapa = this.mapa : "";
        !polyOpt.color ? polyOpt.color = "#00B8D4" : "";
        !polyOpt.colorLinea ? polyOpt.colorLinea = "#ffffff" : "";
        !polyOpt.opacidadLinea ? polyOpt.opacidadLinea = 1 : "";
        !polyOpt.anchoLinea ? polyOpt.anchoLinea = 1 : "";
        !polyOpt.opacidadRelleno ? polyOpt.opacidadRelleno = 1 : "";
        !polyOpt.infoBox ? polyOpt.infoBox = false : "";
        !polyOpt.infoBoxContent ? polyOpt.infoBoxContent = "---" : "";
        !polyOpt.clickable ? polyOpt.clickable = true : "";
        var polygon = new google.maps.Polygon({
            paths: polyOpt.path,
            map: polyOpt.mapa,
            strokeColor: polyOpt.colorLinea,
            fillColor: polyOpt.color,
            strokeOpacity: polyOpt.opacidadLinea,
            fillOpacity: polyOpt.opacidadRelleno,
            strokeWeight: polyOpt.anchoLinea,
            clickable: polyOpt.clickable,
            infoBox: polyOpt.infoBoxEnable,
            infoBoxContent: polyOpt.infoBoxContent
        });
        polygon.getBounds = function () {
            var bounds = new google.maps.LatLngBounds();
            polygon.getPath().forEach(function (element) { bounds.extend(element); });
            return bounds;
        };
        polygon.getCenter = function () {
            return polygon.getBounds().getCenter();
        };
        if (polyOpt.infoBox) {
            var labelOptions = {
                content: polyOpt.infoBoxContent,
                boxStyle: {
                    textAlign: 'center',
                    fontSize: '8pt',
                    width: '50px'
                },
                disableAutoPan: true,
                pixelOffset: new google.maps.Size(-25, 0),
                position: polygon.getCenter(),
                closeBoxURL: '',
                isHidden: false,
                pane: 'mapPane',
                enableEventPropagation: true
            };
            polygon.infoBox = new InfoBox(labelOptions).open(polygon.getMap());
        }
        this.polyGonArray.push(polygon);
        return polygon;
    };
    ncMaps.prototype.agregaPolyline = function (polyOpt) {
        if (typeof polyOpt != 'object')
            return this._mensaje("oMissing");
        if (!polyOpt.path)
            return this._mensaje("ap-1");
        !polyOpt.flechas ? polyOpt.flechas = false : "";
        !polyOpt.colorLinea ? polyOpt.colorLinea = "#336666" : "";
        !polyOpt.opacidadLinea ? polyOpt.opacidadLinea = 1 : "";
        !polyOpt.anchoLinea ? polyOpt.anchoLinea = 2 : "";
        !polyOpt.mapa ? polyOpt.mapa = this.mapa : "";
        !polyOpt.banderas ? polyOpt.banderas = false : "";
        !polyOpt.velocidad ? polyOpt.velocidad = 100 : "";
        !polyOpt.mostrar ? polyOpt.mostrar = true : "";
        !polyOpt.autoZoom ? polyOpt.autoZoom = false : "";
        var polyline;
        if (polyOpt.autoZoom)
            this.autoZoom({ path: polyOpt.path });
        if (polyOpt.banderas) {
            this.agregarMarcador({
                titulo: "Origen",
                latLng: polyOpt.path[0], urlIcon: 'http://maps.google.com/mapfiles/ms/micons/blue.png'
            });
            this.agregarMarcador({
                titulo: "Destino",
                latLng: polyOpt.path[polyOpt.path.length - 1], urlIcon: 'http://maps.google.com/mapfiles/ms/micons/red-dot.png'
            });
        }
        var simbolo_flecha = "";
        if (polyOpt.flechas)
            simbolo_flecha = {
                path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
                strokeOpacity: 1,
                strokeWeight: 1,
                scale: 2,
                fillColor: polyOpt.colorLinea,
                fillOpacity: 1
            };
        polyline = new google.maps.Polyline({
            path: polyOpt.path,
            strokeColor: polyOpt.colorLinea,
            strokeOpacity: polyOpt.opacidadLinea,
            strokeWeight: polyOpt.anchoLinea,
            clickable: false,
            icons: [{
                    icon: simbolo_flecha,
                    offset: '0',
                    repeat: '200px'
                }]
        });
        if (polyOpt.mostrar)
            polyline.setMap(this.mapa);
        this.polylineArray.push(polyline);
        return polyline;
    };
    ncMaps.prototype.getIndicaciones = function (directOpt, callback) {
        var _this = this;
        var App = this;
        $("#mAkmToNsUn").remove();
        this.direcArray.forEach(function (oDireccion) { oDireccion.setMap(null); });
        if (!directOpt.origen)
            return this._mensaje("gd-1");
        if (!directOpt.destino)
            return this._mensaje("gd-2");
        !directOpt.pathObligados ? directOpt.pathObligados = [] : '';
        !directOpt.modeDeViaje ? directOpt.modeDeViaje = "DRIVING" : '';
        !directOpt.verDistancia ? directOpt.verDistancia = false : '';
        !directOpt.preserveViewport ? directOpt.preserveViewport = true : '';
        !directOpt.suppressMarkers ? directOpt.suppressMarkers = false : '';
        !directOpt.suppressPolylines ? directOpt.suppressPolylines = false : '';
        !directOpt.mapa ? directOpt.mapa = this.mapa : '';
        !directOpt.draggable ? directOpt.draggable = false : '';
        !callback ? callback = null : '';
        !directOpt.verIndicaciones ? directOpt.verIndicaciones = false : '';
        var callbackData = {};
        var _travelMode = null;
        var _waypoints = [];
        var directionsService = new google.maps.DirectionsService;
        var directionsDisplay = new google.maps.DirectionsRenderer;
        var start = directOpt.origen;
        var end = directOpt.destino;
        var _generaEstilos = function () {
            var css = "#ncIndicacionesPanel{\n\t\t\t\t\tfont-family: 'Roboto','sans-serif';\n\t\t\t\t\tline-height: 30px;\n\t\t\t\t\tbackground-color: white;\n\t\t\t\t\twidth:0;\n\t\t\t\t\toverflow: hidden;\n\t\t\t\t\tfloat: right;\n\t\t\t\t}\n\t\t\t\t#ncClose{\n\t\t\t\t\tfont-size: 1.2em;\n\t\t\t\t\tcursor: pointer;\n\t\t\t\t\tfloat: right;\n\t\t\t\t}\n\t\t\t\t#ncPanelContent{\n\t\t\t\t\twidth: 300px;\n\t\t\t\t\tpadding:0 10px;\n\t\t\t\t\theight: 100%;\n\t\t\t\t\t\n\t\t\t\t}\n\t\t\t\t#ncPanelContent>div{\n\t\t\t\t\toverflow-y: scroll;\n\t\t\t\t\theight: 100%;\n\t\t\t\t }\n\t\t\t\t#ncPanelContent table tr:hover{background-color:#ddd;}\n\t\t\t\t.mapaConDirectionPanel{\n\t\t\t\t\tfloat:left;\n\t\t\t\t\twidth:100%;\n\t\t\t\t}";
            var style = document.createElement("style");
            style.type = 'text/css';
            if (style.styleSheet) {
                style.styleSheet.cssText = css;
            }
            else {
                style.appendChild(document.createTextNode(css));
            }
            document.head.appendChild(style);
        };
        var _ajustaAnchoDeMapa = function (callback) {
            if (!directOpt.verIndicaciones) {
                callback();
                return;
            }
            if ($("#" + _this.idMapa).hasClass("mapaConDirectionPanel")) {
                $("#ncIndicacionesPanel").css({ width: 298 });
                $('#ncIndicacionesPanel').animate({ opacity: 1 }, 600);
                callback();
                return;
            }
            $("#" + _this.idMapa).addClass("mapaConDirectionPanel");
            $("#" + _this.idMapa).delay(30).animate({ width: '-=300' }, 300);
            $("#ncIndicacionesPanel").delay(70).animate({ width: 298 }, 300, function () {
                $("#ncIndicacionesPanel").css({ border: '1px solid #DDD' });
                callback();
            });
        };
        var _generaNcPanelDiv = function () {
            var App = _this;
            $("#ncIndicacionesPanel").remove();
            var ncPanel = "<div id=\"ncIndicacionesPanel\" class=\"ncIndicationElement\"><div id=\"ncPanelContent\"><sapn>\u00BFCom\u00F3 llegar?</span><span id=\"ncClose\">x</span></div></div>";
            $("#" + _this.idMapa).parent().append(ncPanel);
            $('#ncClose').click(function () {
                App.limpiaIndicaciones();
            });
            var oMapa = $("#" + _this.idMapa);
            $("#ncIndicacionesPanel").height(oMapa.height() || 0 - 2);
        };
        var _generaIndicacionesPanel = function () {
            if (!directOpt.verIndicaciones)
                return;
            if (!_this.estilizado) {
                _generaEstilos();
                _this.estilizado = true;
            }
            _generaNcPanelDiv();
            var element = document.getElementById('ncPanelContent');
            directionsDisplay.setPanel(element);
        };
        var _generaModoDeViaje = function (modoDeViaje) {
            var travelMode;
            switch (modoDeViaje.toUpperCase()) {
                case "BICYCLING":
                    travelMode = google.maps.TravelMode.BICYCLING;
                    break;
                case "TRANSIT":
                    travelMode = google.maps.TravelMode.TRANSIT;
                    break;
                case "WALKING":
                    travelMode = google.maps.TravelMode.WALKING;
                    break;
                default:
                    travelMode = google.maps.TravelMode.DRIVING;
                    break;
            }
            return travelMode;
        };
        var _kilometrosTotales = function (oResult) {
            var total = 0;
            var myroute = oResult.routes[0];
            for (var i = 0; i < myroute.legs.length; i++) {
                total += myroute.legs[i].distance.value;
            }
            total = total / 1000;
            return total + ' km';
        };
        var _puntosObligados = function () {
            if (!directOpt.pathObligados)
                return;
            directOpt.pathObligados.forEach(function (po) {
                _waypoints.push({ location: po });
            });
        };
        _generaIndicacionesPanel();
        _puntosObligados();
        _travelMode = _generaModoDeViaje(directOpt.modeDeViaje);
        directionsDisplay.setMap(directOpt.mapa);
        if (directOpt.verDistancia) {
            google.maps.event.addListener(directionsDisplay, 'directions_changed', function () {
                var tKm = _kilometrosTotales(directionsDisplay.getDirections());
                if ($("#mAkmToNsUn")[0] == undefined)
                    $("#" + App.idMapa).append("<div id='mAkmToNsUn' class='ncIndicationElement'>Distancia: " + tKm + "</div>");
                else
                    $("#mAkmToNsUn").html("Distancia: " + tKm);
                if ($("#styleMn3X")[0] == undefined)
                    $("head").append("<style id='styleMn3X'>#mAkmToNsUn{position:absolute;background-color:#3367D6;color:white;padding:10px;margin:10px;border-radius:3px;bottom:0px;-webkit-transition: background-color 2s ease-out;-moz-transition: background-color 10s ease-out;-o-transition: background-color 10s ease-out;transition: background-color 10s ease-out;}#mAkmToNsUn:hover{background-color: red;cursor:pointer}</style>");
            });
        }
        var request = {
            origin: start,
            destination: end,
            waypoints: _waypoints,
            travelMode: _travelMode,
            durationInTraffic: true,
            unitSystem: google.maps.UnitSystem.METRIC
        };
        directionsService.route(request, function (result, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                _ajustaAnchoDeMapa(function () {
                    App.reajustar();
                    directionsDisplay.setOptions({ suppressMarkers: directOpt.suppressMarkers, suppressPolylines: directOpt.suppressPolylines });
                    directionsDisplay.setDirections(result);
                    App.direcArray.push(directionsDisplay);
                    callbackData.oDirectionsDisplay = directionsDisplay;
                    callbackData.duracion = directionsDisplay.directions.routes[0].legs[0].duration.text;
                    callbackData.distancia = directionsDisplay.directions.routes[0].legs[0].distance.text.replace(",", ".");
                    if (callback != null)
                        callback(callbackData);
                });
            }
        }.bind(this));
        return;
    };
    ncMaps.prototype.limpiaIndicaciones = function () {
        var App = this;
        if (!this.direcArray.length)
            return;
        var idMapa = this.idMapa;
        this.direcArray.forEach(function (obj) { obj.setMap(null); });
        this.direcArray = [];
        $("#" + idMapa).delay(50).animate({ width: '100%' }, 400, function () {
            $("#" + idMapa).removeClass("mapaConDirectionPanel");
        });
        $(".ncIndicationElement").animate({ width: 0 }, 400, function () {
            $(this).remove();
            App.reajustar();
        });
    };
    ncMaps.prototype.getDistancia = function (disOpt) {
        if (typeof disOpt != 'object')
            return this._mensaje("oMissing");
        if (!disOpt.origen)
            return this._mensaje("gd-1");
        if (!disOpt.destino)
            return this._mensaje("gd-2");
        !disOpt.unidadMetrica ? disOpt.unidadMetrica = "m" : "";
        try {
            var unidadMetrica = { corto: "", largo: "" };
            var distancia = google.maps.geometry.spherical.computeDistanceBetween(disOpt.origen, disOpt.destino);
            switch (disOpt.unidadMetrica) {
                case "cm":
                    distancia = (distancia * 100).toFixed(2);
                    unidadMetrica.corto = "Centimetros";
                    unidadMetrica.largo = "cm";
                    break;
                case "m":
                    distancia = distancia.toFixed(2);
                    unidadMetrica.corto = "Metros";
                    unidadMetrica.largo = "m";
                    break;
                case "km":
                    distancia = (distancia / 100).toFixed(2);
                    unidadMetrica.corto = "Kilometros";
                    unidadMetrica.largo = "km";
                    break;
            }
            return { distancia: distancia, unidadMetrica: unidadMetrica };
        }
        catch (err) {
            console.log(err);
        }
        return;
    };
    ncMaps.prototype.getDistanciaLineal = function (disLinOpt) {
        if (typeof disLinOpt != 'object')
            return this._mensaje("oMissing");
        if (!disLinOpt.origen)
            return this._mensaje("gd-1");
        if (!disLinOpt.destino)
            return this._mensaje("gd-2");
        var rad = function (x) {
            return x * Math.PI / 180;
        };
        var R = 6378137;
        var dLat = rad(disLinOpt.destino.lat() - disLinOpt.origen.lat());
        var dLong = rad(disLinOpt.destino.lng() - disLinOpt.origen.lng());
        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(rad(disLinOpt.origen.lat())) * Math.cos(rad(disLinOpt.destino.lat())) * Math.sin(dLong / 2) * Math.sin(dLong / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = (R * c).toFixed(2);
        var distancia = { distancia: d, unidadMetrica: { corto: "m", largo: "Metros" } };
        return distancia;
    };
    ncMaps.prototype.getRumboText = function (rumbo) {
        var rumboEl = "";
        switch (rumbo) {
            case 0:
                rumboEl = 'NORTE';
                break;
            case 1:
                rumboEl = 'NORESTE';
                break;
            case 2:
                rumboEl = 'ESTE';
                break;
            case 3:
                rumboEl = 'SURESTE';
                break;
            case 4:
                rumboEl = 'SUR';
                break;
            case 5:
                rumboEl = 'SUROESTE';
                break;
            case 6:
                rumboEl = 'OESTE';
                break;
            case 7:
                rumboEl = 'NOROESTE';
                break;
        }
        return rumboEl;
    };
    ncMaps.prototype.getZoom = function () {
        return this.mapa.getZoom();
    };
    ncMaps.prototype.getDireccionDePunto = function (latLng, callback) {
        if (!latLng)
            return this._mensaje("oLatLngMissing");
        !callback ? this._mensaje("cMissing") : "";
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode({
            'location': latLng
        }, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                var direccion = results[0].formatted_address;
                var allData = results[0];
                var calle_1 = "";
                var numero_1 = "";
                results[0].address_components.forEach(function (ac) {
                    var tempCalle, tempNumero;
                    tempCalle = ac.types.findIndex(function (a) {
                        return a.indexOf('route') >= 0;
                    });
                    if (tempCalle >= 0)
                        calle_1 = ac.long_name;
                    tempNumero = ac.types.findIndex(function (a) {
                        return a.indexOf('street_number') >= 0;
                    });
                    if (tempNumero >= 0)
                        numero_1 = ac.long_name;
                });
                calle_1 = calle_1 + " " + numero_1;
                if (callback)
                    callback({ calle: calle_1, direccion: direccion, allData: allData });
                else
                    console.log(calle_1, direccion, allData);
            }
            else {
                window.alert('Google no pudo encontrar a la dirección: ' + status);
            }
        });
        return;
    };
    ncMaps.prototype.getPuntoDeDireccion = function (addressOpt, callback) {
        if (typeof addressOpt != 'object')
            return this._mensaje("oMissing");
        !callback ? this._mensaje("cMissing") : "";
        !addressOpt.pais ? addressOpt.pais = "MX" : "";
        !addressOpt.codigoPostal ? addressOpt.codigoPostal = "28000" : "";
        !addressOpt.direccion ? addressOpt.direccion = "Colima" : "";
        !addressOpt.location ? addressOpt.location = false : "";
        !addressOpt.latLngBounds ? addressOpt.latLngBounds = false : "";
        !addressOpt.restrictions ? addressOpt.restrictions = false : "";
        !addressOpt.restrictions ? addressOpt.restrictions = {} : addressOpt.restrictions = { country: addressOpt.pais, postalCode: addressOpt.codigoPostal };
        var geocoder = new google.maps.Geocoder();
        var request = {};
        if (addressOpt.direccion)
            request.address = addressOpt.direccion;
        if (addressOpt.location)
            request.location = addressOpt.location;
        if (addressOpt.latLngBounds) {
            var v = addressOpt.latLngBounds;
            var bounds = new google.maps.LatLngBounds();
            bounds.extend(v.a);
            bounds.extend(v.b);
            request.bounds = bounds;
        }
        geocoder.geocode(request, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                var punto = results[0].geometry.location;
                var direccion = results[0].formatted_address;
                if (callback)
                    callback({ punto: punto, direccion: direccion });
                else
                    console.log(punto, direccion);
            }
            else {
                window.alert("Google no pudo encontrar la direcci\u00F3n\n" + addressOpt.direccion);
            }
        }.bind(this));
        return;
    };
    ncMaps.prototype.iniciaSearchBox = function (objSearch) {
        if (objSearch === void 0) { objSearch = {}; }
        var App = this;
        !objSearch.texto ? this._mensaje("oDefault") : "";
        !objSearch.texto ? objSearch.texto = "&iquest;Qu&eacute; es lo que buscas?" : "";
        !objSearch.change ? objSearch.change = false : "";
        !objSearch.marginLeft ? objSearch.marginLeft = "10" : "";
        !objSearch.maxWidth ? objSearch.maxWidth = "500" : "";
        !objSearch.urlIcon ? objSearch.urlIcon = '' : '';
        !objSearch.autoReturnToPosition ? objSearch.autoReturnToPosition = false : "";
        var input = $("<input type=\"text\" id=\"search\" class=\"form-control\" placeholder=\"" + objSearch.texto + "\" style=\"padding:10px;background-color:rgba(255,255,255,0.93);margin:10px 0 0 10px;width:100%;margin-left:" + objSearch.marginLeft + "px;max-width:" + objSearch.maxWidth + "px;border: 1px solid #BFBFBF;\">")[0];
        var cl = $('<i id="clSrc" class="glyphicon glyphicon-remove" style="display:none;margin:12px 0 0 -21px;line-height:30px;color:gray;cursor:pointer;font-size:15px;width:20px;background-color: white;"></i>')[0];
        try {
            var input_1 = ($("<input>")[0]);
            new google.maps.places.SearchBox(input_1);
        }
        catch (err) {
            console.log("Error: Se requiere la libreria 'Places'");
            return;
        }
        this.mapa.controls[google.maps.ControlPosition.LEFT_BOTTOM].push(input);
        this.mapa.controls[google.maps.ControlPosition.LEFT_BOTTOM].push(cl);
        var searchBoxMarker;
        this.searchBox = new google.maps.places.SearchBox(input, this.mapa.getBounds());
        this.mapa.addListener('bounds_changed', function () {
            App.searchBox.setBounds(App.mapa.getBounds());
        });
        var place, p;
        this.searchBox.addListener('places_changed', function () {
            var places = App.searchBox.getPlaces();
            if (places.length == 0) {
                return;
            }
            if (!objSearch.marker)
                try {
                    searchBoxMarker.setMap(null);
                }
                catch (err) { }
            $("#clSrc").fadeIn(500);
            place = places[0];
            if (objSearch.change != false) {
                place.position = place.geometry.location;
                objSearch.change(place);
                return;
            }
            p = place.geometry.location;
            if (objSearch.marker) {
                App.moverMapa({ latLng: p });
                objSearch.marker.setPosition(p);
                searchBoxMarker = objSearch.marker;
            }
            else {
                searchBoxMarker = App.agregarMarcador({ lat: p.lat(), lng: p.lng(), titulo: place.name, mover: true, urlIcon: objSearch.urlIcon });
            }
        });
        setTimeout(function () {
            $("#clSrc").click(function () {
                $("#clSrc").fadeOut(500);
                $("#search").val("");
                if (objSearch.autoReturnToPosition) {
                    (function () { return App.mapa.panTo(function () { return App.originalPosition; }); });
                    (function () { return App.mapa.setZoom(function () { return App.originalZoom; }); });
                }
                if (!objSearch.marker)
                    try {
                        searchBoxMarker.setMap(null);
                    }
                    catch (err) { }
            });
            $("#clSrc").hover(function () {
                $(this).css("color", "red");
            }, function () {
                $(this).css("color", "gray");
            });
            $("#search").bind("input", function () {
                if ($(this).val() == "") {
                    $("#clSrc").fadeOut(500);
                    if (!objSearch.marker)
                        try {
                            searchBoxMarker.setMap(null);
                        }
                        catch (err) { }
                }
            });
        }, 5000);
    };
    ncMaps.prototype.latLngBounds = function (ne, sw) {
        return new google.maps.LatLngBounds(ne, sw);
    };
    ;
    ncMaps.prototype.latLng = function (lat, lng) {
        return new google.maps.LatLng(lat, lng);
    };
    ncMaps.prototype.generaKMLsByPoints = function (generaKML) {
        if (generaKML == undefined) {
            return this._mensaje('oMissing');
        }
        ;
        if (generaKML.path == undefined) {
            return this._mensaje('ap-1');
        }
        ;
        generaKML.titulo == undefined ? generaKML.titulo = "Ruta" : "";
        var _coordinates = "";
        generaKML.path.forEach(function (p) {
            _coordinates += p.F + ',' + p.A + ',' + '0 ';
        });
        var _xml = '<?xml version="1.0" encoding="UTF-8"?><kml xmlns="http://www.opengis.net/kml/2.2" xmlns:gx="http://www.google.com/kml/ext/2.2" xmlns:kml="http://www.opengis.net/kml/2.2" xmlns:atom="http://www.w3.org/2005/Atom"><Document><name>' + generaKML.titulo + '.kml</name><StyleMap id="msn_ylw-pushpin"><Pair><key>normal</key><styleUrl>#sn_ylw-pushpin</styleUrl></Pair><Pair><key>highlight</key><styleUrl>#sh_ylw-pushpin</styleUrl></Pair></StyleMap><Style id="sh_ylw-pushpin"><IconStyle><scale>1.3</scale><Icon><href>http://maps.google.com/mapfiles/kml/pushpin/ylw-pushpin.png</href></Icon><hotSpot x="20" y="2" xunits="pixels" yunits="pixels"/></IconStyle><LineStyle><color>ccff6a00</color><width>4</width></LineStyle></Style><Style id="sn_ylw-pushpin"><IconStyle><scale>1.1</scale><Icon><href>http://maps.google.com/mapfiles/kml/pushpin/ylw-pushpin.png</href></Icon><hotSpot x="20" y="2" xunits="pixels" yunits="pixels"/></IconStyle><LineStyle><color>ccff6a00</color><width>4</width></LineStyle></Style><Placemark><name>' + generaKML.titulo + '</name><styleUrl>#msn_ylw-pushpin</styleUrl><LineString><tessellate>1</tessellate><coordinates>' + _coordinates + '</coordinates></LineString></Placemark></Document></kml>';
        return _xml;
    };
    ncMaps.prototype.autoZoom = function (objAz) {
        var _this = this;
        var App = this;
        if (typeof objAz != 'object')
            return this._mensaje("oMissing");
        !objAz.tipo ? this._mensaje("oDefault") : '';
        !objAz.tipo ? objAz.tipo = "latlng" : '';
        !objAz.qZoom ? objAz.qZoom = 0 : '';
        if (!objAz.path) {
            objAz.path = this.markerArray;
            objAz.tipo = 'marker';
        }
        var latlngbounds = new google.maps.LatLngBounds();
        objAz.path.forEach(function (o) {
            switch (objAz.tipo.toLocaleLowerCase()) {
                case "latlng":
                    latlngbounds.extend(o);
                    break;
                case "marker":
                    latlngbounds.extend(o.getPosition());
                    break;
                case "polygon":
                    latlngbounds.extend(o.getCenter());
                    break;
            }
        });
        this.mapa.fitBounds(latlngbounds);
        setTimeout(function () {
            var zoom = _this.mapa.getZoom();
            if (objAz.path.length == 1 && zoom >= 20) {
                var newZoom = zoom - (objAz.qZoom || 5);
                App.mapa.setZoom(newZoom);
            }
        }, 300);
        return;
    };
    ncMaps.prototype.moverMapa = function (moverOpt) {
        if (typeof moverOpt != 'object') {
            this._mensaje("oMissing");
        }
        else {
            !moverOpt.lat ? moverOpt.lat = 21.161985 : "";
            !moverOpt.lng ? moverOpt.lng = -86.851523 : "";
            !moverOpt.latLng ? moverOpt.latLng = this.latLng(moverOpt.lat, moverOpt.lng) : "";
            this.mapa.panTo(moverOpt.latLng);
        }
    };
    ncMaps.prototype.getLimitesVisibles = function () {
        var bounds = this.mapa.getBounds();
        var NorthEast = bounds.getNorthEast();
        var SouthWest = bounds.getSouthWest();
        var NE = this.latLng(NorthEast.lat(), NorthEast.lng());
        var SE = this.latLng(SouthWest.lat(), NorthEast.lng());
        var SO = this.latLng(SouthWest.lat(), SouthWest.lng());
        var NO = this.latLng(NorthEast.lat(), SouthWest.lng());
        var puntos = { NE: NE, SE: SE, SO: SO, NO: NO };
        return puntos;
    };
    ncMaps.prototype.pointToTrazo = function (point) {
        if (point == null)
            return "Se requiere array de coordenadas:[{long,lat}]";
        var points = point.replace(/["'()]/g, "").replace(/POINT /g, "").split(",");
        var path = new Array();
        points.forEach(function (p) {
            p = p.split(' ');
            var lt = new google.maps.LatLng(p[1], p[0]);
            path.push(lt);
        });
        var trazoCodificado = google.maps.geometry.encoding.encodePath(path);
        return trazoCodificado;
    };
    ncMaps.prototype.polygonToTrazo = function (POLYGON) {
        if (POLYGON == null)
            return "Se requiere array de coordenadas:[{long,lat},{long,lat}]";
        var points = POLYGON.replace(/["'()]/g, "").replace(/POLYGON/g, "").split(",");
        var path = new Array();
        points.forEach(function (p) {
            p = p.split(" ");
            var lt = new google.maps.LatLng(p[1], p[0]);
            path.push(lt);
        });
        var trazoCodificado = google.maps.geometry.encoding.encodePath(path);
        return trazoCodificado;
    };
    ncMaps.prototype.trazoToPath = function (trazo) {
        return google.maps.geometry.encoding.decodePath(trazo);
    };
    ncMaps.prototype.reajustar = function () {
        google.maps.event.trigger(this.mapa, "resize");
    };
    ncMaps.prototype.generaPanorama = function (panoramaOpt) {
        if (typeof panoramaOpt != 'object')
            return this._mensaje("oMissing");
        if (!panoramaOpt)
            return this._mensaje("oMissing");
        if (!panoramaOpt.div)
            return this._mensaje("c-1");
        if (!panoramaOpt.latLng)
            return this._mensaje("oLatLngMissing");
        !panoramaOpt.mostrar ? panoramaOpt.mostrar = true : "";
        if (this.panorama) {
            this.mapa.setStreetView(null);
            this.panorama = null;
        }
        var idElement = document.getElementById(panoramaOpt.div);
        var opt = {
            position: panoramaOpt.latLng,
            visible: true,
            linksControl: false,
            panControl: false,
            addressControl: true,
            zoomControlOptions: {
                style: google.maps.ZoomControlStyle.SMALL
            },
            enableCloseButton: false
        };
        this.panorama = new google.maps.StreetViewPanorama(idElement, opt);
        if (panoramaOpt.mostrar)
            this.setPanorama(this.panorama);
        return;
    };
    ncMaps.prototype.getPanorama = function () {
        return this.panorama;
    };
    ncMaps.prototype.setPanorama = function (panorama) {
        try {
            this.mapa.setStreetView(panorama);
        }
        catch (err) {
            console.log(err);
        }
    };
    ncMaps.prototype.snapedRoad = function (spRopt, callback) {
        if (typeof spRopt != 'object')
            return this._mensaje("oMissing");
        if (!spRopt.path)
            return this._mensaje("ap-1");
        if (!this.apiKey)
            return this._mensaje("apiKeyMissing");
        !spRopt.interpolate ? spRopt.interpolate = true : "";
        var App = this;
        var pathValues = [];
        var puntos = [];
        spRopt.path.forEach(function (d) {
            pathValues.push(d.toUrlValue());
        });
        $.get('https://roads.googleapis.com/v1/snapToRoads', {
            interpolate: spRopt.interpolate,
            key: App.apiKey,
            path: pathValues.join('|')
        }, function (data) {
            data.snappedPoints.forEach(function (d) {
                var latlng = App.latLng(d.location.latitude, d.location.longitude);
                puntos.push(latlng);
            });
            callback({ 'data': data, 'puntos': puntos });
        });
        return;
    };
    ncMaps.prototype.clearMap = function () {
        this.markerArray.forEach(function (obj) { obj.setMap(null); });
        this.circuloArray.forEach(function (obj) { obj.setMap(null); });
        this.polyArray.forEach(function (obj) { obj.setMap(null); });
        this.direcArray.forEach(function (obj) { obj.setMap(null); });
        this.polylineArray.forEach(function (obj) { obj.setMap(null); });
        $("#mAkmToNsUn").remove();
        this.markerArray = [];
        this.circuloArray = [];
        this.polyArray = [];
        this.direcArray = [];
        this.polylineArray = [];
    };
    ncMaps.prototype._mensaje = function (codigo, msg) {
        var mensaje;
        switch (codigo) {
            case "oDefault":
                mensaje = "Advertencia: Se inicia el elemento sin parametros. " + msg;
                break;
            case "oMissing":
                mensaje = "Error: Se requiere objeto de configuracion.";
                break;
            case "c-1":
                mensaje = "Error: Se requiere el 'id' HTML donde interactuar.";
                break;
            case "c-2":
                mensaje = "Advertencia: Ingresa tu apiKey de Google Maps";
                break;
            case "ai-1":
                mensaje = "Error: Se requiere un marcador -> {}.marker";
                break;
            case "ap-1":
                mensaje = "Error: Se requiere path con puntos.";
                break;
            case "gd-1":
                mensaje = "Error: No se ingreso el origen.";
                break;
            case "gd-2":
                mensaje = "Error: No se ingreso el destino";
                break;
            case "oLatLngMissing":
                mensaje = "Error: Se esperaban objetos latLng.";
                break;
            case "cMissing":
                mensaje = "Advertencia: No se detecto callback";
                break;
            case "az-1":
                mensaje = "Error: Se requiere el parametro tipo";
                break;
            case "apiKeyMissing":
                mensaje = "Error: Se requiere tener una apiKey.";
                break;
            default:
                mensaje = ":)";
                break;
        }
        console.log(mensaje);
        return mensaje;
    };
    ncMaps.prototype.loadScript = function (url, callback) {
        var script = document.createElement("script");
        script.type = "text/javascript";
        if (script.readyState)
            script.onreadystatechange = function () {
                if (script.readyState == "loaded" ||
                    script.readyState == "complete") {
                    script.onreadystatechange = null;
                    callback();
                }
                ;
            };
        else
            script.onload = function () {
                callback();
            };
        script.src = url;
        document.getElementsByTagName("head")[0].appendChild(script);
    };
    return ncMaps;
}());
//# sourceMappingURL=ncMaps.js.map