import React, { useState, useEffect, useRef } from 'react';
import { Container as MapDiv, useNavermaps } from 'react-naver-maps';
import { Link } from 'react-router-dom';

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
                center: new navermaps.LatLng(33.334281, 126.551194),
                zoom: 13,
            });

           const points = [
                              { lat:  33.313956, lng: 126.571600, content: '마커 3 정보' },
                              // Add more points here as needed
                              { lat: 33.348600, lng: 126.545150, content: '마커 4 정보' },
                              { lat: 33.354514, lng: 126.534040, content: '마커 5 정보' }
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
            const defaultPosition = new navermaps.LatLng(33.313956, 126.571600);
            openPanorama(defaultPosition);
        }
    };

    return (
        <div>       
            <div className='road-menu'>
                <div className="road-menu-btn">
                    <Link to="/user/ar"><button id="arBtn">어리목탐방로</button></Link>
                    <Link to="/user/ys"><button id="ysBtn">영실탐방로</button></Link>
                    <Link to="/user/sp"><button id="spBtn">성판악탐방로</button></Link>
                    <Link to="/user/as"><button id="asBtn">어승생악탐방로</button></Link>
                    <Link to="/user/dn"><button id="dnBtn" className="dnBtn">돈내코탐방로</button></Link>
                    <Link to="/user/sg"><button id="sgBtn">석굴암탐방로</button></Link>
                    <Link to="/user/gs"><button id="gsBtn">관음사탐방로</button></Link><br/>
                </div>
            </div>

            <div className='map'>
                <div className='map-info'>
                    <h3>지도로 보는 한라산</h3>
                    <h5>돈내코 탐방로</h5>
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
                <p><br/><h3>총 7㎞ [돈내코탐방안내소→평궤대피소(5.3㎞)→남벽분기점(7㎞)]</h3><br/>


                돈내코탐방로는 서귀포시 돈내코유원지 상류에 위치한 탐방안내소(해발500m)에서 시작하여 썩은물통, 살채기도, 평궤대피소(해발1,450m)를 지나 남벽분기점(해발1,600m)까지 이어지는 총7km의 탐방로이며 편도 3시간 30분 정도 소요된다. 윗세오름과 연결된 남벽순환로를 따라가면 어리목과 영실탐방로로 하산 할 수도 있다.<br/><br/>



                탐방안내소에서 평궤대피소(해발1,450m)까지 완만한 오르막이 계속되며 평궤대피소(해발1,450m)에서 남벽분기점(해발1,600m)까지는 거의 평탄지형으로 한라산백록담 화구벽의 웅장한 자태를 한눈에 볼 수 있다.<br/><br/>



                돈내코탐방로는 동백나무, 사스레피나무 등 상록활엽수림과 단풍나무 서어나무 등 낙엽활엽수림, 그리고 구상나무, 시로미 등 한대수림이 수직적으로 분포하고 있으며 기후변화에 따른 식물의 변화상을 관찰할 수 있는 곳이다.<br/><br/>



                평궤대피소에서 남벽분기점 일대는 한라산 백록담 현무암이 넓게 분포하고 있으며 소규모의 용암동굴과 새끼줄구조가 관찰되며 한라산백록담조면암의 라바돔을 가장 멋있게 조망할 수 있다.<br/><br/>

                돈내코탐방로는 용천수가 없는 곳으로 반드시 여분의 식수를 지참해야 하며 남벽분기점 일대는 기상변화가 심한 곳이므로 지정된 탐방로를 이용하고 개인 보다는 소규모의 그룹탐방을 하는 것이 바람직하다. 어리목과 영실탐방로로 이어지는 윗세오름대피소로 갈 수 있다.<br/><br/>



                <br/><br/><h5>탐방로 등급 (난이도 - A:어려움, B:보통, C:쉬움)</h5>
                <br/><br/>탐방안내소 -B- 평궤대피소 -B- 남벽분기점
                <br/><br/>대 피 소 : 평궤대피소(무인)
                <br/><br/>매     점 : 돈내코탐방로 전구간은 매점이 없으므로 사전에 산행에 필요한 물품(식수, 간단한 먹거리 등)은 철저히 준비하여 주시기 바랍니다.
                <br/><br/>화 장 실 : 돈내코탐방안내소, 펭궤대피소
                <br/><br/>교     통 : 제주시 시외버스터미널에서 서귀포 방면(5.16도로) - 돈내코탐방안내소까지 약50분소요 / 서귀포시-돈내코탐방안내소 20분 소요=>5.16도로 버스(281번 버스) 이용  서귀포산업과학고등학교 앞에서 하차->시내버스 611,612 환승 충혼묘지광장에서 내려->1키로미터(20분)걸으면 돈내코탐방안내소가  있다.
                <br/><br/>대중교통 버스운영 시간 -> 제주버스정보시스템 http://bus.jeju.go.kr/ 을 통해 쉽게 알아 볼 수 있다.
                <br/><br/>기타 문의 : 한라산국립공원관리소 064)713-9950~1 /돈내코분소 : 064)710-6920~3
                </p>
            </div>  
        </div>
    );
};

export default MapWithPanoramaAndRoute;