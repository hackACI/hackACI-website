import { getCookie } from "./utils.js";

const formElement = document.querySelector(".search-form");
formElement.addEventListener("submit", function(event) {
  event.preventDefault();

  const query = document.getElementById("search-input").value;

  fetch(`/api/search/?q=${encodeURIComponent(query)}`, {
    method: "GET",
    headers: {
      'X-CSRFToken': getCookie("csrftoken")
    },
  })
  .then((response) => response.json())  // Simplified the return
  .then((data) => {
      if (data) {
        const mainContent = document.querySelector(".main-content");

        // Check if dynamic elements container already exists, if yes, clear it
        let dynamicElementsContainer = document.querySelector(".dynm-elements-container");
        if (!dynamicElementsContainer) {
          dynamicElementsContainer = document.createElement("div");
          dynamicElementsContainer.className = "dynm-elements-container";
          mainContent.appendChild(dynamicElementsContainer);
        } else {
          dynamicElementsContainer.innerHTML = "";  // Clear previous search results
        }
        const resultCount = data.length;

        const resultCountElement = document.createElement("p");
        resultCountElement.textContent = `${resultCount} result(s) for your search "${query}":`;
        if (resultCount === 0){
          resultCountElement.textContent = `There were no results for your search "${query}".`;
        }
        resultCountElement.className = "dymn-result-count";
        resultCountElement.style.color = "var(--real-white)";
        dynamicElementsContainer.appendChild(resultCountElement);
        // Iterate over the data and create dynamic elements
        data.forEach(dataObject => {
          const elementObject = { name: dataObject.title, desc: dataObject.description, url: dataObject.url };
          const outerElement = document.createElement("div");
          const titleElement = document.createElement("h3");
          titleElement.textContent = elementObject.name;
          const paraElement = document.createElement("p");
          paraElement.textContent = elementObject.desc;
          const anchorElement = document.createElement("a");
          anchorElement.href = elementObject.url;

          // Correct event names for hover effects
          anchorElement.addEventListener("mouseenter", () => {
            anchorElement.style.color = "var(--accent-bg)";
          });
          anchorElement.addEventListener("mouseleave", () => {
            anchorElement.style.color = "var(--real-white)";
          });
          anchorElement.style.color = "var(--real-white)";
          anchorElement.style.transition = "0.3s ease";

          outerElement.style.color = "aliceblue";

          // Append the title element to the anchor for link
          anchorElement.appendChild(titleElement);

          outerElement.appendChild(anchorElement);
          outerElement.appendChild(paraElement);
          dynamicElementsContainer.appendChild(outerElement);
        });
      }
    })
  .catch((err) => {
      console.error("FETCH, REQ:", err);
  });
});
