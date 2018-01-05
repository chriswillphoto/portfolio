const menuButton = document.querySelector(".menu-button");
const menu = document.querySelector(".menu")
const container = document.querySelector(".container")
const projects = document.querySelector(".projects-link");
const about = document.querySelector(".about-link")
const smiley = document.querySelector(".smiley")
const profile = document.querySelector(".profile")
let showMenu = false;
let sliderposition = "center"

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

projects.addEventListener("click", function() {
  document.body.style.backgroundColor = "#d43256"
  container.style.transform = "translateX(-100vw)"
  setTimeout( () => window.location = "./projects.html", 800)
})

smiley.addEventListener("click", function() {
  profile.style.opacity = 0
  setTimeout(function() {
    profile.style.backgroundPosition = sliderposition
    profile.style.opacity = 1
    switch(sliderposition){
      case "center":
        sliderposition = "right"
        break;
      case "right":
        sliderposition = "left"
        break;
      case "left":
        sliderposition = "center"
        break;
    }
  }, 200 )
})
