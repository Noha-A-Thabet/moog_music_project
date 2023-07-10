let progress = document.getElementById("progress");
let controlIcon = document.getElementById("controlIcon");
let pause = "fa-solid fa-pause";
let play = "fa-solid fa-play";
let controlDiv = document.getElementById("controlDiv");
let nextBtn = document.getElementById("nextSong");
let myAudio = document.getElementById("myAudio");
let audioSource = myAudio.querySelector("source");
let audioSrc = audioSource.getAttribute('src');
let prevSong = document.getElementById("prevSong")
let volume = document.getElementById("volume");
let volumeRange = document.getElementById("volumeRange");
let songImg = document.getElementById("songImg");
let songName = document.getElementById("songName");
let singer = document.getElementById("singer");
let favourite = document.getElementById("favourite");

// change volume range
volumeRange.addEventListener("change", function volumeRange(e) {
     let audioRange = parseFloat(e.target.value)
     myAudio.volume = audioRange / 100;
     if (myAudio.volume == 0) {
          volume.innerHTML = `<i class="fa-solid fa-volume-xmark"></i>`
     }

})

// mute  volume 
volume.addEventListener("click", function muteSound() {
     myAudio.muted = true;
     volume.innerHTML = `<i class="fa-solid fa-volume-xmark"></i>`;
     volumeRange.value = '0'
})
console.log(typeof +volumeRange.value)

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
};

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


let showSong = document.getElementById("showSong");

async function getData() {
     const url = 'https://spotify23.p.rapidapi.com/tracks/?ids=514rhnksEwHUh6LxXsQ4Y9%2C76OGwb5RA9h4FxQPT33ekc%2C6hgoYQDUcPyCz7LcTUHKxa%2C6zvHwijlnwqjS6d46yAffi%2C6z5Yh7kOKeLjqIsNdokIpU%2C';
     const options = {
          method: 'GET',
          headers: {
               'X-RapidAPI-Key': 'e42f066744msh00a021b82a2027ep1ecb87jsn20389b74f394',
               'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
          }
     };
     try {

          const response = await fetch(url, options);
          const result = await response.json();


          let index = 0;
          if (result.tracks && result.tracks.length > 0) {
               let song = result.tracks[index].preview_url;
               let audioName = result.tracks[index].name;
               let singerName = result.tracks[index].album.artists[0].name
               let cover = result.tracks[index].album.images[0].url;

               if (song) {
                    audioSource.setAttribute("src", song);
                    songImg.src = cover
                    songName.textContent = audioName;
                    singer.textContent = singerName;
                    myAudio.load();
                    myAudio.play();

                    // function addToFavourite 
                    favourite.addEventListener("click", function addToFavourite(name, singer, img) {
                         console.log(audioName, song, cover)
                    })

                    // previous button
                    prevSong.addEventListener("click", function () {
                         index -= 1;
                         if (index >= 0 && result.tracks[index]) {
                              let prevSong = result.tracks[index].preview_url;
                              audioSource.setAttribute("src", prevSong);
                              let audioName = result.tracks[index].name;
                              let singerName = result.tracks[index].album.artists[0].name
                              let cover = result.tracks[index].album.images[0].url;
                              songImg.src = cover
                              songName.textContent = audioName;
                              singer.textContent = singerName;
                              myAudio.load();
                              myAudio.play();
                         } else {
                              index = 0;
                              let song = result.tracks[index].preview_url;
                              if (song) {
                                   audioSource.setAttribute("src", song);
                                   myAudio.load();
                                   myAudio.play();
                              } else {
                                   console.log("No songs available.");
                              }
                         }
                    });


                    // next song
                    nextBtn.addEventListener("click", function () {
                         index += 1;
                         if (result.tracks[index]) {
                              let nxtSong = result.tracks[index].preview_url;
                              audioSource.setAttribute("src", nxtSong);
                              let audioName = result.tracks[index].name;
                              let singerName = result.tracks[index].album.artists[0].name
                              let cover = result.tracks[index].album.images[0].url;
                              songImg.src = cover
                              songName.textContent = audioName;
                              singer.textContent = singerName;
                              myAudio.load();
                              myAudio.play();
                         } else {
                              index = 0;
                              song = result.tracks[index].preview_url;
                              audioSource.setAttribute("src", song);
                              myAudio.load();
                              myAudio.play();
                         }
                    });
               } else {
                    console.log("Preview URL is missing or null.");
               }
          } else {
               console.log("No tracks found in the response.");
          }


          for (let x = 0; x < result.tracks.length; x++) {

               // console.log(result.tracks[x])
               // Album Name
               let albumName = result.tracks[x].name;
               // console.log("Album Name : " + albumName)
               // artist name
               let artistName = result.tracks[x].artists[0].name
               // console.log("artist name : " + artistName)
               // artist Image
               let artistImage = result.tracks[x].album.images[0].url
               // console.log(artistImage)
               // song

               // let song = result.tracks[x].preview_url;
          }

     } catch (error) {
          console.log(error);
     }
} getData()





