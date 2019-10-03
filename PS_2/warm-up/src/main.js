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

/* This method returns the sum of numbers ends on "2", "3" or "7"
in given by user range */
let sumOfTwoNumbers = () => {
  const first = parseInt(document.getElementById('num1').value);
  const second = parseInt(document.getElementById('num2').value);
  let result = 0;
  if(validation(first, second)) {
    let regExpression = /(2|3|7)$/
    for(i = Math.min(first, second); i <= Math.max(first, second); i++){
      if(regExpression.test(i)){
        result += Math.abs(i);
      }
    }
    document.getElementById('first-value').innerHTML = result;
  }
}
/*
converting to military time
*/
let seconds;
let toMilitary = () => {
seconds = parseInt(document.getElementById('timeInSeconds').value);
  if(validation(seconds, seconds)) {
    let hour = checkTime(calcTime(TIME.hour));
    let min = checkTime(calcTime(TIME.min));
    seconds = checkTime(seconds);
    document.getElementById('seconds-value').innerHTML = hour + ":" + min + ":" + seconds;
  }
}

function calcTime(constanta) {
  let t = 0;
  while(seconds >= constanta) {
    seconds -= constanta;
    t++;
  }
  return t;
}

function checkTime(t) {
  if(t < 10){
    t = '0' + t;
  }
  return t;
}
let toSeconds = () => {
  const time = document.getElementById('military-time').value;
  let timeSlice = time.split(":");
  let seconds = TIME.hour * (parseInt(timeSlice[0])) +
   TIME.min * (parseInt(timeSlice[1])) +
   (parseInt(timeSlice[2]));
  document.getElementById('military-value').innerHTML = seconds + " second(s)";
}
/*this function calculates approximate periode of time between two dates.
all monthes set to 30 deys, leap years also havn't taken into account*/
let sec;
let timeBetweenDates = () => {
  let firstData = new Date(document.getElementById('firstData').value);
  let secondData = new Date(document.getElementById('secondData').value);
  sec = Math.abs((firstData - secondData) / 1000);
  let result = "";
  for(let key in TIME) {
    let t = calcDates(TIME[key]);
    result  += t +" " + key.toString() + "(s), ";
  }
  result += sec + "second(s).";
  document.getElementById('local-time-result').innerHTML = result;
}

function calcDates(constanta) {
  let t = Math.floor(sec / constanta);
  sec -= t * constanta;
  return t;
}

function makeBoard() {
  var canvas = document.getElementById("MyCanvas");
  const col = parseInt(document.getElementById('chess-width').value);
  const row = parseInt(document.getElementById('chess-height').value);
  let cell = document.getElementById('chessCell').value;
  if(cell === '') {
    cell = 45;
  }
  if(validation(row, col)) {
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    canvas.width = row * cell;
    canvas.height = col * cell;
    ctx.fillStyle = "#FF0000";
    for(let i = 0; i < row; i++){
      for(let j = 0; j < col; j++){
        if(i % 2 === 0 && j % 2 !== 0 || i % 2 !== 0 && j % 2=== 0){
          ctx.fillRect(i * cell, j * cell, cell, cell);
        }
      }
    }
  }
}
let linksOrIp = () => {
  let message = document.getElementById('linkOrIp').value.split(',');
  const httpRegex = /^(http:\/\/|https:\/\/)(w{3}\.\w+\d*\.\w{3})$/;
  //I borrowed this huge regex from net. It filter numbers bigger than 255
  // and search for exactly 4 groups of numbers divided by dot
  const ipRegex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/g;
  let arr = [];
  for(let i = 0; i < message.length; i++) {
    if(httpRegex.test(message[i]) || ipRegex.test(message[i])) {
      arr.push(message[i]);
    }
  }
  printResults(arr, httpRegex);
}
function printResults(arr, httpRegex) {
  arr.sort();
  for(let i = 0; i < arr.length; i++){
    let newlink = document.createElement('a');
    let br = document.createElement('br');
    let result = arr[i];
    newlink.setAttribute('href', result);
    //removing http://
    if(httpRegex.test(arr[i])) {
      result = arr[i].replace(httpRegex, '$2');
    }
    newlink.innerHTML = result;
    newlink.setAttribute('target', '_blank');
    document.getElementById('linkOrIpResult').appendChild(newlink);
    document.getElementById('linkOrIpResult').appendChild(br);
  }
}

function markText() {
  let input = document.getElementById('regex-input').value;
  let check = /^\/(.+)\/$/; // checking whether or not regular expression being inputted
  if(check.test(input)) {
    input = input.replace(check, '$1');
  }
  let regex = new RegExp(input, 'g');
  let text = document.getElementById('regex-textarea').value;
  text = text.replace(regex, '<mark>' + input + '</mark>');
  document.getElementById('markResult').innerHTML = text;
}
