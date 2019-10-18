//this variable used for custom correction  position of scrolling
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
	const x = "#" + $(this).attr("name");
	scrolling($(x).position().top - corrector);
})
