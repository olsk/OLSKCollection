const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('OLSKCollection_Group', function () {

	const item = uRandomElement('alfa', 'bravo');

	before(function() {
		return browser.OLSKVisit(kDefaultRoute);
	});

	before(function () {
		return browser.pressButton('#TestItemInsertButton');
	});

	before(function () {
		return browser.pressButton('#TestGroupButton');
	});

	before(function () {
		return browser.fill('#TestItemField', item);
	});

	context('OLSKCollectionGroupHeading', function () {
		
		it('binds OLSKCollectionGroupFunction', function () {
			browser.assert.text(OLSKCollectionGroupHeading, item[0].toUpperCase());
		});
	
	});
	
});
