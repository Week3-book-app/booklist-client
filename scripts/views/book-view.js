'use strict';

var app = app || {};

(function (module) {
  const bookView = {};

  function resetView() {
    $('.container').hide();
    $('.navLinks').slideDown(650);
  }

  bookView.initIndexPage = function () {
    resetView();
    $('.book-view').show();
    $('#books-list').empty();
    app.Book.all.map(book => $('#books-list').append(book.toHtml()));
  }

  bookView.initDetailPage = function (ctx) {
    resetView();
    console.log(ctx);
    $('.detail-view').show();
    $('#book-detail').empty();
    let template = Handlebars.compile($('#book-detail-template').text());
    $('#book-detail').append(template(ctx));
  }

  bookView.initCreateFormPage = function () {
    resetView();
    $('.form-view').show();
    $('.new-book-form').on('submit', function (event) {
      event.preventDefault();

      let book = {
        title: event.target.title.value,
        author: event.target.author.value,
        isbn: event.target.isbn.value,
        image_url: event.target.image_url.value,
        description: event.target.description.value
      }
      app.Book.create(book);
    })
  }

  module.bookView = bookView;
})(app)

$(function () {
  app.Book.fetchAll(app.bookView.initIndexPage);
})