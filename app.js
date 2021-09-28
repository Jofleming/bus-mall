'use strict';

const allImages = [];
const totalClick = 0;

let busmallImageEl = document.getElementById('img-section');
let leftImageEl = document.getElementById('left-img');
let middleImageEl = document.getElementById('middle-img');
let rightImageEl = document.getElementById('right-img');


// Defining an Image
function Image(url, name) {
    this.name = name;
    this.clicks = 0;
    this.timesShown = 0;
    this.url = `assets/${url}`;
    allImages.push(this);
}

// Render Images

function renderImages() {
    let leftImageIndex = Math.floor(Math.random() * allImages.length);
    let middleImageIndex = Math.floor(Math.random() * allImages.length);
    let rightImageIndex = Math.floor(Math.random() * allImages.length);
    let left = allImages[leftImageIndex];
    let middle = allImages[middleImageIndex];
    let right = allImages[rightImageIndex];

    leftImageEl.src = left.url;
    leftImageEl.name = left.name;
    left.timesShown++;
    middleImageEl.src = middle.url;
    middleImageEl.name = middle.name;
    middle.timesShown++;
    rightImageEl.src = right.url;
    rightImageEl.name = right.name;
    right.timesShown++;
}

// Event Function

function takeVote(event) {
    event.preventDefault();
    let imgEl = event.target;
    console.log(imgEl.name);

    for (let i = 0; i < allImages.length; i++) {
        if (imgEl.name === allImages[i].name) {
            allImages[i].clicks++;
            console.log(allImages[i]);
        }
    }
    renderImages();
}

leftImageEl.addEventListener('click', takeVote);
middleImageEl.addEventListener('click', takeVote);
rightImageEl.addEventListener('click', takeVote);

// 19 items
new Image('bag.jpg', 'bag');
new Image('banana.jpg', 'banana');
new Image('bathroom.jpg', 'bathroom');
new Image('boots.jpg', 'boots');
new Image('breakfast.jpg', 'breakfast');
new Image('bubblegum.jpg', 'bubblegum');
new Image('chair.jpg', 'chair');
new Image('cthulhu.jpg', 'cthulhu');
new Image('dog-duck.jpg', 'dog-duck');
new Image('dragon.jpg', 'dragon');
new Image('pen.jpg', 'pen');
new Image('pet-sweep.jpg', 'pet-sweep');
new Image('scissors.jpg', 'scissors');
new Image('shark.jpg', 'shark');
new Image('sweep.png', 'sweep');
new Image('tauntaun.jpg', 'tauntaun');
new Image('unicorn.jpg', 'unicorn');
new Image('water-can.jpg', 'water-can');
new Image('wine-glass.jpg', 'wine-glass');

renderImages();
console.log(allImages);