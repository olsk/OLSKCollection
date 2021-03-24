<script>
export let OLSKCollectionItemAccessibilitySummaryFunction;

export let _OLSKCollectionArchiveField = null;

export let OLSKCollectionSortFunction;

export let OLSKCollectionGroupFunction = null;

export let _OLSKCollectionDispatchKey;

export let OLSKCollectionDispatchClick;

export let OLSKCollectionItems = [];

import { OLSK_SPEC_UI } from  'OLSKSpec';

export const modPublic = {

	// DATA

	_OLSKCollectionDataItemsAll () {
		return mod._ValueItemsAll.slice();
	},

	// CONTROL
	
	OLSKCollectionInsert (inputData) {
		mod.ValueItemsAll([inputData].concat(mod._ValueItemsAll));

		return inputData;
	},

	OLSKCollectionUpdate (inputData) {
		mod.ValueItemsAll(mod._ValueItemsAll.map(function (e) {
			return _OLSKCollectionDispatchKey(e) === _OLSKCollectionDispatchKey(inputData) ? inputData : e;
		}));

		return inputData;
	},
	
	OLSKCollectionRemove (inputData) {
		mod.ValueItemsAll(mod._ValueItemsAll.filter(function (e) {
			return _OLSKCollectionDispatchKey(e) !== _OLSKCollectionDispatchKey(inputData);
		}));
	},

	OLSKCollectionSort () {
		mod.ValueItemsAll(mod._ValueItemsAll.sort(OLSKCollectionSortFunction));
	},

};

const mod = {

	// VALUE

	_ValueArchiveIsVisible: false,

	_ValueItemsAll: OLSKCollectionItems,
	ValueItemsAll (inputData) {
		mod._ValueItemsAll = inputData.filter(function (e) {
			return !(!mod._ValueArchiveIsVisible && _OLSKCollectionArchiveField && e[_OLSKCollectionArchiveField]);
		});

		if (!OLSKCollectionGroupFunction) {
			return;
		}

		mod._ValueItemsGrouped = OLSKCollectionGroupFunction(mod._ValueItemsAll)
		mod._ValueItemsGroups = Object.keys(mod._ValueItemsGrouped);
	},

};
</script>

<div class="OLSKCollection">

<slot></slot>

{#each (mod._ValueItemsGroups || [undefined]) as key }

<div class="OLSKCollectionGroup">
	{#if key }
		<div class="OLSKCollectionGroupHeading OLSKStickyHeader">{ key }</div>
	{/if}

	<div class="OLSKCollectionGroupItems">
		{#each (key ? mod._ValueItemsGrouped[key] : mod._ValueItemsAll) as item }
			<div class="OLSKCollectionItem" aria-label={ OLSKCollectionItemAccessibilitySummaryFunction(item) } role="button" on:click={ () => OLSKCollectionDispatchClick(item) }>
				<slot name="OLSKCollectionItem" OLSKCollectionItem={ item }></slot>
			</div>
		{/each}
	</div>
</div>

{/each}

</div>
