const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('OLSKCollection_Stash', function () {

	const items = Array.from(Array(3)).map(Math.random);

	before(function() {
		return browser.OLSKVisit(kDefaultRoute);
	});

	items.forEach(function (e) {

		before(function () {
			return browser.pressButton('#TestItemInsertButton');
		});

		before(function () {
			return browser.fill('#TestItemField', e);
		});

	});

	context('enable with no selection', function () {
		
		before(function () {
			return browser.pressButton('#TestStashButton');
		});

		it('selects none', function () {
			browser.assert.elements('.OLSKCollectionItemStash', 0);
		});

		context('click if not selected', function () {

			const index = uRandomInt(items.length) + 1;

			before(function () {
				browser.assert.text('#TestOLSKCollectionDispatchClick', '0');
			});

			before(function () {
				browser.assert.text('#TestOLSKCollectionDispatchStash', '0');
				browser.assert.text('#TestOLSKCollectionDispatchStashData', 'undefined');
			});

			before(function () {
				return browser.click(`${ OLSKCollectionItem }:nth-child(${ index })`);
			});

			it('sends no TestOLSKCollectionDispatchClick', function () {
				browser.assert.text('#TestOLSKCollectionDispatchClick', '0');
			});

			it('sends OLSKCollectionDispatchStash', function () {
				browser.assert.text('#TestOLSKCollectionDispatchStash', '1');
				browser.assert.text('#TestOLSKCollectionDispatchStashData', '1');
			});

			it('adds to stash', function () {
				browser.assert.hasClass(`${ OLSKCollectionItem }:nth-child(${ index })`, 'OLSKCollectionItemStash');
			});

			context('click if selected', function () {

				before(function () {
					return browser.click(`${ OLSKCollectionItem }:nth-child(${ index })`);
				});

				it('sends no TestOLSKCollectionDispatchClick', function () {
					browser.assert.text('#TestOLSKCollectionDispatchClick', '0');
				});

				it('sends OLSKCollectionDispatchStash', function () {
					browser.assert.text('#TestOLSKCollectionDispatchStash', '2');
					browser.assert.text('#TestOLSKCollectionDispatchStashData', '0');
				});

				it('removes from stash', function () {
					browser.assert.hasNoClass(`${ OLSKCollectionItem }:nth-child(${ index })`, 'OLSKCollectionItemStash');
				});

			});

		});
	
	});

	context('disable', function () {
		
		before(function () {
			return browser.pressButton('#TestStashButton');
		});

		it('selects none', function () {
			browser.assert.elements('.OLSKCollectionItemStash', 0);
		});
	
	});

	context('re-enable', function () {
		
		before(function () {
			return browser.pressButton('#TestStashButton');
		});

		before(function () {
			return browser.click(OLSKCollectionItem);
		});

		before(function () {
			browser.assert.elements('.OLSKCollectionItemStash', 1);
		});

		before(function () {
			return browser.pressButton('#TestStashButton');
		});

		before(function () {
			return browser.pressButton('#TestStashButton');
		});

		it('forgets selection', function () {
			browser.assert.elements('.OLSKCollectionItemStash', 0);
		});
	
	});
	
});
