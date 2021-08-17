'use strict';

let busImage = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.png', 'tauntaun.jpg', 'unicorn.jpg', 'water-can.jpg', 'wine-glass.jpg'];

let itemContainer = document.getElementById('items');
let status = document.getElementById('status');
let leftImg = document.getElementById('left-img');
let centerImg = document.getElementById('middle-img');
let rightImg = document.getElementById('right-img');
let submit = 1;
let maxSubmit = 25;
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
// console.log(busMall);

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

leftImg.addEventListener('click', forclick);
rightImg.addEventListener('click', forclick);
centerImg.addEventListener('click', forclick);

function forclick(event) {


    if (submit <= maxSubmit) {
        let clickedImage = event.target.id;
        if (clickedImage === 'left-img') {
            busMall[leftItem].vote++;
        } else if (clickedImage === 'middle-img') {
            busMall[centerItem].vote++;
        } else if (clickedImage === 'right-img') {
            busMall[rightItem].vote++;
        }
        renderImage();
        submit++;

    } else {



        document.getElementById('btn').onclick = function() { btnSubmit() };

        let arrar = [];

        function btnSubmit() {
            for (let i = 0; i < busMall.length; i++) {
                let liEl = document.createElement('li');
                status.appendChild(liEl);
                liEl.textContent = `${busMall[i].PName} has ${busMall[i].vote} votes and ${busMall[i].views} views.`
                vote.push(busMall[i].vote);
                views.push(busMall[i].views);
                arrar.push(busMall[i].PName);
                document.getElementById('btn').style.display = 'none';

            }

            leftImg.removeEventListener('click', forclick);
            centerImg.removeEventListener('click', forclick);
            rightImg.removeEventListener('click', forclick);
            chartRender();



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
                data: vote,
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