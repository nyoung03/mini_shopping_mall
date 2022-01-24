// Fetch the item_list from the JSON file
function loadItems() {
  return fetch("data/data.json")
    .then((response) => response.json())
    .then((json) => json.item_list);
}

// Update the list with the given item_list
function displayItem(item_list) {
  const container = document.querySelector(".item_list");
  container.innerHTML = item_list
    .map((item) => createHTMLString(item))
    .join("");
}

// Create HTML list from the given data item
function createHTMLString(item) {
  return `
		<li class="item">
			<img src="${item.img}" alt="${item.type}" />
			<p>${item.color}, ${item.type}</p>
		</li>
	`;
}

// Handle button click
function onButtonClick(event, item_list) {
  const dataset = event.target.dataset;
  const key = dataset.key;
  const value = dataset.value;

  if (key == null || value == null) {
    return;
  }

  displayItem(
    item_list.filter(function (item) {
      return item[key] === value;
    })
  );
}

function setEventListeners(item_list) {
  const logo = document.querySelector(".logo");
  const item_btn = document.querySelector(".item_btn");
  logo.addEventListener("click", () => displayItem(item_list));
  item_btn.addEventListener("click", (event) =>
    onButtonClick(event, item_list)
  );
}

loadItems()
  .then((item_list) => {
    console.log(item_list);
    displayItem(item_list);
    setEventListeners(item_list);
  })
  .catch(console.log);
