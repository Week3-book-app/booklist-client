'use strict';


page('/', () => app.Book.fetchAll(app.bookView.initIndexPage));
page('/books/add', ctx => app.bookView.initCreateFormPage(ctx));

page('/books/:id', ctx => app.Book.fetchOne(ctx, app.bookView.initDetailPage));

// page('/books/:book_id', ctx => whateverCallbackYouWant(ctx, anotherCallback));

page();