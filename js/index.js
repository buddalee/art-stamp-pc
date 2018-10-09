var app = new PIXI.Application(800, 600, { backgroundColor: 0xEEEEEE });
document.body.appendChild(app.view);

// create a background...
var background = PIXI.Sprite.fromImage('./assets/2.jpg');
background.width = app.screen.width;
background.height = app.screen.height;
// add background to stage...
app.stage.addChild(background);

var isLineMode = false;
if (location.search === '?line') {
  isLineMode = true;
}


app.stage.interactive = true;
app.stage.buttonMode = true;

app.stage
  .on('pointerdown', onDragStart)
  .on('pointerup', onDragEnd)
  .on('pointerupoutside', onDragEnd);
var texture = PIXI.Texture.fromImage('assets/1.png');
var stamp = new PIXI.Sprite(texture);

var ansNum;
function getRandomInt(min, max) {
  ansNum = Math.floor(Math.random() * (max - min + 1)) + min;
  console.log('ansNum: ', ansNum);
  return ansNum;
}

getRandomInt(1, 16);

var centerArr = [];
var xd = app.screen.width / 8;
var yd = app.screen.height / 8;
var startx = 0,
    starty = 0,
    endx = 4,
    endy = 4;
for (; startx < endx; startx++) {
  for (starty = 0; starty < endy; starty++) {
    var x = xd + starty * 2 * xd;
    var y = yd + startx * 2 * yd;
    console.log(x, y);
    centerArr.push({ x, y });
  }
}

console.log('centerArr: ', centerArr);

var ansPoint = centerArr[ansNum - 1];
console.log('ansPoint', ansPoint);
var toloranceD = xd > yd ? xd : yd;
console.log('toloranceD: ', toloranceD);
renderStamp(ansPoint);

var countingText = new PIXI.Text('倒數: 6', {
  fontWeight: 'bold',
  fontStyle: 'italic',
  fontSize: 60,
  fontFamily: 'Arvo',
  fill: '#3e1707',
  align: 'center',
  stroke: '#a4410e',
  strokeThickness: 7
});
countingText.x = app.screen.width / 2;
countingText.y = 0;
countingText.anchor.x = 0.5;
app.stage.addChild(countingText);
var count = 6;
var isCanPlay = false;
app.ticker.add(function() {
    count -= 0.02;
    // update the text with a new string
    countingText.text = '倒數: ' + Math.floor(count);
    if (Math.floor(count) === 0) {
      isCanPlay = true;
      app.stage.removeChild(countingText)
    }
});
setTimeout(() => app.stage.removeChild(stamp), 5000);

// 建立容器
var objContainer = new PIXI.Container();
app.stage.addChild(objContainer);

if (isLineMode) {
  // 畫線
  var objLine1 = new PIXI.Graphics();
  objLine1.lineStyle(4, 0x000000, 1);
  objLine1.moveTo(0, 150);
  objLine1.lineTo(800, 150);

  var objLine2 = new PIXI.Graphics();
  objLine2.lineStyle(4, 0x000000, 1);
  objLine2.moveTo(0, 300);
  objLine2.lineTo(800, 300);

  var objLine3 = new PIXI.Graphics();
  objLine3.lineStyle(4, 0x000000, 1);
  objLine3.moveTo(0, 450);
  objLine3.lineTo(800, 450);

  var objLine4 = new PIXI.Graphics();
  objLine4.lineStyle(4, 0x000000, 1);
  objLine4.moveTo(200, 0);
  objLine4.lineTo(200, 600);

  var objLine5 = new PIXI.Graphics();
  objLine5.lineStyle(4, 0x000000, 1);
  objLine5.moveTo(400, 0);
  objLine5.lineTo(400, 600);

  var objLine6 = new PIXI.Graphics();
  objLine6.lineStyle(4, 0x000000, 1);
  objLine6.moveTo(600, 0);
  objLine6.lineTo(600, 600);

  objContainer.addChild(objLine1);
  objContainer.addChild(objLine2);
  objContainer.addChild(objLine3);
  objContainer.addChild(objLine4);
  objContainer.addChild(objLine5);
  objContainer.addChild(objLine6);
}

function onDragStart(e) {
  var _touchPos = {
    x: Math.floor(e.data.global.x),
    y: Math.floor(e.data.global.y)
  }
  console.log('start touchPos: ', _touchPos);
}

var touchPos;
function onDragEnd(e) {
  touchPos = {
    x: Math.floor(e.data.global.x),
    y: Math.floor(e.data.global.y)
  }
  console.log('end touchPos: ', touchPos);
  if (isCanPlay) {
    renderStamp(touchPos);
  }
}
function checkAns() {
  if (isCanPlay) {
    validateAns(touchPos);
  }
}
function validateAns(pos) {
  const distance = Math.sqrt(Math.pow(pos.x - ansPoint.x, 2) + Math.pow(pos.y - ansPoint.y, 2));
  console.log('distance: ', distance);
  if (toloranceD >= distance) {
    console.log(true);
    alert(true);
  } else {
    console.log(false);
    alert(false);
  }
}
function renderStamp(target) {
  stamp.width = app.screen.height / 8;
  stamp.height = app.screen.height / 8;
  // console.log('stamp.width: ', stamp.width);
  // console.log('stamp.height: ', stamp.height);
  
  stamp.x = target.x;
  stamp.y = target.y;

  app.stage.addChild(stamp);


}