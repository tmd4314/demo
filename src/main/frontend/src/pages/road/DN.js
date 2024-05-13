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
                position: new navermaps.LatLng(33.313956, 126.571600),
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
        { lat:  33.313956, lng: 126.571600 },
        // Add more points here as needed
        { lat: 33.348600, lng: 126.545150 },
        { lat: 33.354514, lng: 126.534040 }
    ];

    return (
        <div>
            <br/><h3>돈내코 탐방로</h3><br/>
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
                    defaultCenter={new navermaps.LatLng(33.334281, 126.551194)}
                    defaultZoom={13}
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
    );
};

export default MapWithPanoramaAndRoute;
