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
// инфа о ресторане в странице блюд
const restaurantTitle = document.querySelector('.restaurant-title');//заголовок имени ресторана над плашками с блюдами
const rating = document.querySelector('.rating');
const minPrice = document.querySelector('.price');
const category = document.querySelector('.category');

const inputSearch = document.querySelector('.input-search');

//отрисовка корзины
const modalBody = document.querySelector('.modal-body');
const modalPrice = document.querySelector('.modal-pricetag');
const buttonClearCart = document.querySelector('.clear-cart');//очистка корзины разом

let login = localStorage.getItem('gloDelivery');

const cart = [];

const getData = async function (url) {//получение данных из каталога db
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Ошибка по адресу ${url}, статус ошибки ${response.status}!`);
  }
  //console.log((response).json());
  return await response.json();
};
// console.log(getData('./db/partners.json'));

let valid = function (str) {//применение маски к строке (передается в аргумент)
  const nameReg = /^[a-zA-Z][a-zA-Z0-9-_\.]{1,20}$/;//литерал регулярных выражений //, литерал массива[], литерал объекта {}, литерал строки '', литерал числа - число
  return nameReg.test(str);//проверка логина на соответствие регулярному выражению true false habr.com/ru/post/123845
};

const toggleModal = function () {//вывод модального окна залогинивания
  modal.classList.toggle("is-open");//добавление класса модальному окну (если есть - модальное окно ОТКРЫТО, если класса нет - ЗАКРЫТО)
};

const toggleModalAuth = function () {//вызов модального окна авторизации
  loginInput.style.borderColor = '';//возврат стиля(убираем красную рамку)
  modalAuth.classList.toggle("is-open");
};

function returnMain() {//переход на Главную 
  containerPromo.classList.remove('hide');
  restaurants.classList.remove('hide');
  menu.classList.add('hide');
}

function authorized() {//функционал для неавторизованного юзера

  function logOut() {
    login = null;
    localStorage.removeItem('gloDelivery');
    buttonAuth.style.display = '';
    userName.style.display = '';
    buttonOut.style.display = '';
    cartButton.style.display = '';
    buttonOut.removeEventListener('click', logOut);
    checkAuth();
    returnMain();
  }

  // console.log("Авторизован");
  userName.textContent = login;
  buttonAuth.style.display = 'none';
  userName.style.display = 'inline';
  buttonOut.style.display = 'flex';
  cartButton.style.display = 'flex';//отобразить кнопку Корзина
  buttonOut.addEventListener('click', logOut);
}

function maskInput(string) {//обрезание пробелов
  return !!string.trim();
}

function notAuthorized() {//функционал для неавторизованного юзера
  // console.log("Не авторизован");

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

function checkAuth() {//проверка авторизации
  if (login) {
    authorized();
  } else {
    notAuthorized();
  }
}

function createCardRestaurant(restaurant) {//верстка карточки ресторана
  // console.log(restaurant);
  const { image,
    kitchen,
    name,
    price,
    stars,
    products,
    time_of_delivery } = restaurant;//реструктуризация

  // const card = document.createElement('a');//создание нового а
  // card.classList.add('card');//добавление класса без затирания имеющихся до этого классов
  // card.classList.add('card-restaurant');
  // card.className = 'card card-restaurant';//добавление классов с затиранием имевшихся если они уже были


  const card = `
  <a class="card card-restaurant" data-products="${products}" data-info="${[name, price, stars, kitchen]}">
		<img src="${image}" alt="image" class="card-image"/>
			<div class="card-text">
				<div class="card-heading">
					<h3 class="card-title">${name}</h3>
					<span class="card-tag tag">${time_of_delivery} мин</span>
				</div>
				<div class="card-info">
					<div class="rating">
						${stars}
					</div>
				  <div class="price">От ${price} ₽</div>
					<div class="category">${kitchen}</div>
			  </div>
			</div>
		</a>
  `;

  cardsRestaurants.insertAdjacentHTML('beforeend', card);
}

function createCardGood(goods) { //верстка карточки товара с данными из json
  // console.log(goods);

  const { description, id, image, name, price } = goods;

  // console.log(description, id, image, name, price);

  const card = document.createElement('div');
  card.className = 'card';
  // card.id = id;
  card.insertAdjacentHTML('beforeend', `
      <img src="${image}" alt="${name}" class="card-image"/>
      <div class="card-text">
        <div class="card-heading">
          <h3 class="card-title card-title-reg">${name}</h3>
        </div>
        <div class="card-info">
          <div class="ingredients">${description}
          </div>
        </div>
        <div class="card-buttons">
          <button class="button button-primary button-add-cart" id="${id}">
            <span class="button-card-text">В корзину</span>
            <span class="button-cart-svg"></span>
          </button>
          <strong class="card-price card-price-bold">${price} ₽</strong>
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

      const info = (restaurant.dataset.info.split(','));//массивчик из data-info (для заголовка над меню ресторана)
      const [name, price, stars, kitchen] = info;


      cardsMenu.textContent = '';//очистка от предыдущих выводов товаров ресторана, чтобы не дублировались при повторе вызова
      containerPromo.classList.add('hide');//скрыть слайдер 
      restaurants.classList.add('hide');//скрыть рестораны
      menu.classList.remove('hide');//показать меню

      restaurantTitle.textContent = name;
      rating.textContent = stars;
      minPrice.textContent = `От ${price} ₽`;//'От ' + price + ' ₽';
      category.textContent = kitchen;

      getData(`./db/${restaurant.dataset.products}`).then(function (data) {
        // getData(`./db/${restaurant.products}`).then(function (data) {
        data.forEach(createCardGood);
      });
    } else {
      toggleModalAuth();//иначе залогинься
    }
  }
}

function addToCart(event) {
  const target = event.target;
  // console.log(target);
  const buttonAddToCart = target.closest('.button-add-cart');//кнопка В корзину неоднородна, идентифицируем клик по ближним классам к аргументу
  // console.log(buttonAddToCart);
  if (buttonAddToCart) {
    const card = target.closest('.card');//поиск карточки товара из таргета
    const title = card.querySelector('.card-title-reg').textContent;
    const cost = card.querySelector('.card-price').textContent;
    const id = buttonAddToCart.id;
    // console.log(title, cost, id);

    const food = cart.find(function (item) {//поиск повторов одинакового товара
      return item.id === id;//если id совпадает - вернуть
    })

    if (food) {
      food.count += 1;
    } else {
      cart.push({//добавление покупок по клику кнопки в массив
        id,
        title,
        cost,
        count: 1
      });
    }
    console.log(cart);
  }
}

function renderCart() {
  modalBody.textContent = '';

  cart.forEach(function ({ id, title, cost, count }) {
    const itemCart = `
        <div class="food-row">
          <span class="food-name">${title}</span>
            <strong class="food-price">${cost} ₽</strong>
            <div class="food-counter">
              <button class="counter-button counter-minus" data-id=${id}>-</button>
              <span class="counter">${count}</span>
              <button class="counter-button counter-plus" data-id=${id}>+</button>
            </div>
        </div>
    `;
    modalBody.insertAdjacentHTML('afterbegin', itemCart);
  });
  const totalPrice = cart.reduce(function (result, item) {
    return result + (parseFloat(item.cost) * item.count);
  }, 0);

  modalPrice.textContent = totalPrice + ' ₽';//сумму в поле суммы корзины
}

function changeCount(event) {
  const target = event.target;

  if (target.classList.contains('counter-button')) {
    const food = cart.find(function (item) {
      return item.id === target.dataset.id;
    });
    if (target.classList.contains('counter-minus')) {
      food.count--;
      if (food.count === 0) {
        cart.splice(cart.indexOf(food), 1);//удалить из корзины товар если наминусовали до нуля
      }
    }
    if (target.classList.contains('counter-plus')) food.count++;
    renderCart();
  }

}

function init() {//обработчики событий

  getData('./db/partners.json').then(function (data) {
    // console.log(data);
    data.forEach(createCardRestaurant);
  });

  cartButton.addEventListener("click", function () {
    renderCart();//создание актуальной корзины
    toggleModal();//вывод на экран в модальном окне
  });

  buttonClearCart.addEventListener("click", function () {
    cart.length = 0;
    renderCart();//создание актуальной корзины

  });

  modalBody.addEventListener('click', changeCount);//плюсы и минусы в корзине добавить и убавить

  cardsMenu.addEventListener('click', addToCart);//если клик по карточке товара - добавить в корзину товар

  close.addEventListener("click", toggleModal);

  cardsRestaurants.addEventListener('click', openGoods);//при клике по карточке ресторана запуск функции опенГудз, показ товара 

  logo.addEventListener('click', function () {//возврат обратно к ресторанам со скрытием товаров предыдущего прехода
    containerPromo.classList.remove('hide');
    restaurants.classList.remove('hide');
    menu.classList.add('hide');
  });

  inputSearch.addEventListener('keydown', function (event) {//обработка поиска через текстовое поле справа
    if (event.keyCode === 13) {//если нажат Enter
      const target = event.target;
      const value = target.value.toLowerCase().trim();//значение ввода по которому фильтруем вывод

      target.value = '';//значение из текстового окна забрали в переменную(строка выше) и чистим текстовый блок для следующего ввода

      if (!value) {//если ввода не было а жмут энтер
        target.style.backgroundColor = 'tomato';
        setTimeout(function () {
          target.style.backgroundColor = '';
        }, 2000);
        return;
      }

      const goods = [];
      getData('./db/partners.json')
        .then(function (data) {

          const products = data.map(function (item) {
            return item.products;
          })

          //console.log(products);

          products.forEach(function (product) {
            getData(`./db/${product}`)
              .then(function (data) {
                goods.push(...data);//спред из массива даст строку
                // console.log(goods);

                const searchGoods = goods.filter(function (item) {
                  return item.name.toLowerCase().includes(value);
                });
                console.log(searchGoods);

                cardsMenu.textContent = '';//очистка от предыдущих выводов товаров ресторана, чтобы не дублировались при повторе вызова
                containerPromo.classList.add('hide');//скрыть слайдер 
                restaurants.classList.add('hide');//скрыть рестораны
                menu.classList.remove('hide');//показать меню

                restaurantTitle.textContent = 'Результат поиска';
                rating.textContent = '';
                minPrice.textContent = '';
                category.textContent = '';

                return searchGoods;
              })
              .then(function (data) {
                data.forEach(createCardGood);
              });
          });

        });
    }
  })

  checkAuth();

  new Swiper('.swiper-container', {//запуск слайдера
    loop: true,
    autoplay: {
      delay: 3000,
    },
  });
}

init();




















// function foo(a, b, c, d) {
//   const sum = a + b + c;

//   return function(x) {
//     console.log(x*sum);
//   };
// }
// const bar = foo(1, 2, 3);
// console.dir(bar);
// bar(2);
// bar(3);
// bar(4);











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