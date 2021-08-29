'use strict';

let hightTryclick = 25;
let startclick = 0;
//push all the name to this array
let newArray = [];
//push all the name for this array
let nameProdect = [];
//push all the counter vote for this array
let voteProduct = [];
//push all the counter show for this array
let showProduct = [];
//global scope
let image1Element = document.getElementById('image1');
let image2Element = document.getElementById('image2');
let image3Element = document.getElementById('image3');

//an object
function Mall(name, source) {
    this.name = name;
    this.source = source;
    this.vote = 0;
    this.show = 0;
    newArray.push(this);
    nameProdect.push(this.name);
}
//new object
new Mall('bag', 'img/bag.jpg');
new Mall('banana', 'img/banana.jpg');
new Mall('bathroom', 'img/bathroom.jpg');
new Mall('boots', 'img/boots.jpg');
new Mall('breakfast', 'img/breakfast.jpg');
new Mall('bubblegum', 'img/bubblegum.jpg');
new Mall('chair', 'img/chair.jpg');
new Mall('cthulhu', 'img/cthulhu.jpg');
new Mall('dog-duck', 'img/dog-duck.jpg');
new Mall('dragon', 'img/dragon.jpg');
new Mall('pen', 'img/pen.jpg');
new Mall('pet-sweep', 'img/pet-sweep.jpg');
new Mall('scissors', 'img/scissors.jpg');
new Mall('shark', 'img/shark.jpg');
new Mall('sweep', 'img/sweep.png');
new Mall('tauntaun', 'img/tauntaun.jpg');
new Mall('unicorn', 'img/unicorn.jpg');
new Mall('usb', 'img/usb.gif');
new Mall('water-can', 'img/water-can.jpg');
new Mall('wine-glass', 'img/wine-glass.jpg');

// console.log(newArray);

//global scope for the image i want to show in the website
let image1Box;
let image2Box;
let image3Box;
//function it response for show the image in the website
function renderThereimage() {
    //make the image show randomly
    image1Box = randomNumber();
    image2Box = randomNumber();
    image3Box = randomNumber();
    //condition for the image to not replay in the same time it show in the website
    do {
        image1Box = randomNumber();
        if (image1Box === image2Box) {
            image2Box = randomNumber();
        } else if (image2Box === image3Box) {
            image2Box = randomNumber();
        } else if (image1Box === image3Box) {
            image3Box = randomNumber();
        }
    }
    while (image1Box === image2Box || image2Box === image3Box || image3Box === image1Box)
    //make all the image declare in the element tag
    image1Element.setAttribute('src', newArray[image1Box].source);
    image2Element.setAttribute('src', newArray[image2Box].source);
    image3Element.setAttribute('src', newArray[image3Box].source);
    newArray[image2Box].show++;
    newArray[image1Box].show++;
    newArray[image3Box].show++;
}
renderThereimage();

//function for calculate the random image to show
function randomNumber() {
    let randomnumber = Math.floor(Math.random() * newArray.length);
    return randomnumber;
}

//declare the image to change in the click
image1Element.addEventListener('click', handleClicking);
image2Element.addEventListener('click', handleClicking);
image3Element.addEventListener('click', handleClicking);


//function to do calculate the vote number and to declare the event listener be click and to create element tag for unorderlist and li
function handleClicking(event) {
    startclick++;
    if (startclick <= hightTryclick) {
        //condition for the image click
        if (event.target.id === 'image1' || event.target.id === 'image2' || event.target.id === 'image3') {
            newArray[image1Box].vote++;
            newArray[image2Box].voe++;
            newArray[image3Box].vote++;
        }
        addlocalStorage();
        renderThereimage();
    } else {
        let submitElement = document.getElementById('b1');
        let unorderListelement = document.getElementById('list');
        unorderListelement.appendChild(submitElement);
        unorderListelement.addEventListener('click', unorderlist);

        function unorderlist(event) {
            //for loop to push and create li inside the unorderlist
            for (let x = 0; x < newArray.length; x++) {
                let liElement = document.createElement('li');
                unorderListelement.appendChild(liElement);
                liElement.textContent = `image${newArray[x].name} it has be ${newArray[x].vote} time votes and showing ${newArray[x].show} time.`
                unorderListelement.removeEventListener('click', unorderlist);
            }

        }
        //for loop to push the vote counter and show counter to the array
        for (let x = 0; x < newArray.length; x++) {
            voteProduct.push(newArray[x].vote);
            showProduct.push(newArray[x].show);
        }
        chartform();
        //to remove the replay in the bottom click
        image1Element.removeEventListener('click', handleClicking);
        image2Element.removeEventListener('click', handleClicking);
        image3Element.removeEventListener('click', handleClicking);
    }

}
//function to create the chart.js
function chartform() {
    var ctx = document.getElementById('myChart').getContext('2d');
    var chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: nameProdect,
            datasets: [{
                label: 'product Votes',
                backgroundColor: '#7e46acfd',
                borderColor: '#000000',
                data: voteProduct,
            }, {
                label: 'product showing',
                backgroundColor: 'white',
                borderColor: '#000000',
                data: showProduct,
            }]
        },
        options: {}
    });
}
// chartform();
// console.log(chartform);


function addlocalStorage() {
    let data = JSON.stringify(newArray);
    localStorage.setItem('AllOrders', data);
}
// console.log(addlocalStorage);

function savaData() {
    let saveDataitem = JSON.parse(localStorage.getItem('AllOrders'));
    // console.log(saveDataitem);
    if (saveDataitem) {
        newArray = saveDataitem;
    }
    renderThereimage();
}
// console.log(savaData());
savaData();