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
                    center: new navermaps.LatLng(33.372633, 126.572627),
                    zoom: 13,
                });

               const points = [
                       { lat: 33.384800, lng: 126.618999 ,content:'성판악 탐방안내소' },
                       // Add more points here as needed
                       {lat: 33.380000, lng: 126.581381  ,content: '속밭 대피소'},
                       {lat: 33.373330, lng: 126.568600 ,content:'사라오름 입구' },
                       {lat: 33.369430, lng: 126.555590 ,content: '진달래밭(1,500m)'},
                       {lat: 33.360962, lng: 126.535637 ,content:'정상(동능)' }
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
            const defaultPosition = new navermaps.LatLng(33.384800, 126.618999);
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
                    <Link to="/user/sp"><button id="spBtn" className="spBtn">성판악탐방로</button></Link>
                    <Link to="/user/as"><button id="asBtn">어승생악탐방로</button></Link>
                    <Link to="/user/dn"><button id="dnBtn">돈내코탐방로</button></Link>
                    <Link to="/user/sg"><button id="sgBtn">석굴암탐방로</button></Link>
                    <Link to="/user/gs"><button id="gsBtn">관음사탐방로</button></Link><br/>
                </div>
            </div>

            <div className='map'>
                <div className='map-info'>
                    <h3>지도로 보는 한라산</h3>
                    <h5>성판악 탐방로</h5>
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
                <p><br/><h3>총 9.6㎞ [성판악→진달래밭(7.3㎞)→동능정상(9.6㎞)]</h3>


                한라산 동쪽코스인 성판악탐방로는 관음사탐방로와 더불어 한라산 정상인 백록담 을 오를 수 있는 탐방로이다. 한라산 탐방로 중에는 가장 긴 9.6㎞이며, 편도 4시간 30분이 소요된다.<br/><br/>



                성판악관리사무실(해발750m)에서 출발하여 속밭, 사라오름입구, 진달래밭대피소를 지나 정상까지는 대체적으로 완만한 경사를 이루어 큰 무리는 없으나 왕복 19.2km를 걸어야 하기 때문에 체력안배에 많은 신경을 써야 한다. 하산은 관음사 코스로도 가능하다.<br/><br/>



                또한 탐방로 5.8km지점에 사라오름으로 향하는 길을 따라 600m를 오르면 산정호수와 한라산의 아름다운 경관을 감상할 수 있는 사라오름전망대가 있다.<br/><br/>



                이 탐방로의 특징은 백록담 정상을 제외하고는 대부분 숲으로 형성되어 있어 삼림욕을 즐기며 탐방하기에 최적의 장소이다. 탐방로에서 보이는 오름군락은 화산섬의 신비감을 그대로 전달해준다. 한라산 자생지인 구상나무 숲이 가장 넓게 형성된 곳이며 한라장구채 큰오색딱따구리 오소리 노루 등의 한라산 동·식물을 관찰할 수 있다.<br/><br/>



                주의사항> 탐방로가 길고 산행 난이도가 높아 하산 시 다리골절이나 체력소모로 인한 탈진 등의 안전사고가 발생될 수 있으므로 그룹탐방을 하는 것이 좋으며, 특히 동절기는 해가 짧아져 하산시 안전사고의 위험이 높아지므로 어두워지기 전에 서둘러 산행을 마무리 할 수 있도록 각별히 주의를 기울여야 한다.<br/><br/>



                <br/><br/><h5>탐방로 등급 (난이도 - A: 어려움, B:보통, C:쉬움)</h5>
                <br/><br/>탐방안내소 -C- 속밭 -C- 사라악샘-B- 진달래밭 대피소-A- 정상(백록담)
                <br/><br/>대 피 소 : 속밭대피소(무인), 진달래밭대피소(유인)
                <br/><br/>매     점 : 성판악탐방로 전구간은 매점이 없으므로 사전에 산행에 필요한 물품(식수, 간단한 먹거리 등)은 철저히 준비하여 주시기 바랍니다.
                <br/><br/>화 장 실 : 성판악사무실, 속밭대피소, 진달래밭대피소
                <br/><br/>교     통 : 제주시 시외버스터미널에서 서귀포 방면(516도로-간선281/ 직행181) 시외버스 이용(40분) 입구에서 내려 2분쯤 걸으면 성판악 탐방로가 있다. 성판악탐방로는 주차장이 협소하여 성수기에는 탐방시간 시작 전에 만차가 되는 경우가 많으므로 반드시 대중교통을 이용하여 주시기 바랍니다.
                <br/><br/>대중교통 281번, 181번 버스운영 시간 -> 제주버스정보시스템 http://bus.jeju.go.kr/ 을 통해 쉽게 알아 볼 수 있다.
                <br/><br/>기타 문의 : 한라산국립공원관리소  (064)713-9950~1 / 성판악지소  (064)725-9950</p>
            </div>
        </div>
        </Layout>
    );
};

export default MapWithPanoramaAndRoute;