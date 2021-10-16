(function ($) {
    "use strict";
    $.fn.sliderResponsive = function (settings) {

        var set = $.extend(
            {
                slidePause: 5000,
                fadeSpeed: 800,
                autoPlay: "on",
                showArrows: "off",
                hideDots: "off",
                hoverZoom: "on",
                titleBarTop: "off"
            },
            settings
        );

        var $slider = $(this);
        var size = $slider.find("> div").length; //number of slides
        var position = 0; // current position of carousal
        var sliderIntervalID; // used to clear autoplay

        // Add a Dot for each slide
        $slider.append("<ul></ul>");
        $slider.find("> div").each(function () {
            $slider.find("> ul").append('<li></li>');
        });

        // Put .show on the first Slide
        $slider.find("div:first-of-type").addClass("show");

        // Put .showLi on the first dot
        $slider.find("li:first-of-type").addClass("showli")

        //fadeout all items except .show
        $slider.find("> div").not(".show").fadeOut();

        // If Autoplay is set to 'on' than start it
        if (set.autoPlay === "on") {
            startSlider();
        }

        // If showarrows is set to 'on' then don't hide them
        if (set.showArrows === "on") {
            $slider.addClass('showArrows');
        }

        // If hideDots is set to 'on' then hide them
        if (set.hideDots === "on") {
            $slider.addClass('hideDots');
        }

        // If hoverZoom is set to 'off' then stop it
        if (set.hoverZoom === "off") {
            $slider.addClass('hoverZoomOff');
        }

        // If titleBarTop is set to 'on' then move it up
        if (set.titleBarTop === "on") {
            $slider.addClass('titleBarTop');
        }

        // function to start auto play
        function startSlider() {
            sliderIntervalID = setInterval(function () {
                nextSlide();
            }, set.slidePause);
        }

        // on mouseover stop the autoplay
        $slider.mouseover(function () {
            if (set.autoPlay === "on") {
                clearInterval(sliderIntervalID);
            }
        });

        // on mouseout starts the autoplay
        $slider.mouseout(function () {
            if (set.autoPlay === "on") {
                startSlider();
            }
        });

        //on right arrow click
        $slider.find("> .right").click(nextSlide)

        //on left arrow click
        $slider.find("> .left").click(prevSlide);

        // Go to next slide
        function nextSlide() {
            position = $slider.find(".show").index() + 1;
            if (position > size - 1) position = 0;
            changeCarousel(position);
        }

        // Go to previous slide
        function prevSlide() {
            position = $slider.find(".show").index() - 1;
            if (position < 0) position = size - 1;
            changeCarousel(position);
        }

        //when user clicks slider button
        $slider.find(" > ul > li").click(function () {
            position = $(this).index();
            changeCarousel($(this).index());
        });

        //this changes the image and button selection
        function changeCarousel() {
            $slider.find(".show").removeClass("show").fadeOut();
            $slider
                .find("> div")
                .eq(position)
                .fadeIn(set.fadeSpeed)
                .addClass("show");
            // The Dots
            $slider.find("> ul").find(".showli").removeClass("showli");
            $slider.find("> ul > li").eq(position).addClass("showli");
        }

        return $slider;
    };
})(jQuery);

$(document).ready(function () {
    //Adição ou remoção da classe nav-transparent on scrolling
    $(window).scroll(function () {
        if ($(this).scrollTop() > 50) {
            $('#nav-wrapper').removeClass('nav-transparent');
        } else {
            $('#nav-wrapper').addClass('nav-transparent');
        }
    })
    //FIM da função de add/remove class 'nasv-transparent'-------------------------------------------------------------- 

    //Sistema de scrollTracker para o efeito de 'active' na navbar 
    var homeOffSetTop = $('#home-head').offset().top;
    var aboutOffSetTop = $('.about').offset().top - 100;
    var servicesOffSetTop = $('.services').offset().top - 100;
    var autorneyOffSetTop = $('.autorney').offset().top - 180;
    var contactOffSetTop = $('.contact').offset().top - 150;
    var articlesOffSetTop = $('.articles-section').offset().top - 280;

    $(window).scroll(function () {

        var activeLi;
        if ($(this).scrollTop() > homeOffSetTop) {
            activeLi = $('.menu>li:nth-child(1)');
        }
        if ($(this).scrollTop() > aboutOffSetTop) {
            activeLi = $('.menu>li:nth-child(2)');
        }
        if ($(this).scrollTop() > servicesOffSetTop) {
            activeLi = $('.menu>li:nth-child(3)');
        }
        if ($(this).scrollTop() > autorneyOffSetTop) {
            activeLi = $('.menu>li:nth-child(4)');
        }
        if ($(this).scrollTop() > contactOffSetTop) {
            activeLi = $('.menu>li:nth-child(5)');
        }
        if ($(this).scrollTop() > articlesOffSetTop) {
            activeLi = $('.menu>li:nth-child(6)');
        }
        activeLi.addClass('active');
        $('.menu>li').not(activeLi).removeClass('active');
    })
    //FIM do sistema de scrollTracker--------------------------------------------------------------

    //Evento de clique no menu. A classe 'open' substitui a classe atual 'menu-toggler' e 'top-nav'
    $('.menu-toggler').on('click', function () {
        $(this).toggleClass('open');
        $('.top-nav').toggleClass('open');
    })
    //FIM do evento de clique que altera classe para 'open'-----------------------------------------

    //Evento de clique em algum elemento do menu. A classe 'open' é removida da classe atual 'menu-toggler' e 'top-nav'
    $('.top-nav .nav-link').on('click', function () {
        $('.menu-toggler').removeClass('open');
        $('.top-nav').removeClass('open');
    })
    //FIM do evento de clique em elemento do menu que remove a classe 'open'-------------------------

    //Evento de clique em algum elemento do menu. A ancoragem interna dos links foi feita com 'nav a[href*="#"]' pois na declaração do link foi informado o id à qual cada link estaria ligado. Ex: 'a href="#autorney"'. O evento tbm configura uma animação de 2s para o scrolling da tela até o link destino.
    $('nav a[href*="#"]').on('click', function () {
        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top - 100
        }, 2000)
    })
    //FIM do evento de clique em elemento do menu que realiza a animação até o topo da ancoragem desse elemento

    //Evento de clique no botão de id 'up'. Leva o usuário até o topo da página com uma animação de 2s.
    $('#up').on('click', function () {
        $('html, body').animate({
            scrollTop: 0
        }, 2000)
    })
    //FIM do evento de clique no botão up que realiza a animação de subida ao topo da página

    //Animação dinâmica por scrolling dos elementos HTML feito com AOS (Animation On Scolling): https://github.com/michalsnik/aos
    AOS.init({
        easing: 'ease',
        duration: 1800,
        once: true
    })
    //FIM da função de animação de landing dos elementos da página

    $("#slider1").sliderResponsive({
        // Using default everything
        // slidePause: 5000,
        // fadeSpeed: 800,
        // autoPlay: "on",
        // showArrows: "off", 
        // hideDots: "off", 
        // hoverZoom: "on", 
        // titleBarTop: "off"
    });

    $("#slider2").sliderResponsive({
        fadeSpeed: 300,
        autoPlay: "off",
        showArrows: "on",
        hideDots: "on"
    });

    $("#slider3").sliderResponsive({
        hoverZoom: "off",
        hideDots: "on"
    });
})

