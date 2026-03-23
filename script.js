let playBtn = document.getElementById("play")
let progress = document.getElementById("progress")
let title = document.getElementById("song-title")
let artist = document.getElementById("song-artist")
let songImg = document.getElementById("song-img")

let song = new Audio()
let isPlaying = false

playBtn.addEventListener("click", () => {
    if (!song.src) return

    if (!isPlaying) {
        song.play()
        playBtn.innerText = "⏸"
    } else {
        song.pause()
        playBtn.innerText = "▶"
    }
    isPlaying = !isPlaying
})

function playSong(e, src, name, singer) {
    song.src = src
    song.play()

    document.querySelectorAll(".card").forEach(c => c.style.background="#181818")
    e.currentTarget.style.background = "#1DB954"

    title.innerText = name
    artist.innerText = singer

    songImg.src = e.currentTarget.querySelector("img").src

    playBtn.innerText = "⏸"
    isPlaying = true
}

song.addEventListener("timeupdate", () => {
    if (song.duration) {
        progress.value = (song.currentTime / song.duration) * 100
    }
})

progress.addEventListener("input", () => {
    if (song.duration) {
        song.currentTime = (progress.value / 100) * song.duration
    }
})

document.getElementById("search").addEventListener("input", function () {
    let value = this.value.toLowerCase()
    document.querySelectorAll(".card").forEach(card => {
        card.style.display = card.innerText.toLowerCase().includes(value) ? "block" : "none"
    })
})

song.addEventListener("ended", () => {
    playBtn.innerText = "▶"
    isPlaying = false
})