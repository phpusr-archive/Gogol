describe('Gogol App', function() {

    it('Должен перебросить с index.html на index.html#/main', function() {
        browser().navigateTo('../../index.html');
        expect(browser().location().url()).toBe('/main');
    });

    it('Должен проверить копирайт', function() {
        browser().navigateTo('../../index.html');
        expect(binding('copyright')).toBe('Анна Доронина 2013');
        expect(element('div.footer p').text()).toBe('© Анна Доронина 2013');
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