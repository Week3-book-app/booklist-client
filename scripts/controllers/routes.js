'use strict';

page('/', ctx => app.Book.fetchAll(app.bookView.initIndexPage));
page('/book/add', ctx => app.bookView.initCreateFormPage(ctx));
page('/book/:id', ctx => app.Book.fetchOne(ctx, app.bookView.initDetailPage));
// page('/books/:book_id', whateverCallbackYouWant);

// page('/books/:book_id', ctx => whateverCallbackYouWant(ctx, anotherCallback));

page();