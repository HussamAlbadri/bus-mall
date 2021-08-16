'use strict';

let busImage = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.png', 'tauntaun.jpg', 'unicorn.jpg', 'water-can.jpg', 'wine-glass.jpg'];

let itemContainer = document.getElementById('items');
let status = document.getElementById('status');
let leftImg = document.getElementById('left-img');
let centerImg = document.getElementById('middle-img');
let rightImg = document.getElementById('right-img');
let submit = 1;
let maxSubmit = 5;
let busMall = [];
let vote = [];
let views = [];
let imgNames = [];


function BusImage(product) {
    this.PName = product.split('.')[0];
    this.ProductImage = `img/${product}`;
    this.vote = 0;
    this.views = 0;
    busMall.push(this);
    imgNames.push(this.PName)

}

for (let i = 0; i < busImage.length; i++) {
    new BusImage(busImage[i]);
}
console.log(busMall);

function randomImage() {
    return Math.floor(Math.random() * busMall.length);
}

let leftItem;
let centerItem;
let rightItem;
let roundimg = [];

function renderImage() {
    leftItem = randomImage();
    centerItem = randomImage();
    rightItem = randomImage();

    while (leftItem === centerItem || leftItem === rightItem || centerItem === rightItem || roundimg.includes(leftItem) ||
        roundimg.includes(centerItem) || roundimg.includes(rightItem)) {
        leftItem = randomImage();
        centerItem = randomImage();
        rightItem = randomImage();

    }
    roundimg = [];
    roundimg[0] = leftItem;
    roundimg[1] = centerItem;
    roundimg[2] = rightItem;
    leftImg.setAttribute('src', busMall[leftItem].ProductImage);
    centerImg.setAttribute('src', busMall[centerItem].ProductImage);
    rightImg.setAttribute('src', busMall[rightItem].ProductImage);
    busMall[leftItem].views++;
    busMall[centerItem].views++;
    busMall[rightItem].views++;
}
renderImage();

leftImg.addEventListener('click', addClick);
centerImg.addEventListener('click', addClick);
rightImg.addEventListener('click', addClick);

function addClick(event) {
    if (submit <= maxSubmit) {
        let clickedImage = event.target.id;
        if (clickedImage === 'leftImg') {
            busMall[leftItem].vote++;
        } else if (clickedImage === 'centerImg') {
            busMall[centerItem].vote++;
        } else if (clickedImage === 'rightImg') {
            busMall[rightItem].vote++;
        }

        renderImage();
        submit++;
    } else {
        let button = document.getElementById('btn');
        button.addEventListener('click', btnSubmit);
        arrar = [];

        function btnSubmit() {
            for (let i = 0; i < busMall.length; i++) {
                let liEl = document.createElement('li');
                status.appendChild(liEl);
                liEl.textContent = `${busMall[i].PName} has ${busMall[i].vote} votes and ${busMall[i].views} views.`
                vote.push(bus[i].vote);
                views.push(bus[i].views);
                arrar.push(bus[i].PName);
            }
            leftImg.removeEventListener('click', addClick);
            centerImg.removeEventListener('click', addClick);
            rightImg.removeEventListener('click', addClick);
        }
    }

}

function chartRender() {
    let ctx = document.getElementById('myChart').getContext('2d');
    let myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: busImage,
            datasets: [{
                label: '# of Votes',
                data: votes,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)'
                ],
                borderWidth: 1
            }, {
                label: '# of views',
                data: views,
                backgroundColor: [
                    'rgba(54, 162, 235, 0.2)'
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)'
                ],
                borderWidth: 1

            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}
chartRender();