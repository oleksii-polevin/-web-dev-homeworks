function validation (first, second) {
  if(isNaN(first) || isNaN(second)) {
    alert("fill all fields with integers");
    return false;
  }
  return true;
}

const TIME =
{
   year: 31536000, //seconds
   month: 2592000,
   day: 86400,
   hour: 3600,
   min: 60
}
//holds results
const timeHolder = {
  time: 0,
  date: 0
}

/* This method returns the sum of numbers ends on "2", "3" or "7"
in given by user range */
let sumOfTwoNumbers = () => {
  const first = parseInt(document.getElementById('num1').value);
  const second = parseInt(document.getElementById('num2').value);
  let result = 0;
  if(validation(first, second)) {
    const regExpression = /(2|3|7)$/
      if(regExpression.test(i)){
      }
    }
    document.getElementById('first-value').innerHTML = result;
  }
}
/*
converting to military time
*/
let toMilitary = () => {
timeHolder.time = parseInt(document.getElementById('timeInSeconds').value);
  if(validation(timeHolder.time, timeHolder.time)) {
    const hour = checkTime(calcTime('time', TIME.hour));
    const min = checkTime(calcTime('time', TIME.min));
    let seconds = checkTime(timeHolder.time);
    document.getElementById('seconds-value').innerHTML = hour + ":" + min + ":" + seconds;
  }
}

function calcTime(name, constanta) {
  let time = 0;
  let value;
  //it is impossible directly install object key into fumction
  for(let key in timeHolder) {
    if(key.toString() === name) {
      value = key;
    }
  }
  while(timeHolder[value] >= constanta) {
    timeHolder[value] -= constanta;
    time++;
  }
  return time;
}

function checkTime(time) {
  if(time < 10){
    time = '0' + time;
  }
  return time;
}
let toSeconds = () => {
  const time = document.getElementById('military-time').value;
  const timeSlice = time.split(":");
  const regex = /\d+/;
  let valid = true;
  for(let i = 0; i < timeSlice.length; i++) {
    if(!regex.test(timeSlice[i]) || timeSlice.length < 3) {
      valid = false;
    }
  }
  if(valid) {
    let seconds = TIME.hour * (parseInt(timeSlice[0])) +
    TIME.min * (parseInt(timeSlice[1])) +
    (parseInt(timeSlice[2]));
    document.getElementById('military-value').innerHTML = seconds + " second(s)";
  } else   alert('fill all fields!');
}
/*this function calculates approximate periode of time between two dates.
all monthes set to 30 deys, leap years also havn't taken into account*/
let timeBetweenDates = () => {
  let firstData = new Date(document.getElementById('firstData').value);
  let secondData = new Date(document.getElementById('secondData').value);
  timeHolder.date = Math.abs((firstData - secondData) / 1000);
  let result = "";
  for(let key in TIME) {
    let t = calcTime('date', TIME[key]);
    result  += t + " " + key.toString() + "(s), ";
  }
  result += timeHolder.date + "second(s).";
  document.getElementById('local-time-result').innerHTML = result;
}

function makeBoard() {
  const regex = /\D{1}/;
  const format = document.getElementById('chess').value.split(regex);
  const board = document.getElementById('board');
  const col = parseInt(format[0]);
  const row = parseInt(format[1]);
  const cell = '40px';
  if(boardValid(format, board)) {
    board.innerHTML = '';
    for(let i = 0; i < row; i++) {
      let p = document.createElement('p');
      for(let j = 0; j < col; j++) {
        const span = document.createElement('span');
        span.style.width = cell;
        span.style.height = cell;
        if(i % 2 === j % 2) {
          span.style.backgroundColor = 'white';
        } else {
          span.style.backgroundColor = "black";
        }
        p.appendChild(span);
      }
      p.style.margin = '0';
      p.style.display = 'flex';
      p.style.flexDirection = 'row';
      board.appendChild(p);
    }
  }
}

const clearBoard = () => {
  document.getElementById('chess').value = '';
  document.getElementById('board').innerHTML = '';
}
const boardValid = (format, board) => {
   if(format.length !== 2 || isNaN(format[0]) ||isNaN(format[1])) {
     const message = document.createElement('h2');
     const text = document.createTextNode("Invalid input");
     message.appendChild(text);
     board.appendChild(message);
     message.style.color = "red";
     return false;
   }
   return true;
}
const linksOrIp = () => {
  const message = document.getElementById('linkOrIp').value.split(',');
  for(let i = 0; i < message.length; i++) {
    message[i] = message[i].replace(/^\s+|^['"]|['"]$|\s+$/g,'');

  }
  //I borrowed this huge regex from net. It filter numbers bigger than 255
  // and search for exactly 4 groups of numbers divided by dot
  const ipRegex = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/;
  let arr = [];
  for(let i of message) {
    if(ipRegex.test(i) || httpRegex.test(i)) {
    arr.push(i);
  }
  }
  printResults(arr, httpRegex);
}
function printResults(arr, httpRegex) {
  arr.sort();
  const output = document.getElementById('linkOrIpResult');
  output.innerHTML = '';
  for(let i = 0; i < arr.length; i++) {
    let newlink = document.createElement('a');
    let br = document.createElement('br');
    let result = arr[i];
    newlink.setAttribute('href', result);
    //for displaying without http
    if(httpRegex.test(arr[i])) {
      result = arr[i].replace(httpRegex, '$2');
    }
    newlink.innerHTML = result;
    newlink.setAttribute('target', '_blank');
    output.appendChild(newlink);
    output.appendChild(br);
  }
}

function markText() {
  let input = document.getElementById('regex-input').value;
  let regex = new RegExp(input, 'g');
  let text = document.getElementById('regex-textarea').value;
}
