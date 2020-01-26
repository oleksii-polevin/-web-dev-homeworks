
const screen = document.getElementById('wrapper');
const ENTER = 13;
const ESC = 27;
const BUBBLE = 'speech-bubble';
const MAX_LEN = 'maxlength=250';
const URL = '../app/Messanger.php';
let active = false; // prevent multiple bubbles
let ID = 0;
window.onload = function() {
    $.ajax({
        method: 'GET',
        url: URL,
        data: 'page_loaded=',
        success: function(response) {
            if(response) {
                const temp = JSON.parse(response);
                for(let item in temp) {
                    createElem(temp[item].id, temp[item].top, temp[item].left, temp[item].text);
                    ID = parseInt(temp[item].id);
                }
            }
        }
    });
}

$(screen).on('dblclick', function(e) {
    e.preventDefault();
    if (!active) {
        if (e.target === screen) {
            const  top = e.clientY;
            const left = e.clientX;
            createElem(++ID, top, left, value = '');
        } else {
            addInput(e.target);
        }
    }
}).on('dragstop', function(e) {
    const elem = e.target;
    let value;
    active ? value = $(elem).find(':input').val() : value = $(elem).html();
    const info = collectInfo(elem, value);
    saveResults(info);
})

function createElem(id, top, left, value) {
    const elem =
    $(`<div id=${id}></div>`).addClass(BUBBLE).text(value);
    elem.css({'top': top  + 'px',
    'left': left + 'px'});
    $('.wrapper').append(elem);
    elem.draggable({ containment: '#wrapper'});
    if(!value) {
        addInput(elem);
    }
}

function addInput(elem) {
    active = true;
    blur = false;
    const initialValue = $(elem).text();
    const input = $(`<input type='text' value='${initialValue}' ${MAX_LEN}>`);
    $(elem).html(input);
    input.focus();
    input.on('keyup', function(e) {
        active = false;
        if (e.keyCode === ENTER) {
            const value = input.val().trim();
            if(value) {
                const info = collectInfo(elem, value);
                input.remove();
                saveResults(info);
                $(elem).text(value);
            } else {
                deleteRes($(elem).attr('id'));
                $(elem).remove();
            }

        } else if (e.keyCode === ESC) {
            if (initialValue) {
                input.remove();
                $(elem).text(initialValue);
            } else {
                $(elem).remove();
            }
        }
    });
}

function collectInfo(elem, value) {
    const rect = $(elem)[0].getBoundingClientRect();
    const id = $(elem).attr('id');
    return {
        'top': parseInt(rect.top),
        'left': parseInt(rect.left),
        'text': value,
        'id': id
    }
}

function saveResults(info, value) {
    const res = JSON.stringify(info);
    $.ajax({
        method: 'POST',
        url: URL,
        data: 'message=' + res,
        success: function() {
            console.log('saved');
        },
        error: function(res) {
            console.log('something went wrong ');
        }
    });
}

function deleteRes(id) {
    $.ajax({
        method: 'GET',
        url: URL,
        data: 'delete=' + id,
        success: function(res) {
            if(res === 'empty') {
                ID = 0;
            }
        }
    });
}
