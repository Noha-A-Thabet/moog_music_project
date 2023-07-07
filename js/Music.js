let progress = document.getElementById("progress");
let song = document.getElementById("song");
let controlIcon = document.getElementById("controlIcon");
let pause = "fa-solid fa-pause";
let play = "fa-solid fa-play";
let controlDiv = document.getElementById("controlDiv")


song.onloadedmetadata = function () {
     progress.max = song.duration;
     progress.value = song.currentTime;
}

function playPause() {
     if (song.paused) {
          song.play();
          controlDiv.innerHTML = `<i class="fa-solid fa-pause"></i>`
     } else {
          song.pause();
          controlDiv.innerHTML = `<i class="fa-solid fa-play"></i>`
     }
}

if (song.play()) {
     setInterval(() => {
          progress.value = song.currentTime
     }, 500)
}

progress.onchange = function () {
     song.play();
     song.currentTime = progress.value
     controlDiv.innerHTML = `<i class="fa-solid fa-pause"></i>`
}
