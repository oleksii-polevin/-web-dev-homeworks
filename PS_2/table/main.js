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
const tbody = document.getElementById('body');
//temporary array for storing search results
let arr = GOODS;
//arrays for storing search results fitered by particular category
let categoryFilter = [];
//supress reversing of array which has already been sorted by category
let filter = false;
const name = document.getElementById('name');
const category = document.getElementById('select');
name.addEventListener('keyup', function() {
   search('name')
 });
category.addEventListener('change', function() {
  search('category')
});
//criterion define filter by name or category
//id used for identification place of event
function search(criterion) {
  if(criterion === 'category') {
    !category.value ? filter = false : filter = true;
    arr = coreSearch(GOODS, category.value.toLowerCase(), criterion);
    categoryFilter = arr;
    //additional search in filtered by category array
    if(name.value) {
      arr = coreSearch(categoryFilter, name.value.toLowerCase(), 'name');
    }
  } else {
    categoryFilter.length === 0 ? arr = coreSearch(GOODS, name.value.toLowerCase(), criterion) :
    arr = coreSearch(categoryFilter, name.value.toLowerCase(), criterion);
  }
  createTable(arr);
}

//search in global array or filtered by category
function coreSearch(array, input, criterion) {
  let tempArr = [];
  for(let number of array) {
    for(let key in number) {
      const value = number[key].toString().toLowerCase();
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
  arr.forEach((item) => {
    const tr = document.createElement('tr');
    sum += item.price * item.amount;
    tr.innerHTML = `
    <tr>
      <td>${item.name}</td>
      <td>${item.category}</td>
      <td>${item.amount}</td>
      <td>${'$' + item.price * item.amount}</td>
      `;
      tbody.appendChild(tr);
  })
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
  let triangle = document.getElementById(item);
  triangle.style.display = 'inline-block';
  flag ? triangle.style.transform = "rotate(180deg)" : triangle.style.transform = "rotate(0deg)";
}
