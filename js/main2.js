var context = new window.AudioContext() || new window.webkitAudioContext();
var bar = document.getElementById("bar")
var main = document.querySelector(".galaxy")
var music = document.querySelector(".music")
var aboutlink = document.querySelector(".aboutlink")
var contactlink = document.querySelector(".contactlink")
var projectlink = document.querySelector(".projectlink")
var container = document.querySelector(".container")


var rotate = 0
var playing = false;
const colors = [
  "#55cfc4",
  "#f653a9",
  "#fdacba",
  "#fdc3b8"
]

// [
//   "#01415f",
//   "#53d1ee",
//   "#fed20c",
//   "#c37740"
// ]
var stars = [] // array to store all star divs

aboutlink.addEventListener("click", function(){
  container.classList.add("what")
  projectlink.classList.add("fade")
  contactlink.classList.add("fade")
  setTimeout(() => aboutlink.classList.add("aboutlinkexpand"), 1000)
  setTimeout(() => window.location = "./about.html", 2700)
})
music.addEventListener("click", function(){ playing ? stop() : go(); playing = !playing; })


var stop = function(){
  window.cancelAnimationFrame(a)
  audioElement.pause()
  music.classList.remove("anim-music")
  // stars.map(i => { i.style.boxShadow = "0 0 10px 2px white" })
}

var go = function(){
  update()
  audioElement.play()
  music.classList.add("anim-music")
}
let fragment = document.createDocumentFragment()
for (var i = 0; i < 320; i++) { // factory to create star divs
  let star = document.createElement("div")
  star.className = "star"
  if(i <= 128){
    star.style.top = (Math.random() * 130 - Math.random() * 30) + "vh"
    star.style.left = (Math.random() * 100) + "vw"
  }else if(window.innerWidth < window.innerHeight){
    star.style.top = ( Math.random() * 120 - (Math.random() * 120) ) + "vh"
    star.style.left = ( Math.random() * 170 - (Math.random() * 70) ) + "vw"
  }else{
    star.style.top = ( Math.random() * 170 - (Math.random() * 80) ) + "vh"
    star.style.left = ( Math.random() * 105 - (Math.random() * 5) ) + "vw"
  }
  stars.push(star)
  fragment.appendChild(star)
  // main.appendChild(star)
}
main.appendChild(fragment)
// web audio api stuff
var audioElement = document.getElementById("player");
var source = context.createMediaElementSource(audioElement);
source.connect(context.destination);

var analyser = context.createAnalyser();
analyser.connect(context.destination);
source.connect(analyser);
// audioElement.addEventListener("canplay", function() {
//
//
//     // Connect the output of the source to the input of the analyser
//     source.connect(analyser);
//
//     // Connect the output of the analyser to the destination
//     analyser.connect(context.destination);
// });

// web audio api frequency analyser
analyser.fftSize = 64; // has to be a number that is a power of 2 --- will split frequencies into an amount half of this number
var frequencyData = new Uint8Array(analyser.frequencyBinCount);
// analyser.getByteFrequencyData(frequencyData);
let a;
function update() {
    // Schedule the next update
    a = requestAnimationFrame(update);

    // Get the new frequency data every frame
    analyser.getByteFrequencyData(frequencyData)

    for(let i=0; i < 26; i++){
      let j; // split stars evenly into different color groups
      if(i % 4 === 0){
        j = 3
      }else if(i % 3 === 0){
        j = 2
      }else if(i % 2 === 0){
        j = 1
      }else{
        j = 0
      }

      // if(frequencyData[i] > 5){
        stars[i].style.boxShadow = "0 0 30px "  + (frequencyData[i] > 0 ? (frequencyData[i] / 10) : 2) + "px " + colors[j] // use frequency value to increase box shadow to music
        stars[i + (26)].style.boxShadow = "0 0 30px "  + (frequencyData[i] > 0 ? (frequencyData[i] / 10) : 2) + "px" + colors[j]
        stars[i + (26*2)].style.boxShadow = "0 0 30px "  + (frequencyData[i] > 0 ? (frequencyData[i] / 10) : 2) + "px" + colors[j]
        stars[i + (26*3)].style.boxShadow = "0 0 30px "  + (frequencyData[i] > 0 ? (frequencyData[i] / 10) : 2) + "px" + colors[j]
        // stars[i].style.width = (frequencyData[i] / 12) + "px"
        // stars[i].style.height = (frequencyData[i] / 12) + "px"
      // }else{
      //   stars[i].style.boxShadow = "0 0 10px 2px white" // if no frequency data in the stars range, revert back to small and white
      //   stars[i + (26)].style.boxShadow = "0 0 10px 2px white"
      //   stars[i + (26*2)].style.boxShadow = "0 0 10px 2px white"
      //   stars[i + (26*3)].style.boxShadow = "0 0 10px 1px white"
      // }

    }


};

// Kick it off...

// update();
