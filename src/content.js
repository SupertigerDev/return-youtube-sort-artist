let selectedSortOption = getUrlParameter("sort");

let alreadyRan = false;

async function main () {

  if (!location.pathname.endsWith("/videos")) return;
  await waitForPageToLoad();

  const chipsEl = document.querySelector(`yt-formatted-string[title="Popular"]`).parentElement.parentElement;

  const newChip = document.createElement("span");

  newChip.classList.add("sort-oldest")
  newChip.innerHTML = "Hello!"
  
  newChip.style.display = "inline-block";
  newChip.style.color = "white";
  newChip.style.background = "#272727";
  newChip.style.borderRadius = "8px";
  newChip.style.fontSize = "14px";
  newChip.style.padding = "8px";
  newChip.style.paddingLeft = "10px";
  newChip.style.paddingRight = "10px";
  newChip.style.marginLeft = "10px";
  newChip.style.cursor = "pointer";
  newChip.style.userSelect = "none";
  newChip.style.transition = "0.2s";

  
  
  chipsEl.append(newChip)
  const style = document.createElement("style")
  style.textContent = ".sort-oldest:hover { background: #3f3f3f !important; }"
  document.head.appendChild(style)
  

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
    const isLoaded = () => !!document.querySelector(".style-scope .ytd-feed-filter-chip-bar-renderer");
    
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
