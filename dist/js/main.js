'use strict';


$(function () {

    $(document).mouseup(function (e) {
        if (!$(".header__content-item.user").is(e.target) &&
            $(".header__content-item.user").has(e.target).length === 0) {
            $(".header__user-list").removeClass('active');
        }
        if (!$(".product-slider .product").is(e.target) &&
            $(".product-slider .product").has(e.target).length === 0) {
            $(this).parents('.product-slider').find('.slick-dots').removeClass('imposition');
        }
    });

    // плавный скрол
    $('.footer__btn').on('click', function () {
        var el = $(this);
        var dest = el.attr('href');
        if (dest !== undefined && dest !== '') {
            $('html').animate({
                scrollTop: $(dest).offset().top
            }, 500
            );
        }
        return false;
    });

    // page one good (star)
    initializationRateYo($(".good__starts"));

    // page one good (slider)
    $('.good__slider-for').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        asNavFor: '.good__slider-nav'
    });
    $('.good__slider-nav').slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        asNavFor: '.good__slider-for',
        focusOnSelect: true,
        arrows: true,
        responsive: [
            {
                breakpoint: 510,
                settings: {
                    slidesToShow: 3,
                }
            },
        ],
    });

    // page one good (slider product hover)
    $(".product-slider .product-slider__item").hover(function () {
        $(this).parents('.product-slider').find('.slick-dots').addClass('imposition');
    }, function () {
        $(this).parents('.product-slider').find('.slick-dots').removeClass('imposition');
    })

    $(".product-slider .product").click(function () {
        $(this).parents('.product-slider').find('.slick-dots').addClass('imposition');
    });

    // page cart (style input)
    $('<div class="quantity-nav"><div class="quantity-button quantity-up">+</div><div class="quantity-button quantity-down">–</div></div>').insertAfter('.quantity input');
    $('.quantity').each(function () {
        let spinner = jQuery(this);
        let input = spinner.find('input[type="number"]');
        let btnUp = spinner.find('.quantity-up');
        let btnDown = spinner.find('.quantity-down');
        let min = input.attr('min');
        let max = input.attr('max');

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

    // totalSum (page cart , page order)
    totalSum($('.cart'));
    totalSum($('.order__aside'));

    // page order (total sum)
    $('.order__aside-item .quantity-button').click(function () {
        totalSum($('.order__aside'));
    })

    // page order (remove item)
    $('.order__aside-remove').click(function () {
        $(this).parents('.order__aside-item').remove();
        totalSum($('.order__aside'));
    })

    // page cart (item sum)
    $('.cart__item .quantity-button').click(function () {
        const item = $(this).parents('.cart__item');
        const price = +$(item).data('price') * 100;
        const quantity = $(item).find('.cart__item-input').val();

        const sum = (price * quantity);
        const penny = (sum % 100 === 0) ? '00' : sum % 100;

        $(item).find('.cart__num--js .price__num').text(`${Math.trunc(sum / 100)}.`);
        $(item).find('.cart__num--js .price__penny').text(penny);

        totalSum($('.cart'));
    })

    // page cart (btn remove item)
    $('.cart__item-btn').click(function () {
        $(this).parents('.cart__item').remove();

        totalSum($('.cart'));
    })

    // function total sum
    function totalSum(elements) {
        const items = $(elements).find(`[data-price]`);
        let itemArr = 0;

        items.map((index, el) => {
            const element = ($(el).data(`price`) * 100) * $(el).find('.quantity input').val();

            itemArr += element;
        })

        const penny = (itemArr % 100 === 0) ? '00' : itemArr % 100;

        $(elements).find('.total-sum__num').text(`${Math.trunc(itemArr / 100)}.`);
        $(elements).find('.total-sum__penny').text(penny);
    }

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
    $('.reviews > .reviews__btn').magnificPopup({});

    // page registration (mask phone)
    $('#registration-phone, #order-phone').mask("+38 (999) 999 99 99");

    // tabs
    $('.tab').on('click', function (event) {
        var id = $(this).attr('data-id');
        $('.wrapper').find('.tab-item').removeClass('active-tab').hide();
        $('.wrapper .tabs').find('.tab').removeClass('active');
        $(this).addClass('active');
        $('#' + id).addClass('active-tab').fadeIn();

        if ($(this).parents('.order__inner') && $(this).data('id') === 2) {
            $('.order__checkout').addClass('hide');
        } else if ($(this).parents('.order__inner') && $(this).data('id') === 1) {
            $('.order__checkout').removeClass('hide');
        }

        return false;
    });

    // page one-brand (style select)
    $('select').styler();

    // aside (price range slider)
    let $range = $(".js-range-slider");
    let $inputFrom = $(".js-input-from");
    let $inputTo = $(".js-input-to");
    let instance;
    let min = 0;
    let max = 2500;
    let from = 0;
    let to = 0;

    $range.ionRangeSlider({
        skin: "round",
        type: "double",
        min: min,
        max: max,
        from: 239,
        to: 2390,
        onStart: updateInputs,
        onChange: updateInputs
    });
    instance = $range.data("ionRangeSlider");

    function updateInputs(data) {
        from = data.from;
        to = data.to;

        $inputFrom.prop("value", from);
        $inputTo.prop("value", to);
    }

    $inputFrom.on("input", function () {
        var val = $(this).prop("value");

        // validate
        if (val < min) {
            val = min;
        } else if (val > to) {
            val = to;
        }

        instance.update({
            from: val
        });
    });

    $inputTo.on("input", function () {
        var val = $(this).prop("value");

        // validate
        if (val < from) {
            val = from;
        } else if (val > max) {
            val = max;
        }

        instance.update({
            to: val
        });
    });

    // page order (valid form tabs)
    $('.new-customer__tabs-btn button').on('click', function () {
        let tabsInner = $('.new-customer__tabs-inner');
        let tabsText = $('.new-customer__tabs-text');

        if ($(this).hasClass('new-customer__tabs-next')) {
            let inputs = $('.new-customer__tabs-inner input');
            let inputsLength = inputs.length;

            inputs.each(function (i) {
                if ($(this).val().length === 0 || ($(this).attr('id') === 'order-phone' && $(this).val().length < 19) || (($(this).attr('id') === 'order-email-1') && ($(this).val().match(/.+?\@.+/g) || []).length !== 1)) {
                    $(this).addClass('active');

                    setTimeout(() => {
                        $(this).removeClass('active');
                    }, 1500);

                    return false;
                }
                else if (i === (inputsLength - 1)) {
                    $('.order__inner').toggleClass('active');
                    $(tabsInner).removeClass('active');
                    $(tabsInner[1]).addClass('active');
                    $(tabsText).removeClass('active');
                    $(tabsText[1]).addClass('active');

                }
            })

        } else {
            $('.order__inner').toggleClass('active');
            $(tabsInner).removeClass('active');
            $(tabsInner[0]).addClass('active');
            $(tabsText).removeClass('active');
            $(tabsText[0]).addClass('active');
        }
    })

    // (product slider)
    $('.product-slider').slick({
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        dots: true,
        responsive: [
            {
                breakpoint: 1430,
                settings: {
                    arrows: false
                }
            },
            {
                breakpoint: 1000,
                settings: {
                    slidesToShow: 3,
                    arrows: false
                }
            },
            {
                breakpoint: 670,
                settings: {
                    slidesToShow: 2,
                    arrows: false
                }
            }
        ]
    });

    // index
    $('.main-slider').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
        autoplay: true,
        autoplaySpeed: 2000,
    })

    // header lang
    $('.header__lang-item a').on('click', function () {
        $('.header__lang-item').removeClass("active");
        $(this).parent().addClass("active");
    })
    // header callback
    $('.header__content-btn').magnificPopup({});

    // header user
    $('.header__content-item.user').on('click', function () {
        $('.header__user-list').toggleClass('active');
    })

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
    const topScroll= +$(`.main`).offset().top;
    const topMain = parseFloat(topScroll) - parseFloat($(`.header__top-inner`).css('height'));

    $(window).scroll(function () {
        let top = $(document).scrollTop();
        
        if (top > topScroll) {
            $(".header__content").addClass(' header__content--fixed');
            $(".main").css(`top`, topMain);
            $(".main").css(`margin-bottom`, topMain);
        } else {
            $(".header__content").removeClass(' header__content--fixed');
            $(".main").css(`top`, 0);
            $(".main").css(`margin-bottom`, 0);
        }
    });

    // form
    $('form').on("submit", function (event) {
        event.preventDefault();

        // page registration (mask phone)
        if ($(this).hasClass('registration__form')) {
            let password = $(this).find('#registration-password');
            let passwordRepeat = $(this).find('#registration-password-repeat');

            if (password.val() !== passwordRepeat.val()) {
                passwordRepeat.next().addClass('valid');
                setTimeout(() => {
                    passwordRepeat.next().removeClass('valid');
                }, 2000);
            }
        }

        // page reviews (popup)
        if ($(this).hasClass('reviews__form')) {
            let dateDay = new Date().getDate();
            let dateMonth = new Date().getMonth() + 1;
            let dateYear = new Date().getFullYear();

            if (dateDay < 10) {
                dateDay = '0' + dateDay;
            }
            
            if (dateMonth < 10) {
                dateMonth = '0' + dateMonth;
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

        $.magnificPopup.close();
        console.log($(this).serialize());
    });

    // page login (remember)
    $('.form__checkbox input').click(function () {
        if ($(this).is(':checked')) {
            $(this).parents('.form__checkbox').addClass('active');
        } else {
            $(this).parents('.form__checkbox').removeClass('active');
        }
    })

    // page login (password show)
    $('.form__password-checkbox input').click(function () {
        if ($(this).is(':checked')) {
            $(this).parents('.form__wrap-input').children('.form__input').attr('type', 'text');
            $(this).parents('.form__password-checkbox').addClass('active');
        } else {
            $(this).parents('.form__wrap-input').children('.form__input').attr('type', 'password');
            $(this).parents('.form__password-checkbox').removeClass('active');
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

    // page blog (load more)
    let blogsitems = $('.blogs__wrap-item');
    let delta = 180;

    $('.load-more').click(function () {
        $(this).find('span').css('transform', `rotate(${delta}deg)`);
        delta += 180;
    })

    // page wish-list (remove item)
    $('.product__remove').click(function () {
        $(this).parents('.favorites__item').remove();
    })

    // page wish-list (dislike item)
    $('.product__favorites').click(function () {
        $(this).toggleClass('product__favorites--like');
    })

    // page brands (brand list)
    $('.brands__list').click(function () {
        $(this).children().removeClass('active');
        $(event.target).addClass('active');
    })

    // aside (filter)
    $('.filter__btn').click(function () {
        $(this).toggleClass('active');
        $(this).next().slideToggle();
    })

    // page one brand (max-width: 850px - btn filter, sort)
    $('.one-brand__bnt-filtr').click(function () {
        $('.filter').addClass('active');
    })
    $('.filter__close').click(function () {
        $('.filter').removeClass('active');
    })

    $('.one-brand__bnt-sort').click(function () {
        $('.one-brand__filter').slideToggle();
    })

    // page one good (btn favorite)
    $('.good__btns-favorite').click(function () {
        $(this).toggleClass('active');
    })


    // page brands (mixitup)
    let mixer = mixitup('.brands__inner');
});