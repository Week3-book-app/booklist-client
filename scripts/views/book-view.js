'use strict';

var app = app || {};

(function (module) {
  const bookView = {};

  function resetView() {
    $('.container').hide();
    $('.navLinks').slideDown(650);
  }

  bookView.initIndexPage = function (ctx, next) {
    resetView();
    $('.book-view').show();
    $('#books-list').empty();
    module.Book.all.map(book => $('#books-list').append(book.toHtml()));
    next();
  }

  bookView.initDetailPage = function (ctx, next) {
    resetView();
    console.log(ctx);
    $('.detail-view').show();
    $('#book-detail').empty();
    let template = Handlebars.compile($('#book-detail-template').text());
    $('#book-detail').append(template(ctx.book));

    $('#update').on('click', function() {
      page(`/books/${$(this).data('id')}/update`);
    });

    $('#delete').on('click', function() {
      module.Book.destroy($(this).data('id'));
    });
    next();
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

  bookView.initUpdateFormPage = function(ctx) {
    resetView();
    $('.update-view').show()
    $('#update-form input[name="title"]').val(ctx.book.title);
    $('#update-form input[name="author"]').val(ctx.book.author);
    $('#update-form input[name="isbn"]').val(ctx.book.isbn);
    $('#update-form input[name="image_url"]').val(ctx.book.image_url);
    $('#update-form textarea[name="description"]').val(ctx.book.description);

    $('#update-form').on('submit', function(event) {
      event.preventDefault();

      let book = {
        id: ctx.book.id,
        title: event.target.title.value,
        author: event.target.author.value,
        isbn: event.target.isbn.value,
        image_url: event.target.image_url.value,
        description: event.target.description.value,
      };

      module.Book.update(book, book.id);
    })
  };

  module.bookView = bookView;
})(app)

$(function () {
  app.Book.fetchAll(app.bookView.initIndexPage);
})