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
                position: new navermaps.LatLng(33.410856, 126.4942519),
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
        { lat:  33.410956, lng: 126.4943619 },
        // Add more points here as needed
        { lat: 33.402650, lng: 126.5020970 }
    ];

    return (
        <div>
            <h3>석굴암 탐방로</h3>
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
                    defaultCenter={new navermaps.LatLng(33.407000, 126.499011)}
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
            <p>석굴암탐방로는 제주시와 인접해 있어 승용차로 약 20분 정도면 탐방로 입구에 도착 할 수 있다. 1100도로(1139번도로)변 천왕사사찰 입구에서 삼나무 숲길을 10여분 걸으면 탐방로가 시작되는 국립제주호국원 주차장에 도착한다. 석굴암 암자까지 편도 1. 5Km에 50분이 소요된다.



               골짜기와 산세가 뛰어난 아흔아홉골에 위치한 석굴암 탐방로는 도심에서 벗어나 가볍게 등산을 원하는 탐방객들이 많이 찾는 코스다. 한라산의 깊은 계곡, 소나무와 활엽수가 혼재한 울창한 숲 사이로 스쳐가는 바람 소리가 도심속의 찌든 때를 씻어 주기에 더없이 안성맞춤인 곳이다. 계곡에 있는 석굴암은 우뚝 우뚝 선 바위들과 함께 암벽에 “南無 十六 大阿羅漢 聖衆”이란 마애명이 새겨져 있기도 하다.



               대중교통 240번 버스운영 시간 -> 제주버스정보시스템 http://bus.jeju.go.kr/ 을 통해 쉽게 알아 볼 수 있다.
               매     점 : 석굴암탐방로 전구간은 매점이 없으므로 사전에 산행에 필요한 물품(식수, 간단한 먹거리 등)은 철저히 준비하여 주시기 바랍니다.
               기타 문의 : 한라산국립공원관리소  064)713-9950~1
                </p>
        </div>
    );
};

export default MapWithPanoramaAndRoute;
