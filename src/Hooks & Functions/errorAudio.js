import sound from "../assets/error.mp3";

export const errorSound = () => {
    let audio = new Audio()
    audio.src = sound
    audio.play()
}