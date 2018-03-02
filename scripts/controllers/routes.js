'use strict';


page('/', () => app.Book.fetchAll(app.bookView.initIndexPage));
page('/books/add', ctx => app.bookView.initCreateFormPage(ctx));

page('/books/:id', ctx => app.Book.fetchOne(ctx, app.bookView.initDetailPage));

page('/admin',
  (ctx, next) => app.adminView.initAdminPage(ctx, next),
  (ctx) => app.adminView.verify(ctx));
// page('/books/:book_id', ctx => whateverCallbackYouWant(ctx, anotherCallback));

page();