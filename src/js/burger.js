/*Burger*/

$(document).ready(function() {
    $('.header__burger').click(function() {
        $('.header__burger, .nav, .intro, header, .header__logo, .header__icons').toggleClass('active')
        $('body').toggleClass('lock')         
    })
    $('li').children('ul.nav__sub-list').parent().children('a').addClass("link__arrow")
    $('li').children('ul.nav__sub-sub-list').parent().children('a').addClass("link__sub-arrow")
});