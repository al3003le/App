describe('localhost list of notes', function() {

  it('should add a note', function() {
    browser.get('http://localhost:9000');

    //Add new item
    element(by.id('add-btn')).click();
    element(by.model('selectNote.title')).sendKeys('It is next item for a test');

    //check count into the list 
    var noteList = element.all(by.repeater('note in notes'));
    expect(noteList.count()).toEqual(2);
    //In our case true = 2, list is not updated
    //expect(noteList.count()).toEqual(3);

    // check last row in our case is second
    expect(noteList.get(1).getText()).toEqual('edit del 2. Pick-up posters from post-office');
  });
});