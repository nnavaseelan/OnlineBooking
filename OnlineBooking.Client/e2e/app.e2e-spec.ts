import { OnlineBooking.ClientPage } from './app.po';

describe('online-booking.client App', () => {
  let page: OnlineBooking.ClientPage;

  beforeEach(() => {
    page = new OnlineBooking.ClientPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
