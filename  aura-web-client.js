/* Global variables **********************************************************/

// URL up to /aura/ of current server
serverURL = "";
// AURA server information document for current server
serverInfo = {};
// Known resource objects keyed by '<type>-<id>'
resourceObjects = {};
// Used to make unique item IDs
counter = 0;
// Map item IDs to keys in resourceObjects
itemMap = {};
// List of items in order they were selected
selected = [];
// List of items in the order they should be played
queue = [];
// ID of currently playing item
playingItem = "";


/* Helper functions **********************************************************/

function removeAllChildNodes(parentNode) {
    while (parentNode.firstChild) {
        parentNode.removeChild(parentNode.firstChild);
    }
}


function removeFirstFromArray(value, array) {
	for (let i = 0; i < array.length; i++) {
		if (array[i] === value) {
			array.splice(i, 1);
			break;
		}
	}
	return array;
}


function resourceURL(resObj) {
	return new URL(serverURL + resObj.type + "s/" + resObj.id);
}


/* Return a Promise to an array of item IDs for tracks that are selected
	either directly or throught their parent album/artist being selected.*/
async function getSelectedTracks() {
	// Item IDs of selected tracks
	var st = [];
	for (let itemId of selected) {
		let resObj = resourceObjects[itemMap[itemId]];
		if (resObj.type === "track") {
			st.push(itemId);
		} else {
			
			let url = resourceURL(resObj);
			url.searchParams.append("include", "tracks");
			await getAuraDoc(url)
			.then(function(doc) {
				// Append array of new item IDs to st */
				Array.prototype.push.apply(st, newItems(doc.included));
			})
			.catch(function(error) {
				alert(error);
			});
		}
	}
	return Promise.resolve(st);
}


/* HTTP stuff ****************************************************************/

/* Make request to url and return a promise to the document */
function getAuraDoc(url) {
	return fetch(url)
	.then(function(response) {
		let mimetype = response.headers.get("Content-Type");
		let goodMimetype = mimetype === "application/vnd.api+json";
		if (response.status === 200 && goodMimetype) {
			return response.json();
		} else {
			throw new Error(`Bad response from ${url}`);
		}
	});
}


/* Item stuff ****************************************************************/

/* Add resource objects to resourceObjects and make new associated items */
function newItems(data) {
	newIds = [];
	for (let resObj of data) {
		let resObjKey = resObj.type + "-" + resObj.id;
		resourceObjects[resObjKey] = resObj;
		let itemId = "item-" + counter++;
		itemMap[itemId] = resObjKey;
		newIds.push(itemId);
	}
	return newIds;
}


function copyItem(itemId) {
	var newId = "item-" + counter++;
	itemMap[newId] = itemMap[itemId];
	return newId;
}

/* Make and return a new item element */
function itemElement(itemId) {
	var item = document.createElement("div");
	item.setAttribute("id", itemId);
	item.classList.add("item");

	var checkboxContainer = document.createElement("div");
	checkboxContainer.classList.add("item-checkbox-container");
	item.append(checkboxContainer);

	var checkbox = document.createElement("input");
	checkbox.setAttribute("type", "checkbox");
	checkbox.setAttribute("name", itemId);
	checkbox.classList.add("item-checkbox");
	checkbox.addEventListener("change", function() {
		if (this.checked) {
			selected.push(itemId);
		} else {
			selected = removeFirstFromArray(itemId, selected);
		}
	});
	checkboxContainer.append(checkbox);

	var itemSummary = document.createElement("div");
	itemSummary.classList.add("item-summary");
	item.append(itemSummary);

	var linkToDetail = document.createElement("button");
	linkToDetail.classList.add("link-to-detail");
	linkToDetail.addEventListener("click", function() {
		displayDetail(itemId);
		location.hash = "#detail";
	});
	itemSummary.append(linkToDetail);

	itemSummary.append(document.createElement("br"));

	var resObj = resourceObjects[itemMap[itemId]];
	switch (resObj.type) {
		case "track":
			linkToDetail.append(resObj.attributes.title);
			itemSummary.append(
				resObj.attributes.artist + " - " + resObj.attributes.album
			);
			break;
		case "album":
			linkToDetail.append(resObj.attributes.title);
			itemSummary.append(resObj.attributes.artist);
			break;
		case "artist":
			linkToDetail.append(resObj.attributes.name);
			break;
	}

	return item;
}


/* Display of information ****************************************************/

/* Display detailed information about an item */
function displayDetail(itemId) {
	// Clean up from previous item
	var itemImage = document.getElementById("item-image");
	itemImage.src = "";
	var itemAttributes = document.getElementById("item-attributes");
	removeAllChildNodes(itemAttributes);
	var relatedArtists = document.getElementById("related-artists");
	removeAllChildNodes(relatedArtists);
	var relatedAlbums = document.getElementById("related-albums");
	removeAllChildNodes(relatedAlbums);
	var relatedTracks = document.getElementById("related-tracks");
	removeAllChildNodes(relatedTracks);

	resObj = resourceObjects[itemMap[itemId]];

	// Fill in table of attributes
	for (let attribute in resObj.attributes) {
		let row = document.createElement("tr");
		itemAttributes.append(row);
		let attributeName = document.createElement("td");
		attributeName.append(attribute);
		let attributeValue = document.createElement("td");
		attributeValue.append(resObj.attributes[attribute]);
		row.append(attributeName, attributeValue);
	}

	// Get and display related resources
	var url = resourceURL(resObj);
	var toInclude = Object.keys(resObj.relationships).join(",");
	url.searchParams.append("include", toInclude);
	getAuraDoc(url)
	.then(function(doc) {
		for (let itemId of newItems(doc.included)) {
			let relObj = resourceObjects[itemMap[itemId]];
			let el = itemElement(itemId);
			switch (relObj.type) {
				case "artist":
					relatedArtists.append(el);
					break;
				case "album":
					relatedAlbums.append(el);
					break;
				case "track":
					relatedTracks.append(el);
					break;
				case "image":
					let attrs = relObj.attributes;
					if ("role" in attrs && attrs.role === "cover") {
						let img = serverURL + "images/" + relObj.id + "/file";
						itemImage.src = img;
					}
					break;
			}
		}
	})
	.catch(function(error) {
		alert(error);
	});
}


/* Display resource objects in doc.data in #results-list */
function displayResults(doc) {
	var resultsList = document.getElementById("results-list");
	// Deselect all items in results list
	for (let listItem of resultsList.childNodes) {
		selected = removeFirstFromArray(listItem.id, selected);
	}
	removeAllChildNodes(resultsList);

	// Add item elements to resultsList
	for (let itemId of newItems(doc.data)) {
		resultsList.append(itemElement(itemId));
	}

	// Update link to next page of results
	try {
		document.getElementById("next-page-link").remove();
	} catch(error) {}
	if ("links" in doc && "next" in doc.links) {
		let nextPageLink = document.createElement("button");
		nextPageLink.setAttribute("id", "next-page-link");
		nextPageLink.append("Next Page");
		nextPageLink.addEventListener("click", function() {
			getAndDisplayResults(doc.links.next)
		});
		document.getElementById("results").append(nextPageLink);
	}

	// Go to top of results
	document.getElementById("results").scrollTop = 0;
	location.hash = "#results";
}


/* Get the AURA document at url and display the results, or show an error */
function getAndDisplayResults(url) {
	getAuraDoc(url)
	.then(function(doc) {
		displayResults(doc);
	})
	.catch(function(error) {
		alert(error);
	});
}


/* User initiated functions **************************************************/

/* Construct a URL from the form and pass it to getAndDisplayResults() */
function buildAndMakeRequest() {
	var requestBuilder = document.getElementById("request-builder-form");
	var data = new FormData(requestBuilder);
	var formServerURL = data.get("server-url");
	var collection = data.get("collection");

	// Get server information if it is not already saved
	if (formServerURL !== serverURL) {
		serverURL = formServerURL;
		getAuraDoc(serverURL + "server")
		.then(function(doc) {
			serverInfo = doc;
			// This is a bit hacky
			buildAndMakeRequest();
		})
		.catch(function(error) {
			alert(serverURL + "server : " + error);
			serverURL = "";
			serverInfo = {};
		});
		return;
	}

	// Check that the server supports the collection the user has requested
	var serverAttributes = serverInfo.data.attributes;
	if (collection !== "tracks") {
		if (!(("features" in serverAttributes)
			&& serverAttributes.features.includes(collection)))
		{
			alert(`The AURA server does support the ${collection} feature`);
			return;
		}
	}

	var url = new URL(formServerURL + collection);

	// Each line in textarea is of the form 'key=value'
	for (let line of data.get("filters").split("\n")) {
		if (line === "") {
			continue;
		}
		lineArray = line.split("=");
		if (lineArray.length < 1) {
			continue;
		}
		let key = lineArray[0];
		let value = lineArray.slice(1).join("");
		url.searchParams.append(`filter[${key}]`, value);
	}

	var sort = data.get("sort-string");
	if (sort !== "") {
		url.searchParams.append("sort", sort);
	}

	getAndDisplayResults(url);
}


/* Uncheck all checkboxes and remove items from selected */
function clearSelection() {
	selected = [];
	for (let checkbox of document.getElementsByClassName("item-checkbox")) {
		checkbox.checked = false;
	}
	for (let checkbox of document.getElementsByClassName("select-all")) {
		checkbox.checked = false;
	}
}


function toggleListSelection(listId) {
	var list = document.getElementById(listId);
	var selectAll = document.getElementById("select-" + listId);
	for (let item of list.children) {
		let itemCheckbox = item.firstChild.firstChild;
		if (itemCheckbox.checked !== selectAll.checked) {
			itemCheckbox.checked = selectAll.checked;
			if (selectAll.checked) {
				selected.push(item.id);
			} else {
				selected = removeFirstFromArray(item.id, selected);
			}
		}
	}
}


/* Prepend selected items to the queue */
async function prependToQueue() {
	var queueList = document.getElementById("queue-list");
	await getSelectedTracks()
	.then(function(trackIds) {
		// Reverse so order of selection is maintained
		for (let itemId of trackIds.reverse()) {
			let newId = copyItem(itemId);
			queue.unshift(newId);
			queueList.prepend(itemElement(newId));
		}
	});
	return Promise.resolve("done");
}


/* Append selected items to the queue */
async function appendToQueue() {
	var queueList = document.getElementById("queue-list");
	await getSelectedTracks()
	.then(function(trackIds) {
		for (let itemId of trackIds) {
			let newId = copyItem(itemId);
			queue.push(newId);
			queueList.append(itemElement(newId));
		}
	});
	return Promise.resolve("done");
}


/* Remove any selected queued items from the queue */
function removeFromQueue() {
	var queuedItems = document.getElementById("queue-list").children;
	var itemsToRemove = [];
	for (let item of queuedItems) {
		if (selected.includes(item.id)) {
			selected = removeFirstFromArray(item.id, selected);
			queue = removeFirstFromArray(item.id, queue);
			itemsToRemove.push(item);
		}
	}
	for (let item of itemsToRemove) {
		item.remove();
	}
}


/* Play the track at the top of the queue */
function playNext() {
	if (queue.length === 0) {
		return;
	}
	// Remove currently playing item
	try {
		selected = removeFirstFromArray(playing, selected);
		document.getElementById(playing).remove();
	} catch(error) {}

	var itemId = queue[0];
	// Remove item from queue
	queue.splice(0, 1);
	// Store ID of item that will be played
	playing = itemId;

	// Move listItem from #queue-list to #player
	var listItem = document.getElementById(itemId);
	document.getElementById("player").prepend(listItem);

	// Build AURA URL
	var serverURL = document.getElementById("server-url").value;
	var resObj = resourceObjects[itemMap[itemId]];
	var audioSrc = serverURL + "tracks/" + resObj.id + "/audio";
	document.getElementById("player-audio").setAttribute("src", audioSrc);
}


/* Prepend selected items to queue, then play first track in queue */
function playSelected() {
	prependToQueue()
	.then(function(x) {
		playNext();
	});
}
