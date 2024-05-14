import React, { useState, useEffect, useRef } from 'react';
import { Container as MapDiv, useNavermaps } from 'react-naver-maps';

const MapWithPanoramaAndRoute = () => {
    const navermaps = useNavermaps();
    const panoramaRef = useRef(null);
    const [infoWindows, setInfoWindows] = useState([]); // 마커별 정보창 배열
    const [panorama, setPanorama] = useState(null);
    const [currentInfoWindow, setCurrentInfoWindow] = useState(null); // 현재 열린 InfoWindow 저장

    useEffect(() => {
        if (navermaps && panoramaRef.current) {
            const map = new navermaps.Map('map', {
                center: new navermaps.LatLng(33.407000, 126.499011),
                zoom: 16,
            });

           const points = [
                              { lat:  33.410956, lng: 126.4943619, content: '마커 3 정보' },
                              // Add more points here as needed
                               { lat: 33.402650, lng: 126.5021070 ,content:'마커 1 정보' }
                          ];

            const markers = points.map((point, index) => {
                const marker = new navermaps.Marker({
                    position: new navermaps.LatLng(point.lat, point.lng),
                    map: map,
                });

                const infoWindow = new navermaps.InfoWindow({
                    content: point.content,
                });

                // 마커 클릭 이벤트 처리
                navermaps.Event.addListener(marker, 'click', () => {
                    if (currentInfoWindow) {
                        currentInfoWindow.close(); // 열린 InfoWindow가 있다면 닫기
                        setCurrentInfoWindow(null); // 현재 InfoWindow 초기화
                    }

                    if (infoWindow.getMap()) {
                        infoWindow.close(); // 이미 열려있는 InfoWindow를 닫기
                    } else {
                        infoWindow.open(map, marker); // 마커에 연결된 InfoWindow 열기
                        setCurrentInfoWindow(infoWindow); // 열린 InfoWindow 저장

                        if (panorama && panorama.getVisible()) {
                            panorama.setVisible(false); // 파노라마가 열려있다면 닫기
                            setPanorama(null); // 파노라마 초기화
                        }

                        openPanorama(marker.getPosition()); // 클릭한 마커의 위치로 파노라마 이동
                    }
                });

                return { marker, infoWindow };
            });

            setInfoWindows(markers.map(marker => marker.infoWindow));

            // 컴포넌트가 처음 렌더링될 때 파노라마 창을 엽니다.
            openDefaultPanorama();
        }
    }, [navermaps, panoramaRef]);

    const openPanorama = (position) => {
        const panoramaOptions = {
            position: position,
            pov: {
                pan: -135,
                tilt: 29,
                fov: 100
            },
            visible: true,
            aroundControl: true,
            minScale: 0,
            maxScale: 10,
            minZoom: 0,
            maxZoom: 4,
            flightSpot: true,
            logoControl: true,
            logoControlOptions: {
                position: navermaps.Position.BOTTOM_RIGHT
            },
            zoomControl: true,
            zoomControlOptions: {
                position: navermaps.Position.TOP_LEFT,
                style: navermaps.ZoomControlStyle.SMALL
            },
            aroundControlOptions: {
                position: navermaps.Position.TOP_RIGHT
            }
        };

        const pano = new navermaps.Panorama(panoramaRef.current, panoramaOptions);
        setPanorama(pano);
    }

    // 처음 렌더링될 때 파노라마 창을 열기 위한 함수
    const openDefaultPanorama = () => {
        if (panoramaRef.current && navermaps) {
            const defaultPosition = new navermaps.LatLng(33.411006,126.494019);
            openPanorama(defaultPosition);
        }
    };

    return (
        <div>
                    <br/><h3>어리목 탐방로</h3><br/>
                        <div className="trail-name1">
                        <button id="road11" onClick={() => window.location.href = "/user/ar"}>어리목탐방로</button>
                        <button id="road12" onClick={() => window.location.href = "/user/ys"}>영실탐방로</button>
                        <button id="road13" onClick={() => window.location.href = "/user/sp"}>성판악탐방로</button>
                        <button id="road14" onClick={() => window.location.href = "/user/as"}>어승생악탐방로</button>
                        <button id="road15" onClick={() => window.location.href = "/user/dn"}>돈내코탐방로</button>
                        <button id="road16" onClick={() => window.location.href = "/user/sg"}>석굴암탐방로</button>
                        <button id="road17" onClick={() => window.location.href = "/user/gs"}>관음사탐방로</button><br/>
                        </div><br/>
            <MapDiv id="map"
                style={{
                    position: 'relative',
                    width: '100%',
                    height: '600px',
                    margin: '10px',
                }}
            />
            <br/><div ref={panoramaRef} style={{width: '100%', height: '600px', margin: '10px'}} ></div>
                        <p><br/>석굴암탐방로는 제주시와 인접해 있어 승용차로 약 20분 정도면 탐방로 입구에 도착 할 수 있다. 1100도로(1139번도로)변 천왕사사찰 입구에서 삼나무 숲길을 10여분 걸으면 탐방로가 시작되는 국립제주호국원 주차장에 도착한다. 석굴암 암자까지 편도 1. 5Km에 50분이 소요된다.<br/><br/>



                           골짜기와 산세가 뛰어난 아흔아홉골에 위치한 석굴암 탐방로는 도심에서 벗어나 가볍게 등산을 원하는 탐방객들이 많이 찾는 코스다. 한라산의 깊은 계곡, 소나무와 활엽수가 혼재한 울창한 숲 사이로 스쳐가는 바람 소리가 도심속의 찌든 때를 씻어 주기에 더없이 안성맞춤인 곳이다. 계곡에 있는 석굴암은 우뚝 우뚝 선 바위들과 함께 암벽에 “南無 十六 大阿羅漢 聖衆”이란 마애명이 새겨져 있기도 하다.<br/>



                          <br/><br/>대중교통 240번 버스운영 시간 -> 제주버스정보시스템 http://bus.jeju.go.kr/ 을 통해 쉽게 알아 볼 수 있다.
                          <br/><br/> 매     점 : 석굴암탐방로 전구간은 매점이 없으므로 사전에 산행에 필요한 물품(식수, 간단한 먹거리 등)은 철저히 준비하여 주시기 바랍니다.
                           <br/><br/>기타 문의 : 한라산국립공원관리소  064)713-9950~1
                            </p>
                   </div>
    );
};

export default MapWithPanoramaAndRoute;