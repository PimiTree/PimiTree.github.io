$(document).ready(function(){
    $('.carousel__inner').slick({
      speed: 1200,
      // adaptiveHeight: true,
      prevArrow: '<button type="button" class="slick-prev"><img src="img/services/arrow-right.png"></button>', 
      nextArrow: '<button type="button" class="slick-next"><img src="img/services/arrow-right.png"></button>'
        
        });

    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
      $(this)
        .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
        .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
    });

   

    function toggleSlide(item) {
      $(item).each(function(i) {
        $(this).on('click', function(e) {
          e.preventDefault();
          $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
          $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
        })
      });
    };

    toggleSlide('.catalog-item__back');
    toggleSlide('.catalog-item__link');

    //modal
    $('[data-modal=consultation]').on('click', function() {
      $('.overlay, #consultation').fadeIn(100);
    });

    // $('.button_mini').on('click', function () {
    //   $('.overlay, #order').fadeIn(100);
    // });

    $('.modal__close').on('click', function () {
      $('.overlay, #consultation, #order, #order-thanks').fadeOut(100);
    });

    $('.button_mini').each(function(i) {
      $(this).on('click', function() {
        $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
        $('.overlay, #order').fadeIn(100);
      });
    });

    function validateForm (form) {
      $(form).validate({
        rules: {
          name: "required",
          phone: "required",
          email: {
            required: true,
            email: true
          }
        },
          messages: {
            name: "Введите имя",
            phone: "Ваш теелфон в международном формате",
            email: {
              required: "Введите емаил",
              email: "Это не емаил"
            }
          }
        
        });
    };
    validateForm ('#consultation form');
    validateForm ('#consultation-form');
    validateForm ('#order form');

    $('input[name=phone]').mask("+38 (999) 999-99-99");

    $('form').submit(function(e){
      e.preventDefault();

      if (!$(this).valid()) {
        return;
      }

      $.ajax({
        type: "POST",
        url: "mailer/smart.php",
        data: $(this).serialize()
      }).done(function(){
        $(this).find("input").val("");
        $('#consultation, #order').fadeOut(500);
        $('.overlay, #order-thanks').fadeIn(500);
        $('form').trigger('reset');
      });
      return false;
    });
    
});

  