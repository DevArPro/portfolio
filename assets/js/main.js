const navMenu = document.getElementById("nav-menu"),
  toggleMenu = document.getElementById("nav-toggle"),
  body = document.getElementById("body"),
  links = document.querySelector(".nav-link"),
  buttonUp = document.getElementById("bouton-page-up");

/*
toggleMenu.addEventListener("click", () => {
  navMenu.classList.toggle("show");
  body.classList.toggle("hidden");
});*/

/*Menu Responsive Mobile*/
function menuMobile() {
  var x = document.getElementById("nav-menu");
  if (x.className === "nav") {
    x.className += " responsive";
  } else {
    x.className = "nav";
  }
}
function linkMenuMobile() {
  var x = document.getElementById("nav-menu");
  if (x.className === "responsive") {
    x.className = "none";
  } else {
    x.className = "nav";
  }
}

/*Sticky Header et boutonUp*/
window.addEventListener("scroll", function () {
  const header = document.querySelector("header");
  header.classList.toggle("sticky", window.scrollY > 0);
  header.classList.toggle("light", window.scrollY > 0);
  buttonUp.classList.toggle("block", window.scrollY > 0);
});

/*Formspree Formulaire*/
var form = document.getElementById("form");

async function handleSubmit(event) {
  event.preventDefault();
  var status = document.getElementById("status");
  var data = new FormData(event.target);
  fetch(event.target.action, {
    method: form.method,
    body: data,
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        status.innerHTML = "Merci ! Votre message a bien été envoyé";
        status.classList.toggle("success");
        form.reset();
      } else {
        response.json().then((data) => {
          if (Object.hasOwn(data, "errors")) {
            status.innerHTML = data["errors"]
              .map((error) => error["user_message"])
              .join(", ");
          } else {
            status.innerHTML =
              "Oops! Il y a eu un problème lors de l'envoi du formulaire";
            status.classList.toggle("error");
          }
        });
      }
    })
    .catch((error) => {
      status.innerHTML =
        "Oops! Il y a eu un problème lors de l'envoi du formulaire";
      status.classList.toggle("success");
    });
}
form.addEventListener("submit", handleSubmit);
