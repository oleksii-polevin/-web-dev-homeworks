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
    const div = document.createElement('div');
    const text = document.createTextNode(number[0]);
    const img = document.createElement('img');
    img.setAttribute("src", number[1]);
    img.setAttribute("width", "25px");
    div.appendChild(img);
    div.appendChild(text);
    div.style.display = "none";
    container.appendChild(div);
  }
}
let selected = $('#select');
$(document).ready(function() {
  $("div").click(function() {
    selected = $(this);
    //toggle all siblings of chosen div
    switcher();
  });

  $('span').click(function() {
     switcher();
  })

  function switcher() {
     $(selected).siblings().toggle("fast");
  }

  //changing background color of hovered element
  $("div").on({
    mouseenter: function(){
      $(this).css("background-color", "#ddd");
    },
    mouseleave: function() {
      $(this).css("background-color", "#fff");
    }
  });
});
