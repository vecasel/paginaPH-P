"use strict";
$(function () {
    $("#menu-mobile").toggle();
    $("#btn-menu-mobile").click(function (e) {
        e.preventDefault();
        $("#menu-mobile").toggle("slow");
    });
    $("#menu-mobile a").click(function (e) {
        $(this).each(function () {
            var sectionTop = $(this.hash).offset().top;
            $("html, body").animate({
                scrollTop: sectionTop
            }, 1500);
        });
    });
    $("#menu a").click(function (e) {
        $(this).each(function () {
            var sectionTop = $(this.hash).offset().top;
            $("html, body").animate({
                scrollTop: sectionTop - 64
            }, 1500);
        });
        $("#menu li").removeClass("active");
        $(this).parent().addClass("active");
    });
    $("#frm-contacto").submit(function (e) {
        e.preventDefault();
        var data = $(this).serialize();
        console.log(data);
        $("#frm-contacto .btn").html('<i class="mdi mdi-spin mdi-loading"></i> Enviando').prop('disabled', true);
        $.ajax({
            url: 'inicio/contacto',
            type: "POST",
            data: data
        }).done(function (result) {
            $("#frm-contacto")[0].reset();
            $("#frm-contacto .btn").html('<i class="mdi mdi-check"></i> Enviado');
            setTimeout(function () {
                $("#frm-contacto .btn").prop('disabled', false);
                $("#frm-contacto .btn").html('Enviar');
            }, 3000);
            console.log(result);
        }).fail(function (jqXHR, textStatus) {
            $("#frm-contacto .btn").prop('disabled', false);
            console.log(textStatus);
        }).always(function (jqXHR, textStatus) {
        });
    });
    $(".linkAviso").click(function () {
        $("#avisoPrivacidad").toggleClass("aviso-abierto");
        if ($("#body").is(":visible"))
            setTimeout(function () { $("#body").toggle(); }, 500);
        else {
            $("#body").toggle();
            window.scrollTo(0, document.body.scrollHeight);
        }
    });
});
//# sourceMappingURL=menu.js.mapm