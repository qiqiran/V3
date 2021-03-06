function initVerifyPage(show_num: any[], divId: string) {
  const canvas: any = document.getElementById(divId); //获取到canvas的对象，演员
  if (!canvas) return;
  const canvas_width: any = canvas.clientWidth;
  const canvas_height: any = canvas.clientHeight;
  const context = canvas.getContext('2d'); //获取到canvas画图的环境，演员表演的舞台
  canvas.width = canvas_width;
  canvas.height = canvas_height;
  const sCode =
    'A,B,CD,E,F,G,H,J,K,L,M,N,P,Q,R,S,T,W,X,Y,Z,q,w,e,r,t,y,u,i,o,p,a,s,d,f,g,h,j,k,l,z,x,c,v,b,n,m,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0';
  const aCode = sCode.split(',');
  const aLength = aCode.length; //获取到数组的长度

  for (let i = 0; i <= 3; i++) {
    const j = Math.floor(Math.random() * aLength); //获取到随机的索引值
    const deg = (Math.random() * 30 * Math.PI) / 180; //产生0~30之间的随机弧度
    const txt = aCode[j]; //得到随机的一个内容
    show_num[i] = txt;
    const x = 10 + i * 20; //文字在canvas上的x坐标
    const y = 20 + Math.random() * 8; //文字在canvas上的y坐标
    context.font = 'bold 23px 微软雅黑';

    context.translate(x, y);
    context.rotate(deg);

    context.fillStyle = randomColor();
    context.fillText(txt, 0, 0);

    context.rotate(-deg);
    context.translate(-x, -y);
  }
  for (let i = 0; i <= 5; i++) {
    //验证码上显示线条
    context.strokeStyle = randomColor();
    context.beginPath();
    context.moveTo(Math.random() * canvas_width, Math.random() * canvas_height);
    context.lineTo(Math.random() * canvas_width, Math.random() * canvas_height);
    context.stroke();
  }
  for (let i = 0; i <= 50; i++) {
    //验证码上显示小点
    context.strokeStyle = randomColor();
    context.beginPath();
    const x = Math.random() * canvas_width;
    const y = Math.random() * canvas_height;
    context.moveTo(x, y);
    context.lineTo(x + 1, y + 1);
    context.stroke();
  }
}
function randomColor() {
  //得到随机的颜色值
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return 'rgb(' + r + ',' + g + ',' + b + ')';
}
export { initVerifyPage, randomColor };
