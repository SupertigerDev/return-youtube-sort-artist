const selectedSortOption = getUrlParamiter("sort");

async function main () {

  await waitForPageToLoad();
  const sortExists = document.querySelector("yt-sort-filter-sub-menu-renderer");

  if (sortExists) return;

  if (selectedSortOption) {
    // add to browser history
    history.pushState(null, null, updateUrlParameter("sort", selectedSortOption));
  }

  const sortMenuEl = document.getElementById("sort-menu");

  const sortPopularButton = createButton("Popular", "p");
  const sortByNewestButton = createButton("Newest", "dd");
  const sortByOldest = createButton("Oldest", "da");


  sortMenuEl.append(sortPopularButton, sortByNewestButton, sortByOldest);

}


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
  const newUrl = new URL(location.href);
  newUrl.searchParams.set(param, value);
  return newUrl.href;
}
function getUrlParamiter(param) {
  const url = new URL(location.href);
  return url.searchParams.get(param);
}

main();

