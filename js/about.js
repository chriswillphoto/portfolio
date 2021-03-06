const home = document.querySelector(".home-link");
const contact = document.querySelector(".contact-link");
const projects = document.querySelector(".projects-link");
const menuButton = document.querySelector(".menu-button");
const menu = document.querySelector(".menu")
const container = document.querySelector(".container")

let showMenu = false;

menuButton.addEventListener("click", function() {

  menuButton.classList.add("menu-rotate")
  setTimeout( function() {  // menu extends after rotate animation
    menu.style.display = "block"
    menu.classList.add('menu-extend')
    showMenu = true
    menuButton.classList.remove("menu-rotate")
    setTimeout( () => menu.classList.remove("menu-extend"), 400 )
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

projects.addEventListener("click", function() {
  document.body.style.backgroundColor = "#d43256"
  container.style.transform = "translateX(-100vw)"
  setTimeout( () => window.location = "./projects.html", 800 )
})
