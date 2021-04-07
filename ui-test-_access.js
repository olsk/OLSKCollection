const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

Object.entries({
	OLSKCollection: '.OLSKCollection',
	
	OLSKCollectionChunk: '.OLSKCollectionChunk',
	OLSKCollectionChunkHeading: '.OLSKCollectionChunkHeading',

	OLSKCollectionItem: '.OLSKCollectionItem',
	OLSKCollectionItemStashStatus: '.OLSKCollectionItemStashStatus',
}).map(function (e) {
	return global[e.shift()]  = e.pop();
});

describe('OLSKCollection_Access', function () {

	const TestAssignmentCount = Math.max(3, uRandomInt(10));

	before(function() {
		return browser.OLSKVisit(kDefaultRoute, {
			TestAssignmentCount,
		});
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
			return browser.pressButton('#TestChunkButton');
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

	context.skip('assignment', function test_assignment() {

		before(function () {
			return browser.pressButton('#TestAssignmentButton');
		});

		it('shows OLSKCollectionItem', function () {
			browser.assert.elements(OLSKCollectionItem, TestAssignmentCount);
		});

	});

	context('OLSKCollectionItems', function test_OLSKCollectionItems() {

		const count = Math.max(1, Date.now() % 10);

		before(function () {
			return browser.OLSKVisit(kDefaultRoute, {
				OLSKCollectionItems: JSON.stringify(Array.from(Array(count)).map(function () {
					return {
						XYZItemBlurb: '',
					};
				})),
			});
		});

		it('shows OLSKCollectionItem', function () {
			browser.assert.elements(OLSKCollectionItem, count);
		});

		it('hides OLSKCollectionItemStashStatus', function () {
			browser.assert.elements(OLSKCollectionItemStashStatus, 0);
		});

		context('OLSKCollectionStashEnabled', function () {
			
			before(function () {
				return browser.pressButton('#TestStashButton');
			});

			it('shows OLSKCollectionItemStashStatus', function () {
				browser.assert.elements(OLSKCollectionItemStashStatus, count);
			});

			context('disable', function () {
				
				before(function () {
					return browser.pressButton('#TestStashButton');
				});

				it('shows OLSKCollectionItemStashStatus', function () {
					browser.assert.elements(OLSKCollectionItemStashStatus, 0);
				});
			
			});
		
		});

	});

});
