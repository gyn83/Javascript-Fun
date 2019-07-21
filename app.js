///////////////////////////////////////////// HAMBURGER MENU  ///////////////////////////////////////////////////////////////// 


const menuIcon = document.querySelector('.toggle-menu');
const navbar = document.querySelector('.navbar');

menuIcon.addEventListener('click', () => {
    navbar.classList.toggle("change");
});

///////////////////////////////////////////// TYPEWRITER HEADING  ///////////////////////////////////////////////////////////////// 

const TypeWriter = function(txtElement, words, wait = 3000) {
    this.txtElement = txtElement;
    this.words = words;
    this.txt = '';
    this.wordIndex = 0;
    this.wait= parseInt(wait, 10);
    this.type();
    this.isDeleting = false;
}

// Type Method 

TypeWriter.prototype.type = function() {
    // Current index of word

    const current = this.wordIndex % this.words.length;

    // Get full text of current word

    const fullTxt = this.words[current];

    // Check if deleting

    if(this.isDeleting) {
        // Remove char
        this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
        // Add char
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    // Insert txt into element

    this.txtElement.innerHTML = `<span class"txt">${this.txt}</span>`;

    // Initial Type Speed

    let typeSpeed = 300;

    if(this.isDeleting) {
        typeSpeed /= 2;
    }

    // If word is coplete

    if(!this.isDeleting && this.txt === fullTxt) {
        // Make pause at end
        typeSpeed = this.wait;
        // Set delete to true
        this.isDeleting = true;
    } else if(this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        // Move to the next word
        this.wordIndex++;

        // Pause before type startin
        typeSpeed = 500;
    }

    setTimeout(() => this.type(), typeSpeed)
}

// Init On Dom Load 

document.addEventListener('DOMContentLoaded', init);

// Init App

function init() {
    const txtElement = document.querySelector('.txt-type');
    const words = JSON.parse(txtElement.getAttribute('data-words'));
    const wait = txtElement.getAttribute('data-wait');
    
    // Init Typewriter 

    new TypeWriter(txtElement, words, wait);
}



// ////////////////////// TYPEWRITER EFFECT DEV ED SIMPLE SOLUTION //////////////////////// 

// const texts = ['exercising', 'having fun', 'creating'];
// let count = 0;
// let index = 0;
// let currentText = '';
// let letter = '';

// (function type() {

// if(count === texts.length) {
//   count = 0;  
// }
// currentText = texts[count];
// letter = currentText.slice(0, ++index);

// document.querySelector('.typing').textContent = letter;
// if(letter.length === currentText.length) {
//     count++;
//     index = 0;
// }

// setTimeout(type, 300);
// }());


///////////////////////////////////////////// PAPER PLANE  ///////////////////////////////////////////////////////////////// 

const flightPath = {
    curviness: 1.25,
    autoRotate: true,
    values: [
        {x: 100, y:-20},
        {x: 300, y: 10},
        {x: 500, y: 100},
        {x: 850, y: -100},
        {x: 350, y: -50},
        {x: 600, y: 600},
        {x: 800, y: 250},
        {x: window.innerWidth, y: -250}
        ]
}

const tween = new TimelineLite();

tween.add(
    TweenLite.to(".paperFly", 1, {
        bezier: flightPath,
        ease: Power1.easeInOut
    })
);

const controller = new ScrollMagic.Controller();

const scene = new ScrollMagic.Scene({
    triggerElement: ".animation",
    duration: 3000,
    triggerHook: 0

})

.setTween(tween)
//.addIndicators()
.setPin(".animation")
.addTo(controller);