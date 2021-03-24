const main = {

	OLSKCollectionAPI (params) {
		if (typeof params !== 'object' || params === null) {
			throw new Error('OLSKErrorInputNotValid');
		}

		if (typeof params.OLSKCollectionSortFunction !== 'function') {
			throw new Error('OLSKErrorInputNotValid');
		}

		if (typeof params._OLSKCollectionKeyFunction !== 'function') {
			throw new Error('OLSKErrorInputNotValid');
		}

		if (typeof params.OLSKCollectionItems !== 'undefined') {
			if (!Array.isArray(params.OLSKCollectionItems)) {
				throw new Error('OLSKErrorInputNotValid');
			}
		} else {
			params.OLSKCollectionItems = [];
		}

		if (typeof params.OLSKCollectionDispatchChange !== 'undefined') {
			if (typeof params.OLSKCollectionDispatchChange !== 'function') {
				throw new Error('OLSKErrorInputNotValid');
			}
		}

		const mod = {

			_ValueItemsAll: params.OLSKCollectionItems,
			ValueItemsAll (inputData) {
				[].splice.apply(params.OLSKCollectionItems, [0, params.OLSKCollectionItems.length].concat(mod._ValueItemsAll = inputData));

				params.OLSKCollectionDispatchChange && params.OLSKCollectionDispatchChange();
			},

		};

		const api = {

			// DATA
		
			OLSKCollectionDataItemsAll() {
				return params.OLSKCollectionItems.slice();
			},

			// CONTROL

			OLSKCollectionInsert (inputData) {
				mod.ValueItemsAll([inputData].concat(mod._ValueItemsAll));

				return inputData;
			},

			OLSKCollectionUpdate (inputData) {
				mod.ValueItemsAll(mod._ValueItemsAll.map(function (e) {
					return params._OLSKCollectionKeyFunction(e) === params._OLSKCollectionKeyFunction(inputData) ? inputData : e;
				}));

				return inputData;
			},
			
			OLSKCollectionRemove (inputData) {
				mod.ValueItemsAll(mod._ValueItemsAll.filter(function (e) {
					return params._OLSKCollectionKeyFunction(e) !== params._OLSKCollectionKeyFunction(inputData);
				}));

				return inputData;
			},

			OLSKCollectionSort () {
				mod.ValueItemsAll(mod._ValueItemsAll.sort(params.OLSKCollectionSortFunction));
			},
		
		};
		
		return api;
	},

};

export default main;
