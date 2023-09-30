const settings = {
  slidesToShow: 5,
  slidesToScroll: 5,
  initialSlide: 0,
  dots: false,
  infinite: false,
  speed: 500,
  swipeToSlide: true,
  responsive: [
    {
      breakpoint: 1216,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 4,
      },
    },
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 4,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 3.3,
        slidesToScroll: 3,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2.3,
        slidesToScroll: 2,
      },
    },
  ],
};

export { settings };
