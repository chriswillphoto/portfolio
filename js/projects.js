let showMenu = false;

$(".menu-button").on("click", function() {
  $(this).addClass("menu-rotate")
  setTimeout( () => {
    $(".menu").slideDown(300)
    showMenu = true
    $(this).removeClass("menu-rotate")
  }, 300 ) // set timeout
}) // click event

$(".container").on("click", function() {
  if(showMenu){
    $(".menu").slideUp(200)
    showMenu = false
  }  //if
})

$(".about-link").on("click", function() {
  $("body").css("backgroundColor", "#58cee3")
  $(".container").css("transform", "translateX(100vw)")
  setTimeout( () => { window.location = "./about.html"}, 800 )
})

$(".contact-link").on("click", function() {
  $("body").css("backgroundColor", "#58cee3")
  $(".container").css("transform", "translateX(100vw)")
  setTimeout( () => { window.location = "./contact.html"}, 800 )
})

$(".item").on("click", function() {
    $(this).removeClass("hovering").children(":not(img)").slideDown(400).children().slideDown(400).children().slideDown(400)
})

$(".close").on("click", function(e) {
  e.stopPropagation() // stops the click event from bubbling up to the parent node
  $(this).hide().siblings(":not(img)").slideUp(400)
  setTimeout( () => { $(this).parent().addClass("hovering") }, 400 )
})
