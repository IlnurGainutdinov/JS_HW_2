// // Задание 1
// // Представьте, что у вас есть класс для управления библиотекой. В этом классе будет приватное свойство для хранения списка книг, а также методы для добавления книги, удаления книги и получения информации о наличии книги.
// // Класс должен содержать приватное свойство #books, которое инициализируется пустым массивом и представляет собой список книг в библиотеке.
// // Реализуйте геттер allBooks, который возвращает текущий список книг.
// // Реализуйте метод addBook(title), который позволяет добавлять книгу в список. Если книга с таким названием уже существует в списке, выбросьте ошибку с соответствующим сообщением.
// // Реализуйте метод removeBook(title), который позволит удалять книгу из списка по названию. Если книги с таким названием нет в списке, выбросьте ошибку с соответствующим сообщением.
// // Реализуйте метод hasBook(title), который будет проверять наличие книги в библиотеке и возвращать true или false в зависимости от того, есть ли такая книга в списке или нет.
// // Реализуйте конструктор, который принимает начальный список книг (массив) в качестве аргумента. Убедитесь, что предоставленный массив не содержит дубликатов; в противном случае выбрасывайте ошибку.

// class Library {
//   #books = [];
//   constructor(books = []) {
//     let set = new Set(books);
//     if (set.size !== books.length) {
//       throw new Error("Содержит дубликаты!!!");
//     }
//     this.#books = books;
//   }
//   get allBooks() {
//     let list = "";
//     this.#books.forEach((book) => {
//       list += book + "\n";
//     });
//     return list;
//   }
//   addBook(title) {
//     let flag = false;
//     this.#books.forEach((book) => {
//       if (book === title) {
//         flag = true;
//         throw new Error("Дубликат");
//       }
//     });
//     if (!flag) {
//       this.#books.push(title);
//     }
//   }
//   removeBook(title) {
//     let flag = false;
//     this.#books.forEach((value, index) => {
//       if (value === title) {
//         flag = true;
//         delete this.#books[index];
//         return `Книга ${title} удалена`;
//       }
//     });
//     if (!flag) {
//       throw new Error("Книги с таким названием нет в списке");
//     }
//   }
//   hasBook(title) {
//     let flag = false;
//     this.#books.forEach((book) => {
//       if (book === title) {
//         flag = true;
//       }
//     });
//     return flag;
//   }
// }

// let lib = new Library();

// lib.addBook("A");
// lib.addBook("B");
// lib.addBook("C");
// lib.addBook("D");

// console.log(lib.allBooks);
// lib.removeBook("A");
// console.log(lib.allBooks);
// console.log(lib.hasBook("A"));
// console.log(lib.hasBook("B"));

// Задание 2
// Вы разрабатываете систему отзывов для вашего веб-сайта. Пользователи могут оставлять отзывы, но чтобы исключить слишком короткие или слишком длинные сообщения, вы решаете установить некоторые ограничения.
// Создайте HTML-структуру с текстовым полем для ввода отзыва, кнопкой для отправки и контейнером, где будут отображаться отзывы.
// Напишите функцию, которая будет добавлять отзыв в контейнер с отзывами. Однако если длина введенного отзыва менее 50 или более 500 символов, функция должна генерировать исключение.
// При добавлении отзыва, он должен отображаться на странице под предыдущими отзывами, а не заменять их.

const initialData = [
  {
    product: "Apple iPhone 13",
    reviews: [
      {
        id: "1",
        text: "Отличный телефон! Батарея держится долго.",
      },
      {
        id: "2",
        text: "Камера супер, фото выглядят просто потрясающе.",
      },
    ],
  },
  {
    product: "Samsung Galaxy Z Fold 3",
    reviews: [
      {
        id: "3",
        text: "Интересный дизайн, но дорогой.",
      },
    ],
  },
  {
    product: "Sony PlayStation 5",
    reviews: [
      {
        id: "4",
        text: "Люблю играть на PS5, графика на высоте.",
      },
    ],
  },
];

function addDataToLocalStorage(data) {
  localStorage.setItem("data", JSON.stringify(data));
}

function LastCommentId() {
  let getDataLS;
  if (localStorage.getItem("newData")) {
    getDataLS = JSON.parse(localStorage.getItem("newData"));
  } else {
    getDataLS = JSON.parse(localStorage.getItem("data"));
  }
  getDataLS.forEach((data) => {
    for (let i = 0; i < data.reviews.length; i++) {
      let id = data.reviews[i].id;
      if (!localStorage.getItem("id")) {
        localStorage.setItem("id", id);
      }
      if (Number(id) > Number(localStorage.getItem("id"))) {
        localStorage.setItem("id", id);
      }
    }
  });
}

addDataToLocalStorage(initialData);
const divEl = document.querySelector(".hw2");

initialData.forEach((item) => {
  divEl.insertAdjacentHTML(
    "beforeend",
    ` 
        <div class="product">
            <div class="block">
                <div class="block__product">
                    <h3 class="block__title">${item.product}</h3>
                </div>
                <button class="block__reviewBtn">Оставить отзыв</button>
            </div>
            <div class="review-block">
                <form action="" class="form d-none">
                    <textarea name="" class="form__text" cols="30"  rows="10" placeholder="Напишите отзыв"></textarea>
                    <button class="form__sendBtn" type="submit">Отправить отзыв</button>
                </form>
                <div class="container" data-title="${item.product}"></div>
            </div>
            <div class="line"></div>
        </div>
     `
  );
});
LastCommentId();

function renderComments(data) {
  const containerEls = document.querySelectorAll(".container");
  let getDataLS = JSON.parse(localStorage.getItem(data));
  getDataLS.forEach((data) => {
    containerEls.forEach((el) => {
      for (let i = 0; i < data.reviews.length; i++) {
        const title = el.getAttribute("data-title");
        if (title == data.product) {
          el.insertAdjacentHTML(
            "beforeend",
            `
                <p class="postedText">${data.reviews[i].text}</p>
            `
          );
        }
      }
    });
  });
}

const reviewBtns = divEl.querySelectorAll(".block__reviewBtn");

reviewBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const parentEl = btn.closest(".product");
    const formEl = parentEl.querySelector(".form");
    formEl.style.display = "flex";
  });
});

function addComment() {
  divEl.addEventListener("click", ({ target }) => {
    let getDataLS;
    if (!target.classList.contains("form__sendBtn")) {
      return;
    }
    if (localStorage.getItem("newData")) {
      getDataLS = JSON.parse(localStorage.getItem("newData"));
    } else {
      getDataLS = JSON.parse(localStorage.getItem("data"));
    }

    const formEl = target.closest(".form");
    const textEl = formEl.querySelector(".form__text");
    try {
      const comment = textEl.value;
      if (comment == "") {
        alert("Необходимо заполнить поле для отзыва");
        return;
      }
      if (comment.length < 50 || comment.length > 500) {
        throw new Error("Ошибка! длина введенного отзыва менее 50 или более 500 символов");
      }
      const reviewBlockEl = target.closest(".review-block");
      const containerEl = reviewBlockEl.querySelector(".container");
      const title = containerEl.getAttribute("data-title");

      let oldCommentId = Number(localStorage.getItem("id"));

      let newComment = {
        id: oldCommentId + 1,
        text: comment,
      };

      getDataLS.forEach((item) => {
        if (title === item.product) {
          item.reviews.push(newComment);
        }
      });
      localStorage.setItem("newData", JSON.stringify(getDataLS));
    } catch (error) {
      alert(error.message);
    }
  });
}
addComment();

if (localStorage.getItem("newData")) {
  renderComments("newData");
} else {
  renderComments("data");
}
