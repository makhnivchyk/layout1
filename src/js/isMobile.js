let isMobile = {
    Android: function() {return navigator.userAgent.match(/Android/i);},
    BlackBerry: function() {return navigator.userAgent.match(/BlackBerry/i);},
    iOS: function() {return navigator.userAgent.match(/iPhone|iPad|iPod/i);},
    Opera: function() {return navigator.userAgent.match(/Opera Mini/i);},
    Windows: function() {return navigator.userAgent.match(/IEMobile/i);},
    any: function() {return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());}
}

$(document).ready(function() {
    if(isMobile.any()){
        $('.nav__list li span').click(function(){
            $(this).parent().children('a').toggleClass('mobile')
            $(this).parent().children('ul').toggleClass('mobile')
            $(this).toggleClass('mobile')
            $(document).mouseup(function (e) {
                var container = $('.nav__sub-list');
                if (container.has(e.target).length === 0){
                    container.removeClass('mobile')
                    $('.nav__list li span').removeClass('mobile')
                    $('.nav__list li ul').removeClass('mobile')
                    $('.nav__link').removeClass('mobile')
                }
            });
            $(document).mouseup(function (e) {
                var container = $('.nav__sub-sub-list');
                if (container.has(e.target).length === 0){
                    container.removeClass('mobile')
                    $('.nav__sub-list li span').removeClass('mobile')
                    $('.nav__sub-list li ul').removeClass('mobile')
                    $('.nav__sub-link').removeClass('mobile')
                }
            });
        })
    }else{
        $('.nav__list li, .nav__sub-list li, .nav-sub-sub-list li').addClass('pc')
    }
})