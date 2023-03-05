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

let fullScreen_btn = document.getElementById("fullScreen-btn");
let fullScreen_icon = document.getElementById("fullScreen-icon");

//close button
let close_btn = document.getElementById("close-btn");

//convert the nodelist "pic" to an array
var picArray = Array.from(pic);

//click event for every picture
for (n = 0; n < pic.length; n++) {
  pic[n].addEventListener("click", function (e) {
    modal.style.display = "grid";
    modal_img.src = e.target.src;
    caption.innerText = e.target.alt;

    //adding "active class" as event condition
    modal.classList.add("active");

    //zoom-in animation
    modal_container.style.animation = "zoom-in 800ms";
    
    //reset fade-in animation
    restartAnimation()

    //hiding the scroll bar
    body.style.overflow = "hidden";

    //get the index of the array by clicking on it
    var indexCounter = picArray.indexOf(e.target);

    //shows index of image
    let imgIndex = indexCounter + 1;
    index.innerHTML = imgIndex + " / " + pic.length;

    //starting index = index of the clicked image
    var k = indexCounter;

    //setting modal img & text by its index of the gallery
    function modalImage() {
      //modal picture = clicked picture of gallery
      modal_img.src = pic[k].src;

      //shows caption text when slide
      caption.innerText = pic[k].alt;

      //shows index of image
      let slideIndex = k + 1;
      index.innerHTML = slideIndex + " / " + pic.length;
    }

    //slide left
    function slideLeft(e) {
      //decrase index by 1
      k--;
      //set index to 0 if k < 0
      if (k < 0) {
        k = pic.length - 1;
      }
      modalImage();
      restartAnimation()
    }

    //slide right
    function slideRight(e) {
      //increase index by 1
      k++;
      //set index to 0 if k > number of pictures
      if (k >= pic.length) {
        k = 0;
      }
      modalImage();
      restartAnimation()
    }

    //previous & next button click event
    prev.addEventListener("click", slideLeft);
    next.addEventListener("click", slideRight);

    //arrow key navigation
    body.addEventListener("keydown", function (e) {
      if (e.key == "ArrowLeft") {
        slideLeft();
        restartAnimation()
      }
      if (e.key == "ArrowRight" || e.key == " ") {
        slideRight();
        restartAnimation()
      }
    });
  });
}

//resetting the fade-in animation by removing & adding the class name
function restartAnimation(){
  modal_img.classList.remove('fade-in')
  caption.classList.remove('fade-in')
  //index.classList.remove('fade-in')
  
  void modal_img.offsetWidth;
  
  modal_img.classList.add('fade-in')
  caption.classList.add('fade-in')
  //index.classList.add('fade-in')
}

//Full Screen Mode
function fullScreenMode() {
  modal.requestFullscreen();
}

//full screen on click event
fullScreen_btn.addEventListener("click", fullScreenClick);

function fullScreenClick() {
  //adds / removes class name of 'enter'
  fullScreen_btn.classList.toggle("fullScreen-active");
  //enter/exit full screen mode depending on the class name 'enter'
  if (fullScreen_btn.className == "fullScreen-active") {
    fullScreenMode();
  }
  if (fullScreen_btn.className == "") {
    document.exitFullscreen();
  }
}

//change fullScreen-icon by "fullscreenchange" event
body.addEventListener("fullscreenchange", function () {
  if (document.fullscreen == true) {
    fullScreen_icon.src = "https://i.postimg.cc/cJq9cjHs/exit.png";
    restartAnimation()
  }
  if (document.fullscreen == false) {
    fullScreen_btn.classList.remove("fullScreen-active");
    fullScreen_icon.src = "https://i.postimg.cc/52QKL1f7/enter.png";
    restartAnimation()
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

  //reset the fullScreen_btn
  if (fullScreen_btn.className == "fullScreen-active") {
    fullScreen_btn.classList.remove("fullScreen-active");
  }

  //zoom-out animation
  modal_container.style.animation = "zoom-out 800ms forwards";
  setTimeout(closeModal, 800);
}

//key events for enter/exit full screen
body.addEventListener("keydown", function (e) {
  //full screen by pressing "f"
  if (e.key === "f") {
    //pressing "f" is only possible when the modal is "active"
    if(modal.className == 'active'){
      //changes the fullscreen icon
      fullScreen_btn.className = "fullScreen-active";
      fullScreenMode();
    }
  }

  //close modal by pressing "ESC"
  if (e.key === "Escape") {
    closeWindow();
  }
 });

//close button
close_btn.addEventListener("click", closeWindow);

//close modal when clicking outside of the image
modal.addEventListener("click", function (e) {
  if (
    e.target === modal_container
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

//disable right click
window.addEventListener(
  "contextmenu",
  function (e) {
    e.preventDefault();
  },
  false
);