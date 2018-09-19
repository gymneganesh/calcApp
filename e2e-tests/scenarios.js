describe('homepage', function() {
  it('when the homepage is rendered', function() {
    browser.get('http://localhost:8000');
  });

  describe('element: header', function() {
    it('the page should contains a header element', function() {
      var header = element.all(by.css('md-toolbar'));

      expect((header).count()).toEqual(1);
      expect(header.get(0).element(by.css('.md-toolbar-tools')).getText())
        .toEqual('Calculator app');
    });
  });

  describe('perform : addition', function() {
    it('add 4+4 and display result 8', async function() {
      var eleTotal = $('.total');

      $('.md-primary.lbl-4').click();
      $('.md-primary.lbl-add').click();
      $('.md-primary.lbl-4').click();
      $('.md-primary.lbl-eq').click();

      browser.wait(function() {
        return browser.isElementPresent(eleTotal);
      },5000);
      var total = Number(await eleTotal.getText());

      expect(total).toEqual(8);

    });
  });

  describe('perform : multiplication', function() {
    it('add 4 * 4 and display result 16', async function() {
      var eleTotal = $('.total');

      $('.md-primary.lbl-4').click();
      $('.md-primary.lbl-multiply').click();
      $('.md-primary.lbl-4').click();
      $('.md-primary.lbl-eq').click();

      browser.wait(function() {
        return browser.isElementPresent(eleTotal);
      },5000);
      var total = Number(await eleTotal.getText());

      expect(total).toEqual(16);

    });
  });

  describe('perform : subtraction', function() {
    it('add 4 - 4 and display result 0', async function() {
      var eleTotal = $('.total');

      $('.md-primary.lbl-4').click();
      $('.md-primary.lbl-subtract').click();
      $('.md-primary.lbl-4').click();
      $('.md-primary.lbl-eq').click();

      browser.wait(function() {
        return browser.isElementPresent(eleTotal);
      },5000);
      var total = Number(await eleTotal.getText());

      expect(total).toEqual(0);

    });
  });

  describe('perform : division', function() {
    it('add 4 / 4 and display result 1', async function() {
      var eleTotal = $('.total');

      $('.md-primary.lbl-4').click();
      $('.md-primary.lbl-divide').click();
      $('.md-primary.lbl-4').click();
      $('.md-primary.lbl-eq').click();

      browser.wait(function() {
        return browser.isElementPresent(eleTotal);
      },5000);
      var total = Number(await eleTotal.getText());

      expect(total).toEqual(1);

    });
  });


});
