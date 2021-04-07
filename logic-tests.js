const { throws, deepEqual } = require('assert');

const mod = require('./logic.js').default;

describe('OLSKCollectionAPI', function test_OLSKCollectionAPI() {

	const _OLSKCollectionAPI = function (inputData = {}) {
		return mod.OLSKCollectionAPI(Object.assign({
			OLSKCollectionSortFunction: (function () {}),
			_OLSKCollectionKeyFunction: (function () {}),
		}, inputData));
	}

	it('throws if not object', function () {
		throws(function () {
			mod.OLSKCollectionAPI(null);
		}, /OLSKErrorInputNotValid/);
	});

	it('throws if OLSKCollectionSortFunction not function', function () {
		throws(function () {
			_OLSKCollectionAPI({
				OLSKCollectionSortFunction: null,
			});
		}, /OLSKErrorInputNotValid/);
	});

	it('throws if _OLSKCollectionKeyFunction not function', function () {
		throws(function () {
			_OLSKCollectionAPI({
				_OLSKCollectionKeyFunction: null,
			});
		}, /OLSKErrorInputNotValid/);
	});

	it('returns object', function () {
		deepEqual(typeof _OLSKCollectionAPI(), 'object');
	});

	it('throws if OLSKCollectionItems not array', function () {
		throws(function () {
			_OLSKCollectionAPI({
				OLSKCollectionItems: null,
			});
		}, /OLSKErrorInputNotValid/);
	});

	it('throws if OLSKCollectionDispatchChange not function', function () {
		throws(function () {
			_OLSKCollectionAPI({
				OLSKCollectionDispatchChange: null,
			});
		}, /OLSKErrorInputNotValid/);
	});

	context('OLSKCollectionDataItemsAll', function testOLSKCollectionDataItemsAll () {
		
		it('returns array', function () {
			deepEqual(_OLSKCollectionAPI().OLSKCollectionDataItemsAll(), []);
		});

		it('copies array', function () {
			const api = _OLSKCollectionAPI();

			api.OLSKCollectionDataItemsAll().push(Math.random().toString());

			deepEqual(api.OLSKCollectionDataItemsAll(), []);
		});

		it('binds OLSKCollectionItems', function () {
			const OLSKCollectionItems = Array.from(Array(uRandomInt()));
			deepEqual(_OLSKCollectionAPI({
				OLSKCollectionItems,
			}).OLSKCollectionDataItemsAll(), OLSKCollectionItems);
		});
	
	});

	context('OLSKCollectionInsert', function test_OLSKCollectionInsert () {
		
		it('returns input', function () {
			const item = Math.random().toString();
			deepEqual(_OLSKCollectionAPI().OLSKCollectionInsert(item), item);
		});

		it('adds to collection', function () {
			const OLSKCollectionItems = [Math.random().toString()];
			
			const api = _OLSKCollectionAPI({
				OLSKCollectionItems: OLSKCollectionItems.slice(),
			});

			const item = Math.random().toString();

			api.OLSKCollectionInsert(item);
			
			deepEqual(api.OLSKCollectionDataItemsAll(), [item].concat(OLSKCollectionItems));
		});

		it('binds OLSKCollectionItems', function () {
			const OLSKCollectionItems = [];

			const api = _OLSKCollectionAPI({
				OLSKCollectionItems,
			});

			api.OLSKCollectionInsert(Math.random().toString());
			
			deepEqual(api.OLSKCollectionDataItemsAll(), OLSKCollectionItems);
		});

		it('calls OLSKCollectionDispatchChange', function () {
			const item = Math.random().toString();
			deepEqual(uCapture(function (capture) {
				_OLSKCollectionAPI({
					OLSKCollectionDispatchChange: (function () {
						return capture(item);
					}),
				}).OLSKCollectionInsert(Math.random().toString())
			}), [item]);
		});
	
	});

	context('OLSKCollectionUpdate', function test_OLSKCollectionUpdate () {
		
		it('returns input', function () {
			const item = Math.random().toString();
			deepEqual(_OLSKCollectionAPI().OLSKCollectionUpdate(item), item);
		});

		it('updates in collection', function () {
			const OLSKCollectionItems = [Math.random().toString()];
			
			const api = _OLSKCollectionAPI({
				OLSKCollectionItems: OLSKCollectionItems.slice(),
			});

			const item = Math.random().toString();

			api.OLSKCollectionUpdate(item);
			
			deepEqual(api.OLSKCollectionDataItemsAll(), [item]);
		});

		it('binds OLSKCollectionItems', function () {
			const OLSKCollectionItems = [Math.random().toString()];

			const api = _OLSKCollectionAPI({
				OLSKCollectionItems,
			});

			api.OLSKCollectionUpdate(Math.random().toString());
			
			deepEqual(api.OLSKCollectionDataItemsAll(), OLSKCollectionItems);
		});

		it('calls OLSKCollectionDispatchChange', function () {
			const item = Math.random().toString();
			deepEqual(uCapture(function (capture) {
				_OLSKCollectionAPI({
					OLSKCollectionDispatchChange: (function () {
						return capture(item);
					}),
				}).OLSKCollectionUpdate(Math.random().toString())
			}), [item]);
		});
	
	});

	context('OLSKCollectionRemove', function test_OLSKCollectionRemove () {
		
		it('returns input', function () {
			const item = Math.random().toString();
			deepEqual(_OLSKCollectionAPI().OLSKCollectionRemove(item), item);
		});

		it('remove from collection', function () {
			const item = Math.random().toString();
			const OLSKCollectionItems = [item];
			
			const api = _OLSKCollectionAPI({
				OLSKCollectionItems: OLSKCollectionItems.slice(),
			});

			api.OLSKCollectionRemove(item);
			
			deepEqual(api.OLSKCollectionDataItemsAll(), []);
		});

		it('binds OLSKCollectionItems', function () {
			const item = Math.random().toString();
			const OLSKCollectionItems = [item];

			const api = _OLSKCollectionAPI({
				OLSKCollectionItems,
			});

			api.OLSKCollectionRemove(item);
			
			deepEqual(OLSKCollectionItems, []);
		});

		it('calls OLSKCollectionDispatchChange', function () {
			const item = Math.random().toString();
			deepEqual(uCapture(function (capture) {
				_OLSKCollectionAPI({
					OLSKCollectionDispatchChange: (function () {
						return capture(item);
					}),
				}).OLSKCollectionRemove(Math.random().toString())
			}), [item]);
		});
	
	});

	context('OLSKCollectionSort', function test_OLSKCollectionSort () {
		
		it('returns undefined', function () {
			deepEqual(_OLSKCollectionAPI().OLSKCollectionSort(), undefined);
		});

		it('sorts collection', function () {
			const OLSKCollectionItems = [Math.random().toString(), Math.random().toString()];
			
			const api = _OLSKCollectionAPI({
				OLSKCollectionItems: OLSKCollectionItems.slice(),
				OLSKCollectionSortFunction: (function () {
					return -1;
				}),
			});

			api.OLSKCollectionSort()

			deepEqual(api.OLSKCollectionDataItemsAll(), OLSKCollectionItems.slice().reverse());
		});

		it('binds OLSKCollectionItems', function () {
			const item1 = Math.random().toString();
			const item2 = Math.random().toString();
			const OLSKCollectionItems = [item1, item2];
			
			const api = _OLSKCollectionAPI({
				OLSKCollectionItems,
				OLSKCollectionSortFunction: (function () {
					return -1;
				}),
			});

			api.OLSKCollectionSort()

			deepEqual(OLSKCollectionItems, [item2, item1]);
		});

		it('calls OLSKCollectionDispatchChange', function () {
			const item = Math.random().toString();
			deepEqual(uCapture(function (capture) {
				_OLSKCollectionAPI({
					OLSKCollectionDispatchChange: (function () {
						return capture(item);
					}),
				}).OLSKCollectionSort(Math.random().toString())
			}), [item]);
		});
	
	});

});

describe('OLSKCollectionConstrainIndex', function test_OLSKCollectionConstrainIndex() {

	it('throws error if param1 not array', function() {
		throws(function() {
			mod.OLSKCollectionConstrainIndex(null, 0);
		}, /OLSKErrorInputNotValid/);
	});

	it('throws error if param2 not number', function() {
		throws(function() {
			mod.OLSKCollectionConstrainIndex([], null);
		}, /OLSKErrorInputNotValid/);
	});

	it('returns last if param2 below 0', function() {
		deepEqual(mod.OLSKCollectionConstrainIndex(['alfa', 'bravo', 'charlie'], -1), 2);
	});

	it('returns first if param2 above length', function() {
		deepEqual(mod.OLSKCollectionConstrainIndex(['alfa', 'bravo', 'charlie'], 3), 0);
	});

	it('returns param2', function() {
		deepEqual(mod.OLSKCollectionConstrainIndex([], 0), 0);
	});

});
