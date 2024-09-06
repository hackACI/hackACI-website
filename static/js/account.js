import { getCookie } from "./utils.js";

//create click elemtents for basic quick actoins buttons
//
//
//

async function makeRequest(url, options = {}){
  options.method = options.method || "GET";
  //add CSRF TOKEN
  let csrfToken = getCookie('csrftoken');
  options.headers = {
    ...options.headers, 
    'X-CSRFToken': csrfToken
  };

  try {
    const res = await fetch(url, options);
    console.log(res);
    if (res.ok) {
      return res.json(); 
    } else {
      throw new Error('Network response was not okay!');
    }
  } catch (err) {
    console.error("FETCH REQUEST ERROR:", err);
    return null;
  }
}

//create event for logout btn
const signOutButton = document.querySelector(".sign-out-btn");
signOutButton.addEventListener("click", async () => {
  const response = makeRequest("/api/logout/", {
    method: "POST",
    body: JSON.stringify({}),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  if (response){
    console.log("logout success!");
    const msgElement = document.createElement("p");
    msgElement.textContent = "✅ Logged out.";
    msgElement.style.color = "lightgreen";
    msgElement.style.margin = "1em";
    signOutButton.parentElement.insertBefore(msgElement, signOutButton);
    setTimeout(() => {
      window.location.reload();
    }, 1000)
  }else{
    console.error("Failed to log out.");
  }
});

//create event for deleting account btn
const deleteAccountBtn = document.querySelector(".delete-account-btn");
deleteAccountBtn.addEventListener("click", () => {
  // TODO, implement the backend for this button
  // const response = 
});

//field data get from api/me
function loadElement(element, message) {
  // Check if element is a NodeList (multiple elements selected by querySelectorAll)
  if (element instanceof NodeList) {
    element.forEach(el => {
      el.textContent = message;
    });
  } 
  // Check if it's a single element
  else if (element instanceof Element) {
    element.textContent = message;
  }
  return element;
}

async function fillFields(){
  const response = await makeRequest("/api/users/me/");
  const responseData = response.data;
  if (responseData){
    loadElement(document.querySelectorAll(".account-username"), responseData.username);
    if (responseData.first_name === ""){
      responseData.first_name = "None";
    }
    if (responseData.last_name === ""){
      responseData.last_name = "None";
    }
    loadElement(document.querySelectorAll(".account-first-name"), responseData.first_name);
    loadElement(document.querySelectorAll(".account-last-name"), responseData.last_name);
    loadElement(document.querySelectorAll(".account-email"), responseData.email);

    if (response.is_admin){
      document.querySelectorAll(".account-username").forEach((element) => {
        element.classList.add("admin-style");
      });
      const currentAdmin = document.createElement("a");
      currentAdmin.href = "/admin/"
      currentAdmin.classList.add("admin-style-a");
      currentAdmin.textContent = "(Admin)";
      currentAdmin.style.display = "inline";
      document.querySelector(".account-title h1").appendChild(currentAdmin);
    }
  }
}
fillFields();
