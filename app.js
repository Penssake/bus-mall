var IMAGE_PATH = 'images/';
var MAX_CLICKS = 25;
var numClicks = 0;
var imagesTracked = [];
// if (localStorage['imagesTracked']) {
//   var picturesShown = localStorage.getItem('imagesTracked');
//   var stringifiedStats = JSON.parse(picturesShown);
//   stats = stringifiedStats;
// }
var stats = [];
if (localStorage['stats']) {
  var oldStats = localStorage.getItem('stats');
  var stringifiedStats = JSON.parse(oldStats);
  stats = stringifiedStats;
}

var productChart = null;

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

function createChart() {
  var chartElement = document.getElementById('product-chart');
  var myChart = new Chart(chartElement, {
    type: 'bar',
    data: {
      labels: images,
      datasets: [{
        label: 'Click Tracker',
        data: stats,
        backgroundColor: 'white',
        borderWidth: 10,
      }]
    },
  });
}

function modifyLocalStorage(){
  var stringifiedStats = JSON.stringify(stats);
  localStorage.setItem('stats', stringifiedStats);
}

function handleImageClick(columnIndex, imageIndex) {
  stats[imageIndex]++;
  if (numClicks === MAX_CLICKS - 1) {
    clearPictureSection();
    createChart();
  } else {
    getNextImages();
    numClicks++;
    modifyLocalStorage();
  }
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

  console.log('CREATING IMAGE', url);
  document.getElementById('picture-container').appendChild(img);
}

function getNextImages(){
  clearPictureSection();

  var trackedImages = [];
  for (var i = 0; i < 3; i++) {
    var randomIndex = Math.floor(Math.random() * images.length);
    if(trackedImages.indexOf(randomIndex) > -1) {
      while(trackedImages.indexOf(randomIndex) !== -1) {
        if(randomIndex === images.length) {
          randomIndex = Math.floor(Math.random() * images.length);
        } else {
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
  getNextImages();
});
