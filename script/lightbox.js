let body = document.querySelector("body");
//images of the gallery
let pic = document.querySelectorAll(".pic");

let caption = document.getElementById("caption");
let index = document.getElementById("index");

//modal
let modal = document.getElementById("modal");
let modal_container = document.getElementById("modal-container");
let modal_img = document.getElementById("modal-img");

//slide buttons
let prev = document.getElementById("prev");
let next = document.getElementById("next");

let full = document.getElementById("full");

//close button
let close_btn = document.getElementById("close-btn");

//convert the nodelist "pic" to an array
var picArray = Array.from(pic);

//click event for every picture
for (n = 0; n < pic.length; n++) {
  pic[n].addEventListener("click", showModal);
}

function showModal(e) {
  modal.style.display = "grid";
  modal_img.src = e.target.src;
  caption.innerText = e.target.alt;

  //adding "active class" as event condition
  modal.classList.add("active");

  //zoom-in animation
  modal.style.animation = "fade-in 800ms";

  //reset fade-in animation
  restartAnimation();

  //hiding the scroll bar
  body.style.overflow = "hidden";

  //get the index of the array by clicking on it
  var indexCounter = picArray.indexOf(e.target);

  //shows index of image
  // let imgIndex = indexCounter + 1;
  index.innerHTML = indexCounter + 1 + " / " + pic.length;

  //setting modal img & text by its index of the gallery
  function refresh() {
    //modal picture = clicked picture of gallery
    modal_img.src = pic[indexCounter].src;

    //shows caption text when slide
    caption.innerText = pic[indexCounter].alt;

    //shows index of image
    let slideIndex = indexCounter + 1;
    index.innerHTML = slideIndex + " / " + pic.length;
  }

  //slide left
  function slideLeft() {
    //decrase index by 1
    indexCounter--;
    //set index to 0 if k < 0
    if (indexCounter < 0) {
      indexCounter = pic.length - 1;
    }
    refresh();
    restartAnimation();
  }

  //slide right
  function slideRight() {
    //increase index by 1
    indexCounter++;
    //set index to 0 if k > number of pictures
    if (indexCounter >= pic.length) {
      indexCounter = 0;
    }
    refresh();
    restartAnimation();
  }

  //previous & next button click event
  prev.addEventListener("click", slideLeft);
  next.addEventListener("click", slideRight);

  //arrow key navigation
  body.addEventListener("keydown", function (e) {
    if (e.key == "ArrowLeft") {
      slideLeft();
      restartAnimation();
    }
    if (e.key == "ArrowRight" || e.key == " ") {
      slideRight();
      restartAnimation();
    }
  });
}

//resetting the fade-in animation by removing & adding the class name
function restartAnimation() {
  modal_img.classList.remove("fade-in");
  caption.classList.remove("fade-in");
  //index.classList.remove('fade-in')

  void modal_img.offsetWidth;

  modal_img.classList.add("fade-in");
  caption.classList.add("fade-in");
  //index.classList.add('fade-in')
}

//Full Screen Mode
function fullScreenMode() {
  modal.requestFullscreen();
}

// Full Screen Toggle on Click
full.addEventListener("click", fullScreen);

function fullScreen() {
  full.classList.toggle("full-active");
  let isActive = full.classList.contains("full-active");

  if (isActive) {
    full.classList.remove("fa-expand");
    full.classList.add("fa-compress");

    modal.requestFullscreen();
  } else {
    full.classList.remove("fa-compress");
    full.classList.add("fa-expand");

    document.exitFullscreen();
  }
}

//change fullScreen-icon by "fullscreenchange" event
body.addEventListener("fullscreenchange", function () {
  if (document.fullscreen == true) {
    // Fullscreen Compress;
    full.classList.add("full-active");
    full.classList.remove("fa-expand");
    full.classList.add("fa-compress");

    restartAnimation();
  }
  if (document.fullscreen == false) {
    // Fullscreen Expand;
    full.classList.remove("full-active");
    full.classList.remove("fa-compress");
    full.classList.add("fa-expand");

    restartAnimation();
  }
});

//close modal
function closeModal() {
  modal.style.display = "none";
  body.style.overflow = "visible";
  modal.classList.remove("active");
}

function closeWindow() {
  //exit full screen mode
  if (document.fullscreen == true) {
    document.exitFullscreen();
  }

  //zoom-out animation
  modal.style.animation = "fade-out 800ms forwards";
  setTimeout(closeModal, 800);
}

//key events for enter/exit full screen
body.addEventListener("keydown", function (e) {
  //full screen by pressing "f"
  if (e.key === "f") {
    //pressing "f" is only possible when the modal is "active"
    if (modal.className == "active") {
      // Fullscreen Compress;
      full.classList.add("full-active");
      full.classList.remove("fa-expand");
      full.classList.add("fa-compress");

      modal.requestFullscreen();
    }
  }

  //close modal by pressing "ESC"
  if (e.key === "Escape") {
    if (modal.className == "active") {
      closeWindow();
    }
  }
});

//close button
close_btn.addEventListener("click", closeWindow);

//close modal when clicking outside of the image
modal.addEventListener("click", function (e) {
  if (
    e.target === modal
    // e.target != modal_img &&
    // e.target != next &&
    // e.target != prev &&
    // e.target != caption &&
    // e.target != close_btn &&
    // e.target != fullScreen_btn &&
    // e.target != fullScreen_icon
  ) {
    closeWindow();
  }
});

//--- Disable Right Click ---
// window.addEventListener(
//   "contextmenu",
//   function (e) {
//     e.preventDefault();
//   },
//   false
// );