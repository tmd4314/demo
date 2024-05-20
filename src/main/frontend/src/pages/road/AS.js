import React, { useState, useEffect, useRef } from 'react';
import { Container as MapDiv, useNavermaps } from 'react-naver-maps';
import { Link } from 'react-router-dom';
import Layout from '../../Layout';

import '../../css/road.css';

const MapWithPanoramaAndRoute = () => {
    const navermaps = useNavermaps();
    const panoramaRef = useRef(null);
    const [infoWindows, setInfoWindows] = useState([]); // 마커별 정보창 배열
    const [panorama, setPanorama] = useState(null);
    const [currentInfoWindow, setCurrentInfoWindow] = useState(null); // 현재 열린 InfoWindow 저장

    useEffect(() => {
            if (navermaps && panoramaRef.current) {
                const map = new navermaps.Map('map', {
                    center: new navermaps.LatLng(33.3944876,126.4920019),
                    zoom: 16,
                });

                const points = [
                        { lat:  33.3926876, lng: 126.4948419, content: '어리목 탐방안내소' },
                        // Add more points here as needed
                        { lat: 33.396550, lng: 126.489240, content:'어승생악' }
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
            const defaultPosition = new navermaps.LatLng(33.3627, 126.536);
            openPanorama(defaultPosition);
        }
    };

    return (
    <Layout>
        <div>
            <div className='road-menu'>
                <div className="road-menu-btn">
                    <Link to="/user/ar"><button id="arBtn">어리목탐방로</button></Link>
                    <Link to="/user/ys"><button id="ysBtn">영실탐방로</button></Link>
                    <Link to="/user/sp"><button id="spBtn">성판악탐방로</button></Link>
                    <Link to="/user/as"><button id="asBtn" className="asBtn">어승생악탐방로</button></Link>
                    <Link to="/user/dn"><button id="dnBtn">돈내코탐방로</button></Link>
                    <Link to="/user/sg"><button id="sgBtn">석굴암탐방로</button></Link>
                    <Link to="/user/gs"><button id="gsBtn">관음사탐방로</button></Link><br/>
                </div>
            </div>
            <div className='map'>
                <div className='map-info'>
                    <h3>지도로 보는 한라산</h3>
                    <h5>어승생악 탐방로</h5>
                    <p>표시된 곳을 눌러면 체험할 수 있습니다.</p>                      
                </div>
                <MapDiv id="map" style={{
                    position: 'relative',
                    width: '100%',
                    height: '600px',
                    margin: '10px',
                }} />
                <div ref={panoramaRef} style={{width: '100%', height: '600px', margin: '10px'}} ></div>
            </div>
            <div className='trail-info'>

                     <p><br/> <h3>총1.3㎞ [탐방안내소 → 어승생악정상(1.3㎞)] </h3><br/>
                        어승생악은 가벼운 등산을 원하는 탐방객이 즐겨찾는 오름으로서 자연생태가 잘 보존되어 있으며, 자연학습탐방로로 활용되고 있다. 날씨가 쾌청한 날에는 멀리 추자도, 비양도, 성산일출봉이 한눈에 내려다보이며 어승생악 정상까지는 1.3Km이다. 탐방소요시간은 편도 약 30분이며, 어리목 탐방안내소 옆에 입구가 있다.<br/>
                       <br/> 해발 1,169m 어승생악 정상에는 1945년 당시 만들어진 일제군사시설인 토치카가 남아있으며, 내부는 아직도 견고하여 5~6명이 설 수 있는 공간이 있다. 참호를 통해 서로 연결되어 있으며, 어승생악 허리의 지하요새와 통하게 되어 있었으나 지금은 함몰되어 막혀있다.<br/>
                       <br/><br/><br/>대중교통 240번 버스운영 시간 -> 제주버스정보시스템 http://bus.jeju.go.kr/ 을 통해 쉽게 알아 볼 수 있다.
                       <br/><br/> 매     점 : 어승생악탐방로 전구간은 매점이 없으므로 사전에 산행에 필요한 물품(식수, 간단한 먹거리 등)은 철저히 준비하여 주시기 바랍니다. 단, 물과 음료수는 탐방로 입구 자판기 이용 구입 가능
                       <br/><br/>기타 문의 : 한라산국립공원관리소 (064)713-9950~1
                         </p>
            </div>
        </div>
        </Layout>
    );
};

export default MapWithPanoramaAndRoute;