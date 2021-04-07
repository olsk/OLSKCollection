<script>
const uAscending = function (a, b) {
  return (a < b) ? -1 : ((a > b) ? 1 : 0);
};

const mod = {

	// VALUE

	_ValueItemSelected: null,

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

	InterfaceGroupButtonDidClick () {
		mod._OLSKCollection.$$set({

			OLSKCollectionChunkFunction: (function (inputData) {
				return Object.fromEntries(Object.entries(inputData.reduce(function (coll, item) {
					const group = item.XYZItemBlurb[0].toUpperCase();
					return Object.assign(coll, {
						[group]: (coll[group] || []).concat(item),
					});
				}, {})).reverse());
			}),

		})
		mod._OLSKCollection.modPublic.OLSKCollectionSort();
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

}, Object.fromEntries(Array.from((new window.URLSearchParams(window.location.search)).entries()).map(function (e) {
	if (e[0] === 'OLSKCollectionItems') {
		e[1] = JSON.parse(e[1]);
	}

	return e;
})));

import OLSKCollection from './main.svelte';
</script>

<OLSKCollection
	bind:this={ mod._OLSKCollection }
	
	{ ...inputData }

	let:OLSKCollectionItem
	>

	<!-- MASTER -->

	<div slot="OLSKCollectionItem" class="TestOLSKCollectionItem" class:TestOLSKCollectionItemArchived={ OLSKCollectionItem.XYZItemIsArchived } >{ OLSKCollectionItem.XYZItemBlurb }</div>	
</OLSKCollection>

<p>
	<button id="TestItemInsertButton" on:click={ mod.InterfaceInsertButtonDidClick }>TestItemInsertButton</button>
	<button id="TestSortButton" on:click={ mod.InterfaceSortButtonDidClick }>TestSortButton</button>
	<button id="TestGroupButton" on:click={ mod.InterfaceGroupButtonDidClick }>TestGroupButton</button>
</p>

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
</style>
