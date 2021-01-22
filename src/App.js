import "./App.css";
import { useEffect, useRef } from "react";
const host = "http://192.168.1.53:8000";
const Hls = window.Hls;

const config = {
  xhrSetup: function (xhr, url) {
    if (url.includes("/keys/"))
      xhr.setRequestHeader("x-playback-session-id", "123");
  },
};

function App() {
  var videoEl = useRef(null);

  useEffect(() => {
    var videoSrc = `${host}/streams/8bc495dd387d130be25aaae097785cda.m3u8`;
    //
    // First check for native browser HLS support
    //
    if (videoEl.current.canPlayType("application/vnd.apple.mpegurl")) {
      videoEl.current.src = videoSrc;
      //
      // If no native HLS support, check if hls.js is supported
      //
    } else if (Hls.isSupported()) {
      var hls = new Hls(config);
      hls.loadSource(videoSrc);
      hls.attachMedia(videoEl.current);
    }
  });

  return (
    <div className="App">
      <video
        playsInline
        id="video"
        ref={videoEl}
        controls
        width="300px"
        height="60px"
      />
    </div>
  );
}

export default App;
