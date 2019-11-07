//this variable used for custom correction scrolling position
const corrector = 50;

$(document).ready(function() {
  //show or hide button up
  $(window).scroll(function() {
    $(document).scrollTop() < corrector ?
    $('#up').hide() : $('#up').show();
  });
  //click on button up
  $('#up').click(function() {
    scrolling(0);
  });
  //click on links in header
  $('.nav').click(function() {
    const height = $(window).height();
    const x = '#' + $(this).attr('name');
    //scroll to section with id = # + anchor name
    scrolling($(x).position().top - (height / 2));
  });
});

function scrolling(x) {
  window.scrollTo({ top: x, behavior: 'smooth' });
}
