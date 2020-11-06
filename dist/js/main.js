'use strict';


$(function () {
    // header lang
    $('.header__lang-item a').click(function () {
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

    // header btn
    $('.header__btn').click(function () {
        $('.header__content-inner').toggleClass('active');
    })

    // menu list btn
    $('.menu-list__item>.menu-list__btn').click(function () {
        $(this).toggleClass('active');
        $(this).next().slideToggle();
    })

    $('.menu-down .menu-list__btn').click(function () {
        $(this).parents('.menu-down__item').toggleClass('active');
        $(this).toggleClass('active');
        $(this).parent().next().slideToggle();
    })

    // scroll, fixed header
    // $(window).scroll(function () {
    //     let top = $(document).scrollTop();
    //     if (top > 0) {
    //         $(".header__content").addClass(' header__content--fixed');
    //     } else {
    //         $(".header__content").removeClass(' header__content--fixed');
    //     }
    // });




       
    




    // form
    $('form').on("submit", function (event) {
        event.preventDefault();
        console.log($(this).serialize());
    });
});