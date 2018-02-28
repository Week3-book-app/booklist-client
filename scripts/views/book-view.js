'use strict';

var app = app || {};




(function (module) {
  const bookView = {};

  function resetView() {
    $('.container').hide();
  }

  bookView.initDetailPage = function (ctxBook) {
    resetView();
    $('.detail-view').show()
    $('.book-detail').empty()
    let template = Handlebars.complie($('#book-detail-template').text());
    $('.book-detail').append(template(ctxBook));
  }

  bookView.initIndexPage = function () {
    $('.container').hide();
    $('.book-view').show();
    module.Book.all.map(book => $('#book-list').append(book.toHtml()));
  }

  module.bookView = bookView;
})(app)

$(function () {
  app.Book.fetchAll(app.bookView.initIndexPage);
})