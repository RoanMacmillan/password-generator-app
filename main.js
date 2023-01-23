// Copy button
const elementToCopy = document.getElementById('output');
const copyBtn = document.getElementById('copy-btn');
const copyText = document.getElementById('copy-text');

copyBtn.addEventListener("click", function () {
    var textToCopy = elementToCopy.innerText;
    var tempInput = document.createElement("input");
    tempInput.style = "position: absolute; left: -1000px; top: -1000px";
    tempInput.value = textToCopy;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);
    copyText.style.opacity = '1';

    setTimeout(function () {
        copyText.style.opacity = '0';
    }, 1500);


});

// Inserting the range slider value to target element
const rangeSlider = document.getElementById('myinput');
const targetElement = document.querySelector('.green-text');

rangeSlider.addEventListener("input", function () {
    targetElement.innerHTML = this.value;
});

// Generate a random password depending on user specification

const includeUppercase = document.getElementById("uppercase");
const includeLowercase = document.getElementById("lowercase");
const includeNumbers = document.getElementById("numbers");
const includeSymbols = document.getElementById("symbols");
const generateBtn = document.querySelector('.btn-2')
const pwTargetElement = document.getElementById('output');
let passwordStrength = "";
generateBtn.addEventListener("click", function () {
    let possibleCharacters = "abcdefghijklmnopqrstuvwxyz";
    let password = "";
    let selectedLength = rangeSlider.value;
    let complexity = 0;

    if (includeUppercase.checked) {
        possibleCharacters += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        complexity++;
    }
    if (includeLowercase.checked) {
        possibleCharacters += "abcdefghijklmnopqrstuvwxyz";
        complexity++;
    }
    if (includeNumbers.checked) {
        possibleCharacters += "0123456789";
        complexity++;
    }
    if (includeSymbols.checked) {
        possibleCharacters += "!@#$%^&*()_+-=[]{}|;':\"<>,.?/\\";
        complexity++;
    }

    for (let i = 0; i < selectedLength; i++) {
        password += possibleCharacters.charAt(Math.floor(Math.random() * possibleCharacters.length));
    }

    if (selectedLength < 7) {
        passwordStrength = 'too-weak';
    } else if (selectedLength >= 7 && selectedLength < 9) {
        passwordStrength = 'weak';
    } else if (selectedLength >= 9 && selectedLength < 12) {
        passwordStrength = 'medium';
    } else if (selectedLength >= 12) {
        passwordStrength = 'strong';
    }  

    if (selectedLength < 6) {
        passwordStrength = 'too-weak';
    } else if (selectedLength >= 6 && selectedLength < 8 && complexity > 3) {
        passwordStrength = 'weak';
    } else if (selectedLength >= 8 && selectedLength < 11 && complexity > 3) {
        passwordStrength = 'medium';
    } else if (selectedLength >= 11 && complexity > 3) {
        passwordStrength = 'strong';
    }  

    copyBtn.classList.add('enableCopy');
    pwTargetElement.classList.add('enablePw');
    updateBars(passwordStrength);
    pwTargetElement.innerHTML = password;
});


//Adds classes to strength rating
const bars = document.querySelectorAll('.bar');
const strTarget = document.getElementById('rating');

function updateBars(passwordStrength) {
    //remove the class from all bars first
    bars.forEach(bar => bar.classList.remove('red', 'orange', 'yellow', 'green'));
    if (passwordStrength === 'too-weak') {
        bars[0].classList.add('red');
        strTarget.innerHTML = 'Too Weak!'
    } else if (passwordStrength === 'weak') {
        strTarget.innerHTML = 'Weak'
        bars[0].classList.add('orange');
        bars[1].classList.add('orange');
    } else if (passwordStrength === 'medium') {
        strTarget.innerHTML = 'medium'
        bars[0].classList.add('yellow');
        bars[1].classList.add('yellow');
        bars[2].classList.add('yellow');
    } else if (passwordStrength === 'strong') {
        strTarget.innerHTML = 'Strong'
        bars.forEach(bar => bar.classList.add('green'));
    }
}


const checkbox = document.querySelectorAll('.checkbox-container input[type="checkbox"]');
let checkedCounter = 0;

checkbox.forEach(input => {
    input.addEventListener('click', function() {
        if (this.checked) {
            checkedCounter++;
        } else {
            checkedCounter--;
        }
        generateBtn.classList.toggle('enableBtn', checkedCounter >= 3);
    })
});

 