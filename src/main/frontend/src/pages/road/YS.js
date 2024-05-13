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
                position: new navermaps.LatLng(33.348498, 126.4966031),
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
        { lat:  33.348498, lng: 126.4966031 },
        // Add more points here as needed
        { lat: 33.358958, lng: 126.502381 },
        { lat: 33.362130, lng: 126.517760 },
        { lat: 33.362250, lng: 126.521068 },
        { lat: 33.354514, lng: 126.534040 }
    ];

    return (
        <div>
            <br/><h3>영실 탐방로</h3><br/>
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
                    defaultCenter={new navermaps.LatLng(33.357828, 126.511527)}
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
            <p><br/><h3>총 5.8㎞ [영실→윗세오름(3.7㎞)→남벽분기점(5.8㎞)]</h3><br/>


                영실탐방로는 영실관리사무소(해발1000m)에서 영실휴게소(해발1,280m)까지 2.5km의 자동차도로 및 탐방로 병행구간과 영실휴게소에서 윗세오름대피소(해발1,700m )을 경유
                남벽분기점(해발 1,600m) 까지 5.8km의 탐방로이며, 영실관리사무소에서 출발 시 편도 3시간15분, 영실휴게소에서 출발 시 편도 2시간30분정도 소요된다. 돈내코와 어리목탐방로로
                하산 할 수 있다.경사가 비교적 급한 영실분화구 능선 (해발1300m ~1550m)을 제외하고는 대부분 평탄지형으로 탐방이 쉬운 편이다.

                (영실관리사무소에서 영실휴게소까지 2.5km의 구간은 12인승이하 차량만 운행이 가능함)<br/><br/>


                영실탐방로는 영주십경 중 하나로 영실기암이 사시사철 아름다운 자태를 뽐내며 탐방객들을 맞이하고 있고 산림청에서 지정한 아름다운 소나무 숲, 아고산식물의 천국인 선작지왓 등이 위치하고
                있으며 한라산 노루를 가장 근접거리에서 관찰할 수 있는 곳이기도 하다. 한라산에서만 자생하는 흰그늘용담과 섬바위장대, 섬매발톱나무 등이 관찰되고 선작지왓 현무암질조면안산암 용암류가
                만들어낸 돌탑이 성벽을 이루며 분포하고 있어서 독특한 경관을 연출하는 곳이다. 영실계곡과 윗세오름에서 용출되는 노루샘에서 식수를 구할 수 있으나 건기 시에 마르는 경우가 있다.
                남벽순환로는 고도차가 거의 없는 고산평원으로 깎아지른 수직절벽인 한라산 정상의 남벽과 세 개의 방애오름이 연이어 펼쳐진다.<br/><br/>


                영실 병풍바위 정상에서 탐방로를 이탈하면 낙석 및 실족의 위험이 있기 때문에 반드시 탐방로를 따라 가야하며 선작지왓과 남벽순환로 일대는 날씨변화가 심한 지역이므로 낙뢰, 안개, 환상보행,
                저체온증 등의 위험요소가 발생하기 쉬운 곳이므로 사전에 날씨정보를 알아보는 것이 좋다.<br/><br/>


                <br/><br/><h5>탐방로 등급 (난이도 - A: 어려움, B:보통, C:쉬움)</h5>
                <br/><br/>영실휴게소 -C- 영실계곡 -A- 병풍바위정상 -C- 윗세오름대피소 -C- 남벽분기점
                <br/><br/>대 피 소 : 윗세오름 대피소
                <br/><br/>매 점 : 영실 휴게소(간단한 먹거리 포함 식수, 아이젠 등 등산용품 구입 가능 )
                <br/><br/>화 장 실 : 영실관리사무소, 영실휴게소, 윗세오름대피소
                <br/><br/>교 통 : 제주시 시외버스터미널에서 중문방면(1100도로) 시외버스 240번 이용(50분)
                <br/><br/>영실매표소에서 내려 40분쯤 걸으면 영실 등산로 입구가 있다.
                <br/><br/>대중교통 240번 버스운영 시간 -> 제주버스정보시스템 http://bus.jeju.go.kr/ 을 통해 쉽게 알아 볼 수 있다.
                <br/><br/>기타 문의 : 한라산국립공원관리소 064)713-9950~1 / 영실지소 064)747-9950</p>
        </div>
    );
};

export default MapWithPanoramaAndRoute;
