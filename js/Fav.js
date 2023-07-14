let favouriteSection = document.getElementById("favouriteSection");
if (document.readyState == 'loading') {
     document.addEventListener("DOMContentLoaded", ready)
} else {
     ready()
}

function ready() {
     let favourite = document.getElementById("favourite");
     let songInfo = document.getElementById("songInfo");

     favourite.addEventListener("click", addToFavourite);

     let myFavSongs = [];
     function addToFavourite() {
          let song = document.getElementsByClassName("song")[0].textContent;
          let singer = document.getElementsByClassName("singer")[0].textContent;
          let cover = document.getElementsByClassName("coverImg")[0].src


          let favTrack = {
               song,
               singer,
               cover,

          };
          myFavSongs.push(favTrack);
          let json = JSON.stringify(myFavSongs);
          localStorage.setItem("FavSongs", json);

          // creating elements 
          let parent = document.createElement("div");
          let songName = document.createElement("p");
          let singerName = document.createElement("p");
          let coverImage = document.createElement("img");

          songName.textContent += song;
          singerName.textContent += singer;
          coverImage.src += cover;


          songName.classList.add('favSong');
          singerName.classList.add("favArtist");
          coverImage.classList.add('favImg');
          parent.classList.add("favCart")

          favouriteSection.appendChild(parent)
          parent.appendChild(coverImage);
          parent.appendChild(songName);
          parent.appendChild(singerName);

     }
}


