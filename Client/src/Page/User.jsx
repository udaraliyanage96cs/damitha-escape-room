import io from "socket.io-client";
import { useEffect, useState, Fragment } from "react";
const socket = io.connect("http://localhost:3000");

import SoundTrack1 from "../assets/track1.wav";
import SoundTrack2 from "../assets/track2.wav";

export default function User() {
  const [messageReceived, setMessageReceived] = useState("");
  const [loading, setLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  const [isPaused, setIsPaused] = useState(false);

  const [isPlaying, setIsPlaying] = useState(false);
  const [audioTrack1] = useState(new Audio(SoundTrack1));
  const [audioTrack2] = useState(new Audio(SoundTrack2));

  const [mainTime, setMainTime] = useState(0);
  const [sec, setSec] = useState(60);
  const [min, setMin] = useState(60);

  useEffect(() => {
    let timeout = 0;
    socket.on("receive_message", (data) => {
      console.log("a");
      playAudio();
      setShowContent(true);
      console.log(data);
      setMessageReceived(data);
      setLoading(false);
      timeout = data.data.time * 1000;
      setTimeout(() => {
        setShowContent(false);
      }, timeout);
    });
    socket.on("getTimer", (data) => {
      console.log("b");
      if (data == "true") {
        playAudioBackground();
        console.log(data);
        setIsPaused(false);
        console.log(data);
      }else{
        setIsPaused(true);
      }
    });
    socket.on("getPauseTimer", (data) => {
      console.log("c");
      pauseAudio();
      if (data == "true") {
        setIsPaused(true);
      }
    });
    socket.on("getResumeTimer", (data) => {
      console.log("d");
      audioTrack2.play();
      console.log(data);
      if (data == "true") {
        setIsPaused(false);
      }
    });
    socket.on("getResetTimer", (data) => {
      console.log("e");
      stopAudio();
    });
    socket.on("get_time_data", (data) => {
      console.log("f");
      playAudioBackground();
      setMainTime(data);
      let minutes_new = Math.floor(data / 60);
      let seconds_new = data % 60;
      console.log(minutes_new + ":" + seconds_new);
      setSec(seconds_new);
      setMin(minutes_new);
    });
    console.log("g");
  }, [socket]);

  useEffect(() => {
    const handleEnd = () => setIsPlaying(false);
    audioTrack1.addEventListener("ended", handleEnd);
    return () => audioTrack1.removeEventListener("ended", handleEnd);
  }, [audioTrack1]);

  useEffect(() => {
    const handleEnd = () => setIsPlaying(false);
    audioTrack2.addEventListener("ended", handleEnd);
    audioTrack2.loop = true;
    return () => audioTrack2.removeEventListener("ended", handleEnd);
  }, [audioTrack2]);

  const playAudio = () => {
    audioTrack2.volume = 1;
    audioTrack1.play();
    setIsPlaying(true);
    audioTrack2.volume = 0.5;
  };

  const stopAudio = () => {
    audioTrack1.pause();
    audioTrack1.currentTime = 0;

    audioTrack2.pause();
    audioTrack2.currentTime = 0;
    setIsPlaying(false);
  };

  const playAudioBackground = () => {
    audioTrack2.play();
    setIsPlaying(true);
  };

  const pauseAudio = () => {
    audioTrack2.pause();
    setIsPlaying(false);
  };

  return (
    <div className="container">
      <div className="h-75">
        {!loading && (
          <div className="h-75  d-flex ">
            {showContent && (
              <div className="display-text mesage-text d-flex align-items-center">
                {messageReceived.data.message}
              </div>
            )}
          </div>
        )}
      </div>
      <div className="display-text h-25 align-items-center justify-content-center">
        <h4 className="timer">
          {min}:{sec < 10 ? "0" : ""}
          {sec}
        </h4>
      </div>
    </div>
  );
}
