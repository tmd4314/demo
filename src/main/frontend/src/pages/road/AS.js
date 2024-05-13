import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Container as MapDiv, NaverMap, Marker, Polyline,useNavermaps } from 'react-naver-maps';

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
                size: new navermaps.Size(1250, 600),
                position: new navermaps.LatLng(33.3926876,126.4948419),
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

        return () => {
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
        { lat: 33.396550, lng: 126.489240 }
    ];

    return (
        <div>
            <h3>어승생악 탐방로</h3>
            <div>
                <a href="/user/ar">어리목 탐방로</a><br/>
                <a href="/user/ys">영실 탐방로</a><br/>
                <a href="/user/sp">성판악 탐방로</a><br/>
                <a href="/user/as">어승생악 탐방로</a><br/>
                <a href="/user/dn">돈내코 탐방로</a><br/>
                <a href="/user/sg">석굴암 탐방로</a><br/>
                <a href="/user/gs">관음사 탐방로</a><br/>
            </div>
            <MapDiv
                style={{
                    position: 'relative',
                    width: '100%',
                    height: '600px',
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
                    defaultCenter={new navermaps.LatLng(33.394853, 126.491911)}
                    defaultZoom={16}
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
            <div ref={panoramaRef} style={{width: '100%', height: '600px'}}></div>
            <p>총1.3㎞ [탐방안내소 → 어승생악정상(1.3㎞)]


               어승생악은 가벼운 등산을 원하는 탐방객이 즐겨찾는 오름으로서 자연생태가 잘 보존되어 있으며, 자연학습탐방로로 활용되고 있다. 날씨가 쾌청한 날에는 멀리 추자도, 비양도, 성산일출봉이 한눈에 내려다보이며 어승생악 정상까지는 1.3Km이다. 탐방소요시간은 편도 약 30분이며, 어리목 탐방안내소 옆에 입구가 있다.



               해발 1,169m 어승생악 정상에는 1945년 당시 만들어진 일제군사시설인 토치카가 남아있으며, 내부는 아직도 견고하여 5~6명이 설 수 있는 공간이 있다. 참호를 통해 서로 연결되어 있으며, 어승생악 허리의 지하요새와 통하게 되어 있었으나 지금은 함몰되어 막혀있다.



               대중교통 240번 버스운영 시간 -> 제주버스정보시스템 http://bus.jeju.go.kr/ 을 통해 쉽게 알아 볼 수 있다.
               매     점 : 어승생악탐방로 전구간은 매점이 없으므로 사전에 산행에 필요한 물품(식수, 간단한 먹거리 등)은 철저히 준비하여 주시기 바랍니다. 단, 물과 음료수는 탐방로 입구 자판기 이용 구입 가능
               기타 문의 : 한라산국립공원관리소 064)713-9950~1
                </p>
        </div>
    );
};

export default MapWithPanoramaAndRoute;
