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

  });
  

