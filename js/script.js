$(document).ready(function (){
    //Adição ou remoção da classe nav-transparent on scrolling
    $(window).scroll(function(){
        if ($(this).scrollTop() > 50) {
            $('#def-nav').removeClass('nav-transparent');
        } else {
            $('#def-nav').addClass('nav-transparent');
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

    $(window).scroll(function(){        

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
    $('.menu-toggler').on('click', function(){
        $(this).toggleClass('open');
        $('.top-nav').toggleClass('open');
    })
    //FIM do evento de clique que altera classe para 'open'-----------------------------------------

    //Evento de clique em algum elemento do menu. A classe 'open' é removida da classe atual 'menu-toggler' e 'top-nav'
    $('.top-nav .nav-link').on('click', function(){
        $('.menu-toggler').removeClass('open');
        $('.top-nav').removeClass('open');
    })
    //FIM do evento de clique em elemento do menu que remove a classe 'open'-------------------------

    //Evento de clique em algum elemento do menu. A ancoragem interna dos links foi feita com 'nav a[href*="#"]' pois na declaração do link foi informado o id à qual cada link estaria ligado. Ex: 'a href="#autorney"'. O evento tbm configura uma animação de 2s para o scrolling da tela até o link destino.
    $('nav a[href*="#"]').on('click', function(){
        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top - 100
        }, 2000)
    })
    //FIM do evento de clique em elemento do menu que realiza a animação até o topo da ancoragem desse elemento
    
    //Evento de clique no botão de id 'up'. Leva o usuário até o topo da página com uma animação de 2s.
    $('#up').on('click', function(){
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
})