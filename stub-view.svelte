<script>
const uAscending = function (a, b) {
  return (a < b) ? -1 : ((a > b) ? 1 : 0);
};

const mod = {

	// VALUE

	_ValueItems: [],

	_ValueItemSelected: null,

	_ValueTestAssignmentCount: Math.max(3, Math.round(Math.random() * 10)),

	// DATA

	DataItemValid (inputData = {}) {
		return Object.assign({
			XYZItemID: Math.random().toString(),
			XYZItemBlurb: Math.random().toString(),
			XYZItemDate: new Date(),
		}, inputData);
	},

	// INTERFACE

	InterfaceInsertButtonDidClick () {
		mod.ControlItemInsert();
	},

	InterfaceClearSelectionButtonDidClick () {
		mod._ValueItemSelected = null;
	},

	InterfaceFieldDidInput () {
		mod._OLSKCollection.modPublic.OLSKCollectionUpdate(Object.assign(mod._ValueItemSelected, {
			XYZItemBlurb: this.value,
			XYZItemDate: new Date(),
		}));
	},

	InterfaceArchiveButtonDidClick () {
		mod.ControlItemArchive(mod._ValueItemSelected);
	},

	InterfaceRemoveButtonDidClick () {
		mod.ControlItemRemove(mod._ValueItemSelected);
	},

	InterfaceSortButtonDidClick () {
		mod._OLSKCollection.modPublic.OLSKCollectionSort();
	},

	InterfaceChunkButtonDidClick () {
		mod._OLSKCollection.$$set({

			OLSKCollectionChunkFunction: (function (inputData) {
				return Object.fromEntries(Object.entries(inputData.reduce(function (coll, item) {
					const chunk = item.XYZItemBlurb[0].toUpperCase();
					return Object.assign(coll, {
						[chunk]: (coll[chunk] || []).concat(item),
					});
				}, {})).reverse());
			}),

		});
		mod._OLSKCollection.modPublic.OLSKCollectionSort();
	},

	InterfaceStashButtonDidClick () {
		mod._OLSKCollection.modPublic.OLSKCollectionStashEnabled(!mod._OLSKCollection.modPublic.OLSKCollectionStashEnabled());
	},

	InterfaceAssignmentButtonDidClick () {
		mod._ValueItems = Array.from(Array(mod._ValueTestAssignmentCount)).map(function () {
			return mod.DataItemValid();
		});
	},

	InterfaceLocusButtonDidClick () {
		mod._ValueItemSelected = mod._ValueItems[mod._ValueTestLocusIndex];
	},

	InterfaceToggleLoopingButtonDidClick () {
		mod._ValueLoopingEnabled = !mod._ValueLoopingEnabled;
	},

	// CONTROL

	ControlItemInsert () {
		mod.ControlItemActivate(mod._OLSKCollection.modPublic.OLSKCollectionInsert(mod.DataItemValid()));
	},

	ControlItemActivate (inputData) {
		mod._ValueItemSelected = inputData;
	},

	ControlItemArchive (inputData) {
		mod._OLSKCollection.modPublic.OLSKCollectionUpdate(Object.assign(inputData, {
			XYZItemIsArchived: true,
			XYZItemDate: new Date(),
		}));
	},

	ControlItemUnarchive (inputData) {
		delete inputData.XYZItemIsArchived;

		mod._OLSKCollection.modPublic.OLSKCollectionUpdate(Object.assign(inputData, {
			XYZItemDate: new Date(),
		}));
	},

	ControlItemRemove (inputData) {
		mod._OLSKCollection.modPublic.OLSKCollectionRemove(inputData);
	},

};

const inputData = Object.assign({

	OLSKCollectionItemAccessibilitySummaryFunction (inputData) {
		return inputData.XYZItemBlurb.split('\n').shift();
	},

	OLSKCollectionSortFunction (a, b) {
		if (a.XYZItemIsArchived !== b.XYZItemIsArchived) {
			return a.XYZItemIsArchived ? 1 : -1;
		}

		return uAscending(a.XYZItemBlurb, b.XYZItemBlurb);
	},

	_OLSKCollectionDispatchKey (inputData) {
		return inputData.XYZItemID;
	},

	OLSKCollectionDispatchClick (item) {
		mod.ControlItemActivate(item);

		window.TestOLSKCollectionDispatchClick.innerHTML = parseInt(window.TestOLSKCollectionDispatchClick.innerHTML) + 1;
		window.TestOLSKCollectionDispatchClickData.innerHTML = inputData.OLSKCollectionItemAccessibilitySummaryFunction(item);
	},

	OLSKCollectionDispatchArrow (item) {
		mod.ControlItemActivate(item);

		window.TestOLSKCollectionDispatchArrow.innerHTML = parseInt(window.TestOLSKCollectionDispatchArrow.innerHTML) + 1;
		window.TestOLSKCollectionDispatchArrowData.innerHTML = inputData.OLSKCollectionItemAccessibilitySummaryFunction(item);
	},

	OLSKCollectionDispatchStash (inputData) {
		window.TestOLSKCollectionDispatchStash.innerHTML = parseInt(window.TestOLSKCollectionDispatchStash.innerHTML) + 1;
		window.TestOLSKCollectionDispatchStashData.innerHTML = inputData.length;
	},

}, Object.fromEntries(Array.from((new window.URLSearchParams(window.location.search)).entries()).map(function (e) {
	if (e[0] === 'OLSKCollectionItems') {
		mod._ValueItems = JSON.parse(e[1]);

		return null;
	}

	if (e[0] === 'TestAssignmentCount') {
		mod._ValueTestAssignmentCount = parseInt(e[1]);

		return null;
	}

	if (e[0] === 'TestLocusIndex') {
		mod._ValueTestLocusIndex = parseInt(e[1]) - 1;

		return null;
	}

	return e;
}).filter(function (e) {
	return !!e;
})));

import OLSKCollection from './main.svelte';
</script>

<p>
	<button id="TestItemInsertButton" on:click={ mod.InterfaceInsertButtonDidClick }>TestItemInsertButton</button>
	<button id="TestItemClearSelectionButton" on:click={ mod.InterfaceClearSelectionButtonDidClick }>TestItemClearSelectionButton</button>
	<button id="TestSortButton" on:click={ mod.InterfaceSortButtonDidClick }>TestSortButton</button>
	<button id="TestChunkButton" on:click={ mod.InterfaceChunkButtonDidClick }>TestChunkButton</button>
	<button id="TestStashButton" on:click={ mod.InterfaceStashButtonDidClick }>TestStashButton</button>
	<button id="TestAssignmentButton" on:click={ mod.InterfaceAssignmentButtonDidClick }>TestAssignmentButton</button>
	<button id="TestLocusButton" on:click={ mod.InterfaceLocusButtonDidClick }>TestLocusButton</button>
	<button id="TestToggleLoopingButton" on:click={ mod.InterfaceToggleLoopingButtonDidClick }>TestToggleLoopingButton</button>
</p>

<OLSKCollection
	bind:this={ mod._OLSKCollection }

	OLSKCollectionItems={ mod._ValueItems }
	OLSKCollectionItemsLocus={ mod._ValueItemSelected }
	OLSKCollectionEnableLooping={ mod._ValueLoopingEnabled }
	
	{ ...inputData }

	let:OLSKCollectionItem
	>

	<!-- MASTER -->

	<div slot="OLSKCollectionItem" class="TestOLSKCollectionItem" class:TestOLSKCollectionItemArchived={ OLSKCollectionItem.XYZItemIsArchived }>{ OLSKCollectionItem.XYZItemBlurb }</div>	

	<div slot="OLSKCollectionEmpty" class="TestOLSKCollectionEmpty">TestOLSKCollectionEmpty</div>
</OLSKCollection>

{#if mod._ValueItemSelected }
	<p>
		<textarea id="TestItemField" on:input={ mod.InterfaceFieldDidInput }></textarea>
		<button id="TestItemArchiveButton" on:click={ mod.InterfaceArchiveButtonDidClick }>TestItemArchiveButton</button>
		<button id="TestItemRemoveButton" on:click={ mod.InterfaceRemoveButtonDidClick }>TestItemRemoveButton</button>
	</p>
{/if}

<style>
:root {
	font-size: var(--OLSKCommonFontSize);
}

.TestOLSKCollectionItemArchived {
	border-left: 3px grey solid;
	padding-left: 3px;
}

:global(.OLSKCollectionItemLocus) {
	background: blue;
}

:global(.OLSKCollectionItemStash .OLSKCollectionItemStashStatus) {
	background: blue;
}

:global(.OLSKCollectionItemStashStatus) {
	display: block;
	width: 24px;
	height: 24px;
	border: 1px solid black;
	border-radius: 8px;
}
</style>
