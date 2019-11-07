//adding black trinagle
const entityTriangle = '&#x25bc';
document.getElementById('down').innerHTML = entityTriangle;
//default select
let selected = $('#select');

const NAMES = [
  {name: 'Barack Obama',  image: 'media/boss.png'},
  {name: 'Frankenstein',  image: 'media/doctor.png'},
  {name: 'Lewis Carroll', image: 'media/user.png'},
  {name: 'Brendan Eich',  image: 'media/user2.png'},
  {name: 'John Doe',      image: 'media/team.png'}
];


//creating dropdown but don't display it
function createDropdown() {
  for (let item of NAMES) {
    const div = $('<div></div>');
    const img = $('<img></img>');
    const text = $('<p></p>').text(item.name);
    $(img).attr({"src": item.image,
    "width": "30px"});
    $(div).append(img, text);
    $(div).addClass('hidden dropdown');
    $('#container').append(div);
  }
}

$(document).ready(function() {
  createDropdown();
  $('.dropdown').click(function() {
    selected = $(this);
    //toggle all siblings of chosen div
    dropdownSwitcher();
  });

  //processing actions on  triangle
  $('#down').on({
    click: function() {
      dropdownSwitcher();
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

  //processing click not on dropdown
  $(document).mouseup(function (e) {
    const container = $('#container');
    if (container.has(e.target).length === 0) {
      $(selected).siblings('.dropdown').hide();
      $(container).removeClass('active');
      $(selected).addClass('closed');
    }
  });

  //toggles dropdown
  function dropdownSwitcher() {
    $(selected).siblings('.dropdown').toggle();
    $('#container').toggleClass('active');
    $(selected).toggleClass('closed');
  }
});
