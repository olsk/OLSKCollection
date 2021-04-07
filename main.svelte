<script>
export let OLSKCollectionItemAccessibilitySummaryFunction;

export let OLSKCollectionSortFunction;

export let OLSKCollectionChunkFunction = null;

export let _OLSKCollectionDispatchKey;

export let OLSKCollectionDispatchClick;
export let OLSKCollectionDispatchArrow = null;

export let OLSKCollectionItems = [];
export let OLSKCollectionItemsLocus = null;

export let OLSKCollectionEnableLooping = false;
export let OLSKCollectionIgnoreKeyboard = false;

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

const _OLSKCollectionItemsDidChange = function (inputData) {
	modPublic._OLSKCollectionDebugReassign(inputData);
};

$: {
	_OLSKCollectionItemsDidChange(OLSKCollectionItems)
};

const mod = {

	// VALUE

	_ValueStashItems: [],

	// INTERFACE

	InterfaceWindowDidKeydown(event) {
		if (!OLSKCollectionDispatchArrow) {
			return;
		}
		
		if (OLSKCollectionIgnoreKeyboard) {
			return;
		}
		
		if (!OLSKCollectionItems.length) {
			return;
		}

		const handlerFunctions = {
			ArrowUp () {
				(function() {
					if (!OLSKCollectionEnableLooping && OLSKCollectionItems[0] === OLSKCollectionItemsLocus) {
						return;
					}
					
					mod.ControlArrowIncrement(-1);
				})();

				return event.preventDefault();
			},
			ArrowDown () {
				(function() {
					if (!OLSKCollectionEnableLooping && (OLSKCollectionItems.slice(-1).pop() === OLSKCollectionItemsLocus)) {
						return;
					}

					mod.ControlArrowIncrement(1);
				})();
				
				return event.preventDefault();
			},
		};

		handlerFunctions[event.code] && handlerFunctions[event.code]();
	},

	InterfaceStashToggle (inputData) {
		mod._ValueStashItems = mod._ValueStashItems.includes(inputData) ? mod._ValueStashItems.filter(function (e) {
			return e !== inputData;
		}) : mod._ValueStashItems.concat(inputData);
	},

	// CONTROL

	ControlArrowIncrement (inputData) {
		OLSKCollectionDispatchArrow(OLSKCollectionItems[OLSKCollectionLogic.OLSKCollectionConstrainIndex(OLSKCollectionItems, OLSKCollectionItems.indexOf(OLSKCollectionItemsLocus) + inputData)]);
	},

};
</script>
<svelte:window on:keydown={ mod.InterfaceWindowDidKeydown } />

<div class="OLSKCollection">

<slot></slot>

{#each (mod._ValueItemsChunks || [undefined]) as key }

<div class="OLSKCollectionChunk">
	{#if key }
		<div class="OLSKCollectionChunkHeading OLSKStickyHeader">{ key }</div>
	{/if}

	<div class="OLSKCollectionChunkItems">
		{#each (key ? mod._ValueItemsChunked[key] : OLSKCollectionItems) as item }
			<div class="OLSKCollectionItem" class:OLSKCollectionItemStash={ mod._ValueStashItems.includes(item) } class:OLSKCollectionItemLocus={ item === OLSKCollectionItemsLocus } aria-label={ OLSKCollectionItemAccessibilitySummaryFunction(item) } role="button" on:click={ () => modPublic._OLSKCollectionStashEnabled ? mod.InterfaceStashToggle(item) : OLSKCollectionDispatchClick(item) }>
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
