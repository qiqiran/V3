import client from 'webpack-theme-color-replacer/client';
import { generate } from '@ant-design/colors';
// const { origin, pathname } = window.document.location;

export function getAntdSerials(color) {
  // 淡化（即less的tint）
  const lightens = new Array(9).fill().map((t, i) => {
    return client.varyColor.lighten(color, i / 10);
  });
  // colorPalette变换得到颜色值
  const colorPalettes = generate(color);
  const rgb = client.varyColor.toNum3(color.replace('#', '')).join(',');
  return lightens.concat(colorPalettes).concat(rgb);
}

export function changeThemeColor(newColor) {
  var options = {
    newColors: getAntdSerials(newColor), // new colors array, one-to-one corresponde with `matchColors`
    changeUrl(cssUrl) {
      return `./${cssUrl}`; // while router is not `hash` mode, it needs absolute path
    },
  };
  return client.changer.changeColor(options, Promise);
}
