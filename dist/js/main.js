'use strict';


$(function () {
    // header lang
    $('.header__lang-item a').click(function() {
        $('.header__lang-item').removeClass("active");
        $(this).parent().addClass("active");
    })
    // header user
    $('.header__content-item.user').click(function () {
        $('.header__user-list').toggleClass('active');
    })

    $(document).mouseup(function (e) { 
        if (!$(".header__content-item.user").is(e.target) && 
            $(".header__content-item.user").has(e.target).length === 0) { 
            $(".header__user-list").removeClass('active');
        }
    });

    // menu list btn
    $('.menu-down .menu-list__btn').click(function() {
        $(this).parent().toggleClass('active');
        $(this).toggleClass('active');
        $(this).next().slideToggle();
    })
       
    


});