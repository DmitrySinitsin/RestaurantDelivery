const cartButton = document.querySelector("#cart-button");//кнопка КОРЗИНА
const modal = document.querySelector(".modal");// модальное окно
const close = document.querySelector(".close");// кнопка закрытия модального окна

cartButton.addEventListener("click", toggleModal);
close.addEventListener("click", toggleModal);

function toggleModal() {
  modal.classList.toggle("is-open");//добавление класса модальному окну (если есть - модальное окно ОТКРЫТО, если класса нет - ЗАКРЫТО)
}


//day1 авторизация по кнопке ВОЙТИ

const buttonAuth = document.querySelector(".button-auth");
const modalAuth = document.querySelector(".modal-auth");
const closeAuth = document.querySelector(".close-auth");
const logInForm = document.querySelector("#logInForm");
const loginInput = document.querySelector("#login");
const userName = document.querySelector(".user-name");
const buttonOut = document.querySelector(".button-out");

let login = localStorage.getItem('gloDelivery'); 

function toggleModalAuth() {
  modalAuth.classList.toggle("is-open");
}


function authorized() {

  function logOut () {
    login = null; 
    localStorage.removeItem('gloDelivery');
    buttonAuth.style.display = '';
    userName.style.display = '';
    buttonOut.style.display = '';
    buttonOut.removeEventListener('click', logOut);
    checkAuth();
  }

  console.log("Авторизован");
  userName.textContent = login; 
  buttonAuth.style.display = 'none';
  userName.style.display = 'inline';
  buttonOut.style.display = 'block';
  buttonOut.addEventListener('click', logOut);
}

function notAuthorized() {
  console.log("Не авторизован");

  function logIn(event){
    event.preventDefault();//предотвращение дефолтного поведения браузера (перезагрузки не будет)
    login = loginInput.value;
    
    localStorage.setItem('gloDelivery', login);
    
    toggleModalAuth();

    buttonAuth.removeEventListener('click',  toggleModalAuth);
    closeAuth.removeEventListener('click',  toggleModalAuth);
    logInForm.removeEventListener('submit',  logIn);
    logInForm.reset();
    checkAuth();

    // console.log(event);
    // console.log("логин"); 
    // console.log(loginInput.value);
  }

  buttonAuth.addEventListener('click',  toggleModalAuth);
  closeAuth.addEventListener('click',  toggleModalAuth);
  logInForm.addEventListener('submit',  logIn);
}

function checkAuth(){
  if (login){
    authorized();
  } else {
    notAuthorized();
  }
}

checkAuth();










// buttonAuth.addEventListener('click', function(){
//   console.log('Hello!')
// });
// console.dir(modalAuth);
//console.log(buttonAuth);
// modalAuth.classList.add("hello");
// modalAuth.classList.contains("hello");
// modalAuth.classList.remove("hello");
// modalAuth.classList.toggle("hello");
// buttonAuth.removeEventListener('click',  toggleModalAuth);