var IMAGE_PATH = 'images/';
var MAX_CLICKS = 3;
var numClicks = 0;
var stats = [];

var images = [
  'bag.jpg',
  'banana.jpg',
  'bathroom.jpg',
  'boots.jpg',
  'breakfast.jpg',
  'bubblegum.jpg',
  'chair.jpg',
  'cthulhu.jpg',
  'dog-duck.jpg',
  'dragon.jpg',
  'pen.jpg',
  'pet-sweep.jpg',
  'scissors.jpg',
  'shark.jpg',
  'sweep.jpg',
  'tauntaun.jpg',
  'unicorn.jpg',
  'usb.gif',
  'water-can.jpg',
  'wine-glass.jpg'
];

function resetStats() {
  for(var i = 0; i < images.length; i++) {
    stats.push(0);
  }
}

function handleImageClick(columnIndex, imageIndex) {
  console.log(columnIndex, imageIndex);
  //when image is clicked on store info in stats array
  stats[imageIndex]++;
  //call random image selector
  if(numClicks === MAX_CLICKS) {
    clearPictureSection();
  }else {
    getNextImages();
    numClicks++;
  }
  console.log('Stats', stats);
}

function clearPictureSection() {
  document.getElementById('picture-container').innerHTML = '';
}

function attachImageToDOM(url, columnIndex, imageIndex) {
  console.log(url, columnIndex, imageIndex);
  var img = new Image();
  img.src = url;
  img.setAttribute('column-index', columnIndex);
  img.setAttribute('image-index', imageIndex);
  img.setAttribute('onclick', 'handleImageClick(' + columnIndex + ',' + imageIndex + ')');
  img.style = 'display: inline-block; height: 150px; width: 150px; margin: 5px;';

  console.log('CREATING IMAGE', url);
  document.getElementById('picture-container').appendChild(img);
}

function getNextImages(){
  clearPictureSection();

  var trackedImages = [];
  for (var i = 0; i < 3; i++) {
    var randomIndex = Math.floor(Math.random() * images.length);
    //if I already have this index in my tracked images then get new index
    if(trackedImages.indexOf(randomIndex) > -1) {
    //if we do not have the index in tracked images than keep going
      while(trackedImages.indexOf(randomIndex) !== -1) {
        if(randomIndex === images.length) {
          randomIndex = 0;
        }else {
          randomIndex++;
        }
      }
    }
    trackedImages.push(randomIndex);

    console.log('Index ' + randomIndex);
    var randomImage = IMAGE_PATH + images[randomIndex];
    attachImageToDOM(randomImage, i, randomIndex);
  }
}

document.addEventListener('DOMContentLoaded', function() {
  resetStats();
  getNextImages();
});
