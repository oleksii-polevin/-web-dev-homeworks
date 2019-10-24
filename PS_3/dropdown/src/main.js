//adding black trinagle
const entity = '&#x25bc';
document.getElementById('down').innerHTML = entity;

//array with names and their icons
const names = [['Barack Obama', 'media/boss.png'],
['Frankenstein','media/doctor.png'],
['Lewis Carroll','media/user.png'],
['Brendan Eich','media/user2.png'],
['John Doe','media/team.png']];

//creating dropdown but don't display it
function createHidden() {
  for (let number of names) {
    const div = $('<div></div>');
    const img = $('<img></img>');
    const text = $('<p></p>').text(number[0]);
    $(img).attr({"src": number[1],
    "width": "30px"});
    $(div).append(img, text);
    $(div).addClass('hidden dropdown');
    $('#container').append(div);
  }
}

let selected = $('#select');

//processing click on div
$(document).ready(function() {
  $('.dropdown').click(function() {
   selected = $(this);
    //toggle all siblings of chosen div
    switcher();
  });

//processing actions on  triangle
  $('#down').on({
    click: function() {
      switcher();
    },
    mouseenter: function() {
      $('#down').addClass('gray');
    },
    mouseleave: function() {
      $('#down').removeClass('gray')
    }
  });


  //changing background color of hovered element
  $('.dropdown').on({
    mouseenter: function() {
      $(this).addClass('selected');
    },
    mouseleave: function() {
      $(this).removeClass('selected')
    }
  });
});

//processing click not on dropdown
$(document).mouseup(function (e) {
    const container = $('#container');
    if (container.has(e.target).length === 0) {
      $(selected).siblings('.dropdown').hide('fast');
      $('#container').removeClass('active');
      $(selected).addClass('closed');
    }
});

function switcher() {
   $(selected).siblings('.dropdown').toggle('fast');
   $('#container').toggleClass('active');
   $(selected).toggleClass('closed');
}
