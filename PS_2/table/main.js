const GOODS = [
  {
    category: 'furniture',
    name: 'Chair',
    amount: 1,
    price: 20
  },
  {
    category: 'supplies',
    name: 'Gel Pen',
    amount: 20,
    price: 2
  },
  {
    category: 'other',
    name: 'Trash Bin',
    amount: 1,
    price: 5
  },
  {
    category: 'furniture',
    name: 'Sofa',
    amount: 1,
    price: 50
  },
  {
    category: 'supplies',
    name: 'Notebook',
    amount: 3,
    price: 3
  },
  {
    category: 'other',
    name: 'Calendar 2019',
    amount: 1,
    price: 3
  },
  {
    category: 'furniture',
    name: 'Cupboard',
    amount: 2,
    price: 45
  }
];
//obtaining the body of the table
let tbody = document.getElementById('body');
//temporary array for storing search results
let arr = [];
//variable which deny reverse arr has already sorted by category
let filter = false;
//filing table by category
function fillByName() {
  let input = document.getElementById('input').value.toUpperCase();
  arr = []; //zeroing array
  for(var number of GOODS) {
    for(var key in number) {
      let value = number[key].toString().toUpperCase();
      if(value.indexOf(input) > -1 && key === 'name' && input !== '') {
        arr.push(number);
      }
    }
  }
  filter = false;
  createTable(arr);
}
//filling table by category
function byCategory() {
  let e = document.getElementById('select');
  let input = e.options[e.selectedIndex].value;
  arr = [];
  for(var number of GOODS) {
    for(var key in number) {
      if(number[key] === input) {
        arr.push(number);
      }
    }
  }
  filter = true;
  createTable(arr);
}
//creating new table on each event
function createTable(arr) {
  tbody.innerHTML = "";
  let sum = 0;
  let amount = 1;
  for(let items of arr) {
    for(let key in items) {
      let td = document.createElement('td');
      let text = document.createTextNode(items[key]);
      if(key.toString() === 'amount') {
        amount = items[key];
      }
      if(key.toString() === 'price') {
        sum += items[key] * amount;
        amount = 1;
        text = document.createTextNode("$" + items[key]);
      }
      tbody.appendChild(td);
      td.appendChild(text);
    }
    let tr = document.createElement('tr');
    tbody.appendChild(tr);
  }
  document.getElementById('sum').innerHTML = "$" + sum;
}
//variables used for display sorted array normal or reversed
let nFlag = true; //for name
let cFlag = true;// for category
//
function alphabeticalSort(sorter) {
  //sorting array by name or category
  arr.sort(function(a, b) {
    let x = a[sorter].toLowerCase();
    let y = b[sorter].toLowerCase();
    return x < y ? -1 : x > y ? 1 : 0;
  });
  if(sorter === 'name') {
    nFlag ? createTable(arr) : createTable(arr.reverse());
    nFlag = !nFlag;
    switchDirection('nameDirection', nFlag);
  } else {
    if(!filter) { //prevents reversing arr already sorted by category
      cFlag  ? createTable(arr) : createTable(arr.reverse());
      cFlag = !cFlag;
      switchDirection('categoryDirection', cFlag);
    }
  }
}

//shows sorting direction
let switchDirection = (item, flag) => {
  let x = document.getElementById(item);
  x.style.display = 'inline-block';
  flag ? x.style.transform = "rotate(180deg)" : x.style.transform = "rotate(0deg)";
}
