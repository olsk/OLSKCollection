const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('OLSKCollection_Sort', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute);
	});

	describe('insert', function test_insert () {		

		['alfa', 'bravo', 'charlie'].forEach(function (e) {
			
			before(function () {
				return browser.pressButton('#TestItemInsertButton');
			});

			before(function () {
				return browser.fill('#TestItemField', e);
			});

		});

		it('skips sort', function () {
			browser.assert.text(OLSKCollectionItem, 'charlie bravo alfa'.replace(/ /g, ''));
		});

	});

	describe('update', function test_update () {

		before(function () {
			return browser.click(`${ OLSKCollectionItem }:nth-child(2)`);
		});

		before(function () {
			return browser.fill('#TestItemField', 'alfa2');
		});

		it('skips sort', function () {
			browser.assert.text(OLSKCollectionItem, 'charlie alfa2 alfa'.replace(/ /g, ''));
		});

	});

	describe('delete', function test_delete () {

		before(function () {
			return browser.click(`${ OLSKCollectionItem }:nth-child(3)`);
		});

		before(function () {
			return browser.pressButton('#TestItemRemoveButton');
		});

		it('skips sort', function () {
			browser.assert.text(OLSKCollectionItem, 'charlie alfa2'.replace(/ /g, ''));
		});

	});

	describe('sort', function test_sort () {

		before(function () {
			return browser.pressButton('#TestSortButton');
		});

		it('skips sort', function () {
			browser.assert.text(OLSKCollectionItem, 'alfa2 charlie'.replace(/ /g, ''));
		});

	});

});
