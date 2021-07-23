export const data = {
  tp: "RR",
  minx: 0.0,
  maxx: 110,
  miny: 0.0,
  maxy: 1000.0,
  hideTable: false,
  lz: 850,
  rz: 500,
  style: {
    nameLable: {
      color: "black",
      fontSize: 16,
    },
  },
  sections: [
    { name: "乐山", mileage: 0, elevation: 474.64 },
    { name: "安谷坝址", mileage: 15.373, elevation: 466.92 },
    { name: "沙湾坝址", mileage: 29.752, elevation: 440.11 },
    { name: "葫芦镇", mileage: 42.739, elevation: 426.69 },
    { name: "福禄镇", mileage: 51.943, elevation: 416.45 },
    { name: "铜街子", mileage: 65.006, elevation: 416.45 },
    { name: "龚嘴", mileage: 85.103, elevation: 399.36 },
    { name: "大河坝", mileage: 93.166, elevation: 378.55 },
    { name: "象鼻子", mileage: 110, elevation: 354.96 },
  ],
  dam: [
    { mileage: 77, elevation: 574 },
    { mileage: 77, elevation: 600 },
    { mileage: 75, elevation: 916 },
    { mileage: 75, elevation: 950 },
    { mileage: 73, elevation: 950 },
    { mileage: 73, elevation: 916 },
    { mileage: 52, elevation: 916 },
    { mileage: 52, elevation: 950 },
    { mileage: 50, elevation: 950 },
    { mileage: 50, elevation: 916 },
    { mileage: 50, elevation: 754 },
  ],
  pipeTop: [
    { mileage: 50, elevation: 550 },
    { mileage: 55, elevation: 550 },
    { mileage: 75, elevation: 500 },
    { mileage: 77, elevation: 500 },
  ],
  pipeBottom: [
    { mileage: 50, elevation: 500 },
    { mileage: 55, elevation: 500 },
    { mileage: 75, elevation: 450 },
    { mileage: 77, elevation: 450 },
  ],
  datas: [
    { label: "坝前5米", mileage: 40, data: [{ H: 50, T: 10 }, { H: 100, T: 9 }, { H: 200, T: 8 }, { H: 300, T: 7 }, { H: 500, T: 5 }] },
    { label: "坝前15米", mileage: 30, data: [{ H: 50, T: 10 }, { H: 100, T: 9 }, { H: 200, T: 8 }, { H: 300, T: 7 }, { H: 500, T: 5 }] },
    { label: "坝下15米", mileage: 90, data: [{ H: 0, T: 10 }, { H: 25, T: 9 }, { H: 50, T: 8 }, { H: 70, T: 7 }, { H: 90, T: 5 }] }
  ]
}