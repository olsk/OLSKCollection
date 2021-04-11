const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('OLSKCollection_Misc', function () {

	const OLSKCollectionItemClass = Math.random().toString();

	before(function() {
		return browser.OLSKVisit(kDefaultRoute, {
			OLSKCollectionItemClass,
		});
	});
	
	describe('OLSKCollectionChunkHeading', function test_OLSKCollectionChunkHeading () {

		before(function () {
			return browser.pressButton('#TestItemInsertButton');
		});

		before(function () {
			return browser.pressButton('#TestChunkButton');
		});
		
		it('classes OLSKStickyHeader', function () {
			browser.assert.hasClass(OLSKCollectionChunkHeading, 'OLSKStickyHeader');
		});

	});

	context('OLSKCollectionItem', function test_OLSKCollectionItem() {

		const item = Math.random().toString();
		const body = item + '\n' + Math.random().toString();

		it('sets role', function () {
			browser.assert.attribute(OLSKCollectionItem, 'role', 'button');
		});

		it('sets aria-label', function () {
			browser.assert.attribute(OLSKCollectionItem, 'aria-label', browser.query('.TestOLSKCollectionItem').innerHTML);
		});

		it('binds OLSKCollectionItemClass', function () {
			browser.assert.hasClass(OLSKCollectionItem, OLSKCollectionItemClass);
		});

		it('binds OLSKCollectionItem', function () {
			browser.assert.elements(`${ OLSKCollectionItem } .TestOLSKCollectionItem`, 1);
		});

		context('update', function () {

			before(function () {
				return browser.fill('#TestItemField', body);
			});

			before(function () {
				return browser.wait({ element: OLSKCollectionItem });
			});

			it('sets aria-label', function () {
				browser.assert.attribute(OLSKCollectionItem, 'aria-label', item);
			});

			it('binds OLSKCollectionItem', function () {
				browser.assert.text(OLSKCollectionItem, body.split('\n').join(' '));
			});

		});

		context('click', function () {

			before(function () {
				browser.assert.text('#TestOLSKCollectionDispatchClick', '0');
				browser.assert.text('#TestOLSKCollectionDispatchClickData', 'undefined');
			});

			before(function () {
				return browser.click(OLSKCollectionItem);
			});

			it('sends OLSKCollectionDispatchClick', function () {
				browser.assert.text('#TestOLSKCollectionDispatchClick', '1');
				browser.assert.text('#TestOLSKCollectionDispatchClickData', item);
			});

		});

	});

	context('OLSKCollectionItemStashStatusImage', function test_OLSKCollectionItemStashStatusImage() {

		before(function () {
			return browser.pressButton('#TestStashButton');
		});

		before(function () {
			return browser.click(OLSKCollectionItem);
		});

		it('sets src', function () {
			browser.assert.elements(`${ OLSKCollectionItemStashStatusImage } #_OLSKSharedStashSelected`, 1);
		});

	});

});
