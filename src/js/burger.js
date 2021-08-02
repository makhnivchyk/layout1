/*Burger*/

$(document).ready(function() {
    $('.header__burger').click(function() {
        $('.header__burger, .nav, .intro, header, .header__logo, .header__icons').toggleClass('active')
        $('body').toggleClass('lock')         
    })
    $('li').children('ul.nav__sub-list').parent().children('a').after('<span class="link__arrow"></span>')
    $('li').children('ul.nav__sub-sub-list').parent().children('a').after('<span class="link__sub-arrow"></span>')
    $('.nav__sub-list-wrapper li span').click(function(){
        $(this).parent().children('ul').children().length === 0 ?
            $(this).parent().children('ul').css('display', 'none')
            : null
    })
});