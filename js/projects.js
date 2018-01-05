const home = document.querySelector(".home-link");
const contact = document.querySelector(".contact-link");
const about = document.querySelector(".about-link");
const menuButton = document.querySelector(".menu-button");
const menu = document.querySelector(".menu")
const container = document.querySelector(".container")
// const bars = document.querySelector(".bars")

let showMenu = false;

menuButton.addEventListener("click", function() {

  menuButton.classList.add("menu-rotate")
  setTimeout( function() {
    menu.style.display = "block"
    showMenu = true
    menuButton.classList.remove("menu-rotate")
  }, 300 )

})

container.addEventListener("click", function() {
  if(showMenu){
    menu.style.display = "none"
    showMenu = false
  }
})

$(".item").on("click", function() {
    $(this).removeClass("hovering").children(":not(img)").slideDown(400)
})

$(".close").on("click", function(e) {
  e.stopPropagation() // stops the click event from bubbling up to the parent node
  $(this).hide().siblings(":not(img)").slideUp(400)
  setTimeout( () => { $(this).parent().addClass("hovering") }, 400 )
})
