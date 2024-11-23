import { useEffect, useState } from "react";

interface IProps{
    text:string
    voice?: SpeechSynthesisVoice;
}

function TextToSpeech({text,voice}:IProps){
    const [isPaused, setIsPaused] = useState(false);
    const [utterance, setUtterance] = useState<any>(null);
    const [pitch, setPitch] = useState(1);
    const [rate, setRate] = useState(1);
    const [volume, setVolume] = useState(1);

    useEffect(() => {
        const synth = window.speechSynthesis;
        const u = new SpeechSynthesisUtterance(text);
        const voices = synth.getVoices();
        // eslint-disable-next-line react-hooks/rules-of-hooks
        
        setUtterance(u);
    
        return () => {
          synth.cancel();
        };
      }, [text]);


      const handlePlay = () => {
        const synth = window.speechSynthesis;
    
        if (isPaused) {
          synth.resume();
        } else {
          utterance.voice = voice;
          utterance.pitch = pitch;
          utterance.rate = rate;
          utterance.volume = volume;
          synth.speak(utterance);
        }
    
        setIsPaused(false);
      };

      const handlePause = () => {
        const synth = window.speechSynthesis;
    
        synth.pause();
    
        setIsPaused(true);
      };

      const handleStop = () => {
        const synth = window.speechSynthesis;
    
        synth.cancel();
    
        setIsPaused(false);
      };

      const handlePitchChange = (event:any) => {
        setPitch(parseFloat(event.target.value));
      };
    
      const handleRateChange = (event:any) => {
        setRate(parseFloat(event.target.value));
      };
    
      const handleVolumeChange = (event:any) => {
        setVolume(parseFloat(event.target.value));
      };
      console.log(voice);
      return (
        <div className="flex flex-col items-center justify-center gap-2 font-thin text-5xl">
           
          <div className="flex gap-2">
            <button className="text-lg text-white h-14 bg-secondary font-bold font-inter rounded-xl p-2 hover:cursor-pointer hover:bg-secondarylight" onClick={handlePlay}>
              {isPaused ? "Kontynuuj" : "Słuchaj"}
            </button>
          </div>

          {/* <label>
            Pitch:
            <input
              type="range"
              min="0.5"
              max="2"
              step="0.1"
              value={pitch}
              onChange={handlePitchChange}
            />
          </label>
    
          <br />
    
          <label>
            Speed:
            <input
              type="range"
              min="0.5"
              max="2"
              step="0.1"
              value={rate}
              onChange={handleRateChange}
            />
          </label>
          <br />
          <label>
            Volume:
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={handleVolumeChange}
            />
          </label> */}
        </div>
      );
    };
    
    export default TextToSpeech;