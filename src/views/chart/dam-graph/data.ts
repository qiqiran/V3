import { ChartData } from "./types";
export const data: ChartData = {
  minx: 0.0,
  maxx: 110,
  miny: 350.0,
  maxy: 650.0,
  lz: 550,
  rz: 500,
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
    { mileage: 75, elevation: 616 },
    { mileage: 75, elevation: 630 },
    { mileage: 73, elevation: 630 },
    { mileage: 73, elevation: 616 },
    { mileage: 52, elevation: 616 },
    { mileage: 52, elevation: 630 },
    { mileage: 50, elevation: 630 },
    { mileage: 50, elevation: 616 },
    { mileage: 50, elevation: 454 },
  ],
  pipeTop: [
    { mileage: 50, elevation: 520 },
    { mileage: 55, elevation: 520 },
    { mileage: 75, elevation: 470 },
    { mileage: 77, elevation: 470 },
  ],
  pipeBottom: [
    { mileage: 50, elevation: 500 },
    { mileage: 55, elevation: 500 },
    { mileage: 75, elevation: 450 },
    { mileage: 77, elevation: 450 },
  ],
  datas: [
    { label: "坝前5米", mileage: 40, data: [
      { H: 1, T: 10 }, { H: 2, T: 9 }, { H: 3, T: 8 }, { H: 4, T: 7 }, { H: 5, T: 5 }, { H: 6, T: 5 }, { H: 7, T: 5 }, { H: 8, T: 5 }, { H: 9, T: 5 }, { H: 10, T: 5 }, 
      { H: 11, T: 5 }, { H: 12, T: 5 }, { H: 13, T: 5 }, { H: 14, T: 5 }, { H: 15, T: 5 }, { H: 16, T: 5 }, { H: 17, T: 5 }, { H: 18, T: 5 }, { H: 19, T: 5 }, { H: 20, T: 5 },
      { H: 22, T: 5 }, { H: 24, T: 5 }, { H: 26, T: 5 }, { H: 28, T: 5 }, { H: 30, T: 5 }, { H: 32, T: 5 }, { H: 34, T: 5 }, { H: 36, T: 5 }, { H: 38, T: 5 }, { H: 40, T: 5 }, 
      { H: 42, T: 5 }, { H: 44, T: 5 }, { H: 46, T: 5 }, { H: 48, T: 5 }, { H: 50, T: 5 }, { H: 52, T: 5 }, { H: 54, T: 5 }, { H: 56, T: 5 }, { H: 58, T: 5 }, { H: 60, T: 5 }, 
      { H: 65, T: 5 }, { H: 70, T: 5 }, { H: 75, T: 5 }, { H: 80, T: 5 }, { H: 85, T: 5 }, { H: 90, T: 5 }, { H: 95, T: 5 }, { H: 100, T: 5 }, { H: 105, T: 5 }, { H: 110, T: 5 }] },
    { label: "坝前15米", mileage: 30, data: [{ H: 50, T: 10 }, { H: 100, T: 9 }, { H: 200, T: 8 }, { H: 300, T: 7 }, { H: 500, T: 5 }] },
    { label: "坝下15米", mileage: 90, data: [{ H: 0.5, T: 10 }] }
  ]
}