const container = document.getElementById('container');
const entity = '&#x25bc';
document.getElementById('down').innerHTML = entity;
//array with names and their icons
const names = [["Barack Obama","media/boss.png"],
["Frankenstein","media/doctor.png"],
["Lewis Carroll","media/user.png"],
["Brendan Eich","media/user2.png"],
["John Doe","media/team.png"]];
//creating dropdown but don't display it
function createHidden() {
  for(let number of names) {
    const div = $('<div></div>');
    const img = $('<img></img>');
    $(img).attr({"src": number[1],
    "width": "25px"});
    $(div).append(img, number[0]);
    $(div).addClass('hidden');
    $(container).append(div);
  }
}
let selected = $('#select');
//processing click on div
$(document).ready(function() {
  $("div").click(function() {
    selected = $(this);
    //toggle all siblings of chosen div
    switcher();
  });
//processing click on span
  $('span').click(function() {
     switcher();
  })
  function switcher() {
     $(selected).siblings().toggle("fast");
  }
  //changing background color of hovered element
  $("div").on({
    mouseenter: function(){
      $(this).addClass('selected');
    },
    mouseleave: function() {
      $(this).removeClass('selected');
    }
  });
});
