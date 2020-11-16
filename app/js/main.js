'use strict';


$(function () {
    // header lang
    $('.header__lang-item a').click(function () {
        $('.header__lang-item').removeClass("active");
        $(this).parent().addClass("active");
    })
    // header callback
    $('.header__content-btn').magnificPopup({});

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
    //     if (top > 60) {
    //         $(".header__content").addClass(' header__content--fixed');
    //     } else {
    //         $(".header__content").removeClass(' header__content--fixed');
    //     }
    // });

    // form
    $('form').on("submit", function (event) {
        event.preventDefault();
        console.log($(this).serialize());

        $.magnificPopup.close();

        // page reviews (popup)
        if ($(this).hasClass('reviews__form')) {
            let dateDay = new Date().getDate(),
                dateMonth = new Date().getMonth() + 1,
                dateYear = new Date().getFullYear();
            if (dateDay < 10) {
                dateDay = '0' + dateDay;
            } 
            if (dateMonth < 10) {
                dateDay = '0' + dateMonth;
            } 

            let itemInfo = [{
                name: $(this).find('.form__input').val(),
                message: $(this).find('.form__textarea').val(),
                rating: +$(this).find('.rating-area input:checked').val(),
                date: dateDay + '.' + dateMonth + '.' + dateYear,
            }]

            $("#reviewsItemTemplate").tmpl(itemInfo).appendTo(".reviews__inner");
            initializationRateYo($(".reviews__item-star"));
        }
    });

    // page login (remember)
    $('.form__remember input').click(function () {
        if ($(this).is(':checked')) {
            $('.form__remember').addClass('active');
        } else {
            $('.form__remember').removeClass('active');
        }
    })

    // page login (password show)
    $('.form__password-checkbox input').click(function () {
        if ($(this).is(':checked')) {
            $('.login__password .form__input').attr('type', 'text');
            $('.form__password-checkbox').addClass('active');
        } else {
            $('.login__password .form__input').attr('type', 'password');
            $('.form__password-checkbox').removeClass('active');
        }
    })

    // page login (label)
    $('.form__input').blur(function () {
        let label = $(this).next();

        if ($(this).val() === '') {
            $(label).removeClass('active');
        } else {
            $(label).addClass('active');
        }
    })

    // page cart (style input)
    $('<div class="quantity-nav"><div class="quantity-button quantity-up">+</div><div class="quantity-button quantity-down">–</div></div>').insertAfter('.quantity input');
    $('.quantity').each(function () {
        let spinner = jQuery(this),
            input = spinner.find('input[type="number"]'),
            btnUp = spinner.find('.quantity-up'),
            btnDown = spinner.find('.quantity-down'),
            min = input.attr('min'),
            max = input.attr('max');

        btnUp.click(function () {
            let oldValue = parseFloat(input.val());
            if (oldValue >= max) {
                var newVal = oldValue;
            } else {
                var newVal = oldValue + 1;
            }
            spinner.find("input").val(newVal);
            spinner.find("input").trigger("change");
        });

        btnDown.click(function () {
            let oldValue = parseFloat(input.val());
            if (oldValue <= min) {
                var newVal = oldValue;
            } else {
                var newVal = oldValue - 1;
            }
            spinner.find("input").val(newVal);
            spinner.find("input").trigger("change");
        });

    });

    // page cart (item sum)
    $('.quantity-button').click(function () {
        let cartItem = $(this).parents('.cart__item'),
            quantity = $(cartItem).find('.cart__item-input').val(),
            price = $(cartItem).find('.cart__item-input').data('price'),

            sum = quantity * price,

            integer = Math.trunc(sum),
            fraction = Math.trunc((sum - Math.trunc(sum)) * 100);

        $(cartItem).find('.cart__item-sum').text(integer + '.');
        if (fraction === 0) {
            $(cartItem).find('.cart__num-js .cart__item-penny').text('0' + fraction);
        } else {
            $(cartItem).find('.cart__num-js .cart__item-penny').text(fraction);
        }

        cartSum();
    })

    // page cart (btn remove item)
    $('.cart__item-btn').click(function () {
        $(this).parents('.cart__item').remove();

        cartSum();
    })

    // function total sum
    function cartSum() {
        let products = $('.cart__item-input'),
            totalSum = 0,
            totalPenny, productSum;

        if (products.length === 0) {
            $('.cart__total-num').text('0.');
            $('.cart__total-penny').text('00');
        } else {
            products.each(function () {
                productSum = +($(this).val() * +$(this).data('price')).toFixed(2);
                totalSum += productSum;
            })
        }

        totalPenny = Math.trunc((totalSum - Math.trunc(totalSum)) * 100);

        $('.cart__total-num').text(Math.trunc(totalSum) + '.');
        if (totalPenny === 0) {
            $('.cart__total-penny').text('0' + totalPenny);
        } else {
            $('.cart__total-penny').text(totalPenny);
        }
    }
    cartSum();

    // page blog (load more)
    let blogsitems = $('.blogs__wrap-item');
    $('.load-more').click(function () {
        let delta = 180;
        $(this).find('span').css('transform', `rotate(${delta}deg)`);

        setTimeout(() => {
            blogsitems.each(function (index, element) {
                $(element).show();
            })

            $(this).hide();
        }, 300);
    })

    // page blog (max-width:450px show blogs items)
    if ($(window).width() <= '450') {
        blogsitems.each(function (index, element) {
            if (index > 5) {
                $(element).hide();
            }
        })
    }

    // page wish-list (remove item)
    $('.product__remove').click(function () {
        $(this).parents('.favorites__item').remove();
    })

    // page wish-list (dislike item)
    $('.product__favorites').click(function () {
        $(this).toggleClass('product__favorites--dislike');
    })

    // page reviews (rateYo)
    function initializationRateYo(element) {
        element.rateYo({
            readOnly: true,
            starWidth: "16px",
            fullStar: true,
            spacing: "3px"
        });
    }

    initializationRateYo($(".reviews__item-star"));

    // page reviews (popup)
    $('.reviews__btn').magnificPopup({});
});