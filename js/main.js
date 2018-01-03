const context = new window.AudioContext() || new window.webkitAudioContext();
const bar = document.getElementById("bar")
const main = document.querySelector(".galaxy")
let music; // music button added when media can be played
const aboutlink = document.querySelector(".aboutlink")
const contactlink = document.querySelector(".contactlink")
const projectlink = document.querySelector(".projectlink")
const container = document.querySelector(".container")

var playing = false;
let colors = [
  "#1f68bf",
  "#58cee3",
  "#fe9593",
  "#d43256"
]
var stars = [] // array to store all star divs

// make colors into a 32 instance array with the 4 colors
colors = colors.concat(colors.slice())
colors = colors.concat(colors.slice())
colors = colors.concat(colors.slice())

aboutlink.addEventListener("click", function(){
  container.classList.add("fade-out")
  projectlink.classList.add("fade")
  contactlink.classList.add("fade")
  setTimeout(() => aboutlink.classList.add("aboutlinkexpand"), 400)
  setTimeout(() => window.location = "./about.html", 1400)
})

contactlink.addEventListener("click", function() {
  container.classList.add("fade-out")
  aboutlink.classList.add("fade")
  projectlink.classList.add("fade")
  setTimeout(() => contactlink.classList.add("contactlinkexpand"), 400)
  setTimeout(() => window.location = "./contact.html", 1400)
})

projectlink.addEventListener("click", function() {
  container.classList.add("fade-out")
  aboutlink.classList.add("fade")
  debugger
  contactlink.classList.add("fade")
  setTimeout(() => projectlink.classList.add("projectlinkexpand"), 400)
  setTimeout(() => window.location = "./projects.html", 1400)
})

// when music stops
const stop = function(){
  window.cancelAnimationFrame(a)
  audioElement.pause()
  music.classList.remove("anim-music")
  stars.map(i => { i.style.boxShadow = "0 0 10px 2px white" })
}

// when music starts
const go = function(){
  update()
  audioElement.play()
  music.classList.add("anim-music")
}

const connector = function() {
  // Connect the output of the source to the input of the analyser
  source.connect(analyser);

  // Connect the output of the analyser to the destination
  analyser.connect(context.destination);

  // put music button on page
  music = document.createElement("div")
  music.className = "music"
  music.innerHTML = "<i class='fa fa-music'></i>"
  music.addEventListener("click", function(){ playing ? stop() : go(); playing = !playing; })
  container.appendChild(music)
}

let fragment = document.createDocumentFragment()
for (let i = 0; i < 256; i++) { // factory to create star divs
  let star = document.createElement("div")
  star.className = "star"
  if(i < 32){
    star.style.top = (Math.random() * 100) + "vh"
    star.style.left = (Math.random() * 80 + 20) + "vw"
  }else if(i <= 64){
    star.style.top = (Math.random() * 140 - (Math.random() * 40) ) + "vh"
    star.style.left = (Math.random() * 120 - (Math.random() * 20) ) + "vw"
  }else if(window.innerWidth < window.innerHeight){
    star.style.top = ( Math.random() * 120 - (Math.random() * 120) ) + "vh"
    star.style.left = ( Math.random() * 170 - (Math.random() * 70) ) + "vw"
  }else{
    star.style.top = ( Math.random() * 170 - (Math.random() * 70) ) + "vh"
    star.style.left = ( Math.random() * 105 - (Math.random() * 5) ) + "vw"
  }
  stars.push(star)
  fragment.appendChild(star)
  // main.appendChild(star)
}

main.appendChild(fragment)

// web audio api setup stuff
const audioElement = document.getElementById("player");
audioElement.volume = 0.26;
const source = context.createMediaElementSource(audioElement);
source.connect(context.destination);

const analyser = context.createAnalyser();

if(audioElement.readyState >= audioElement.HAVE_FUTURE_DATA){
  connector();
}else{
  audioElement.addEventListener("canplay", connector());
}

// web audio api frequency analyser
analyser.fftSize = 64; // has to be a number that is a power of 2 --- will split frequencies into an amount half of this number
analyser.maxDecibels = -24
analyser.minDecibels = -145
let frequencyData = new Uint8Array(analyser.frequencyBinCount);
analyser.getByteFrequencyData(frequencyData);


let a; // animation frame id used for stopping animation frames
function update() {
    // Schedule the next update
    a = requestAnimationFrame(update);

    // Get the new frequency data every frame and places it into frequencyData array
    analyser.getByteFrequencyData(frequencyData)

    for(let i=0; i < 32; i++){
      if(a % 4 === 0){ // only fire changes once every 4 frames
        stars[i].style.boxShadow = "0 0 30px "  + frequencyData[i] / 9.6 + "px " + colors[i] // use frequency value to increase box shadow to music
        stars[i + (32)].style.boxShadow = "0 0 30px "  + frequencyData[i] / 9.6 + "px" + colors[i]
        stars[i + (32*2)].style.boxShadow = "0 0 30px " + frequencyData[i] / 9.6 + "px" + colors[i]
        // stars[i + (32*3)].style.boxShadow = "0 0 30px "  + frequencyData[i] / 9.6 + "px" + colors[i]
      } //if
    } // for
}; // update function
