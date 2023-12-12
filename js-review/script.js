const data = [
  {
    id: 1,
    title: "The Lord of the Rings",
    publicationDate: "1954-07-29",
    author: "J. R. R. Tolkien",
    genres: [
      "fantasy",
      "high-fantasy",
      "adventure",
      "fiction",
      "novels",
      "literature",
    ],
    hasMovieAdaptation: true,
    pages: 1216,
    translations: {
      spanish: "El señor de los anillos",
      chinese: "魔戒",
      french: "Le Seigneur des anneaux",
    },
    reviews: {
      goodreads: {
        rating: 4.52,
        ratingsCount: 630994,
        reviewsCount: 13417,
      },
      librarything: {
        rating: 4.53,
        ratingsCount: 47166,
        reviewsCount: 452,
      },
    },
  },
  {
    id: 2,
    title: "The Cyberiad",
    publicationDate: "1965-01-01",
    author: "Stanislaw Lem",
    genres: [
      "science fiction",
      "humor",
      "speculative fiction",
      "short stories",
      "fantasy",
    ],
    hasMovieAdaptation: false,
    pages: 295,
    translations: {},
    reviews: {
      goodreads: {
        rating: 4.16,
        ratingsCount: 11663,
        reviewsCount: 812,
      },
      librarything: {
        rating: 4.13,
        ratingsCount: 2434,
        reviewsCount: 0,
      },
    },
  },
  {
    id: 3,
    title: "Dune",
    publicationDate: "1965-01-01",
    author: "Frank Herbert",
    genres: ["science fiction", "novel", "adventure"],
    hasMovieAdaptation: true,
    pages: 658,
    translations: {
      spanish: "",
    },
    reviews: {
      goodreads: {
        rating: 4.25,
        ratingsCount: 1142893,
        reviewsCount: 49701,
      },
    },
  },
  {
    id: 4,
    title: "Harry Potter and the Philosopher's Stone",
    publicationDate: "1997-06-26",
    author: "J. K. Rowling",
    genres: ["fantasy", "adventure"],
    hasMovieAdaptation: true,
    pages: 223,
    translations: {
      spanish: "Harry Potter y la piedra filosofal",
      korean: "해리 포터와 마법사의 돌",
      bengali: "হ্যারি পটার এন্ড দ্য ফিলোসফার্স স্টোন",
      portuguese: "Harry Potter e a Pedra Filosofal",
    },
    reviews: {
      goodreads: {
        rating: 4.47,
        ratingsCount: 8910059,
        reviewsCount: 140625,
      },
      librarything: {
        rating: 4.29,
        ratingsCount: 120941,
        reviewsCount: 1960,
      },
    },
  },
  {
    id: 5,
    title: "A Game of Thrones",
    publicationDate: "1996-08-01",
    author: "George R. R. Martin",
    genres: ["fantasy", "high-fantasy", "novel", "fantasy fiction"],
    hasMovieAdaptation: true,
    pages: 835,
    translations: {
      korean: "왕좌의 게임",
      polish: "Gra o tron",
      portuguese: "A Guerra dos Tronos",
      spanish: "Juego de tronos",
    },
    reviews: {
      goodreads: {
        rating: 4.44,
        ratingsCount: 2295233,
        reviewsCount: 59058,
      },
      librarything: {
        rating: 4.36,
        ratingsCount: 38358,
        reviewsCount: 1095,
      },
    },
  },
];

function getBooks() {
  return data;
}

function getBook(id) {
  return data.find((d) => d.id === id);
}

// <-- Destructuring -->

const book = getBook(1);
const { title, author, pages, genres, publicationDate, hasMovieAdaptation } =
  book;

const [a, b, ...other] = genres;
console.log(a, b, other);

// <-- Rest/Spread Operator -->

const newGenres = [...genres, "epic fantasy"];
console.log(newGenres);

const updatedBook = { ...book, pages: 100, moviePublicationDate: "2001-12-19" };
console.log(updatedBook);

// <-- Template Literals -->
const summary = `${title} is a book`;
console.log(summary);

// <-- Ternaries Instead of if/else Statements -->
const pagesRange = pages > 1000 ? "over a thousand" : "less than 1000";
console.log(pagesRange);

// <-- Arrow Functions -->
const getYear = (str) => str.split("-")[0];
console.log(getYear(publicationDate));

// <-- Short-Circuiting And Logical Operators: &&, ||, ?? -->
console.log(true && "text"); // text
console.log(hasMovieAdaptation && "This book has a movie");

console.log(false || "text"); // text
console.log(book.translations.spanish || "Not translated");

console.log(book.reviews.librarything.reviewsCount); // 0
console.log(book.reviews.librarything.reviewsCount ?? "no data"); // 0

// <-- Optional Chaining -->
function getTotalReviewCount(book) {
  const goodreads = book.reviews?.goodreads?.reviewsCount;
  const librarything = book.reviews?.librarything?.reviewsCount ?? 0; //undefined ?? 0
  return goodreads + librarything;
}
console.log(getTotalReviewCount(book)); // 49701

// <-- The Array map Method -->
const books = getBooks();

console.log([1, 2, 3].map((el) => el * 2)); // [ 2, 4, 6 ]

const titles = books.map((book) => book.title);
console.log(titles);

const essentialData = books.map((book) => {
  return {
    title: book.title,
    author: book.author,
  };
});
console.log(essentialData);

// <-- The Array filter Method -->
const longBooksWithMovie = books
  .filter((book) => book.pages > 500)
  .filter((book) => book.hasMovieAdaptation);

const adventureBooks = books
  .filter((book) => book.genres.includes("adventure"))
  .map((book) => book.title);

// <-- The Array reduce Method -->
const pagesAllBooks = books.reduce((acc, book) => acc + book.pages, 0);
console.log(pagesAllBooks); // 3227

const colors = ["red", "red", "red", "blue", "black", "black"];
const colorsCount = colors.reduce((acc, curr) => {
  acc[curr] = (acc[curr] || 0) + 1;
  return acc;
}, {});
console.log(colorsCount); // { red: 3, blue: 1, black: 2 }

// <-- The Array sort Method -->
const nums = [3, 2, 5, 1, 4];
const ascendingNums = [...nums].sort();
const descendingNums = [...nums].sort((a, b) => b - a);
console.log(ascendingNums); // [ 1, 2, 3, 4, 5 ]
console.log(descendingNums); // [ 5, 4, 3, 2, 1 ]

const sortedByPages = books
  .slice()
  .sort((a, b) => b.pages - a.pages)
  .map((book) => [book.title, book.pages]);
console.log(sortedByPages);

// <-- Working With Immutable Arrays -->
// Add book object to array
const newBook = {
  id: 6,
  title: "Harry Potter and the Chamber of Secrets",
  author: "J. K. Rowling",
};
const booksAfterAdd = [...books, newBook];

// Delete book object from array
const booksAfterDelete = booksAfterAdd.filter((book) => book !== 3);

// Update book object in the array
const booksAfterUpdate = booksAfterDelete.map((book) =>
  book.id === 1 ? { ...book, pages: 200 } : book
);

// <-- Asynchronous JavaScript: Promises -->
fetch("https://jsonplaceholder.typicode.com/todos/1")
  .then((res) => res.json())
  .then((data) => console.log(data.title)); // delectus aut autem

// <-- Asynchronous JavaScript: Async/Await -->
async function displayTodo(id) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`);
  const data = await res.json();
  console.log(data.title);
}
displayTodo(1); // delectus aut autem
