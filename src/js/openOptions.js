/*Open options*/

$(document).ready(function() {
    $('.btn-item').click(function(){
        if($(this).hasClass('icon-close')){
            $(this).removeClass('icon-close').addClass('icon-open')
            $(this).parent().next().removeClass('hide-text')
        }else if($(this).hasClass('icon-open')){
            $(this).removeClass('icon-open').addClass('icon-close')
            $(this).parent().next().addClass('hide-text')
        }
    })
})