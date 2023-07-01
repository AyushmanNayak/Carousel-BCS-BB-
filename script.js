var radius = 400;
var autoRotate = true;
var rotatespeed = -60;
var imgwidth = 190;
var imgheight = 230;
setTimeout(init, 1000);
var odrag = document.getElementById('drag');
var ospin = document.getElementById('spin');
var aImg = ospin.getElementsByTagName('img');

var aEle = [...aImg];
ospin.style.width = imgwidth + "px";
ospin.style.height = imgheight + "px";

var ground = document.getElementById('ground');
ground.style.width = radius * 3 + "px";
ground.style.height = radius * 3 + "px";

function init(delayTime) {
  for (var i = 0; i < aEle.length; i++) {
    aEle[i].style.transform = "rotateY(" + (i * (360 / aEle.length)) + "deg) translateZ(" + radius + "px)";
    aEle[i].style.transition = "transform ls";
    aEle[i].style.transitionDelay = delayTime || (aEle.length - i) / 4 + "s";
  }
}

function applyTransform(obj) {
  if (tY > 180) tY = 180;
  if (tY < 0) tY = 0;
  obj.style.transform = "rotateX(" + (-tY) + "deg) rotateY(" + (tX) + "deg)";
}

function playspin(yes) {
  ospin.style.animationPlayState = (yes ? 'running' : 'paused');
}

var sx, sy, nx, ny, desx = 0, desy = 0, tX = 0, tY = 10;

if (autoRotate) {
  var animationName = (rotatespeed > 0 ? 'spin' : 'spinRevert');
  ospin.style.animation = `${animationName} ${Math.abs(rotatespeed)}s infinite linear`;
}

document.onpointerdown = function (e) {
  clearInterval(odrag.timer);
  e = e || window.event;
  sx = e.clientX;
  sy = e.clientY;


document.onpointermove = function (e) {
  e = e || window.event;
  nx = e.clientX;
  ny = e.clientY;
  desx = nx - sx;
  desy = ny - sy;
  tX += desx * 0.1;
  tY += desy * 0.1;
  applyTransform(odrag);
  sx = nx;
  sy = ny;
};

document.onpointerup = function (e) {
  odrag.timer = setInterval(function () {
    desx *= 0.95;
    desy *= 0.95;
    tX += desx * 0.1;
    tY += desy * 0.1;
    applyTransform(odrag);

    playspin(false);

    if (Math.abs(desx) < 0.5 && Math.abs(desy) < 0.5) {
      clearInterval(odrag.timer);
      playspin(true);
    }
  }, 17);
   this.onpointermove = this.onpointerup=null;
};
return false;
};
