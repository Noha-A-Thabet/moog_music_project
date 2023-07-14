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



async function getData() {

     const url = 'https://spotify23.p.rapidapi.com/tracks/?ids=27tNWlhdAryQY04Gb2ZhUI%2C5xEM5hIgJ1jjgcEBfpkt2F%2C3bNv3VuUOKgrf5hu3YcuRo%2C4VrWlk8IQxevMvERoX08iC%2C6z5Yh7kOKeLjqIsNdokIpU';
     const options = {
          method: 'GET',
          headers: {
               'X-RapidAPI-Key': 'fadb881c8emsh869a11fc76d987ap1561cejsn6bbd864a80a1',
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

     } catch (error) {
          console.log(error);
     }
} getData()

let displayArtist = document.getElementById("displayArtist")

// function Get Artists
async function getArtist() {
     const url = 'https://spotify23.p.rapidapi.com/artists/?ids=7H55rcKCfwqkyDFH9wpKM6%2C5YGY8feqx7naU7z4HrwZM6%2C0X2BH1fck6amBIoJhDVmmJ%2C4dpARuHxo51G3z768sgnrY%2C1uNFoZAHBGtllmzznpCI3s';
     const options = {
          method: 'GET',
          headers: {
               'X-RapidAPI-Key': 'fadb881c8emsh869a11fc76d987ap1561cejsn6bbd864a80a1',
               'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
          }
     };
     try {
          const response = await fetch(url, options);
          const result = await response.json();

          for (let x = 0; x < result.artists.length; x++) {
               let artistImg = document.createElement("IMG");
               let artistName = document.createElement("p");
               let cart = document.createElement("div");

               artistImg.src += result.artists[x].images[0].url;
               artistName.textContent += result.artists[x].name;
               artistImg.classList.add("artistImg");
               cart.classList.add("cart")
               artistName.classList.add("artistName")

               displayArtist.appendChild(cart);
               cart.appendChild(artistImg)
               cart.appendChild(artistName)
          }
     } catch (error) {
          console.error(error);
     }
}
getArtist()

// function getAlbums
let displayAlbums = document.getElementById("displayAlbums")

async function getAlbums() {
     const url = 'https://spotify23.p.rapidapi.com/albums/?ids=07w0rG5TETcyihsEIZR3qG%2C1ATL5GLyefJaxhQzSPVrLX%2C1P4eCx5b11Tfmi4s1GmWmQ%2C1SqSBUPX7fi4qQljiOOhVl%2C22wrMmdQzYn17smtugMOAk';
     const options = {
          method: 'GET',
          headers: {
               'X-RapidAPI-Key': 'fadb881c8emsh869a11fc76d987ap1561cejsn6bbd864a80a1',
               'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
          }
     };

     try {
          const response = await fetch(url, options);
          const result = await response.json();
          let albums = result.albums;
          for (let x = 0; x < albums.length; x++) {
               let albumInfo = albums[x];
               let albumName = albumInfo.name;
               let albumImage = albumInfo.images[0].url


               let img = document.createElement("IMG");
               let name = document.createElement("p");
               let cart = document.createElement("div");

               img.src += albumImage;
               name.textContent += albumName;
               img.classList.add("albumImg");

               cart.classList.add("cart")
               name.classList.add("albumName")

               displayAlbums.appendChild(cart);
               cart.appendChild(img)
               cart.appendChild(name)
          }

     } catch (error) {
          console.error(error);
     }
}
getAlbums()


