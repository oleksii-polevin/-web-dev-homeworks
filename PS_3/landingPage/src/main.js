//this variable used for custom correction scrolling position
const corrector = 50;
$(document).ready(function() {
  $(window).scroll(function() {
		$(document).scrollTop() < corrector ?
      $("#up").hide() : $("#up").show();
 });
 $("#up").click(function() {
   scrolling(0);
 })
})
function scrolling(x) {
  window.scrollTo({ top: x, behavior: 'smooth' });
}
$("a").click(function() {
  const height = $(window).height();
	const x = "#" + $(this).attr("name");
  //scroll to section with id = # + anchor name
	scrolling($(x).position().top - (height / 2));
})
