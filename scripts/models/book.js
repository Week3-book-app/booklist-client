'use strict';

var app = app || {};
const __API_URL__ = 'http://localhost:3000';
// var __API_URL__ = 'https://mm-hy-booklist.herokuapp.com';

(function (module) {

  function errorCallback(err) {
    // console.error(err);
    module.errorView.initErrorPage(err);
  }

  function Book(rawBookObj) {
    Object.keys(rawBookObj).forEach(key => this[key] = rawBookObj[key]);
  }

  Book.prototype.toHtml = function () {
    let template = Handlebars.compile($('#book-list-template').text());
    return template(this);
  }

  // Book.prototype.toHtml = function () {
  //   let template = Handlebars.compile($('#book-detail-template').text());
  //   return template(this);
  // }

  // An Array to hold all our object instances.
  Book.all = [];

  Book.loadAll = rows => { Book.all = rows.sort((a, b) => b.title - a.title).map(book => new Book(book)) };

  Book.fetchAll = callback =>
    $.get(`${__API_URL__}/api/v1/books`)
      .then(Book.loadAll)
      .then(console.log(Book.all))
      .then(callback)
      .catch(errorCallback);

  Book.create = book =>
    $.post(`${__API_URL__}/api/v1/books/add`, book)
      .then(() => page('/'))
      .catch(errorCallback);

  Book.fetchOne = (ctx, callback) =>
    $.get(`${__API_URL__}/api/v1/books/${ctx.params.id}`)
      .then(results => {
        return ctx.book = results[0]
      })
      .then(callback)
      .catch(errorCallback);

  Book.update = book =>
    $.put(`${__API_URL__}/api/v1/books/add`, book)
      .then(() => page('/'))
      .catch(console.log);



  module.Book = Book;
})(app)