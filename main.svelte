<script>
export let OLSKCollectionItemAccessibilitySummaryFunction;

export let OLSKCollectionSortFunction;

export let OLSKCollectionChunkFunction = null;

export let _OLSKCollectionDispatchKey;

export let OLSKCollectionDispatchClick;

export let OLSKCollectionItems = [];

import { OLSK_SPEC_UI } from  'OLSKSpec';

import OLSKCollectionLogic from  './logic.js';

export const modPublic = OLSKCollectionLogic.OLSKCollectionAPI({
	OLSKCollectionItems,

	_OLSKCollectionKeyFunction: _OLSKCollectionDispatchKey,
	OLSKCollectionSortFunction,

	OLSKCollectionDispatchChange: (function () {
		mod._ValueItems = mod._ValueItems; // #purge-svelte-force-update
		
		if (!OLSKCollectionChunkFunction) {
			return;
		}

		mod._ValueItemsGrouped = OLSKCollectionChunkFunction(mod._ValueItems);
		mod._ValueItemsGroups = Object.keys(mod._ValueItemsGrouped);
	}),
});

const mod = {
	_ValueItems: OLSKCollectionItems,
};
</script>

<div class="OLSKCollection">

<slot></slot>

{#each (mod._ValueItemsGroups || [undefined]) as key }

<div class="OLSKCollectionChunk">
	{#if key }
		<div class="OLSKCollectionChunkHeading OLSKStickyHeader">{ key }</div>
	{/if}

	<div class="OLSKCollectionChunkItems">
		{#each (key ? mod._ValueItemsGrouped[key] : mod._ValueItems) as item }
			<div class="OLSKCollectionItem" aria-label={ OLSKCollectionItemAccessibilitySummaryFunction(item) } role="button" on:click={ () => OLSKCollectionDispatchClick(item) }>
				<slot name="OLSKCollectionItem" OLSKCollectionItem={ item }></slot>
			</div>
		{/each}
	</div>
</div>

{/each}

</div>
