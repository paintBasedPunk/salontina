// Mobile Navbar Menu
let mobile_nav = document.getElementById("mobile-nav");
let menu_btn = document.getElementById("menu-toggle");
let mobile_menu = document.getElementById("mobile-menu");

menu_btn.addEventListener("click", openMenu);

mobile_nav.style.transition = "transform 400ms ease-in-out";
mobile_nav.style.transformOrigin = "right";

function openMenu() {
  menu_btn.classList.toggle("active");

  if (menu_btn.className == "active") {
    stretchMenu();
  } else {
    shrinkMenu();
  }
}

// menu animations
function stretchMenu() {
  //strech menu
  mobile_nav.style.transform = "scale(1,1)";
  //show list items
  mobile_menu.style.opacity = "1";
  mobile_menu.style.transition = "opacity 400ms ease-in-out 400ms";
}

function shrinkMenu() {
  //shrink menu
  mobile_nav.style.transform = "scale(0,1)";
  //hide list items
  mobile_menu.style.opacity = "0";
  mobile_menu.style.transition = "opacity 200ms ease-in-out";
}


// close menu with a delay when item in is clicked
let mobile_items = document.getElementsByClassName("mobile-item")

for(n = 0; n < mobile_items.length; n++){
  mobile_items[n].addEventListener("click", function () {
    setTimeout(shrinkMenuDelay, 400);
  });
}

function shrinkMenuDelay() {
  let checkbox = document.getElementById("menu-toggle");

  // shrink menu
  mobile_nav.style.transform = "scale(0,1)";
  // hide list items
  mobile_menu.style.opacity = "0";
  mobile_menu.style.transition = "opacity 200ms ease-in-out";

  // reset class and animation of the hamburger menu
  checkbox.checked = false;
  menu_btn.classList.remove("active");
}

// responsive navbar scrolling
let navbarHeight = navbar.offsetHeight;
let windowHeight = window.innerHeight;

window.addEventListener("scroll", onScroll);

function onScroll() {
  if (window.pageYOffset >= windowHeight - navbarHeight) {
    navbar.style.position = "fixed";
    navbar.style.top = 0 + "px";
  } else {
    navbar.style.position = "absolute";
    navbar.style.top = windowHeight - navbarHeight + "px";
  }
}

// smooth scrolling
let down_btn = document.getElementById("down");
//let up_btn = document.getElementById("up");

down_btn.addEventListener("click", scrollMove);
//up_btn.addEventListener("click", scrollMove);

function scrollMove(e) {
  var n;

  if (e.target.id == "down") {
    n = windowHeight;
  }
  if (e.target.id == "up") {
    n = 0;
  }

  scroll({ top: n, behaviour: "smooth" });
}
