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
    $(window).scroll(function () {
        let top = $(document).scrollTop();
        if (top > 130) {
            $(".header__content").addClass(' header__content--fixed');
        } else {
            $(".header__content").removeClass(' header__content--fixed');
        }
    });

    // form
    $('form').on("submit", function (event) {
        event.preventDefault();
        console.log($(this).serialize());
    });

    // page login (remember)
    $('.login__remember input').click(function () {
        if ($(this).is(':checked')) {
            $('.login__remember').addClass('active');
        } else {
            $('.login__remember').removeClass('active');
        }
    })

    // page login (password show)
    $('.login__password-checkbox input').click(function () {
        if ($(this).is(':checked')) {
            $('.login__password .login__input').attr('type', 'text');
            $('.login__password-checkbox').addClass('active');
        } else {
            $('.login__password .login__input').attr('type', 'password');
            $('.login__password-checkbox').removeClass('active');
        }
    })

    // page login (label)
    $('.login__input').blur(function() {
        let label = $(this).next();

        if ($(this).val() === '') {
            $(label).removeClass('active');
        } else {
            $(label).addClass('active');
        }
    })
});