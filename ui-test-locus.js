const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('OLSKCollection_Locus', function () {

	const items = Array.from(Array(Math.max(3, uRandomInt(10))));

	const TestLocusIndex = uRandomInt(items.length) + 1;

	before(function() {
		return browser.OLSKVisit(kDefaultRoute, {
			TestLocusIndex,
		});
	});

	items.forEach(function () {

		before(function () {
			return browser.pressButton('#TestItemInsertButton');
		});

		before(function () {
			return browser.fill('#TestItemField', Math.random().toString());
		});

	});

	before(function () {
		return browser.pressButton('#TestLocusButton');
	});

	it('classes OLSKCollectionItemLocus', function () {
		browser.assert.elements('.OLSKCollectionItemLocus', 1);
		browser.assert.hasClass(`${ OLSKCollectionItem }:nth-child(${ TestLocusIndex })`, 'OLSKCollectionItemLocus');
	});
	
});
