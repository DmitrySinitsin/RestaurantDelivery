//day2

'use strict';//запрет работы без объявления переменных

const cartButton = document.querySelector("#cart-button");//кнопка КОРЗИНА
const modal = document.querySelector(".modal");// модальное окно
const close = document.querySelector(".close");// кнопка закрытия модального окна
const buttonAuth = document.querySelector(".button-auth");
const modalAuth = document.querySelector(".modal-auth");
const closeAuth = document.querySelector(".close-auth");
const logInForm = document.querySelector("#logInForm");
const loginInput = document.querySelector("#login");
const userName = document.querySelector(".user-name");
const buttonOut = document.querySelector(".button-out");
const cardsRestaurants = document.querySelector('.cards-restaurants');
const containerPromo = document.querySelector('.container-promo');
const restaurants = document.querySelector('.restaurants');
const menu = document.querySelector('.menu');
const logo = document.querySelector('.logo');
const cardsMenu = document.querySelector('.cards-menu');//товар ресторана

let login = localStorage.getItem('gloDelivery');

let valid = function (str) {
  const nameReg = /^[a-zA-Z][a-zA-Z0-9-_\.]{1,20}$/;//литерал регулярных выражений //, литерал массива[], литерал объекта {}, литерал строки '', литерал числа - число
  return nameReg.test(str);//проверка логина на соответствие регулярному выражению true false habr.com/ru/post/123845
}

function toggleModal() {//вывод модального окна залогинивания
  modal.classList.toggle("is-open");//добавление класса модальному окну (если есть - модальное окно ОТКРЫТО, если класса нет - ЗАКРЫТО)
}

function toggleModalAuth() {//вызов модального окна авторизации
  loginInput.style.borderColor = '';//возврат стиля(убираем красную рамку)
  modalAuth.classList.toggle("is-open");
}

function returnMain() {//переход на Главную 
  containerPromo.classList.remove('hide');
  restaurants.classList.remove('hide');
  menu.classList.add('hide');
}

function authorized() {

  function logOut() {
    login = null;
    localStorage.removeItem('gloDelivery');
    buttonAuth.style.display = '';
    userName.style.display = '';
    buttonOut.style.display = '';
    buttonOut.removeEventListener('click', logOut);
    checkAuth();
    returnMain();
  }

  console.log("Авторизован");
  userName.textContent = login;
  buttonAuth.style.display = 'none';
  userName.style.display = 'inline';
  buttonOut.style.display = 'block';
  buttonOut.addEventListener('click', logOut);
}

function maskInput(string) {
  return !!string.trim();
}

function notAuthorized() {
  console.log("Не авторизован");

  function logIn(event) {
    event.preventDefault();//предотвращение дефолтного поведения браузера (перезагрузки не будет)

    // if (valid(maskInput(loginInput.value))) {//если есть ввод в инпуте Логин
    if (valid(loginInput.value)) {
      login = loginInput.value;
      localStorage.setItem('gloDelivery', login);
      toggleModalAuth();
      buttonAuth.removeEventListener('click', toggleModalAuth);
      closeAuth.removeEventListener('click', toggleModalAuth);
      logInForm.removeEventListener('submit', logIn);
      logInForm.reset();
      checkAuth();
    } else {
      loginInput.style.borderColor = 'tomato';
      loginInput.value = '';
    }



    // console.log(event);
    // console.log("логин"); 
    // console.log(loginInput.value);
  }

  buttonAuth.addEventListener('click', toggleModalAuth);
  closeAuth.addEventListener('click', toggleModalAuth);
  logInForm.addEventListener('submit', logIn);
}

function checkAuth() {
  if (login) {
    authorized();
  } else {
    notAuthorized();
  }
}

function createCardRestaurant() {
  const card = `
  <a class="card card-restaurant">
		<img src="img/tanuki/preview.jpg" alt="image" class="card-image"/>
			<div class="card-text">
				<div class="card-heading">
					<h3 class="card-title">Тануки</h3>
					<span class="card-tag tag">60 мин</span>
				</div>
				<div class="card-info">
					<div class="rating">
						4.5
					</div>
				  <div class="price">От 1 200 ₽</div>
					<div class="category">Суши, роллы</div>
			  </div>
			</div>
		</a>
  `;

  cardsRestaurants.insertAdjacentHTML('beforeend', card);
}

function createCardGood() {
  const card = document.createElement('div');
  card.className = 'card';
  card.insertAdjacentHTML('beforeend', `
      <img src="img/pizza-plus/pizza-classic.jpg" alt="image" class="card-image"/>
      <div class="card-text">
        <div class="card-heading">
          <h3 class="card-title card-title-reg">Пицца Классика</h3>
        </div>
        <div class="card-info">
          <div class="ingredients">Соус томатный, сыр «Моцарелла», сыр «Пармезан», ветчина, салями,
            грибы.
          </div>
        </div>
        <div class="card-buttons">
          <button class="button button-primary button-add-cart">
            <span class="button-card-text">В корзину</span>
            <span class="button-cart-svg"></span>
          </button>
          <strong class="card-price-bold">510 ₽</strong>
        </div>
      </div>
  `);
  cardsMenu.insertAdjacentElement('beforeend', card);//вывод на страницу товара ресторана
}

function openGoods(event) {//открытие товаров ресторана без перехода на другую страницу
  const target = event.target;//взять из эвента таргет (куда кликнули)
  //console.log(event.target);
  const restaurant = target.closest('.card-restaurant');//поиск по родительским элементам класса в скобках, а если не нашел - вернет налл

  if (restaurant) {//если нажали на ресторан
    if (login) {//если юзер залогинился
      cardsMenu.textContent = '';//очистка от предыдущих выводов товаров ресторана, чтобы не дублировались при повторе вызова
      containerPromo.classList.add('hide');
      restaurants.classList.add('hide');
      menu.classList.remove('hide');
      createCardGood();
      createCardGood();
      createCardGood();
    } else {
      toggleModalAuth();//иначе залогинься
    }
  }
}

cartButton.addEventListener("click", toggleModal);

close.addEventListener("click", toggleModal);

cardsRestaurants.addEventListener('click', openGoods);//при клике по карточке ресторана запуск функции опенГудз, показ товара 

logo.addEventListener('click', function () {//возврат обратно к ресторанам со скрытием товаров предыдущего прехода
  containerPromo.classList.remove('hide');
  restaurants.classList.remove('hide');
  menu.classList.add('hide');
});

checkAuth();

createCardRestaurant();
createCardRestaurant();
createCardRestaurant();

new Swiper('.swiper-container', {//запуск слайдера
  loop: true,
  autoplay: {
    delay: 3000,
  },
});


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

// let n = 3;
// function foo() {
//   debugger;
//   n += 1;
//   if (5 > n) {
//     foo();
//   }
// }
// foo();