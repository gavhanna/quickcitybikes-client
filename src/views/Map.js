import React, { useRef } from 'react';
import { Map as LeafletMap, TileLayer, Marker } from 'react-leaflet';
import { renderToStaticMarkup } from 'react-dom/server';
import LocationMapModal from '../components/LocationMapModal';
import { divIcon } from 'leaflet';
import MarkerIcon from '../components/MarkerIcon';
// import MarkerClusterGroup from 'react-leaflet-markercluster';
import 'react-leaflet-markercluster/dist/styles.min.css';
import { connect } from 'react-redux';
import { setSelectedLocation } from '../state/actions/bikeLocationsActions';
import { setMapPosition, setMapZoom } from '../state/actions/mapActions';
import { leafletMapPosition } from '../utils/leafletMapPosition';

const Map = ({
  userLocation,
  bikes,
  setSelectedLocation,
  mapData,
  setMapPosition,
  setMapZoom,
  auth,
  settings,
}) => {
  const mapEl = useRef(null);

  const iconMarkup = (location) =>
    renderToStaticMarkup(
      <MarkerIcon
        faves={auth.isAuthenticated ? auth.user.favourites : bikes.faves}
        location={location}
        settings={settings}
      />
    );

  const customMarkerIcon = (location) =>
    divIcon({
      html: iconMarkup(location),
    });

  const onMarkerClick = (loc) => {
    setSelectedLocation(loc);
    setMapZoom(18);
    setMapPosition(leafletMapPosition(loc));
  };

  const onZoom = (e) => {
    setMapZoom(e.target._zoom);
  };

  return (
    mapData && (
      <React.Fragment>
        <LeafletMap
          ref={mapEl}
          center={mapData.position}
          zoom={mapData.zoom}
          zoomControl={true}
          onClick={(e) => {
            setSelectedLocation(null);
          }}
          onZoomEnd={onZoom}
        >
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a>'
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          />
          {/* <MarkerClusterGroup> */}
          {bikes.data &&
            bikes.data.map((l) => (
              <Marker
                key={l.number + Math.random()}
                position={l.position}
                onClick={() => onMarkerClick(l)}
                icon={customMarkerIcon(l)}
              ></Marker>
            ))}
          {userLocation.data && (
            <Marker position={userLocation.data.position}></Marker>
          )}
          {/* </MarkerClusterGroup> */}
        </LeafletMap>
        <LocationMapModal />
      </React.Fragment>
    )
  );
};

const mapStateToProps = (state) => ({
  userLocation: state.userLocation,
  bikes: state.bikesData,
  mapData: state.mapData,
  auth: state.auth,
  settings: state.settings,
});

export default connect(mapStateToProps, {
  setSelectedLocation,
  setMapPosition,
  setMapZoom,
})(Map);
