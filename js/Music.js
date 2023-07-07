let progress = document.getElementById("progress");
let controlIcon = document.getElementById("controlIcon");
let pause = "fa-solid fa-pause";
let play = "fa-solid fa-play";
let controlDiv = document.getElementById("controlDiv");
let myAudio = document.getElementById("myAudio");

// play and pause song 

function playPause() {
     if (controlIcon.classList.contains("fa-pause")) {
          myAudio.pause();
          controlIcon.classList.remove('fa-solid', "fa-pause");
          controlIcon.classList.add('fa-solid', "fa-play");
          controlDiv.innerHTML = '<i class="fa-solid fa-play"></i>';

     } else {
          myAudio.play();
          controlIcon.classList.add('fa-solid', "fa-pause");
          controlIcon.classList.remove('fa-solid', "fa-play");
          controlDiv.innerHTML = '<i class="fa-solid fa-pause"></i>';

     }

}

myAudio.onloadedmetadata = function () {
     progress.max = myAudio.duration;
     progress.value = myAudio.currentTime;
}
if (myAudio.play()) {
     setInterval(() => {
          progress.value = myAudio.currentTime;
     }, 500);
}
progress.onchange = function () {
     myAudio.play();
     myAudio.currentTime = progress.value
     controlDiv.innerHTML = `<i class="fa-solid fa-pause"></i>`
}


let songSource = document.getElementById('songSource');
let showSong = document.getElementById("showSong");




showSong.addEventListener("click", function () {
     console.log('next');
     let nextAudio = document.createElement("audio");
     let sourceElement = document.createElement("source");
     sourceElement.setAttribute("src", "Paro Nej 128 Kbps.mp3");
     showSong.appendChild(nextAudio)
     nextAudio.appendChild(sourceElement);
     nextAudio.play()

})


let songsList = [
     {
          id: 1,
          song: './images/media/Calm-Down-Calm-Down(PaglaSongs).mp3',
          name: "calm-Down",
          singer: " Rema - Selena Gomez"
     },
     // {
     //      id: 2,
     //      song: '../media/Levitating Mp3 Song(NewDjSongRemix).mp3',
     //      name: 'Levitating',
     //      singer: "Dua Lipa"
     // },
     // {
     //      id: 3,
     //      song: '../media/Paro Nej 128 Kbps.mp3',
     //      Name: 'Paro',
     //      singer: "Nej"
     // },
     // {
     //      id: 4,
     //      song: '../media/Rosa_Linn_-_Snap_CeeNaija.com_.mp3',
     //      name: 'SNAP',
     //      singer: "Rosa Linn"
     // },
     // {
     //      id: 5,
     //      song: '../media/Christina_Perri_-_A_Thousand_Years_CeeNaija.com_.mp3',
     //      name: 'A Thousand Years',
     //      singer: 'Christina Perri',
     // }
];

// for (let x = 0; x < songsList.length; x++) {

//      songSource.src = songsList[x].song;



// }
// console.log(audioSrc)



// function playPause() {
//      myAudio.play();      // if (song.paused) {
//      //      controlDiv.innerHTML = `<i class="fa-solid fa-pause"></i>`
//      // } else {
//      //      song.pause();
//      //      controlDiv.innerHTML = `<i class="fa-solid fa-play"></i>`
//      // }
// }







