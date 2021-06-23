let slideIndex = 0; //used in slideshow

window.onload = () => {
    addNavEvents();   
    addNavScrollEvent();   
    carousel(); 
    addPlaylistEvents();
    addTotalandDisplaySong();  
}

// hides navigation bar based on screen width 
window.onresize = function() {
    const navLinks = document.getElementById("links");
    
    window.innerWidth < 768 ? navLinks.style.display = "none" : navLinks.style.display = "flex";
}

// add click event that adds class to current active nav item
function addNavEvents () {
    const navUl = document.getElementById('links').getElementsByTagName('li');

    for (let i = 0; i < navUl.length; i++) {
        navUl[i].addEventListener('click', function() {
            checkList(navUl, this)
        });
    }
}
function checkList(navUl, currentTab) {
    for (let i = 0; i < navUl.length; i++) {
        navUl[i].classList.remove('current-tab');
    }
    currentTab.classList.add('current-tab');
}
//mobile bar icon to display/hide the navigation links
const displayNav = () => {
    const navLinks = document.getElementById("links");

    navLinks.style.display === "block" ? navLinks.style.display = "none" : navLinks.style.display = "block";
};
/* 
looks at current position of webpage in view
applies style to navbar based on section in view
*/
function addNavScrollEvent() {
    const sections = document.querySelectorAll('section');
    const navLi = document.querySelectorAll('nav ul li');
    window.addEventListener('scroll', ()=> {
        let current = '';
        sections.forEach( section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if(pageYOffset >= sectionTop - 300) {
                current = section.getAttribute('id');
            }
        });
    
        navLi.forEach((li) => {
            li.classList.remove('current-tab');
            if (li.classList.contains(current)) {
                li.classList.add('current-tab');
            }
        });
    });
}
// automatic slideshow
const carousel = () => {
    const slides = document.getElementsByClassName("mySlides");

    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slideIndex++;

    if (slideIndex > slides.length) {
        slideIndex = 1
    }
    slides[slideIndex-1].style.display = "block";
    setTimeout(carousel, 10000); // Change image every 10 seconds
}
/*
sets audio src in HTML based on user selection
displays/updates song title and artist in playlist
*/
document.getElementById('list').onclick = (e) => {
    e.preventDefault(); //prevents default behavior of opening song in new tab
  
    const elm = e.target;
    const audioPlayer = document.getElementById('audioPlayer');
  
    const source = document.getElementById('audioSource');
    source.src = elm.getAttribute('data-value');
  
    setTimeout(function()   { 
        const song = document.getElementById('song');
        song.innerHTML = elm.textContent.slice(2); //excludes the &#9654 unicode code from displaying on main player

        const artist = document.getElementById('artist');
        artist.innerHTML = "Moosic";

        const album = document.getElementById('album');
        album.innerHTML = "-Together Forever";

    }, 250);
     
    audioPlayer.load(); //call this to load audio without playing
    audioPlayer.play(); //call this to play the song
};
// adds total song time for all songs and add number of songs in playlist
function addTotalandDisplaySong() {
    let countSeconds = 0;
    const songs = document.getElementsByClassName('song');  
    const songLength = document.getElementsByClassName('songLength'); 
    document.getElementById('songs').innerHTML = songs.length;

    for (let i = 0; i < songs.length; i++) {
        const tempAudio = document.createElement("audio");
        tempAudio.src = songs[i].getAttribute('data-value');
        tempAudio.addEventListener('loadedmetadata', function(){
            const songDuration = parseInt(tempAudio.duration);
            songLength[i].innerHTML = `${parseInt(songDuration / 60)}:${convertSeconds(songDuration)}`;
            countSeconds += songDuration;
            //calculates time into readable format
            document.getElementById("duration").innerHTML = `${parseInt(countSeconds / 60)}:${countSeconds % 60}`;
        })
        tempAudio.remove();       
    }
    //loads first song into player
    const song = document.getElementById('song');
    song.innerHTML = songs[0].textContent.slice(2);

    const artist = document.getElementById('artist');
    artist.innerHTML = "Moosic";

    const album = document.getElementById('album');
    album.innerHTML = "-Together Forever";
}
//properly displays seconds with leading 0 if under 10
const convertSeconds = (time) => {
    let sec = Math.floor(time % 60);
    if (sec < 10) {
        sec = '0' + String(sec);
    }
    return sec;
}
//add event that removes and assigns class to selected song
function addPlaylistEvents() {
    const songsList = document.getElementById('list').getElementsByTagName('li');
    for (let i = 0; i < songsList.length; i++) {
        songsList[i].addEventListener('click', function() {
            checkSong(songsList, this);
        });
    }
}
function checkSong(songsList, currentSong) {
    for (let i = 0; i < songsList.length; i++) {
        songsList[i].classList.remove('current-song');
    }
    currentSong.classList.add('current-song');
}