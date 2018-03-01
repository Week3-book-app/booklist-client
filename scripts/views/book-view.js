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
    $('.container').hide();
    $('.book-view').show();
    $('#book-list').empty();
    app.Book.all.map(book => $('#book-list').append(book.toHtml()));
  }

  bookView.initDetailPage = function (ctx) {
    resetView();
    $('.detail-view').show();
    $('.book-detail').empty();
    let template = Handlebars.compile($('#book-detail-template').text());
    $('.book-detail').append(template(ctx));
  }

  bookView.initCreateFormPage = function () {
    resetView();
    $('.form-view').show();
    $('#create-form').on('submit', function (event) {
      event.preventDefault();

      let book = {
        title: event.target.title.value,
        author: event.target.author.value,
        isbn: event.target.isbn.value,
        image_url: event.target.image_url.value,
        description: event.target.description.value
      }
      module.Book.create(book);
    })
  }

  // bookView.initDetailPag = Function(ctx) {
  //   resetView();
  //   $('.detail-view').show();
  //   $('.book-detail').empty();
  //   let template = Handlebars.compile('#book-detail-template').text();
  // }

  module.bookView = bookView;
})(app)

$(function () {
  app.Book.fetchAll(app.bookView.initIndexPage);
})