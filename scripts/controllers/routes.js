'use strict';


page('/', (ctx, next) => app.Book.fetchAll(() => app.bookView.initIndexPage(ctx, next))
  , (ctx, next) => app.adminView.verify(ctx, next)
);
page('/books/add', ctx => app.bookView.initCreateFormPage(ctx));

page('/books/:id', (ctx, next) => app.Book.fetchOne(ctx, () => app.bookView.initDetailPage(ctx, next))
  , (ctx, next) => app.adminView.verify(ctx, next)
);

page('/books/:id/update'
  , (ctx, next) => app.Book.fetchOne(ctx, next)
  , ctx => app.bookView.initUpdateFormPage(ctx)
);

page('/admin', () => app.adminView.initAdminPage());

page();