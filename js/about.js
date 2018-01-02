const home = document.querySelector(".home-link");
const contact = document.querySelector(".contact-link");
const projects = document.querySelector(".projects-link");
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

contact.addEventListener("click", function() {
  document.body.style.backgroundColor = "#1f68bf"
  container.style.transform = "translateX(-100vw)"
  setTimeout( () => window.location = "./contact.html", 800 )
})
