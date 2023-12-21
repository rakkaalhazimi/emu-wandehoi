"use client"
import { useRef, useState } from "react"



const IMG_WIDTH = 250
const IMG_HEIGHT = 216
// Default element placement will be altered when we rotate the image.
// For instance, when we move the element to the top-left corner,
// you will get your element out of page when you perform rotation on it.
// That is why we need to readjust the placement.
const OFFSET = Math.floor(Math.abs(IMG_HEIGHT - IMG_WIDTH) / 2)
const SHIFT_FACTORS = [0, 25, 50, 75, 100]

enum Direction {
  Up,
  Right,
  Down,
  Left
}

function randint(min: number, max: number) {
  return Math.floor(Math.random() * (max - min) + min)
}


export default function Home() {
  
  const audioRef = useRef<HTMLSourceElement>(null)
  const [emuArray, setEmuArray] = useState<JSX.Element[]>([])
  
  function EmuStamp() {
    const emuRef = useRef<HTMLImageElement>(null)
    setTimeout(() => {
      // emuRef.current?.remove()
    }, 1500)
    
    let direction = Math.floor(Math.random() * Object.keys(Direction).length / 2)
    let verticalShift = randint(OFFSET, window.innerHeight - IMG_WIDTH)
    let horizontalShift = randint(0, window.innerWidth - IMG_WIDTH)
    let style = {}
    
    switch (direction) {
      default:
      case Direction.Up:
        style = {
          position: 'absolute',
          top: '0px',
          left: `${horizontalShift}px`,
          transform: 'rotate(180deg)'
        }
        // console.log("up")
        break;
        
      case Direction.Right:
        style = {
          position: 'absolute',
          top: `${verticalShift}px`,
          right: `-${OFFSET}px`,
          transform: 'rotate(-90deg)'
        }
        // console.log("right")
        break;
        
      case Direction.Down:
        style = {
          position: 'absolute',
          bottom: '0px',
          left: `${horizontalShift}px`,
        }
        // console.log("down")
        break;
        
      case Direction.Left:
        style = {
          position: 'absolute',
          top: `${verticalShift}px`,
          left: `-${OFFSET}px`,
          transform: 'rotate(90deg)'
        }
        // console.log("left ", verticalShift)
        break;
    }
    
    return (
      <img 
        ref={emuRef}
        style={style}
        width={IMG_WIDTH}
        height={IMG_HEIGHT}
        src="/Emu_Stamp_Wandahoi.webp"
      />
    )
  }
  
  function playAudio() {
    const audioAPI = new Audio()
    
    if (audioRef.current != null) {
      audioAPI.appendChild(audioRef.current)
      audioAPI.play()
    }
    
    const myuuid = crypto.randomUUID()
    setEmuArray([...emuArray, <EmuStamp key={myuuid}></EmuStamp>])
    
  }
  
  
  return (
    <main>
      <h2 className="absolute top-1 left-1 z-50">Emu count: {emuArray.length}</h2>
      <h1
        className={
          "absolute bottom-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 " +
          "text-7xl font-bold "
        }
      >
        Emu Otori
      </h1>
      <source hidden ref={audioRef} src="/wonderhoi.mp3" type="audio/mpeg"></source>
      <button 
        className={
          "h-auto py-3 px-6 " +
          "absolute bottom-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 " +
          "bg-pink-500 hover:bg-pink-600 text-gray-50 "
        }
        onClick={playAudio}>
          Wandahoi !
      </button>
      {emuArray}
    </main>
  )
}
