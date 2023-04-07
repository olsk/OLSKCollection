const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('OLSKCollection_Misc', function () {

	const OLSKCollectionItemClass = Math.random().toString();

	before(function() {
		return browser.OLSKVisit(kDefaultRoute, {
			OLSKCollectionItemClass,
		});
	});

	context('OLSKCollectionEmpty', function test_OLSKCollectionEmpty() {

		it('sets aria-hidden', function () {
			return browser.assert.attribute(OLSKCollectionEmpty, 'aria-hidden', 'true');
		});

		it('binds OLSKCollectionEmpty', function () {
			return browser.assert.visible(`${ OLSKCollectionEmpty } .TestOLSKCollectionEmpty`);
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
			return browser.assert.hasClass(OLSKCollectionChunkHeading, 'OLSKStickyHeader');
		});

	});

	context('OLSKCollectionItem', function test_OLSKCollectionItem() {

		const item = Math.random().toString();
		const body = item + '\n' + Math.random().toString();

		it('sets role', function () {
			return browser.assert.attribute(OLSKCollectionItem, 'role', 'button');
		});

		it('sets aria-label', async function () {
			return browser.assert.attribute(OLSKCollectionItem, 'aria-label', await browser.innerHTML('.TestOLSKCollectionItem'));
		});

		it('binds OLSKCollectionItemClass', function () {
			return browser.assert.hasClass(OLSKCollectionItem, OLSKCollectionItemClass);
		});

		it('binds OLSKCollectionItem', function () {
			return browser.assert.elements(`${ OLSKCollectionItem } .TestOLSKCollectionItem`, 1);
		});

		context('update', function () {

			before(function () {
				return browser.fill('#TestItemField', body);
			});

			it('sets aria-label', function () {
				return browser.assert.attribute(OLSKCollectionItem, 'aria-label', item);
			});

			it('binds OLSKCollectionItem', function () {
				return browser.assert.text(OLSKCollectionItem, body.split('\n').join(' '));
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
			return browser.assert.elements(`${ OLSKCollectionItemStashStatusImage } #_OLSKSharedStashSelected`, 1);
		});

	});

});
