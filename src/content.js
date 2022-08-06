let selectedSortOption = getUrlParameter("sort");

let alreadyRan = false;

async function main () {

  if (!location.pathname.endsWith("/videos")) return;
  await waitForPageToLoad();

  // Check if this channel page has the sort option. If it does, don't proceed with this extention.
  const sortExists = document.querySelector("yt-sort-filter-sub-menu-renderer");
  if (sortExists) return;

  if (alreadyRan) {
    selectedSortOption = null;
  }

  alreadyRan = true;

  if (selectedSortOption) {
    // YouTube gets rid of the sort parameter for artist channels. Why...
    // this line of code tries to add the parameter back.
    history.pushState(null, null, updateUrlParameter("sort", selectedSortOption));
  }

  const sortMenuEl = document.getElementById("sort-menu");

  const sortPopularButton = createButton("Popular", "p");
  const sortByNewestButton = createButton("Newest", "dd");
  const sortByOldest = createButton("Oldest", "da");

  sortMenuEl.innerHTML = "";

  sortMenuEl.append(sortPopularButton, sortByNewestButton, sortByOldest);

}

document.addEventListener('yt-navigate-start', main);

main();


function createButton(text, sort) {
  const button = document.createElement("a");
  button.classList.add("custom-sort-button")
  button.innerText = text;
  if (sort === selectedSortOption) {
    button.classList.add("selected");
  }
  if (!selectedSortOption && sort === "dd") {
    button.classList.add("selected");
  }
  button.href = updateUrlParameter("sort", sort);
  return button
}

function waitForPageToLoad() {
  return new Promise((resolve) => {
    const isLoaded = () => !!document.querySelector("ytd-channel-sub-menu-renderer");
    
    const interval = setInterval(() => {
      if (isLoaded()) {
        clearInterval(interval);
        resolve();
      }
    }, 1000);
  })
};


function updateUrlParameter(param, value) {
  // Remove all existing parameters.
  const newUrl = new URL(location.href.split("?")[0]);
  newUrl.searchParams.set(param, value);
  return newUrl.href;
}
function getUrlParameter(param) {
  const url = new URL(location.href);
  return url.searchParams.get(param);
}
