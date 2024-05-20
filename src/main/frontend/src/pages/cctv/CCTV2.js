// CCTV.js
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
//import 'video.js/dist/video-js.css';
//import './css/video-js.css';
//import './css/cctv.css';
import Hls from 'hls.js';

const CCTV2 = () => {
  const [videoLoaded, setVideoLoaded] = useState(false);

  const handleVideoPlay = () => {
    const videoElement = document.getElementById('video');
    if (videoElement) {
      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource('https://hallacctv.kr/live/cctv02.stream_360p/playlist.m3u8');
        hls.attachMedia(videoElement);
        hls.on(Hls.Events.MANIFEST_PARSED, function () {
          videoElement.play();
        });
      } else if (videoElement.canPlayType('application/vnd.apple.mpegurl')) {
        videoElement.src = 'https://hallacctv.kr/live/cctv02.stream_360p/playlist.m3u8';
        videoElement.addEventListener('loadedmetadata', function () {
          videoElement.play();
        });
      }
      setVideoLoaded(true);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-3">
          <div className="alert alert-info menu-title">실시간 CCTV(왕관릉)
              <ul id="sources" className="urls list-unstyled">
                <li className="url"><a href="/user/cctv1">백록담</a></li>
                <li className="url active"><a href="/user/cctv2">왕관릉</a></li>
                <li className="url"><a href="/user/cctv3">윗세오름</a></li>
                <li className="url"><a href="/user/cctv4">어승생악</a></li>
              </ul>
          </div>
        </div>
        <div className="col-sm-9">
          <div className="wrapper">
            <div className="videocontent" id="videoEl">
              <video
                id="video"
                className="video-js vjs-default-skin"
                controls
                preload="auto"
                width="800"
                height="600"
              ></video>
            </div>
            {!videoLoaded && (
              <button className="btn btn-primary" onClick={handleVideoPlay}>비디오 재생</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CCTV2;
