const register = document.querySelector('#register');
const login = document.querySelector('#login');

if (!localStorage.getItem('accountList')) {
  localStorage.setItem('accountList', '[]');
}

const accountList = JSON.parse(localStorage.getItem('accountList'));

// Register
register.addEventListener('submit', function (e) {
  e.preventDefault();
  registerAccount();
  clearRegister();
  toLocalStorage();
});

const registerAccount = function () {
  const newEmail = document.querySelector('#newEmail').value;
  const newPassword = document.querySelector('#newPassword').value;
  const newUser = { email: newEmail, password: newPassword };

  for (let i = 0; i < accountList.length; i++) {
    if (newEmail === accountList[i].email) {
      console.success(
        `${accountList[i].email} already in use, please register a new one`
      );
      return;
    }
  }

  accountList.push(newUser);
  console.log(accountList);
};

const clearRegister = function () {
  const emailForm = document.querySelector('#newEmail');
  const passwordForm = document.querySelector('#newPassword');
  emailForm.value = '';
  passwordForm.value = '';
};

const toLocalStorage = function () {
  localStorage.setItem('accountList', JSON.stringify(accountList));
};

// Login
login.addEventListener('submit', function (e) {
  e.preventDefault();
  loginAccount();
  clearLogin();
});

const loginAccount = function () {
  const email = document.querySelector('#email').value;
  const password = document.querySelector('#password').value;

  for (i = 0; i < accountList.length; i++) {
    if (
      email === accountList[i].email &&
      password === accountList[i].password
    ) {
      console.success(`"${email}" logged in!!!`);
      return;
    }
  }
  console.success('Incorrect email or password');
};

const clearLogin = function () {
  const emailForm = document.querySelector('#email');
  const passwordForm = document.querySelector('#password');
  emailForm.value = '';
  passwordForm.value = '';
};

// Login
login.addEventListener('submit', function (e) {
  e.preventDefault();
  loginAccount();
  clearLogin();
});

// Reset
function reset() {
  localStorage.clear();
  console.success('Reseting...');
  console.log(window.localStorage);
}
