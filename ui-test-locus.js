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

	[true, false].forEach(function (flag) {

		const key = flag ? 'ArrowDown' : 'ArrowUp';

		describe(key, function () {

			const items = Array.from(Array(3)).map(Math.random);

			before(function() {
				return browser.OLSKVisit(kDefaultRoute);
			});

			context('no items', function () {
				
				before(function () {
					browser.assert.text('#TestOLSKCollectionDispatchArrow', '0');
					browser.assert.text('#TestOLSKCollectionDispatchArrowData', 'undefined');
				});

				before(function () {
					return browser.OLSKFireKeyboardEvent(browser.window, key);
				});

				it('sends no OLSKCollectionDispatchArrow', function() {
					browser.assert.text('#TestOLSKCollectionDispatchArrow', '0');
				});
			
			});

			context('no selection', function () {

				items.slice().reverse().forEach(function (e) {

					before(function () {
						return browser.pressButton('#TestItemInsertButton');
					});

					before(function () {
						return browser.fill('#TestItemField', e);
					});

				});

				before(function () {
					return browser.pressButton('#TestItemClearSelectionButton');
				});
				
				before(function () {
					browser.assert.text('#TestOLSKCollectionDispatchArrow', '0');
				});

				before(function () {
					return browser.OLSKFireKeyboardEvent(browser.window, key);
				});

				it('sends OLSKCollectionDispatchArrow', function() {
					browser.assert.text('#TestOLSKCollectionDispatchArrow', '1');
					browser.assert.text('#TestOLSKCollectionDispatchArrowData', items[!flag ? items.length - 1 : 0]);
				});
			
			});

			context('selection', function () {
				
				before(function () {
					return browser.click(`${ OLSKCollectionItem }:nth-child(2)`);
				});

				before(function () {
					return browser.OLSKFireKeyboardEvent(browser.window, key);
				});

				it('sends OLSKCollectionDispatchArrow', function() {
					browser.assert.text('#TestOLSKCollectionDispatchArrow', '2');
					browser.assert.text('#TestOLSKCollectionDispatchArrowData', items[flag ? 2 : 0]);
				});
			
			});

			context('edge', function () {
				
				before(function () {
					return browser.OLSKFireKeyboardEvent(browser.window, key);
				});

				it('sends no OLSKCollectionDispatchArrow', function() {
					browser.assert.text('#TestOLSKCollectionDispatchArrow', '2');
				});

				context('OLSKCollectionEnableLooping', function () {
					
					before(function () {
						return browser.pressButton('#TestToggleLoopingButton');
					});
					
					before(function () {
						return browser.OLSKFireKeyboardEvent(browser.window, key);
					});

					it('sends OLSKCollectionDispatchArrow', function() {
						browser.assert.text('#TestOLSKCollectionDispatchArrow', '3');
						browser.assert.text('#TestOLSKCollectionDispatchArrowData', items[flag ? 0 : 2]);
					});
				
				});
			
			});

		});

	});

	describe('OLSKCollectionIgnoreKeyboard', function() {

		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				OLSKCollectionIgnoreKeyboard: true,
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

		['ArrowDown', 'ArrowUp'].forEach(function (e) {

			before(function () {
				browser.assert.text('#TestOLSKCollectionDispatchArrow', '0');
			});

			before(function () {
				return browser.OLSKFireKeyboardEvent(browser.window, e);
			});

			it('sends no OLSKCollectionDispatchArrow', function() {
				browser.assert.text('#TestOLSKCollectionDispatchArrow', '0');
			});

		});

	});
	
});
