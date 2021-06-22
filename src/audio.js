//Call handle audio/video setup
function playback(fName)
{
	//Create dummy for audio/video source. Dummy holds file type.
	var fileDummy = document.createElement("p");
	fileDummy.id = "sauce";
		
	if(fName.type.startsWith("video/"))
		fileDummy.innerHTML = "video/";
	else
		fileDummy.innerHTML = "audio/";
	fileDummy.innerHTML += fName.name.split(".").pop();
	
	if(!document.getElementById("music"))
	{
		//Initial video element setup
		var body = document.body;
		var music = document.createElement("video");
		var err = document.createElement("p");
		music.id = "music";
		music.controls = true;
		music.preload = false;
		music.style.display = "block";
		music.style.margin = "auto";
		music.style.visibility = "hidden";
		document.addEventListener("keydown", keyControls);
		document.addEventListener("wheel", wheelScrub);
		err.innerHTML = "Unsupported file";
		

		music.appendChild(err);
		music.appendChild(fileDummy);
		body.appendChild(music);
	}
	else
	{
		//Replace current source with dummy
		var music = getElementById("music");
		music.style.visibility = "hidden";
		var old = document.getElementById("sauce");
		music.replaceChild(fileDummy, old);
	}

	//Read file and set source when ready 
	var mRead = new FileReader();
	mRead.readAsDataURL(fName);
	mRead.addEventListener("load", setMusic);
}

//Handle keyboard input
function keyControls(e)
{
	var music = document.getElementById("music");
	console.log("Triggered!" + e.key);
	
	switch(e.key)
	{
		case " ":
			//console.log("Toggled!");
			music.paused ? music.play() : music.pause();
			break;
		
		case "ArrowLeft":
			//console.log("Rewind!");
			if(e.shiftKey)
				if(music.currentTime > .1)
					music.currentTime -= .1;
				else
					music.currentTime = 0;
			else
				if(music.currentTime > 1)
					music.currentTime -= 1;
				else
					music.currentTime = 0;
			break;
			break;
			
		case "ArrowRight":
			//console.log("Fast Forward!");
			if(e.shiftKey)
				if(music.currentTime < music.duration - .1)
					music.currentTime += .1;
				else
					music.currentTime = music.duration;
			else
				if(music.currentTime < music.duration - 1)
					music.currentTime += 1;
				else
					music.currentTime = music.duration;
			break;
			
		case "ArrowUp":
			//console.log("Louder!");
			var volume = music.volume * 20;
			volume = volume + 1 > 20 ? 20 : volume + 1;
			music.volume = volume / 20;
			console.log(music.volume);
			break;
			
		case "ArrowDown":
			//console.log("Softer.");
			var volume = music.volume * 20;
			volume = volume - 1 < 0 ? 0 : volume - 1;
			music.volume = volume / 20;
			console.log(music.volume);
			break;
			
		case 'm':
		case "M":
			//console.log("Toggle Mute.");
			music.muted = !music.muted;
			break;
			
		case 'f':
		case "F":
			//console.log("Faster!");
			var rate = music.playbackRate * 20;
			if(e.shiftKey)
				rate = rate + 1 > 80 ? 80 : rate + 1;
			else
				rate = rate + 5 > 80 ? 80 : rate + 5;
			music.playbackRate = rate / 20;
			console.log(music.playbackRate);
			break;
			
		case 's':
		case "S":
			//console.log("Slower!");
			var rate = music.playbackRate * 20;
			if(e.shiftKey)
				rate = rate - 1 < 5 ? 5 : rate - 1;
			else
				rate = rate - 5 < 5 ? 5 : rate - 5;
			music.playbackRate = rate / 20;
			console.log(music.playbackRate);
			break;
	}
}

//Readjust video element on window resize
function resize()
{
	//console.log("Resize!");
	if(!document.getElementById("music"))
		return;
	var music = document.getElementById("music");
	if(16/9 > window.innerWidth / window.innerHeight)
	{
		music.width = window.innerWidth;
		music.height = music.width * 9 / 16;
	}
	else
	{
		music.height = window.innerHeight;
		music.width = music.height * 16 / 9;
	}
	//console.log("window: " + window.innerWidth + " x " + window.innerHeight);
	//console.log("music: " + music.width + " x " + music.height);
}

//Called once music file finished loading
function setMusic(ev)
{
	var music = document.getElementById("music");
	if(!music)
		return;
	var holder = document.getElementById("sauce");
	var file = document.createElement("source");
	file.src = ev.target.result;
	file.type = holder.innerHTML;
	music.replaceChild(file, holder);
	file.id = "sauce";
	music.load();
	resize();
	music.style.visibility = "visible";
	//console.log("Loaded!");
}

//Handle mouse wheel event
function wheelScrub(ev)
{
	var music = document.getElementById("music");
	music.currentTime += ev.deltaY * .05;
	if(music.currentTime > music.duration)
		music.currentTime = music.duration;
	if(music.currentTime < 0)
		music.currentTime = 0;		
}