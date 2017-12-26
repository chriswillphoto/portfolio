var context = new AudioContext();
var bar = document.getElementById("bar")
// var circles = document.querySelectorAll(".circle")

var audioElement = document.getElementById("player");
var source = context.createMediaElementSource(audioElement);
source.connect(context.destination);

var analyser = context.createAnalyser();

audioElement.addEventListener("canplay", function() {
    // var source = context.createMediaElementSource(audioElement);

    // Connect the output of the source to the input of the analyser
    source.connect(analyser);

    // Connect the output of the analyser to the destination
    analyser.connect(context.destination);
});

analyser.fftSize = 256;
var frequencyData = new Uint8Array(analyser.frequencyBinCount);
analyser.getByteFrequencyData(frequencyData);
// audioElement.play()

// function update() {
//     // Schedule the next update
//     requestAnimationFrame(update);
//
//     // Get the new frequency data
//     // analyser.getByteFrequencyData(frequencyData)
//     // bar.style.width = (frequencyData[2]) + "px";
//     for(let i=0; i < circles.length; i++){
//       circles[i].style.height = frequencyData[i] * 2 + "px"
//       circles[i].style.width = frequencyData[i] * 2 + "px"
//       if(frequencyData[4] > 160){
//         circles[i].style.borderColor = "purple"
//       }else{
//         circles[i].style.borderColor = "red"
//       }
//     }
//
//
// };

// Kick it off...
// update();


var canvas = document.querySelector('canvas');
		var c = canvas.getContext('2d');

		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;

		var particleCount = 128;
		// var mouse = {
		// 	x: window.innerWidth / 2,
		// 	y: window.innerHeight / 2
		// };
    //
		// window.addEventListener("mousemove", function(event) {
		// 	mouse.x = event.clientX - canvas.width / 2;
		// 	mouse.y = event.clientY - canvas.height / 2;
		// });

		window.addEventListener("resize", function() {
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;

			lightParticles = [];
			initializeParticles();
		});


		function LightParticle(x, y, radius, color) {
			this.x = x;
			this.y = y;
			this.radius = radius;
			this.color = color;

			this.update = function() {

				this.draw();
			};

			this.draw = function() {
				c.save();
				c.beginPath();
				c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
				c.shadowColor = this.color;
				c.shadowBlur = 19;
				c.shadowOffsetX = 0;
				c.shadowOffsetY = 0;
				c.fillStyle = this.color;
				c.fill();
				c.closePath();
				c.restore();
			};
		}

		var lightParticles = [];

		var timer = 0;
		var opacity = 1;
		var speed = 0.0005;
		var colors = [
			"#0952BD",
			"#A5BFF0",
			"#118CD6",
			"#1AAEE8",
			"#F2E8C9", "#FFF345"
		];

		var initializeParticles;

		(initializeParticles = function() {
			for (var i = 0; i < particleCount; i++) {

				var randomColorIndex = Math.floor(Math.random() * 7);
				var randomRadius = Math.random() * 2;

				// Ensure particles are spawned past screen width and height so
				// there will be no missing stars when rotating canvas
				var x = (Math.random() * (canvas.width - 200)) - (canvas.width - 200) / 2;
				var y = (Math.random() * (canvas.width - 200)) - (canvas.width - 200) / 2;
				lightParticles.push(new LightParticle(x, y, randomRadius, colors[randomColorIndex]));
			}
		})();

		function animate() {
			window.requestAnimationFrame(animate);
      analyser.getByteFrequencyData(frequencyData)

			c.save();
			if (isMouseDown === true || frequencyData[2] > 160) {

				// Ease into the new opacity
				var desiredOpacity = 0.01;
				opacity += (desiredOpacity - opacity) * 0.03;
				c.fillStyle = "rgba(18, 18, 18,"+ "0.02" +")";

				// Ease into the new speed
				var desiredSpeed = 0.012;
				speed += (desiredSpeed - speed) * 0.01;
				timer += speed;

			} else {

				// Ease back to the original opacity
				var originalOpacity = 0.7;
				opacity += (originalOpacity - opacity) * 0.01;
				c.fillStyle = "rgba(18, 18, 18, " + opacity + ")";

				// Ease back to the original speed
				var originalSpeed = 0.001;
				speed += (originalSpeed - speed) * 0.01;
				timer += speed;


			}

			c.fillRect(0, 0, canvas.width, canvas.height);
			c.translate(canvas.width / 2, canvas.height/2 );
			c.rotate(timer);

			for (var i = 0; i < lightParticles.length; i++) {
				lightParticles[i].update();
			}

			c.restore();


		}

		var isMouseDown = false;

		window.addEventListener("mousedown", function() {
			isMouseDown = true;
		});


		window.addEventListener("mouseup", function() {
			isMouseDown = false;
		});

		animate();
