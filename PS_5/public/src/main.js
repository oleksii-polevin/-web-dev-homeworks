const COLORS = ['#635960', '#8b8e59', '#eada7d', '#fffecd', '#7bc3ab'];
for (let i = 0; i < 2; i++) {
    COLORS.forEach(color => {
        const span = $('<span></span>').css({
            'background-color' : color
        }).addClass('colors');
        $('.colors_container').append(span);
    });
};

window.onload = function() {
    reloader();
};

$('.logout').click(function() {
    $.ajax({
        type: 'POST',
        url: '../app/router.php',
        data: 'logout=true',
    });
    stopCheckingMsg();
    location.reload();
});

const reloader = () => {
    $.ajax({
        type: 'POST',
        url: '../app/router.php',
        data: 'reload=true',
        success: function(response) {
            if(response.indexOf('chatForm') > -1) {
                makeChat(response);
            } else {
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

const makeChat = (response) => {
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
        sendMsg();
        checkMouse();
        $('#chatMsg').val("");
    });
};

// sending messages
const sendMsg = () => {

    const msg = $('#chatMsg').val();

    if(msg) {
        $.ajax({
            type: 'POST',
            url: '../app/msgHandler.php',
            data: 'message=' + msg,
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

/* empty request in order to obtain newest messages */
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
    request: 10000, // millisec
    checkOldMsg: 55000,
    hideWelcome: 20000,
    removeMsg: 60 // min
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
    const result = Number(time.getHours()) * TIME_CONSTATNS.removeMsg
    + Number(time.getMinutes());
    return result;
};

const removeOldMsg = () => {
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
