const currentEventListElements = document.querySelectorAll(".current-events-text ul");

currentEventListElements.forEach((element) => {
  element.addEventListener("click", () => {
    const eventDesc = element.querySelector(".current-event-desc");
    eventDesc.classList.toggle("lactive");
  });
});
