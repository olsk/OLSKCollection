const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('OLSKCollection_Sort', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute);
	});

	describe('insert', function test_insert () {		

		['alfa', 'bravo', 'charlie'].forEach(function (e, i, coll) {
			
			before(function () {
				return browser.pressButton('#TestItemInsertButton');
			});

			before(function () {
				return browser.fill('#TestItemField', e);
			});

			it('skips sort ' + e, function () {
				return browser.assert.text(OLSKCollectionItem + `:nth-child(${ coll.length - i })`, e);
			});

		});

	});

	describe('update', function test_update () {

		before(function () {
			return browser.click(`${ OLSKCollectionItem }:nth-child(2)`);
		});

		before(function () {
			return browser.fill('#TestItemField', 'alfa2');
		});

		['charlie', 'alfa2', 'alfa'].forEach(function (e, i, coll) {
			
			it('skips sort ' + e, function () {
				return browser.assert.text(OLSKCollectionItem + `:nth-child(${ i + 1 })`, e);
			});

		});

	});

	describe('delete', function test_delete () {

		before(function () {
			return browser.click(`${ OLSKCollectionItem }:nth-child(3)`);
		});

		before(function () {
			return browser.pressButton('#TestItemRemoveButton');
		});

		['charlie', 'alfa2'].forEach(function (e, i, coll) {
			
			it('skips sort ' + e, function () {
				return browser.assert.text(OLSKCollectionItem + `:nth-child(${ i + 1 })`, e);
			});

		});

	});

	describe('sort', function test_sort () {

		before(function () {
			return browser.pressButton('#TestSortButton');
		});

		['alfa2', 'charlie'].forEach(function (e, i, coll) {
			
			it('skips sort ' + e, function () {
				return browser.assert.text(OLSKCollectionItem + `:nth-child(${ i + 1 })`, e);
			});

		});

	});

});
