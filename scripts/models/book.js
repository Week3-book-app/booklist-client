'use strict';

var app = {};
const __API_URL__ = 'http://localhost:3000';
//var __API_URL__ = 'https://mm-hy-booklist.herokuapp.com';

(function (module) {
  function errorCallback(err) {
    console.error(err);
    module.errorView.initErrorPage(err);
  }

  function Book(rawBookObj) {
    Object.keys(rawBookObj).forEach(key => this[key] = rawBookObj[key]);
  }

  Book.prototype.toHtml = function () {
    let template = Handlebars.compile($('#book-list-template').text());
    return template(this);
  }

  // An Array to hold all our object instances.
  Book.all = [];

  Book.loadAll = rows => {
    Book.all = rows.sort((a, b) => b.title - a.title).map(book => new Book(book));
  }

  Book.fetchAll = callback =>
    $.get(`${__API_URL__}/books`)
      .then(Book.loadAll)
      .then(callback)
      .catch(errorCallback);

  Book.fetchOne = (ctx, callback) =>
    $.get(`${__API_URL__}/api/v1/books/${ctx.params.id}`)
      .then(results => ctx.book = results[0])
      .then(callback)
      .catch(errorCallback);
     

  Book.createBook = book =>
    $.post(`${__API_URL__}/books/add`, book)
      .then(() => page('/'))
      .catch(errorCallback);

  module.Book = Book;
})(app)