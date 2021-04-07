const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

Object.entries({
	OLSKCollection: '.OLSKCollection',
	
	OLSKCollectionChunk: '.OLSKCollectionChunk',
	OLSKCollectionChunkHeading: '.OLSKCollectionChunkHeading',
	OLSKCollectionItem: '.OLSKCollectionItem',
}).map(function (e) {
	return global[e.shift()]  = e.pop();
});

describe('OLSKCollection_Access', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute);
	});

	it('shows OLSKCollection', function () {
		browser.assert.elements(OLSKCollection, 1);
	});

	it('shows OLSKCollectionChunk', function () {
		browser.assert.elements(OLSKCollectionChunk, 1);
	});

	it('hides OLSKCollectionChunkHeading', function () {
		browser.assert.elements(OLSKCollectionChunkHeading, 0);
	});

	it('hides OLSKCollectionItem', function () {
		browser.assert.elements(OLSKCollectionItem, 0);
	});

	context('OLSKCollectionInsert', function test_OLSKCollectionInsert() {

		before(function () {
			return browser.pressButton('#TestItemInsertButton');
		});

		it('shows OLSKCollectionItem', function () {
			browser.assert.elements(OLSKCollectionItem, 1);
		});

	});

	context('OLSKCollectionChunkFunction', function test_OLSKCollectionChunkFunction() {

		before(function () {
			return browser.pressButton('#TestGroupButton');
		});

		it('shows OLSKCollectionChunkHeading', function () {
			browser.assert.elements(OLSKCollectionChunkHeading, 1);
		});

	});

	context('OLSKCollectionRemove', function test_OLSKCollectionRemove() {

		before(function () {
			return browser.pressButton('#TestItemRemoveButton');
		});

		it('hides OLSKCollectionItem', function () {
			browser.assert.elements(OLSKCollectionItem, 0);
		});

		it('hides OLSKCollectionChunk', function () {
			browser.assert.elements(OLSKCollectionChunk, 0);
		});

	});

	context('OLSKCollectionItems', function test_OLSKCollectionItems() {

		const item = Date.now() % 10;

		before(function () {
			return browser.OLSKVisit(kDefaultRoute, {
				OLSKCollectionItems: JSON.stringify(Array.from(Array(item)).map(function () {
					return {
						XYZItemBlurb: '',
					};
				})),
			});
		});

		it('shows OLSKCollectionItem', function () {
			browser.assert.elements(OLSKCollectionItem, item);
		});

	});

});
