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

// flag used for launch function checkAndRemoveMsg() only once
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
            $('#msg').append(data);
            scrolling();
            if(onlyOnce) { // avoiding multiple initialisation of this function
                checkAndRemoveMsg();
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
            $('.msg').append(data);
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

// check whether or not mouse over chat position
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

const TIME_CONSTATNS = {
    request: 10000, // millisec
    checkOldMsg: 55000,
    hideWelcome: 20000,
    removeMsg: 60 // min
};

// repeted checks for new messages
function checkAndRemoveMsg() {
    setInterval(request, TIME_CONSTATNS.request);
    setInterval(removeOldMsg, TIME_CONSTATNS.checkOldMsg);
};

// welcome message
const welcome = () => {
    $(".welcome").removeClass('hidden');
    $('.welcome').hide(TIME_CONSTATNS.hideWelcome);
};

const getTime = () => {
    const time = new Date();
    const result = Number(time.getHours()) * TIME_CONSTATNS.removeMsg
    + Number(time.getMinutes());
    return result;
};

function removeOldMsg() {
    const currentTime = getTime();
    const elements = document.getElementsByClassName('time');
    Array.from(elements).forEach(elem => {
        const timeStamp = elem.innerHTML.split(':');
        const msgTime = Number(timeStamp[0]) * TIME_CONSTATNS.removeMsg + Number(timeStamp[1]);
        if (currentTime - msgTime > TIME_CONSTATNS.removeMsg) {
            $(elem).removeClass('time');
            $(elem).closest('p').addClass('hidden');
        }
    });
};
