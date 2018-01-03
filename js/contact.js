const menuButton = document.querySelector(".menu-button");
const menu = document.querySelector(".menu")
const container = document.querySelector(".container")
const projects = document.querySelector(".projects-link");
const about = document.querySelector(".about-link")
const arrowLeft = document.querySelector(".arrow-left")
const arrowRight = document.querySelector(".arrow-right")
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

about.addEventListener("click", function() {
  document.body.style.backgroundColor = "#58cee3"
  container.style.transform = "translateX(100vw)"
  setTimeout( () => window.location = "./about.html", 800 )
})
