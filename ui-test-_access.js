const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

Object.entries({
	OLSKCollection: '.OLSKCollection',
	
	OLSKCollectionGroup: '.OLSKCollectionGroup',
	OLSKCollectionGroupHeading: '.OLSKCollectionGroupHeading',
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

	it('shows OLSKCollectionGroup', function () {
		browser.assert.elements(OLSKCollectionGroup, 1);
	});

	it('hides OLSKCollectionGroupHeading', function () {
		browser.assert.elements(OLSKCollectionGroupHeading, 0);
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

		it('shows OLSKCollectionGroupHeading', function () {
			browser.assert.elements(OLSKCollectionGroupHeading, 1);
		});

	});

	context('OLSKCollectionRemove', function test_OLSKCollectionRemove() {

		before(function () {
			return browser.pressButton('#TestItemRemoveButton');
		});

		it('hides OLSKCollectionItem', function () {
			browser.assert.elements(OLSKCollectionItem, 0);
		});

		it('hides OLSKCollectionGroup', function () {
			browser.assert.elements(OLSKCollectionGroup, 0);
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
