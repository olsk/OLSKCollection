<script>
export let OLSKCollectionItemAccessibilitySummaryFunction;

export let OLSKCollectionSortFunction;

export let OLSKCollectionChunkFunction = null;

export let _OLSKCollectionDispatchKey;

export let OLSKCollectionDispatchClick;
export let OLSKCollectionDispatchArrow = null;
export let OLSKCollectionDispatchStash = null;

export let OLSKCollectionItems = [];
export let OLSKCollectionItemsLocus = null;
export let OLSKCollectionItemClass = '';

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
		
		_OLSKCollectionItemsDidChange(OLSKCollectionItems);
	}),
}), {

	_OLSKCollectionStashItems: [],

	_OLSKCollectionStashEnabled: false,

	OLSKCollectionStashEnabled (inputData) {
		if (typeof inputData === 'undefined') {
			return modPublic._OLSKCollectionStashEnabled;
		}

		modPublic._OLSKCollectionStashItems = [];

		return modPublic._OLSKCollectionStashEnabled = inputData;
	},

	_OLSKCollectionStashToggle (inputData) {
		modPublic._OLSKCollectionStashItems = modPublic._OLSKCollectionStashItems.includes(inputData) ? modPublic._OLSKCollectionStashItems.filter(function (e) {
			return e !== inputData;
		}) : modPublic._OLSKCollectionStashItems.concat(inputData);

		OLSKCollectionDispatchStash && OLSKCollectionDispatchStash(modPublic._OLSKCollectionStashItems.slice());
	},

});

const _OLSKCollectionItemsDidChange = function (inputData) {
	modPublic._OLSKCollectionDebugReassign(inputData);

	if (!OLSKCollectionChunkFunction) {
		return;
	}

	mod._ValueItemsChunked = OLSKCollectionChunkFunction(OLSKCollectionItems);
	mod._ValueItemsChunks = Object.keys(mod._ValueItemsChunked);
};

$: {
	_OLSKCollectionItemsDidChange(OLSKCollectionItems)
};

const mod = {

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

	// CONTROL

	ControlArrowIncrement (inputData) {
		OLSKCollectionDispatchArrow(OLSKCollectionItems[OLSKCollectionLogic.OLSKCollectionConstrainIndex(OLSKCollectionItems, OLSKCollectionItems.indexOf(OLSKCollectionItemsLocus) + inputData)]);
	},

};

import OLSKUIAssets from 'OLSKUIAssets';
</script>
<svelte:window on:keydown={ mod.InterfaceWindowDidKeydown } />

<div class="OLSKCollection">

<slot></slot>

{#if !OLSKCollectionItems.length }
	<div class="OLSKCollectionEmpty" aria-hidden="true">
		<slot name="OLSKCollectionEmpty"></slot>
	</div>
{/if}

{#each (mod._ValueItemsChunks || [undefined]) as key }

<div class="OLSKCollectionChunk">
	{#if key }
		<div class="OLSKCollectionChunkHeading OLSKStickyHeader">{ key }</div>
	{/if}

	<div class="OLSKCollectionChunkItems">
		{#each (key ? mod._ValueItemsChunked[key] : OLSKCollectionItems) as item }
			<div class="OLSKCollectionItem { OLSKCollectionItemClass }" class:OLSKCollectionItemStash={ modPublic._OLSKCollectionStashItems.includes(item) } class:OLSKCollectionItemLocus={ item === OLSKCollectionItemsLocus } aria-label={ OLSKCollectionItemAccessibilitySummaryFunction(item) } role="button" on:click={ () => modPublic._OLSKCollectionStashEnabled ? modPublic._OLSKCollectionStashToggle(item) : OLSKCollectionDispatchClick(item) }>
				{#if modPublic._OLSKCollectionStashEnabled }
					<div class="OLSKCollectionItemStashStatus">
						<div class="OLSKCollectionItemStashStatusImage">{@html OLSKUIAssets._OLSKSharedStashSelected }</div>
					</div>
				{/if}
				<slot name="OLSKCollectionItem" OLSKCollectionItem={ item }></slot>
			</div>
		{/each}
	</div>
</div>

{/each}

</div>

<style>
.OLSKCollectionItem {
	cursor: pointer;

	display: flex;
	align-items: center;
}

.OLSKCollectionItemStashStatus {
	flex-shrink: 0;
}

.OLSKCollectionItemStashStatusImage:not(.OLSKCollectionItemStash .OLSKCollectionItemStashStatusImage) {
	display: none;
}
</style>
