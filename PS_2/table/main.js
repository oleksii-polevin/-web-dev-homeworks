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
let arr = GOODS.slice();
//array for storing search results fitered by particular category
let categoryFilter = [];
//supress reversing of array which has already been sorted by category
let filter = false;
//criterion define filter by name or category
//id used for identification place of event
function search(criterion, id) {
  let input = document.getElementById(id).value.toLowerCase();
  if(criterion === 'category') {
    !input ? filter = false : filter = true;
    arr = coreSearch(GOODS, input, criterion);
    categoryFilter = arr;
    document.getElementById('input').value = '';
  } else {
    categoryFilter.length === 0 ? arr = coreSearch(GOODS, input, criterion) :
    arr = coreSearch(categoryFilter, input, criterion);
  }
  createTable(arr);
}

//search in global array or filtered by category
function coreSearch(array, input, criterion) {
  let tempArr = [];
  for(var number of array) {
    for(var key in number) {
      let value = number[key].toString().toLowerCase();
      if(value.indexOf(input) > -1 && key === criterion) {
        tempArr.push(number);
      }
    }
  }
  return tempArr;
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
//sorting array by name or category
function alphabeticalSort(sorter) {
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
    if(!filter) {
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
