"use client";
import * as React from "react";

import Map, {Marker, ScaleControl} from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";

export type MiniMapProps = {
  longitude: number;
  latitude: number;
  zoom: number;
};

export function MiniMap(miniMapProps: MiniMapProps) {
  return (
    <Map
      initialViewState={miniMapProps}
      style={{ width: 500, height: 500 }}
      attributionControl={false}
      mapStyle={`https://api.maptiler.com/maps/bright-v2/style.json?key=${process.env.NEXT_PUBLIC_REACT_APP_MAPTILER_API_KEY}`}
    >
      <Marker
        longitude={miniMapProps.longitude}
        latitude={miniMapProps.latitude}
        anchor="bottom"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="map/pin.png" alt="Map Pin Icon" />
      </Marker>
      <ScaleControl />
    </Map>
  );
}
