//create register dynamic

const formHTML = `
<div class="form-box">
    <h1>Register</h1>
    <form>
        <div class="input-group">
            <div class="input-field">
                <input type="text" name="first_name" placeholder="First Name" maxlength="75">
            </div>
            <div class="input-field">
                <input type="text" name="last_name" placeholder="Last Name" maxlength="75">
            </div>
            <div class="input-field">
                <input type="text" name="username" placeholder="Username" required maxlength="75">
            </div>
            <div class="input-field">
                <input type="email" name="email" placeholder="TDSB Email" required maxlength="75" class="password-input">
            </div>
            <div class="input-field">
                <input id="pass" type="password" name="password" placeholder="Password" minlength="8" maxlength="75" required>
            </div>
            <p>Check email after registering!</p>
            <hr>
            <div class="btn-field">
                <button class="regbut" type="submit">Register</button>
            </div>
            <a class="back-link"><< Back</a>
        </div>
    </form>
    <div class="popup" id="popup">
        <img src="/static/images/checkmark.png" width=80 height=80>
        <h2>Thank You!</h2>
        <p>You have successfully registered! Please check your email to verify your account!</p>
        <a href=".">
        <button type="button">OK, Take me to Login</button>
        </a>
    </div>
</div>`;

function openPopup(){
  document.querySelector("form").remove();
  const popupElement = document.querySelector(".popup");
  popupElement.style.display = "flex";
  popupElement.style.flexDirection = "column";
  popupElement.style.alignItems = "center";
  popupElement.style.justifyContent = "center";
  popupElement.style.color = "var(--real-white)";
  const button = popupElement.querySelector("button");
  button.classList.add("regbut");
  button.style.marginTop = "1em";
}

function onRegisterFormSubmit(formElement, url){
  formElement.addEventListener("submit", (event) => {
      event.preventDefault();

      const formData = new FormData(formElement);
      fetch(url, {
        method: 'POST',
        body: formData,
        headers: {
          'X-CSRFToken': getCookie("csrftoken")
        }
      })
      .then(response => response.json())
      .then(data => {
          if(data.id || data.username){
            console.log("Registeration success!");
            openPopup();
          }else{
            console.log("Failed login.", data.error);
            displayErrorMessage(document.querySelector(".input-group"), data.error);
          }
        })
      .catch(error => {
          console.error('Error', error);
      });
    formElement.reset();
  });
}

function displayErrorMessage(element, error){
  const redP = document.createElement("p");
  redP.className = "redP-dymn-p";
  if (document.querySelector(".redP-dymn-p")){
    document.querySelector(".redP-dymn-p").remove();
  }
  redP.style.color = "red";
  redP.textContent = error;
  element.appendChild(redP);
  return redP;
}

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

function onLoginFormSubmit(formElement, url){
  formElement.addEventListener("submit", (event) => {
      event.preventDefault();

      const formData = new FormData(formElement);
      fetch(url, {
        method: 'POST',
        body: formData,
        headers: {
          'X-CSRFToken': getCookie("csrftoken")
        }
      })
      .then(response => response.json())
      .then(data => {
          if(data.user){
            console.log(data.message);
            console.log(data);
            //redirect
            //window.location.href
          }else{
            console.log("Failed login.", data.error);
            if (data.error === "Invalid credentials"){
              displayErrorMessage(document.querySelector(".input-group"), data.error + "! Check the username/password again!");
            }else{
              displayErrorMessage(document.querySelector(".input-group"), data.error);
            }
          }
        })
      .catch(error => {
          console.error('Error', error);
      });
    formElement.reset();
  });
}
onLoginFormSubmit(document.querySelector(".form-box").querySelector("form"), '/api/login/');


let savedOuterHTML = null;
const registerBtnCallback = () => {
  const formBox = document.querySelector(".form-box");
  //save the HTML first
  savedOuterHTML = formBox.outerHTML;
  //then change the HTML
  formBox.outerHTML = formHTML;

  reloadPageCallbacks(true);
  const currentForm = document.querySelector("form");
  onRegisterFormSubmit(currentForm, "/api/register/")
  const backBtn = document.querySelector(".back-link");
  backBtn.addEventListener("click", () => {
      const formBox = document.querySelector(".form-box");
      if (savedOuterHTML) {
          //save first
          formBox.outerHTML = savedOuterHTML;
          reloadPageCallbacks(false, true);
          onLoginFormSubmit(document.querySelector(".form-box").querySelector("form"), '/api/login/');
      }
  });

}


const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

function verifyTDSBEmail(email) {
  const normalizedEmail = email.toLowerCase();
  return emailRegex.test(email) && normalizedEmail.includes("tdsb");
}
const emailVerifyCallback = (element) => {
  const isValid = verifyTDSBEmail(element.value);
  if (!document.querySelector(".dynm-validity-p")){
    const newNode = document.createElement("p");
    newNode.className = "dynm-validity-p";
    document.querySelector(".input-group").insertBefore(newNode,element.parentElement);
  }
  const checkingNode = document.querySelector(".dynm-validity-p");
  if(isValid){
    checkingNode.textContent = "Valid Email ✅"
  }else{
    checkingNode.textContent = "Invalid Email ❌"
  }
};

function emailBtnLoadCallbacks(){
  const emailElements = document.getElementsByName("email");
  const mainEmailElement = emailElements[0];
  if(document.querySelector(".dynm-validity-p")){
    document.querySelector(".dynm-validity-p").remove();
  }
  mainEmailElement.addEventListener("input", () => {
    emailVerifyCallback(mainEmailElement);
  });
}

function registerBtnLoadCallbacks(){
  const registerBtn = document.querySelector(".register-link");
  registerBtn.addEventListener("click", registerBtnCallback);
}

function reloadPageCallbacks(onlyEmail=false,onlyRegister=false){
  if (onlyEmail){
    emailBtnLoadCallbacks();
  }else if(onlyRegister){
    registerBtnLoadCallbacks();
  }else{
    emailBtnLoadCallbacks();
    registerBtnLoadCallbacks();
  }

}
reloadPageCallbacks(false, true);


window.addEventListener('load', () => {
  // Select all forms on the page
  const forms = document.querySelectorAll('form');
  
  //reset all forms
  forms.forEach(form => {
      form.reset();
  });
});

function isFormFilled(form) {
  const inputs = form.querySelectorAll('input, select, textarea');
  for (let input of inputs) {
    if (input.type !== 'submit' && input.type !== 'button' && input.value.trim() !== '') {
      return true; // Form has data
    }
  }
  return false; // Form is empty
}

function checkForms() {
  const forms = document.querySelectorAll('form');
  for (let form of forms) {
    if (isFormFilled(form)) {
      return true;
    } 
  }
  return false;
}
//checks if form has data, and prevents default leave on tab if so
const beforeUnloadCallback = (e) => {
  if(checkForms()){
    e.preventDefault();
    e.returnValue = ''; // This is necessary for the confirmation dialog to appear in some browsers
  }
}
window.addEventListener("beforeunload", beforeUnloadCallback);

document.addEventListener('submit', function(event) {
  //this is to remove any stopping on form submits.
  window.removeEventListener("beforeunload", beforeUnloadCallback);
});

