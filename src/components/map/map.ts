import L from "leaflet";

let initMap = (divId: string) => {
  let map =  L.map(divId, {
    minZoom: 1,
    maxZoom: 18,
    center: [40, 50],
    zoom: 5,
    zoomControl: false,
    attributionControl: false,
    crs: L.CRS.EPSG3857
  });
  L.tileLayer(
    "http://webrd01.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=7&x={x}&y={y}&z={z}"
  ).addTo(map);
  return map;
}
export { initMap }