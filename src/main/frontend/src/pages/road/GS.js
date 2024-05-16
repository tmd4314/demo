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
                center: new navermaps.LatLng(33.392044, 126.543971),
                zoom: 13,
            });

           const points = [
                   { lat:  33.421384, lng: 126.550326, content:'마커 1 정보' },
                   // Add more points here as needed
                   { lat: 33.390500, lng: 126.537960,  content: '마커 3 정보'},
                   { lat: 33.383450, lng: 126.534770, content:'마커 1 정보' },
                   { lat: 33.376740, lng: 126.530720, content: '마커 3 정보'},
                   { lat: 33.360962, lng: 126.535637, content:'마커 1 정보' }
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
            const defaultPosition = new navermaps.LatLng(33.421384, 126.550326);
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
                    <Link to="/user/dn"><button id="dnBtn">돈내코탐방로</button></Link>
                    <Link to="/user/sg"><button id="sgBtn">석굴암탐방로</button></Link>
                    <Link to="/user/gs"><button id="gsBtn" className="gsBtn">관음사탐방로</button></Link><br/>
                </div>
            </div>
            <div className='map'>
                <div className='map-info'>
                    <h3>지도로 보는 한라산</h3>
                    <h5>관음사 탐방로</h5>
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
                <p><br/><h3>총 8.7㎞ [관음사지구야영장→삼각봉대피소(6㎞)→동능정상(8.7㎞)]</h3><br/>


                한라산 북쪽코스인 관음사탐방로는 성판악탐방로와 더불어 한라산 정상인 백록담 을 오를 수 있는 8.7㎞의 탐방로이며, 편도 5시간 정도 소요된다. 계곡이 깊고 산세가 웅장하며, 해발 고도 차이도 커 한라산의 진면목을 볼 수 있다. 전문 산악인들은 물론, 성판악 코스 탐방객들도 하산 할 때 주로 이 코스를 이용한다. 관음사지구야영장을 출발하여 숲길을 따라 30분 정도 올라가면 구린굴 을 만나게 된다. 이 굴은 제주도내 동굴 중 가장 높은 곳에 위치하고 있으며, 다양한 동굴동물과 박쥐의 집단서식지로 학술적 가치가 높다.<br/><br/>



                구린굴에서 30분 정도 걸으면 탐라계곡이 나오고 계곡을 지나 능선을 오르면 울창한 숲을 만나게 되는데 이곳이 개미등 이다. 이 개미등에서 50분 정도 올라야 삼각봉에 이른다. 삼각봉대피소를 지나 계곡을 내려가면 용진각계곡이 나온다.<br/><br/>



                삼각봉은 화산폭발로 빚어진 기기묘묘한 바위와 웅장한 품새, 고사목 등 수려한 경관을 감상할 수 있는 곳이기도 하다. 경사가 가파른 만큼 호흡을 조절해야할 정도로 힘들지만, 이곳에서 1시간 40분 걸으면 백록담으로 이어진다.<br/><br/>



                참고로 탐방로 입구에는 야영장이 있으며, 자연생태계를 관찰하면서 삼림욕도 즐길 수 있는 장점을 갖고 있다.



                <br/> 주의사항> 탐방로가 길고 산행 난이도가 높아 하산 시 다리골절이나 체력소모로 인한 탈진 등의 안전사고가 발생될 수 있으므로 그룹탐방을 하는 것이 좋으며, 특히 동절기는 해가 짧아져 하산시 안전사고의 위험이 높아지므로 어두워지기 전에 서둘러 산행을 마무리 할 수 있도록 각별히 주의를 기울여야 한다.<br/><br/>



                <br/><br/><h5>탐방로 등급 (난이도 - A: 어려움, B:보통, C:쉬움)</h5>
                <br/><br/>탐방안내소 -B- 탐라계곡 -A- 삼각봉대피소 -C- 용진각 -A- 정상(백록담)
                <br/><br/>대 피 소 : 삼각봉대피소(유인)
                <br/><br/>매     점 : 관음사탐방로 전 구간에는 매점이 없으므로 사전에 산행에 필요한 물품은 철저히 준비하여 주시기 바랍니다.  단, 관음사탐방로 입구 휴게소 운영 (간단한 먹거리 포함 식수, 면장갑, 비옷, 아이젠 등 등산장비)
                <br/><br/>화 장 실 : 관음사야영장, 탐라계곡, 삼각봉대피소
                <br/><br/>교     통 : 제주시 시외버스터미널에서 서귀포 방면(5.16도로-281번) 시외버스 이용(25분)
                제주대학교 내려 관음사방향(1117번 도로) 시외버스 475번 이용 (15분) 관음사 등산로 입구에 내리면 관음사 야영장이 있다.
                <br/><br/>대중교통 281번, 475번 버스운영 시간 -> 제주버스정보시스템 http://bus.jeju.go.kr/ 을 통해 쉽게 알아 볼 수 있다.
                <br/><br/>기타 문의 : 한라산국립공원관리소  064)713-9950~1 / 관음사지소  064)756-9950</p>
            </div>       
        </div>
    );
};

export default MapWithPanoramaAndRoute;