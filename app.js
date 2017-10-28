'use strict';

var allImageProducts = [];
var imgContainer = document.getElementById('imgContainer');
var left = document.getElementById('left');
var center = document.getElementById('center');
var right = document.getElementById('right');
var clicksRemaining = 25;
var timesClicked = 0;
var timesShown = 0;
var prevShown = [];
var votes = [];
var names = [];
var storedVotes = [];
storedVotes = JSON.parse(localStorage.storedVotes);
ImageProducts.all = [];
var allNames = [
  {path: 'Images/bag(1).jpg', name:'bag'},
  {path: 'Images/banana.jpg', name: 'banana'},
  {path: 'Images/bathroom.jpg', name:'bathroom'},
  {path: 'Images/boots.jpg', name:'boots'},
  {path: 'Images/breakfast.jpg', name:'breakfast'},
  {path: 'Images/bubblegum.jpg', name:'bubblegum'},
  {path: 'Images/chair.jpg', name:'chair'},
  {path: 'Images/cthulhu.jpg', name:'cthulhu'},
  {path: 'Images/dog-duck.jpg', name:'dogduck'},
  {path: 'Images/dragon.jpg', name:'dragon'},
  {path: 'Images/pen.jpg', name:'pen'},
  {path: 'Images/pet-sweep.jpg', name:'petsweep'},
  {path: 'Images/scissors.jpg', name:'scissors'},
  {path: 'Images/shark.jpg', name:'shark'},
  {path: 'Images/sweep.png', name:'sweep'},
  {path: 'Images/tauntaun.jpg', name:'tauntaun'},
  {path: 'Images/unicorn.jpg', name:'unicorn'},
  {path: 'Images/usb.gif', name:'usb'},
  {path: 'Images/wine-glass.jpg', name:'wineglass'},
  {path: 'Images/water-can.jpg', name:'watercan'}
];

function ImageProducts(name, path){
  this.name = name;
  this.path = path;
  this.timesClicked = 0;
  this.timesShown = 0;
  ImageProducts.all.push(this);

}

function generateRandomNum(){
  return Math.floor(Math.random() * allImageProducts.length);
}

for(var i = 0; i < allNames.length; i++){
  //this array creates all products, it adds the timesClicked and timesShown
  allImageProducts.push(new ImageProducts(allNames[i].name , allNames[i].path));
}

function dispayImg(){
  console.log(prevShown + 'prev shown');
  var randomNums = [];
  randomNums[0] = generateRandomNum();
  while(randomNums[0] === prevShown[0] || randomNums[0] === prevShown[1] || randomNums[0] === prevShown[2]){
    console.log('almost a dupe');
    randomNums[0] = generateRandomNum();
  }
  randomNums[1] = generateRandomNum();
  while(randomNums[0] === randomNums[1] || randomNums[1] === prevShown[0] || randomNums[1] === prevShown[1] || randomNums[1] === prevShown[2]){
    console.log('almost a dupe2');
    console.log('DUPE');
    randomNums[1] = generateRandomNum();
  }
  randomNums[2] = generateRandomNum();
  while(randomNums[2] === randomNums[0] || randomNums[1] === randomNums[2] || randomNums[2] === prevShown[2] || randomNums[2] === prevShown[1] || randomNums[2] === prevShown[2]){
    console.log('almost a dupe3');
    randomNums[2] = generateRandomNum();
  }

  left.src = ImageProducts.all[randomNums[0]].path;
  center.src = ImageProducts.all[randomNums[1]].path;
  right.src = ImageProducts.all[randomNums[2]].path;
  left.alt = ImageProducts.all[randomNums[0]].name;
  center.alt = ImageProducts.all[randomNums[1]].name;
  right.alt = ImageProducts.all[randomNums[2]].name;
  ImageProducts.all[randomNums[0]].timesShown += 1;
  ImageProducts.all[randomNums[1]].timesShown += 1;
  ImageProducts.all[randomNums[2]].timesShown += 1;
  prevShown = randomNums;
  console.log(prevShown + ' currently showing');

}

function showList(){
  var ulEl = document.getElementById('theList');

  for(var i = 0; i < ImageProducts.all.length; i++){
    console.log(i);
    var liEl = document.createElement('li');
    liEl.textContent = ImageProducts.all[i].name + ' was shown ' + ImageProducts.all[i].timesShown + ' times ' + ' and was clicked ' + ImageProducts.all[i].timesClicked + ' times!';
    ulEl.appendChild(liEl);
  }
}

function handleClick(e){
  clicksRemaining--;
  console.log(clicksRemaining + ' clicks left');
  //yell at user
  if(e.target.id === 'imgContainer'){
    return alert('Click the pictures!');
  }
  for(var i = 0 ; i < ImageProducts.all.length; i++){
    if(e.target.alt === ImageProducts.all[i].name){
      //tally the Click
      ImageProducts.all[i].timesClicked += 1;
    }
  }
  if(clicksRemaining === 0){
    showList();
    updateChartArray();
    drawChart();
    return;

  }

  console.log(e.target);
  dispayImg();
}

document.getElementById('imgContainer').addEventListener('click', handleClick);
dispayImg();
function updateChartArray() {
  for (var i = 0; i < ImageProducts.all.length; i++) {
    votes[i] = ImageProducts.all[i].timesClicked;
    names[i] = ImageProducts.all[i].name;
    storedVotes.push(votes[i]);
    if(storedVotes > 20){
      votes.push(storedVotes);
      console.log('push it');
    }
  }
  localStorage.storedVotes = JSON.stringify(storedVotes);
}
var data = {
  labels: names,
  datasets: [
    {
      data: votes,
      label: 'Survey Analasys',
      backgroundColor: [
        'yellow',
        'pink',
        'blue',
        'green',
        'salmon',
        'orange',
        'black',
        'red',
        'grey',
        'purple',
        'tan',
        'violet',
        'brown',
        '#668f3d',
        '#B33500',
        '#E78061',
        '#EC5695',
        '#E9297B',
        '#f37937',
        'gold',
      ],
      hoverBackgroundColor: [
        '#1c252d',
        '#1c252d',
        '#1c252d',
        '#1c252d',
        '#1c252d',
        '#1c252d',
        '#1c252d',
        '#1c252d',
        '#1c252d',
        '#1c252d',
        '#1c252d',
        '#1c252d',
        '#1c252d',
        '#1c252d',
        '#1c252d',
        '#1c252d',
        '#1c252d',
        '#1c252d',
        '#1c252d',
        '#1c252d',
      ]
    }]
};

function drawChart() {
  var ctx = document.getElementById('chart').getContext('2d');
  surveyChart = new Chart(ctx,{
    type: 'bar',
    data: data,
    options: {
      responsive: false,
      animation: {
        duration: 1000,
        easing: 'easeOutBounce'
      }
    },
    scales: {
      yAxes: [{
        ticks: {
          max: 10,
          min: 0,
          stepSize: 1.0
        }
      }]
    }
  });
  chartDrawn = true;
}
