const cardParentElement = document.querySelector(".list-container ul");
const faqQuestionsElement = document.querySelector(".questions");

function createIntersectionCallback(className) {
  return function(entries, observer) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add(className);
        //unobserve target after classlist added to not waste mem
        observer.unobserve(entry.target);
      }
    });
  };
}

const observerForCards = new IntersectionObserver(createIntersectionCallback("visibleEffect"));
const observerForFaqs = new IntersectionObserver(createIntersectionCallback("slide-in"));
const observerForProfileCards = new IntersectionObserver(createIntersectionCallback("visibleEffect"));
// Observe each element in the list
Array.from(cardParentElement.children).forEach((element) => {
  observerForCards.observe(element);
});

// add elements to faq list
const faqElementArray = Array.from(faqQuestionsElement.children);
faqElementArray.forEach((element, index) => {
  if (index % 2 == 0){
    element.style.transform = "translateX(-100%)"; //slides in from left
  }else{
    element.style.transform = "translateX(100%)"; //slides in from right
  }
});


// Observe each element in the FAQ section
faqElementArray.forEach((element) => {
  observerForFaqs.observe(element);
});

//Observe all profile cards
const profileCardContainer = document.querySelector(".home-container");

Array.from(profileCardContainer.children).forEach((element) => {
  observerForProfileCards.observe(element);
});
