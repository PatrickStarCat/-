let item1 = document.querySelector('.item1');
let item2 = document.querySelector('.item2');
let myCanvas = document.getElementById('myCanvas');
let myFile = document.getElementById('myFile');
let context = myCanvas.getContext('2d');
let foo1 = document.querySelector('.foo1');
let foo2 = document.querySelector('.foo2');
let foo3 = document.querySelector('.foo3');
let foo4 = document.querySelector('.foo4');
let foo5 = document.querySelector('.foo5');
let foo6 = document.querySelector('.foo6');
let foo7 = document.querySelector('.foo7');
let foo8 = document.querySelector('.foo8');

item1.addEventListener('click', function (event) {
  let boxDisplay = item1.querySelector('ul').style.display;
  if (boxDisplay === 'none') {
    item1.querySelector('ul').style.display = 'block';
    setTimeout(() => {
      item1.querySelector('ul').style.opacity = 1;
    });
  } else {
    item1.querySelector('ul').style.display = 'none';
  }
}, false)
item1.addEventListener('mouseleave', function (event) {
  item1.querySelector('ul').style.display = 'none';
}, false);


item2.addEventListener('click', function (event) {
  let ul2 = item2.querySelector('ul');
  let boxDisplay = ul2.style.display;
  if (boxDisplay === 'none') {
    ul2.style.display = 'block';
    setTimeout(() => {
      ul2.style.opacity = 1;
    });
  } else {
    ul2.style.display = 'none';
  }
}, false)
item2.addEventListener('mouseleave', function (event) {
  let ul2 = item2.querySelector('ul');
  ul2.style.display = 'none';
}, false);

//监视myFile的onchange事件，并构造FileReader：
myFile.onchange = function (event) {
  let selectedFile = event.target.files[0];
  let reader = new FileReader();
  reader.onload = putImage2Canvas;
  reader.readAsDataURL(selectedFile);

}
//编写putImage2Canvas函数，这个函数用来将FileReader读取的数据放入canvas中供 JavaScript 处理
function putImage2Canvas(event) {
  img = new Image();
  imgOrigin = new Image();
  img.src = event.target.result;

  let img1 = document.createElement('img');
  img1.src = event.target.result;
  let mainLeft = document.querySelector('.main-left');
  mainLeft.appendChild(img1);
  
  imgOrigin.src = event.target.result;
  img.onload = function () {
    myCanvas.width = img.width;
    myCanvas.height = img.height;
    let context = myCanvas.getContext('2d');
    context.drawImage(img, 0, 0);
    let imgdata = context.getImageData(0, 0, img.width, img.height);
    // 处理imgdata
  }
}
//进行图像反色操作
function reverseImage() {
  let imgdata = context.getImageData(0, 0, myCanvas.width, myCanvas.height);
  for (let i = 0, len = imgdata.data.length; i < len; i += 4) {
    imgdata.data[i] = 255 - imgdata.data[i];
    imgdata.data[i + 1] = 255 - imgdata.data[i + 1];
    imgdata.data[i + 2] = 255 - imgdata.data[i + 2];
  }
  context.putImageData(imgdata, 0, 0);
}
//图像加一层浅色的滤镜
let sepiaFilter = function(imgData) {
  let d = imgData.data
  for (let i = 0; i < d.length; i += 4) {
    let r = d[i]
    let g = d[i + 1]
    let b = d[i + 2]
    d[i] = (r * 0.393) + (g * 0.769) + (b * 0.189) // red
    d[i + 1] = (r * 0.349) + (g * 0.686) + (b * 0.168) // green
    d[i + 2] = (r * 0.272) + (g * 0.534) + (b * 0.131) // blue
  }
  return imgData
}
function sepiaFilterImage(){
  let imgdata = context.getImageData(0, 0, myCanvas.width, myCanvas.height);
  let imgdata2 = sepiaFilter(imgdata);
  context.putImageData(imgdata, 0, 0);

}
//保存图片url
let imgsrc = myCanvas.toDataURL('image/jpeg', 1);

//图像平移
function translateImage() {
  context.clearRect(0, 0, myCanvas.width, myCanvas.height);
  context.translate(100, 100);
  context.drawImage(img, 0, 0);
}
//图像缩放
function scaleImage() {
  context.clearRect(0, 0, myCanvas.width, myCanvas.height);
  context.translate(myCanvas.width / 2, myCanvas.height / 2);
  context.scale(.5, .5);
  context.translate(-myCanvas.width / 2, -myCanvas.height / 2);
  context.drawImage(img, 0, 0);
}
//镜像变换水平
function glassX() {
  context.translate(myCanvas.width / 2, myCanvas.height / 2);
  context.scale(-1, 1);
  context.translate(-myCanvas.width / 2, -myCanvas.height / 2);
  context.drawImage(img, 0, 0);
}
//镜像变换垂直
function glassY() {
  context.translate(myCanvas.width / 2, myCanvas.height / 2);
  context.scale(1, -1);
  context.translate(-myCanvas.width / 2, -myCanvas.height / 2);
  context.drawImage(img, 0, 0);
}
//图像旋转
function rotateImage() {
  context.translate(myCanvas.width / 2, myCanvas.height / 2);
  context.rotate(270 * Math.PI / 180);
  context.translate(-myCanvas.width / 2, -myCanvas.height / 2);
  context.drawImage(img, 0, 0);
}
//原图显示
function orignImage(){
  context.clearRect(0, 0, myCanvas.width, myCanvas.height);
  myCanvas.width = imgOrigin.width;
  myCanvas.height = imgOrigin.height;
  let context2 = myCanvas.getContext('2d');
  context2.drawImage(imgOrigin, 0, 0);
}
foo1.onclick = orignImage;
foo2.onclick = reverseImage;
foo3.onclick = sepiaFilterImage;
foo4.onclick = translateImage;
foo5.onclick = scaleImage;
foo6.onclick = glassX;
foo7.onclick = glassY;
foo8.onclick = rotateImage;

