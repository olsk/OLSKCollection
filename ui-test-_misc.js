const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('OLSKCollection_Misc', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute);
	});
	
	describe('OLSKCollectionGroupHeading', function test_OLSKCollectionGroupHeading () {

		before(function () {
			return browser.pressButton('#TestItemInsertButton');
		});

		before(function () {
			return browser.pressButton('#TestGroupButton');
		});
		
		it('classes OLSKStickyHeader', function () {
			browser.assert.hasClass(OLSKCollectionGroupHeading, 'OLSKStickyHeader');
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

});
