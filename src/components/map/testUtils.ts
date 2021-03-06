import L from 'leaflet';

function randomMarker(map: Object) {
  const staticUrl = 'static/images/map/marker';
  const metpList = ['00', 'BB', 'CC', 'II', 'LB', 'MF', 'MM', 'NN', 'PA', 'PP', 'RR', 'SS', 'UA', 'US', 'VV', 'WQ', 'WT', 'ZG', 'ZZ'];
  const statusList = ['primary', 'warning', 'danger'];

  for (let i = 0; i < 200; i++) {
    const lg = (Math.random() * 60).toFixed(6) + 20;
    const lt = (Math.random() * 100).toFixed(6) + 100;

    const con = L.latLng(lg, lt);

    const metp = metpList[Math.floor(Math.random() * metpList.length)];
    const status = statusList[Math.floor(Math.random() * statusList.length)];

    const icon = L.icon({
      iconUrl: `${staticUrl}/${metp}/${status}.png`,
      iconSize: [30, 42],
      iconAnchor: [15, 21],
    });
    const turnIcon = L.icon({
      iconUrl: `${staticUrl}/${metp}/turn.png`,
      iconSize: [36, 50],
      iconAnchor: [18, 25],
    });
    // title: `${metp}/${status}`,
    const marker = L.marker(con, { icon: icon }).addTo(map);
    // mouseover.addLe
    marker.on({
      mouseover: (item: any) => {
        item.target.setIcon(turnIcon);
        // item.target.bindTooltip({ pane: `${metp}/${status}`, offset: L.point(10, 20) }).openTooltip();
        item.target.bindTooltip(`${metp}/${status}`, { offset: L.point(0, -20), direction: 'top' }).openTooltip();
      },
      mouseout: (item: any) => {
        item.target.setIcon(icon);
        item.target.bindTooltip().closeTooltip();
      },
      click: () => {},
      dblclick: () => {},
    });
  }
}
const polygon = (map: Object) => {
  const latlngs = [
    [
      // first polygon
      [
        [37, -109.05],
        [41, -109.03],
        [41, -102.05],
        [37, -102.04],
      ], // outer ring
      [
        [37.29, -108.58],
        [40.71, -108.58],
        [40.71, -102.5],
        [37.29, -102.5],
      ], // hole
    ],
    [
      // second polygon
      [
        [41, -111.03],
        [45, -111.04],
        [45, -104.05],
        [41, -104.05],
      ],
    ],
  ];
  L.polygon(latlngs).addTo(map);
};
export { randomMarker, polygon };
