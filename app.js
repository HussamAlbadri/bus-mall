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

function BusImage(product) {
    this.PName = product.split('.')[0];
    this.ProductImage = `img/${product}`;
    this.votes = 0;
    this.views = 0;
    busMall.push(this);
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

function renderImage() {
    leftItem = randomImage();
    centerItem = randomImage();
    rightItem = randomImage();

    while (leftItem === centerItem || leftItem === rightItem || centerItem === rightItem) {

        leftItem = randomImage();
        rightItem = randomImage();
        centerItem = randomImage();
    }
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
        if (clickedImage === 'left-img') {
            busMall[leftItem].votes++;
        } else if (clickedImage === 'middle-img') {
            busMall[centerItem].votes++;
        } else if (clickedImage === 'right-img') {
            busMall[rightItem].votes++;
        }

        renderImage();
        submit++;
    } else {
        document.getElementById('btn').onclick = function() {

            btnSubmit()
        };

        function btnSubmit() {
            for (let i = 0; i < busMall.length; i++) {
                let liEl = document.createElement('li');
                status.appendChild(liEl);
                liEl.textContent = `${busMall[i].PName} has ${busMall[i].votes} votes and ${busMall[i].views} views.`
                document.getElementById('btn').style.display = 'none';
            }
            leftImg.removeEventListener('click', addClick);
            centerImg.removeEventListener('click', addClick);
            rightImg.removeEventListener('click', addClick);
        }
    }

}