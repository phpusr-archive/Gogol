describe('Gogol App', function() {

    it('Должен перебросить с index.html на index.html#/main', function() {
        browser().navigateTo('../../index.html');
        expect(browser().location().url()).toBe('/main');
    });

    describe('Main view', function() {

        beforeEach(function() {
            browser().navigateTo('../../index.html#/main');
        });

        it('Должен найти 3 книги на главной странице', function() {
            expect(repeater('div.col-lg-4 h2').count()).toBe(3);
        });
    });

});