//constants
const bg = document.getElementById("bgimage");
const song = document.getElementById("song");
const albumcover = document.getElementById("albumcover");
const progessbar = document.getElementById("progressbar");
const currenttime = document.getElementById("currenttime");
const songlength = document.getElementById("songlength");
const title = document.getElementById("title");
const artist = document.getElementById("artist");

//let is block scoped
let play = document.getElementById("play");
let pause = document.getElementById("pause");
let next = document.getElementById("next");
let prev = document.getElementById("back");
let paused = true;

//index tracker for tracks
let trackInd = 0;

//Songs of by The Story So Far
SOtracks = [
	{
		title: "The Glass",
		source: "./SOTSSF/TheGlass.mp3",
		art: "https://bit.ly/3eDVDrX",
		artist: "The Story So Far"
	},
	{
		title: "Navy Blue",
		source: "./SOTSSF/NavyBlue.mp3",
		art: "https://bit.ly/3eDVDrX",
		artist: "The Story So Far"
	},
	{
		title: "All Wrong",
		source: "./SOTSSF/AllWrong.mp3",
		art: "https://bit.ly/3eDVDrX",
		artist: "The Story So Far"
	},
	{
		title: "Bad Luck",
		source: "./SOTSSF/BadLuck.mp3",
		art: "https://bit.ly/3eDVDrX",
		artist: "The Story So Far"
	},
	{
		title: "Waiting in Vain",
		source: "./SOTSSF/WaitingInVain.mp3",
		art: "https://bit.ly/3eDVDrX",
		artist: "The Story So Far"
	}
];

//Transit by Decorator
Trtracks = [
	{
		title: "Mad Cali Transit",
		source: "./TRANSIT/MadCaliTransit.mp3",
		art: "https://bit.ly/33KgpzV",
		artist: "Decorator"
	},
	{
		title: "Faces",
		source: "./TRANSIT/Faces.mp3",
		art: "https://bit.ly/33KgpzV",
		artist: "Decorator"
	},
	{
		title: "Roads",
		source: "./TRANSIT/Roads.mp3",
		art: "https://bit.ly/33KgpzV",
		artist: "Decorator"
	},
	{
		title: "Heart is a Muscle",
		source: "./TRANSIT/HeartisaMuscle.mp3",
		art: "https://bit.ly/33KgpzV",
		artist: "Decorator"
	}
];

//on open, Songs Of will show
let tracklist = SOtracks;

//functionality of the play/pause button
function playpause(){
	if(paused) {
		play.style.display = "none";
		pause.style.display = "block";

		song.volume = 0.2;
		song.play();
		paused = false;
	}
	else{
		play.style.display = "block";
		pause.style.display = "none";

		song.pause();
		paused = true;
	}
}

//on click, perform playpause on both play/pause buttons
play.addEventListener("click", playpause);
pause.addEventListener("click", playpause);

//functionality for right arrow
function nexttrack(){
	trackInd++;
	//loop back to beginning of album
	if(trackInd > tracklist.length - 1){
		trackInd = 0;
	}

	song.src = tracklist[trackInd].source;
	title.textContent = tracklist[trackInd].title;
	albumcover.src = tracklist[trackInd].art;
	artist.textContent = tracklist[trackInd].artist;

	if(paused){
		paused = false;
		playpause();
	}
	else{
		paused = true;
		playpause();
	}
}

//on click/end of song, perform nexttrack
song.addEventListener("ended", nexttrack);
next.addEventListener("click", nexttrack);

//functionality for left arrow
function prevtrack(){
	//restart the song
	if(song.currentTime > 5){
		song.currentTime = 0;
		currenttime.textContent = time(song.currentTime);
		if(paused){
			paused = false;
			playpause();
		}
		else{
			paused = true;
			playpause();
		}
	}
	else{
		trackInd--;
		if(trackInd < 0){
			trackInd = tracklist.length - 1;
		}

		song.src = tracklist[trackInd].source;
		title.textContent = tracklist[trackInd].title;
		albumcover.src = tracklist[trackInd].art;

		if(paused){
			paused = false;
			playpause();
		}
		else{
			paused = true;
			playpause();
		}
	}
}

//on click, perform prevtrack
back.addEventListener("click", prevtrack);

//functionality for keeping time of song
//uses built in properties of audio files
function timeValues(){
	progressbar.max = song.duration;
	progressbar.value = song.currentTime;

	currenttime.textContent = time(song.currentTime);
	songlength.textContent = time(song.duration);
}

setInterval(timeValues, 1000);

//side function for converting seconds to minutes
function time(sec) {
	let minutes = Math.floor(sec / 60);
	let seconds = Math.floor(sec - minutes * 60);
	if (seconds < 10) {
		seconds = `0${seconds}`;
	}
	return `${minutes}:${seconds}`;
}

//functionality for clicking on progress bar
function seek(){
	song.currentTime = progressbar.value;
}

//on click, perform seeking function
progressbar.addEventListener("click", seek);

//functionality for opening navigation bar
function openside(){
	document.getElementById("navbar").style.width = "200px";
}

//functionality for closing navigation bar
function closeside(){
	document.getElementById("navbar").style.width = "0px";
}

//transition to Decorator's album
function decor(){
	closeside();
	tracklist = Trtracks;
	trackInd = 0;
	bg.src = tracklist[trackInd].art;
	albumcover.src = tracklist[trackInd].art;
	song.src=tracklist[trackInd].source;
	title.textContent = tracklist[trackInd].title;
	artist.textContent = "Decorator";
	timeValues();

	//ensure album stays paused when changing pages
	paused = false;
	playpause();

	//change control background
	document.getElementById("buttonbg").style.backgroundImage = 'linear-gradient(black, white, mediumaquamarine, red, white)';
	document.getElementById('progressbar').style.background = 'lightcyan';
	document.getElementById('currenttime').style.color = 'black';
	document.getElementById('songlength').style.color = 'black';
	document.getElementById('title').style.color = 'dimgrey';
	document.getElementById('artist').style.color = 'dimgrey';
}

function tssf(){
	closeside();
	tracklist = SOtracks;
	trackInd = 0;
	bg.src = tracklist[trackInd].art;
	albumcover.src = tracklist[trackInd].art;
	song.src = tracklist[trackInd].source;
	title.textContent = tracklist[trackInd].title;
	artist.textContent = "The Story So Far";
	timeValues();

	//ensure album stays paused when changing pages
	paused = false;
	playpause();

	//change control background
	document.getElementById("buttonbg").style.backgroundImage = 'linear-gradient(to right, black,darkslategrey, burlywood, wheat, burlywood, darkslategrey, black)';
	document.getElementById('progressbar').style.background = 'white';
	document.getElementById('currenttime').style.color = 'white';
	document.getElementById('songlength').style.color = 'white';
	document.getElementById('title').style.color = 'azure';
	document.getElementById('artist').style.color = 'azure';
}
