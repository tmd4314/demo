import React, { useState } from 'react';
import Layout from '../../Layout';
import '../../css/CCTV.css';
import Hls from 'hls.js';

const CCTV1 = () => {
  const [videoLoaded, setVideoLoaded] = useState(false);

  const handleVideoPlay = () => {
    const videoElement = document.getElementById('video');
    if (videoElement) {
      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource('https://hallacctv.kr/live/cctv01.stream_360p/playlist.m3u8');
        hls.attachMedia(videoElement);
        hls.on(Hls.Events.MANIFEST_PARSED, function () {
          videoElement.play();
        });
      } else if (videoElement.canPlayType('application/vnd.apple.mpegurl')) {
        videoElement.src = 'https://hallacctv.kr/live/cctv01.stream_360p/playlist.m3u8';
        videoElement.addEventListener('loadedmetadata', function () {
          videoElement.play();
        });
      }
      setVideoLoaded(true);
    }
  };

  return (
  <Layout>
    <div className="container">
      <div className="row">
        <div className="col-sm-3">
          <div className="alert alert-info menu-title">실시간 CCTV(백록담)
              <ul id="sources" className="urls list-unstyled">
                <li className="url" active><a href="/user/cctv1">백록담</a></li>
                <li className="url"><a href="/user/cctv2">왕관릉</a></li>
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
    </Layout>
  );
};

export default CCTV1;
