const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('OLSKCollection_Chunk', function () {

	const item = uRandomElement('alfa', 'bravo');

	before(function() {
		return browser.OLSKVisit(kDefaultRoute);
	});

	before(function () {
		return browser.pressButton('#TestItemInsertButton');
	});

	before(function () {
		return browser.fill('#TestItemField', item);
	});

	before(function () {
		return browser.pressButton('#TestChunkButton');
	});

	context('OLSKCollectionChunkHeading', function () {
		
		it('binds OLSKCollectionChunkFunction', function () {
			browser.assert.text(OLSKCollectionChunkHeading, item[0].toUpperCase());
		});
	
	});
	
});
