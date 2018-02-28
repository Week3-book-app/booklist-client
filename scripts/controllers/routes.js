'use strict';

page('/', () => app.Book.fetchAll(app.bookView.initIndexPage));
page('/books/add', () => app.bookView.initAddForm);

// page('/books/:book_id', whateverCallbackYouWant);

// page('/books/:book_id', ctx => whateverCallbackYouWant(ctx, anotherCallback));

page();