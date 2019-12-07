const COLORS = ['#635960', '#8b8e59', '#eada7d', '#fffecd', '#7bc3ab'];
for (let i = 0; i < 2; i++) {
  COLORS.forEach(color => {
    const span = $('<span></span>').css({
      'background-color' : color
    }).addClass('colors');
    $('.colors_container').append(span);
  });
};

// eventListener for login page
if(document.getElementById('form')) {
  const form = document.getElementById('form');
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    sendLoginData();
  });
};

function sendLoginData() {
  const msg = $('#form').serialize();
  $.ajax({
    type: 'POST',
    url: '../app/login.php',
    data: msg,
    success: function(data) {
      if(data.indexOf('error') > -1 ) {
        const START = 6; // skip word error which marking wrong inputs
        const response = data.substring(START);
        $('#error').html(response);
      } else {
        $('#wrapper').replaceWith(data);
        scrolling();
        addListenerToChatForm();
        welcome(); // disappearing welcome message
      }
    },
    error: function(xhr) {
      alert('error: ' + xhr.status);
    }
  });
};

// flag used for launch function checkNewMsg() only once
// it is necessary because this function intself used setInterval method
let onlyOnce = true;

// sending messages
function sendMsg() {

  const msg = $('#chatForm').serialize();

  $.ajax({
    type: 'POST',
    url: '../app/msgHandler.php',
    data: msg,

    success: function(data) {
      $('.msg').html(data);
      scrolling();
      if(onlyOnce) { // avoiding multiple initialisation of this function
        checkNewMsg();
        onlyOnce = false;
      }
    },

    error: function(xhr) {
      alert('error: ' + xhr.status);
    }
  });
};

/* empty request in order to obtain newest messages
   may be this is not the optimal method for requesting them,
  but it is simplier to ask php instead of parsing json in js
*/
const request = () => {
  $.ajax({
    type: 'POST',
    url: '../app/msgHandler.php',
    data: 'message=', // empty
    success: function(data) {
      $('.msg').html(data);
      scrolling();
    },
    error: function(xhr) {
      alert('error: ' + xhr.status);
    }
  });
};

// used for preventing scroll when mouse is upon messages area
let mouseOverMsgArea;

const scrolling = () => {
  const elem = document.getElementById("msg");
    const y = elem.scrollHeight;
    if(!mouseOverMsgArea) {
    elem.scrollTo({ top: y, behavior: 'smooth' });
  }
};

// checkNewMsg whether or not mouse over chat position
function checkMouse() {
  $("#msg").on({
    mouseover: function() {
      mouseOverMsgArea = true;
    },
    mouseout: function() {
      mouseOverMsgArea = false;
    }
  });
};

// bind listener to chat
function addListenerToChatForm() {
  const chatForm = document.getElementById('chatForm');
  chatForm.addEventListener('submit', function(e) {
    e.preventDefault();
    sendMsg();
    checkMouse();
    $('#chatMsg').val("");
  });
};

// repeted checks for new messages
function checkNewMsg() {
  setInterval(request, 10000);
};

// welcome message
const welcome = () => {
  $(".welcome").removeClass('hidden');
  $('.welcome').hide(15000);
}
