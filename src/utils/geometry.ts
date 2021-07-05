/**
 * 求两条线段交点，a,b 为第一条线段的始末点，c,d 为第二条线段的始末点。
 * @param a number[]
 * @param b number[]
 * @param c number[]
 * @param d number[]
 * @returns 
 */
export function segmentsIntr(a: number[], b: number[], c: number[], d: number[]): boolean | number[] {

  // 三角形abc 面积的2倍
  const area_abc = (a[0] - c[0]) * (b[1] - c[1]) - (a[1] - c[1]) * (b[0] - c[0]);

  // 三角形abd 面积的2倍
  const area_abd = (a[0] - d[0]) * (b[1] - d[1]) - (a[1] - d[1]) * (b[0] - d[0]);

  // 面积符号相同则两点在线段同侧,不相交 (对点在线段上的情况,本例当作不相交处理);
  if (area_abc * area_abd >= 0) {
    return false;
  }

  // 三角形cda 面积的2倍
  const area_cda = (c[0] - a[0]) * (d[1] - a[1]) - (c[1] - a[1]) * (d[0] - a[0]);
  // 三角形cdb 面积的2倍
  // 注意: 这里有一个小优化.不需要再用公式计算面积,而是通过已知的三个面积加减得出.
  const area_cdb = area_cda + area_abc - area_abd;
  if (area_cda * area_cdb >= 0) {
    return false;
  }

  //计算交点坐标
  const t = area_cda / (area_abd - area_abc);
  const dx = t * (b[0] - a[0]),
    dy = t * (b[1] - a[1]);
  return [a[0] + dx, a[1] + dy];
}