"use client";
import "maplibre-gl/dist/maplibre-gl.css";

import * as React from "react";
import Map, { Marker, ScaleControl } from "react-map-gl/maplibre";

export type MiniMapProps = {
  longitude: number;
  latitude: number;
  zoom: number;
};

export function MiniMap(miniMapProps: MiniMapProps) {
  console.log(miniMapProps);
  return (
    <Map
      {...miniMapProps}
      style={{ width: 500, height: 500 }}
      mapStyle={`https://api.maptiler.com/maps/bright-v2/style.json?key=${process.env.NEXT_PUBLIC_REACT_APP_MAPTILER_API_KEY}`}
    >
      <Marker
        longitude={miniMapProps.longitude}
        latitude={miniMapProps.latitude}
        anchor="bottom"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/map/pin.png" alt="Map Pin Icon" />
      </Marker>
      <ScaleControl position="bottom-right" />
    </Map>
  );
}
