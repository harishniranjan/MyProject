console.log("hii")
let currentSong = new Audio();

let songs;
let currFolder;


function secondsToMinutesSeconds(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        return "00:00";
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
}


async function getSongs(folder) {
    currFolder = folder;
    let a = await fetch(`http://127.0.0.1:3000/${folder}/`)
    let response = await a.text()


    let div = document.createElement("div")
    div.innerHTML = response;
    let as = div.getElementsByTagName("a")
    let songs = []
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".mp3")) {
            songs.push(element.href.split(`${folder}`)[1])
        }

    }

    //Show all songs from playlist
    let songUL = document.querySelector(".songList").getElementsByTagName("ul")[0]
    songUL.innerHTML = ""
    for (const song of songs) {
        songUL.innerHTML = songUL.innerHTML + `<li>
        
                            <img src="assets/music.svg" alt="">
                            <div class="info">
                                <div>${song.replaceAll("%20", " ")}</div>
                                <div>HArry</div>
                            </div>
                            <div class="playnow">
                                <span>Play Now</span>
                                    <img src="assets/play.svg" alt="">
                                
                            </div>
                       
         </li>`;

        //Attach play for each song
        Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(e => {
            e.addEventListener("click", element => {


                playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim())
                console.log(e.querySelector(".info").firstElementChild.innerHTML)
            })

        })
        return songs
    }
}

const playMusic = (track, pause = false) => {
    currentSong.src = `${currFolder}` + track
    if (!pause) {
        currentSong.play()
    }

    play.src = "assets/pause.svg"
    document.querySelector(".songinfo").innerHTML = decodeURI(track)
    document.querySelector(".songtime").innerHTML = "00:00/00:00"

}
async function displayAlbums(){
    let a = await fetch(`http://127.0.0.1:3000/${folder}/`)
    let response = await a.text()
    let div = document.createElement("div")
    div.innerHTML = response;
    let anchors = div.getElementsByTagName("a")
    Array.from(anchors).forEach(e=>{
        if(e.href.includes("/songs")){
            e.
        }
    })

}

async function main() {

    await getSongs("songs/ncs")


    playMusic(songs[0], true)

    //Display all the albums on the page
    

    //Attach previous, play and next to each song



    play.addEventListener("click", () => {
        if (currentSong.paused) {
            currentSong.play()
            play.src = "assets/pause.svg"
        } else {
            currentSong.pause()
            play.src = "assets/play.svg"
        }
    })

    //Listen for time update

    currentSong.addEventListener("timeupdate", () => {
        console.log(currentSong.currentTime, currentSong.duration)
        document.querySelector(".songtime").innerHTML = `${secondsToMinutesSeconds(currentSong.currentTime)} / ${secondsToMinutesSeconds(currentSong.duration)}`

        document.querySelector(".circle").style.left =
            (currentSong.currentTime / currentSong.duration) * 100 + "%"
    })

    //Add event listner to seekbar
    document.querySelector(".seekbar").addEventListener("click", e => {
        document.querySelector(".circle").style.left = (e.offsetX / e.target.getBoundingClientRect().width) * 100 + "%";
        currentSong.currentTime = (currentSong.duration * (e.offsetX / e.target.getBoundingClientRect().width) * 100) / 100

    })

    //Add an event listner to previous and next
    previous.addEventListener("click", () => {
        currentSong.pause()
        let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0])


        if ((index - 1) >= 0) {
            playMusic(songs[index - 1])
        }

    })


    next.addEventListener("click", () => {
        currentSong.pause()
        console.log("next clicked")
        let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0])


        if ((index + 1) < songs.length) {
            playMusic(songs[index + 1])
        }
    })

    //Add an event to volume
    document.querySelector(".range").getElementsByTagName("input")[0].addEventListener("change", (e) => {
        console.log(e)
        currentSong.volume = parseInt(e.target.value) / 100;
    })

   
}







main()