/*Burger*/

$(document).ready(function() {
    $('.header__burger').click(function() {
        $('.header__burger, .nav, .nav__list, .nav__link, .nav__sub-list, .nav__wrapper, .nav__sub-link, .nav__sub-sub-list, .nav__sub-sub-link').toggleClass('open-menu');       
    });
});