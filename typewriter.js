// Typing animation script
const texts = [
  "Before You Spend... Yilk It.",
  "Is it worth it? Yilk it.",
  "Your smart spending assistant",
  "Money comparison made simple",
  "Turn prices into context"
];

let typewriterElement;
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeWriter() {
  // Safety check to make sure element exists
  if (!typewriterElement) {
    typewriterElement = document.getElementById('typewriter-text');
    if (!typewriterElement) {
      console.log('Typewriter element not found, retrying...');
      setTimeout(typeWriter, 100);
      return;
    }
  }

  const currentText = texts[textIndex];
  
  if (isDeleting) {
    typewriterElement.innerHTML = currentText.substring(0, charIndex - 1) + '<span class="cursor">|</span>';
    charIndex--;
  } else {
    typewriterElement.innerHTML = currentText.substring(0, charIndex + 1) + '<span class="cursor">|</span>';
    charIndex++;
  }
  
  let typeSpeed = 100;
  
  if (isDeleting) {
    typeSpeed /= 2;
  }
  
  if (!isDeleting && charIndex === currentText.length) {
    typeSpeed = 2000; // Pause at end
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    textIndex = (textIndex + 1) % texts.length;
    typeSpeed = 500;
  }
  
  setTimeout(typeWriter, typeSpeed);
}

// Start the typing animation when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM loaded, starting typewriter...');
  typeWriter();
});

// Backup: Start after window loads completely
window.addEventListener('load', function() {
  if (!typewriterElement) {
    console.log('Backup: Starting typewriter after window load...');
    typeWriter();
  }
});
