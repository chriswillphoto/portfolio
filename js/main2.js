var context = new window.AudioContext() || new window.webkitAudioContext();
var bar = document.getElementById("bar")
var main = document.querySelector(".galaxy")
var music = document.querySelector(".music")

var rotate = 0
var playing = false;
const colors = //[
//   "#55cfc4",
//   "#f653a9",
//   "#fdacba",
//   "#fdc3b8"
// ]

[
  "#01415f",
  "#53d1ee",
  "#fed20c",
  "#c37740"
]
var stars = [] // array to store all star divs

var stop = function(){
  audioElement.pause()
  music.classList.remove("anim-music")
}

var go = function(){
  audioElement.play()
  music.classList.add("anim-music")
}
music.addEventListener("click", function(){ playing ? stop() : go(); playing = !playing; })

for (var i = 0; i < 320; i++) { // factory to create star divs
  let star = document.createElement("div")
  star.className = "star"
  if(window.innerWidth < window.innerHeight){
    star.style.top = ( Math.random() * 120 - (Math.random() * 120) ) + "vh"
    star.style.left = ( Math.random() * 170 - (Math.random() * 70) ) + "vw"
  }else{
    star.style.top = ( Math.random() * 170 - (Math.random() * 80) ) + "vh"
    star.style.left = ( Math.random() * 105 - (Math.random() * 5) ) + "vw"
  }
  stars.push(star)
  main.appendChild(star)
}

// web audio api stuff
var audioElement = document.getElementById("player");
var source = context.createMediaElementSource(audioElement);
source.connect(context.destination);

var analyser = context.createAnalyser();

audioElement.addEventListener("canplay", function() {


    // Connect the output of the source to the input of the analyser
    source.connect(analyser);

    // Connect the output of the analyser to the destination
    analyser.connect(context.destination);
});

// web audio api frequency analyser
analyser.fftSize = 256; // has to be a number that is a power of 2 --- will split frequencies into an amount half of this number
var frequencyData = new Uint8Array(analyser.frequencyBinCount);
analyser.getByteFrequencyData(frequencyData);

function update() {
    // Schedule the next update
    requestAnimationFrame(update);

    // rotate +0.06 degrees every frame
    // main.style.transform = `rotate(${rotate}deg)`
    // rotate += 0.045

    // Get the new frequency data every frame
    analyser.getByteFrequencyData(frequencyData)

    for(let i=0; i < 64; i++){
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

      if(frequencyData[i] > 2){
        stars[i].style.boxShadow = "0 0 30px "  + (frequencyData[i] / 10) + "px " + colors[j] // use frequency value to increase box shadow to music
        stars[i*2].style.boxShadow = "0 0 30px "  + (frequencyData[i] / 10) + "px" + colors[j]
        stars[i*3].style.boxShadow = "0 0 30px "  + (frequencyData[i] / 10) + "px" + colors[j]
        stars[i*4].style.boxShadow = "0 0 30px "  + (frequencyData[i] / 10) + "px" + colors[j]
        // stars[i].style.width = (frequencyData[i] / 12) + "px"
        // stars[i].style.height = (frequencyData[i] / 12) + "px"
      }else{
        stars[i].style.boxShadow = "0 0 10px 1px white" // if no frequency data in the stars range, revert back to small and white
        stars[i*2].style.boxShadow = "0 0 10px 1px white"

      }

    }


};

// Kick it off...
update();
