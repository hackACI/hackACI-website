// we must do for both list elements, 2 vars for now. maybe we can do a global for loop to get each header
// and from there we can enumerate the amount of divs to toggle for dynamic event handling
const currentEventListElements = document.querySelectorAll(".current-events-text ul");
const oldEventListElements = document.querySelectorAll(".old-events-text ul");

currentEventListElements.forEach((element) => {
  element.addEventListener("click", () => {
    const eventDesc = element.querySelector(".current-event-desc");
    eventDesc.classList.toggle("lactive");
  });
});

oldEventListElements.forEach((element) => {
  element.addEventListener("click", () => {
    const eventDesc = element.querySelector(".old-event-desc");
    eventDesc.classList.toggle("lactive");
  });
});
