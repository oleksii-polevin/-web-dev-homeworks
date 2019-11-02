const ATM = {
  isAuth: false,
  currentUser: {},
  // all cash available in ATM
  cash: 2000,
  // keep all actions
  logs: [],
  // all available users
  users: [
    { id: "0000", pin: "000", debet: 0, type: "admin" }, // EXTENDED
    { id: "0025", pin: "123", debet: 675, type: "user" }
  ],
  //for changing array of users
  index: -1,
  // authorization
  auth(id, pin) {
    // allowed only one user,
    //attempt of authorization during current session will be banned
    if(!this.isAuth) {
      const index = this.users.findIndex(item => item.id === id && item.pin === pin);
      const current = this.users[index];
      if(current) {
        this.currentUser = current;
        this.isAuth = true;
        this.index = index;
        this.logs.push('user authorised');
        console.log('authorised');
      } else {
        this.logs.push('unseccesful attempt of authorisation');
        console.log('enter valid id and pin');
      }
    } else {
      this.logs.push('repeted autherization in current session');
      console.log('en error occured, please enter your id and pin again');
      this.logout();
    }
  },
  // check current debet
  check() {
    if (!this.isAuth) {
      console.log('Auth first');
      this.logs.push('unauthorised attempt to check debet');
      return;
    }
    this.logs.push('debet checked');
    console.log(this.currentUser.debet);
  },
  // get cash - available for user only
  getCash(amount) {
    if (!this.isAuth) {
      this.logs.push('unauthorised attempt to get cash');
      console.log('Auth first');
      return;
    }
    if(amount <= this.cash && amount <= this.currentUser.debet) {
      this.currentUser.debet -= amount;
      this.cash -= amount;
      this.users[this.index] = this.currentUser;
      this.logs.push('given out cash ' + amount);
      console.log('take you cash');
    } else if(amount <= this.cash && amount > this.currentUser.debet) {
      this.logs.push('attempt to get exceeding sum ' + amount);
      console.log('not enough money on your ballance');
    }  else  if(amount > this.cash) {
      this.logs.push('attempt to get sum: ' + amount + ' that exceeds ATM limits');
      console.log('The sum is too big');
    }
  },
  // load cash - available for user only
  loadCash(amount) {
    if(this.isAuth) {
      this.currentUser.debet += amount;
      this.cash += amount; // probably ATM is working this way
      this.users[this.index] = this.currentUser;
      this.logs.push("user's ballance supplied " + amount);
      console.log('your ballance is supplied');
      return;
    }
  },
  // load cash to ATM - available for admin only - EXTENDED
  loadAtmCash(amount) {
    if(this.isAuth && this.currentUser.type === 'admin') {
      this.cash += amount;
      const msg = 'ATM supplied ' + amount;
      this.logs.push(msg);
      console.log(msg);
      return;
    }
  },
  // get cash actions logs - available for admin only - EXTENDED
  getLogs() {
    if(this.isAuth && this.currentUser.type === 'admin') {
      this.logs.forEach(item => console.log(item));
    }
  },
  // log out
  logout() {
    this.isAuth = false;
    this.currentUser = {};
    this.index = -1;
    this.logs.push('user logged out');
    console.log('logged out');
  }
};
