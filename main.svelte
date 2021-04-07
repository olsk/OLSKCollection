<script>
export let OLSKCollectionItemAccessibilitySummaryFunction;

export let OLSKCollectionSortFunction;

export let OLSKCollectionChunkFunction = null;

export let _OLSKCollectionDispatchKey;

export let OLSKCollectionDispatchClick;

export let OLSKCollectionItems = [];

import { OLSK_SPEC_UI } from  'OLSKSpec';

import OLSKCollectionLogic from  './logic.js';

export const modPublic = Object.assign(OLSKCollectionLogic.OLSKCollectionAPI({
	OLSKCollectionItems,

	_OLSKCollectionKeyFunction: _OLSKCollectionDispatchKey,
	OLSKCollectionSortFunction,

	OLSKCollectionDispatchChange: (function () {
		OLSKCollectionItems = OLSKCollectionItems;
		if (!OLSKCollectionChunkFunction) {
			return;
		}

		mod._ValueItemsChunked = OLSKCollectionChunkFunction(OLSKCollectionItems);
		mod._ValueItemsChunks = Object.keys(mod._ValueItemsChunked);
	}),
}), {

	_OLSKCollectionStashEnabled: false,

	OLSKCollectionStashEnabled (inputData) {
		if (typeof inputData === 'undefined') {
			return modPublic._OLSKCollectionStashEnabled;
		}

		mod._ValueStashItems = [];

		return modPublic._OLSKCollectionStashEnabled = inputData;
	},

});

const mod = {

	// VALUE

	_ValueStashItems: [],

	// INTERFACE

	InterfaceStashToggle (inputData) {
		mod._ValueStashItems = mod._ValueStashItems.includes(inputData) ? mod._ValueStashItems.filter(function (e) {
			return e !== inputData;
		}) : mod._ValueStashItems.concat(inputData);
	},

};
</script>

<div class="OLSKCollection">

<slot></slot>

{#each (mod._ValueItemsChunks || [undefined]) as key }

<div class="OLSKCollectionChunk">
	{#if key }
		<div class="OLSKCollectionChunkHeading OLSKStickyHeader">{ key }</div>
	{/if}

	<div class="OLSKCollectionChunkItems">
		{#each (key ? mod._ValueItemsChunked[key] : OLSKCollectionItems) as item }
			<div class="OLSKCollectionItem" class:OLSKCollectionItemStash={ mod._ValueStashItems.includes(item) } aria-label={ OLSKCollectionItemAccessibilitySummaryFunction(item) } role="button" on:click={ () => modPublic._OLSKCollectionStashEnabled ? mod.InterfaceStashToggle(item) : OLSKCollectionDispatchClick(item) }>
				{#if modPublic._OLSKCollectionStashEnabled }
					<div class="OLSKCollectionItemStashStatus"></div>
				{/if}
				<slot name="OLSKCollectionItem" OLSKCollectionItem={ item }></slot>
			</div>
		{/each}
	</div>
</div>

{/each}

</div>
