"use strict";
var Mapa = (function () {
    function Mapa() {
        this.sucursales = [
            {
                nombre: "Suc. Aguascalientes",
                lat: 21.924574,
                lng: -102.298780,
                direccion: "Teléfono: 449 994 8980 / 50<br>Plaza Diamante Blvd. Luis Donaldo Colosio No. 645 Local 14 Fracc. Jardines de la Concepcion C.P. 20120",
                estado: "Aguascalientes, Ags."
            },
            {
                nombre: "Suc. Tabasco",
                lat: 18.004028,
                lng: -92.955599,
                direccion: "Teléfono: 993 316 2340<br>Plaza Mallorca Perif. Carlos Pellicer Camara No. 204 Local A201 Col. Tabasco C.P. 2000",
                estado: "Villahermosa, Tabasco"
            },
            {
                nombre: "Matriz Cancún",
                lat: 21.160126,
                lng: -86.821153,
                direccion: "<strong>Telefono: </strong> 998 883 9042<br><strong>Dirección: </strong>Av. Bonampak Mz.15, L53, Súper Manzana 3 C.P. 77500",
                estado: "Cancún, Quintana Roo"
            },
            {
                nombre: "Suc. Querétaro",
                lat: 20.573418,
                lng: -100.361685,
                direccion: "Teléfono: 442 290 8843 / 325 2118<br>Central Park Torre II Piso 9B'2 Calle Armando Birlain Schafler #2001 A Col. Centro Sur C.P. 76090",
                estado: "Querétaro, Qro."
            }
        ];
        this.iniciarMapa();
    }
    Object.defineProperty(Mapa.prototype, "apiKey", {
        get: function () {
            return 'AIzaSyArTTN1x6-BXxvXCyzGAp3n3xZ1rnZrbZU';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Mapa.prototype, "baseUrl", {
        get: function () {
            return sessionStorage.base_url || '';
        },
        enumerable: true,
        configurable: true
    });
    Mapa.prototype.iniciarMapa = function () {
        var App = this;
        var mapConfig = {
            idMapa: "mapa",
            apiKey: this.apiKey
        };
        var opciones = {
            lat: 19.2439524,
            lng: -103.7266729,
            zoom: 14.0,
            ui: false,
            streetView: false,
            tipoCtr: false,
        };
        new ncMaps(mapConfig, opciones).ready(function (ncMaps) {
            App.mapa = ncMaps;
            App.sucursales.map(function (suc) {
                App.mostrarPuntoGmaps(suc);
            });
            App.mapa.autoZoom(App.mapa.markerArray);
        });
    };
    Mapa.prototype.mostrarPuntoGmaps = function (suc) {
        var contentString = "<div class=\"contentInfoWindow\"><span>" + suc.nombre + "</span><br>" + suc.direccion + "<br>" + suc.estado + "</div>";
        this.mapa.agregarMarcador({
            urlIcon: this.baseUrl + "src/img/marker.png",
            lat: suc.lat,
            lng: suc.lng,
            infoWindow: true,
            contenidoInfo: contentString
        });
    };
    return Mapa;
}());
$(document).ready(function () {
    new Mapa();
});
//# sourceMappingURL=mapa.js.map