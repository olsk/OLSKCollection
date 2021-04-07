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

			ValueItemsAll (inputData) {
				params.OLSKCollectionItems.splice(...[0, params.OLSKCollectionItems.length].concat(inputData));

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
				mod.ValueItemsAll([inputData].concat(params.OLSKCollectionItems));

				return inputData;
			},

			OLSKCollectionUpdate (inputData) {
				mod.ValueItemsAll(params.OLSKCollectionItems.map(function (e) {
					return params._OLSKCollectionKeyFunction(e) === params._OLSKCollectionKeyFunction(inputData) ? inputData : e;
				}));

				return inputData;
			},
			
			OLSKCollectionRemove (inputData) {
				mod.ValueItemsAll(params.OLSKCollectionItems.filter(function (e) {
					return params._OLSKCollectionKeyFunction(e) !== params._OLSKCollectionKeyFunction(inputData);
				}));

				return inputData;
			},

			OLSKCollectionSort () {
				mod.ValueItemsAll(params.OLSKCollectionItems.sort(params.OLSKCollectionSortFunction));
			},

			_OLSKCollectionDebugReassign (inputData) {
				params.OLSKCollectionItems = inputData;
			},
		
		};
		
		return api;
	},

	OLSKCollectionConstrainIndex (param1, param2) {
		if (!Array.isArray(param1)) {
			throw new Error('OLSKErrorInputNotValid');
		}

		if (typeof param2 !== 'number') {
			throw new Error('OLSKErrorInputNotValid');
		}

		if (param2 < 0) {
			return param1.length - 1;
		}

		if (param2 >= param1.length) {
			return 0;
		}

		return param2;
	},

};

export default main;
