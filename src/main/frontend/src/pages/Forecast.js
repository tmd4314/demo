import React, { useState, useCallback, useEffect } from 'react';
import { Container as MapDiv, NaverMap, useNavermaps, Marker, Polyline } from 'react-naver-maps';

const MapWithRoute = () => {
    const [naverLoaded, setNaverLoaded] = useState(false); // Naver 지도 API가 로드되었는지 여부
    const [panoInitialized, setPanoInitialized] = useState(false); // 파노라마 초기화 여부

    // Naver 지도 API가 로드되면 naverLoaded 상태를 true로 설정합니다.
    const navermaps = useNavermaps((loaded) => setNaverLoaded(loaded));

    useEffect(() => {
        if (naverLoaded && !panoInitialized) {
            // 아이디 혹은 지도 좌표로 파노라마를 표시할 수 있습니다.
            const pano = new window.naver.maps.Panorama("pano", {
                // panoId: "OregDk87L7tsQ35dcpp+Mg==",
                position: new window.naver.maps.LatLng(37.3599605, 127.1058814),
                pov: {
                    pan: -135,
                    tilt: 29,
                    fov: 100
                },
                flightSpot: true, // 항공 아이콘 표시 여부, default: true
            });
            setPanoInitialized(true);
        }
    }, [naverLoaded, panoInitialized]);

    const [startPoint, setStartPoint] = useState(null);
    const [endPoint, setEndPoint] = useState(null);
    const [routePath, setRoutePath] = useState([]);

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
                // 모든 마커 제거
                setStartPoint(null);
                setEndPoint(null);
                setRoutePath([]);
            }
        },
        [startPoint, endPoint]
    );

    return (
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
                <div id="pano" style={{ width: '100%', height: '300px' }}></div>
            </div>
            <NaverMap
                onClick={handleMapClick}
                defaultCenter={new window.naver.maps.LatLng(37.3595704, 127.105399)}
                defaultZoom={13}
            >
                {startPoint && <Marker position={startPoint} />}
                {endPoint && <Marker position={endPoint} />}
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
    );
};

export default MapWithRoute;
