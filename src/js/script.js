$(document).ready(function(){
    $('.carousel__inner').slick({
      infinite: true,
      speed: 300,
      slidesToShow: 1,
      adaptiveHeight: false,
      prevArrow:'<button type="button" class="slick-prev"><img src="icons/polar/prev.png"></button>',
      nextArrow:'<button type="button" class="slick-next"><img src="icons/polar/next.png"></button>',
      responsive: [
        {
          breakpoint: 768,
          settings: {
            dots: false,
            arrows:false,
          }
        }
        // You can unslick at a given breakpoint now by adding:
        // settings: "unslick"
        // instead of a settings object
      ]
    });
    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
      $(this)
        .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
        .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
    });
    

    function ToggleSlide(item) {
      $(item).each(function(i) {
        $(this).on('click', function(e) {
          e.preventDefault();
          $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');  
          $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');  
        })
      });
    };

    ToggleSlide('.catalog-item__link');    
    ToggleSlide('.catalog-item__list_back');


//This is Modal windows

    $('[data-model=consultation]').on('click', function(){
      $('.overlay, #consultation').fadeIn();
    });

    $('.modal__close').on('click', function(){
      $('.overlay, #consultation, #order, #thanks').fadeOut('slow');
    });

/*     $('.button_mini').on('click', function(){
      $('.overlay, #order').fadeIn();
    }); */

    //each перебирает все элементы на странице в данном случае элементы button_mini, function(i) в i записывается номер элемента
    $('.button_mini').each(function(i){
      $(this).on('click',function(){
        $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text())
        $('.overlay, #order').fadeIn();
      })  
    });

//this выбирается тот элемент на который я кликнул. #order .modal__descr - выбираем куда не обходимо поместить текст eq(i) выбираем заголовок элемента по которому кликнули


//валидация


  

  function validateForms(form){
    $(form).validate({
      rules: {
        // simple rule, converted to {required:true}
        name: {
          required: true,
          minlength: 2
        },
        phone: "required",
        email: {
          required: true,
          email: true
        }
      },
      messages: {
        name: {
          required: "Введите ваше имя",
          minlength: jQuery.validator.format("Длнна имени меньше {0} символов")
        },
        phone:"Введите свой номер телефона",
        email: {
          required: "Нам нужен ваш email для связи с вами",
          email: "Неправильно введён адрес почты"
        }
      }
    });
  };

  validateForms('#order form');
  validateForms('#consultation form');
  validateForms('#consultation-form');


  // маска ввода телефона
  $('input[name=phone]').mask("+7 (999) 999-99-99");

/*  //Отправка сообщения с данными форм на почту
  $('form').submit(function(e){
    e.preventDefault(); //отменяем стандартное поведение браузера в данном случае перезагрузку страницы после отправки формы
    $.ajax({ //Отправляем форму методом аждакс т.е. без перезагрузки страницы
      type: "POST",
      url: "mailer/smart.php",
      data: $(this).serialize()
    }).done(function(){
      $(this).find("input").val(""); // после отправки формы в input вставляестя пустая строка
    
    
        $('form').trigger('reset');
    });
    return false;
  });
 */

$('form').submit(function(e) {
  e.preventDefault();
  $.ajax({
      type: "POST",
      url: "mailer/smart.php",
      data: $(this).serialize()
  }).done(function() {
      $(this).find("input").val("");
      $('#consultation, #order').fadeOut();
      $('.overlay, #thanks').fadeIn('slow');

      $('form').trigger('reset');
  });
  return false;
});

//smooth scroll
  
    $(window).scroll(function() {//отслеживаем скролинг пользователя на странице 
        if ($(this).scrollTop() > 1600) { //Если пользователь пролистал более 1600 Px тогда будет выполняться условие
            $('.up').fadeIn();
        }
        else {
          $('.up').fadeOut();
        }
    });
    $("a[href^='#']").click(function(){
      const _href = $(this).attr("href");
      $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
      return false;
});
  
new WOW().init();


});
  