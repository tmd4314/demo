import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Container as MapDiv, NaverMap, Marker, Polyline, useNavermaps } from 'react-naver-maps';
import '../../css/Home.css';

const MapWithPanoramaAndRoute = () => {
    const navermaps = useNavermaps();
    const [panorama, setPanorama] = useState(null);
    const panoramaRef = useRef(null);
    const [startPoint, setStartPoint] = useState(null);
    const [endPoint, setEndPoint] = useState(null);
    const [routePath, setRoutePath] = useState([]);
    const [markers, setMarkers] = useState([]);

    useEffect(() => {
        const initializePanorama = () => {
            const panoramaOptions = {
                // 크기를 반응형으로 조절하기 위해 width와 height를 삭제합니다.
                position: new navermaps.LatLng(33.3915539, 126.4952),
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
        };

        initializePanorama();

        // 브라우저 창의 크기가 변경될 때마다 패노라마의 크기를 조절합니다.
        const handleResize = () => {
            if (panorama) {
                panorama.setSize(new navermaps.Size(window.innerWidth, window.innerHeight));
            }
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            if (panorama) {
                panorama.destroy();
            }
        };
    }, []);

    const handleMapClick = useCallback(
        (event) => {
            if (!startPoint) {
                console.log('Setting start point:', event.coord);
                setStartPoint(event.coord);
            } else if (!endPoint) {
                console.log('Setting end point:', event.coord);
                setEndPoint(event.coord);
            } else {
                console.log('Resetting start point and end point');
                setStartPoint(null);
                setEndPoint(null);
                setRoutePath([]);
            }
        },
        [startPoint, endPoint]
    );
    const points = [
        { lat:  33.3926876, lng: 126.4948419 },
        // Add more points here as needed
        { lat: 33.375200, lng: 126.499150 },
        { lat: 33.369500, lng: 126.507675 },
        { lat: 33.362130, lng: 126.517760 },
        { lat: 33.354514, lng: 126.534040 }
    ];

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
            <MapDiv
                style={{
                    position: 'relative',
                    width: '96%',
                    height: '600px',
                    margin: '10px'
                }}
            >
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        zIndex: 1000,
                        padding: 5,
                    }}
                >
                </div>
                <NaverMap
                    onClick={handleMapClick}
                    defaultCenter={new navermaps.LatLng(33.374753, 126.506911)}
                    defaultZoom={14}
                >
                    {/* Render markers for each point */}
                    {points.map((point, index) => (
                        <Marker key={index} position={{lat: point.lat, lng: point.lng}}/>
                    ))}

                    {/* Render markers for dynamically added points */}
                    {markers.map((position, index) => (
                        <Marker key={index} position={position}/>
                    ))}

                    {startPoint && <Marker position={startPoint}/>}
                    {endPoint && <Marker position={endPoint}/>}
                    {routePath.length > 0 && (
                        <Polyline
                            path={routePath}
                            strokeColor={'#FF0000'}
                            strokeOpacity={0.7}
                            strokeWeight={3}
                        />
                    )}
                </NaverMap>
            </MapDiv>
            <br/><div ref={panoramaRef} style={{width: '96%', height: '600px', margin: '10px'}} ></div>
            <p><br/><h3>총 6.8㎞ [어리목→윗세오름(4.7㎞)→남벽분기점(6.8㎞)]</h3><br/>


                <br/>어리목탐방로는 한라산국립공원 어리목탐방로 입구(해발970m)에서 시작하여 어리목계곡, 사제비동산(해발1,423m), 만세동산(해발1,606m), 윗세오름 대피소(해발1,700m),
                남벽순환로를 거쳐 남벽분기점(해발1,600m)까지 이어지는 총 6.8km의 탐방로이며 편도 3시간 정도 소요된다.<br/>

                <br/>돈내코와 영실탐방로로 하산 할 수 있다. 경사가 가파른 사제비동산 구간은 다소 체력이 요구되기는 하지만 만세동산에서 윗세오름 대피소를 지나 남벽분기점 까지는 완만한 평탄지형으로서 백록담
                남쪽 화구벽과 한라산의 아름다운 풍광을 마음껏 즐길 수 있다.<br/>


                <br/>어리목탐방로는 사제비샘에서 식수를 구할 수 있지만 건기 시에 샘이 마르는 경우도 있다. 이곳 탐방로에서는 노루의 출현 빈도가 높은 편이다.

                남벽순환로는 고도차가 거의 없는 고산평원으로 깎아지른 수직절벽인 한라산 정상의 남벽과 세 개의 방애오름이 연이어 펼쳐진다.


                <br/><br/>어리목탐방로는 한라산을 찾는 탐방객들이 가장 많이 이용하는 곳이지만 윗세오름과 남벽순환로 일대에는 날씨변화가 심한편이어서 안개, 낙뢰, 환상보행 등의 위험요소가 발생하기 쉬운 곳이므로
                탐방 전에 날씨정보를 알아보는 것이 좋다.


                <br/><br/><br/><br/><h5>탐방로 등급 (난이도 - A: 어려움, B:보통, C:쉬움)
                한라산국립공원 탐방안내소 -C- 어리목계곡 -A- 사제비동산 -B- 만세동산 -C- 윗세오름대피소 -C- 남벽분기점</h5>
                <br/><br/>대 피 소 : 윗세오름 대피소(유인)
                <br/><br/>매 점 : 어리목탐방로 전구간은 매점이 없으므로 사전에 산행에 필요한 물품(식수, 간단한 먹거리 등)은 철저히 준비하여 주시기 바랍니다. 단, 물과 음료수는 탐방로 입구 자판기 이용 구입
                가능
                <br/><br/>화 장 실 : 어리목광장, 윗세오름대피소
                <br/><br/>교 통 : 제주시 시외버스터미널에서 중문방면(1100도로) 시외버스 240번 이용(35분) 어리목 입구에서 내려 15분쯤 걸으면 어리목 탐방로가 있다.
                <br/><br/>대중교통 240번 버스운영 시간 -> 제주버스정보시스템 http://bus.jeju.go.kr/ 을 통해 쉽게 알아 볼 수 있다.
                <br/><br/>기타 문의 : 한라산국립공원관리소 064)713-9950~1</p>
        </div>
    );
};

export default MapWithPanoramaAndRoute;
