const COLORS = ['#635960', '#8b8e59', '#eada7d', '#fffecd', '#7bc3ab'];
for (let i = 0; i < 2; i++) {
    COLORS.forEach(color => {
        const span = $('<span></span>').css({
            'background-color' : color
        }).addClass('colors');
        $('.colors_container').append(span);
    });
};

// chat or login
window.onload = function() {
    pageLoader('reload=true');
};

// send signal to the server to destroy session
$('.logout').click(function() {
    pageLoader('logout=true');
    stopCheckingMsg();
    location.reload();
});

// show chat or login forms
const pageLoader = route => {
    $.ajax({
        type: 'POST',
        url: '../app/router.php',
        data: route,
        success: function(response) {
            if(response.indexOf('chatForm') > -1) { // page reloaded, current user
                makeChat(response);
            } else {  // page loaded first time or user pressed logout button
                document.getElementById('form').addEventListener('submit', function(e) {
                    e.preventDefault();
                    sendLoginData();
                });
                $('.logout').addClass('hidden');
            }
        }
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
                makeChat(data);
            }
        },
        error: function(xhr) {
            alert('error: ' + xhr.status);
        }
    });
};

const makeChat = response => {
    $('#wrapper').html(response);
    $('.logout').removeClass('hidden');
    addListenerToChat();
    checkAndRemoveMsg();
    scrolling();
    welcome();

};

function addListenerToChat() {
    const chatForm = document.getElementById('chatForm');
    chatForm.addEventListener('submit', function(e) {
        e.preventDefault();
        sendMsg($('#chatMsg').val());
        checkMouse();
        $('#chatMsg').val('');
    });
};

// sending messages
const sendMsg = msg => {
    if(msg.trim()) { // skip empty messages
        $.ajax({
            type: 'POST',
            url: '../app/msgHandler.php',
            data: 'message=' + msg.trim(),
            success: function(data) {
                $('#msg').append(data);
                scrolling();
            },
            error: function(xhr) {
                alert('error: ' + xhr.status);
            }
        });
    }
};

/* ancillary request in order to obtain newest messages */
const request = () => {
    sendMsg('__SERVICE__MSG__');
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
const checkMouse = () => {
    $("#msg").on({
        mouseover: function() {
            mouseOverMsgArea = true;
        },
        mouseout: function() {
            mouseOverMsgArea = false;
        }
    });
};


const TIME_CONSTATNS = {
    request: 5000, // millisec
    checkOldMsg: 60000, // 1min
    hideWelcome: 20000, // 20sec
    timeToRemoveMsg: 60 // minutes
};

// used to prevent multiple initialisation of the following function
let firstTime = true;

// repeted checks for new messages
const checkAndRemoveMsg = () => {
    if(firstTime) {
        setInterval(request, TIME_CONSTATNS.request);
        setInterval(removeOldMsg, TIME_CONSTATNS.checkOldMsg);
        firstTime = false;
    }
};

const stopCheckingMsg = () => {
    clearInterval(request);
    clearInterval(removeOldMsg);
}

// welcome message
const welcome = () => {
    $('.welcome').removeClass('hidden');
    $('.welcome').hide(TIME_CONSTATNS.hideWelcome);
};

const getTime = () => {
    const time = new Date();
    const result = Number(time.getHours()) * TIME_CONSTATNS.timeToRemoveMsg
    + Number(time.getMinutes());
    return result;
};

const removeOldMsg = () => {
    const currentTime = getTime();
    const elements = document.getElementsByClassName('time');
    Array.from(elements).forEach(elem => {
        const timeStamp = elem.innerHTML.split(':');
        const msgTime = Number(timeStamp[0]) * TIME_CONSTATNS.timeToRemoveMsg + Number(timeStamp[1]);
        if (currentTime - msgTime > TIME_CONSTATNS.timeToRemoveMsg) {
            $(elem).removeClass('time');
            $(elem).closest('p').addClass('hidden');
        }
    });
};
