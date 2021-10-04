'use strict';

// Set Variables

let allImages = [];
const clickCount = 0;
let justViewed = [];
let totalClicks = 0;
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
    this.clickCount = 0;
    allImages.push(this);
}

// Getting a random number

function randomize() {
    return Math.floor(Math.random() * allImages.length);
}

// Trying to randomize three unique products
// Was working earlier. Not sure why not anymore

function genProducts() {
    let randomProducts = [];
    
    let firstProduct = randomize();
    let secondProduct = randomize();
    let thirdProduct = randomize();

    while (justViewed.includes(firstProduct)) {
      firstProduct = randomize();
    }

    while (justViewed.includes(secondProduct) || randomProducts.includes(secondProduct)) {
      secondProduct = randomize();
    }

    while (justViewed.includes(thirdProduct) || randomProducts.includes(thirdProduct)) {
      thirdProduct = randomize();
    }

    randomProducts.push(firstProduct);
    randomProducts.push(secondProduct);
    randomProducts.push(thirdProduct);
  
    justViewed = randomProducts;
    return randomProducts;
}

// Render Images

function renderImages() {
    let options = genProducts();

    leftImageEl.src = allImages[options[0]].url;
    leftImageEl.name = allImages[options[0]].name;
    middleImageEl.src = allImages[options[1]].url;
    middleImageEl.name = allImages[options[1]].name;
    rightImageEl.src = allImages[options[2]].url;
    rightImageEl.name = allImages[options[2]].name;

    allImages[options[0]].timesShown++;
    allImages[options[1]].timesShown++;
    allImages[options[2]].timesShown++;
}

// Event Function

function takeVote(event) {
    event.preventDefault();
    let imgEl = event.target;
    console.log(imgEl.name);
    totalClicks++;

    if (totalClicks === 25) {
        document.getElementById("img-section").removeEventListener('click', takeVote);
        document.getElementById("img-section").innerHTML = "";
        localStorage.setItem('allImages', JSON.stringify(allImages));
        displayResults();
        return;
    }

    for (let i = 0; i < allImages.length; i++) {
        if (imgEl.name === allImages[i].name) {
            allImages[i].clicks++;
            console.log(allImages[i]);
        }
    }

    renderImages();
}

// Data set for Chart

function manageData() {
    let productData = {productName: [], timesClicked: [], timesSeen: []};
    for (let i = 0; i < allImages.length; i++){
        productData.productName.push(allImages[i].name);
        productData.timesClicked.push(allImages[i].clicks);
        productData.timesSeen.push(allImages[i].timesShown);
    } 
    return {
        labels: productData.productName,
        datasets: [{
            label: 'Voted for',
            data: productData.timesClicked,
            backgroundColor: 'Aqua'
            }, {
            label: 'Times seen',
            data: productData.timesSeen,
            backgroundColor: 'Purple'
        }]
    }
}

// Display the results

function displayResults () {
    let imgGrpEl = document.getElementById("img-section");
    imgGrpEl.innerText = "";

    let canvasEl = document.createElement("canvas");
    canvasEl.width = "600";
    canvasEl.height = "250";
    canvasEl.id = "data-chart";
    imgGrpEl.append(canvasEl);

    let barChat = new Chart(canvasEl.getContext('2d'), {
        type: 'bar',
        data: manageData(),
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {stepSize: 1},
                    title: {display: true, text: 'Count'},
                    stacked: false
                },
                x: {
                    ticks: {minRotation: 90, maxRotation: 90},
                    stacked: false
                }
            },
            interaction: {
                intersect: false
            }
        }
    });

}

// Recalling Local Storage

if (localStorage.getItem("allImages")) {
    allImages = JSON.parse(localStorage.getItem("allImages"));
}

leftImageEl.addEventListener('click', takeVote);
middleImageEl.addEventListener('click', takeVote);
rightImageEl.addEventListener('click', takeVote);

// 19 items we are rotating through

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