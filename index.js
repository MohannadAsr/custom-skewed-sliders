// Customize Section

// Images List

const images = [
  // 1 Slider
  [
    'https://akks-peine.de/wp-content/uploads/2024/10/WhatsApp-Image-2024-10-21-at-21.24.32_4f1ac0b4.webp',
    'https://akks-peine.de/wp-content/uploads/2024/10/WhatsApp-Image-2024-10-21-at-21.24.32_8816d2de.webp',
    'https://akks-peine.de/wp-content/uploads/2024/10/WhatsApp-Image-2024-10-21-at-21.24.32_8fcc9727.webp',
    'https://akks-peine.de/wp-content/uploads/2024/10/WhatsApp-Image-2024-10-21-at-21.24.32_5798518a.webp',
  ],
  // 2 Slider
  [
    'https://akks-peine.de/wp-content/uploads/2024/10/WhatsApp-Image-2024-10-21-at-21.24.32_4f1ac0b4.webp',
    'https://akks-peine.de/wp-content/uploads/2024/10/WhatsApp-Image-2024-10-21-at-21.24.32_8816d2de.webp',
    'https://akks-peine.de/wp-content/uploads/2024/10/WhatsApp-Image-2024-10-21-at-21.24.32_8fcc9727.webp',
    'https://akks-peine.de/wp-content/uploads/2024/10/WhatsApp-Image-2024-10-21-at-21.24.32_5798518a.webp',
  ],
  // 3 Slider
  [
    'https://akks-peine.de/wp-content/uploads/2024/10/WhatsApp-Image-2024-10-21-at-21.24.32_4f1ac0b4.webp',
    'https://akks-peine.de/wp-content/uploads/2024/10/WhatsApp-Image-2024-10-21-at-21.24.32_8816d2de.webp',
    'https://akks-peine.de/wp-content/uploads/2024/10/WhatsApp-Image-2024-10-21-at-21.24.32_8fcc9727.webp',
    'https://akks-peine.de/wp-content/uploads/2024/10/WhatsApp-Image-2024-10-21-at-21.24.32_5798518a.webp',
  ],
];

// Images Size [lg,sm]
const imagesSize = [28, 20];

// Animation Function Section
document.addEventListener('DOMContentLoaded', () => {
  const sliderContainers = document.querySelectorAll('.slider-container');
  let baseSpeed = 0.05; // Base animation speed
  let scrollDirection = 1;

  function createSlides(container, index) {
    for (let i = 0; i < 4; i++) {
      images[index].forEach((src) => {
        const div = document.createElement('div');
        div.className = `w-[${imagesSize[1]}rem] inline-block lg:w-[${imagesSize[0]}rem] object-cover aspect-[592/333]`;
        const img = document.createElement('img');
        img.src = src;
        img.className = 'w-full h-full object-cover';

        div.appendChild(img);
        container.appendChild(div);
      });
    }
  }

  sliderContainers.forEach(createSlides);

  let lastScrollAmount = [0, 0, 0];
  function animateSlider(container, reverse = false, startPosition = 0, index) {
    let scrollAmount = startPosition; // Set the initial position (0 for 1st & 3rd, -1200px for 2nd)
    function startAnimation() {
      const speed = baseSpeed * scrollDirection * (reverse ? -1 : 1);
      scrollAmount += speed;

      // Loop condition for seamless transition without cut
      if (scrollAmount >= 25 && !reverse) {
        scrollAmount = 0; // Reset position after moving completely to the right
        container.style.transform = `translateX(-${scrollAmount}%)`;
      } else if (scrollAmount <= 0 && reverse) {
        scrollAmount = 25; // Reset position after moving completely to the left
        container.style.transform = `translateX(-${scrollAmount}%)`;
      } else {
        container.style.transform = `translateX(-${scrollAmount}%)`;
      }

      lastScrollAmount[index] = scrollAmount;

      animationFrameId = requestAnimationFrame(startAnimation);
    }

    startAnimation();
  }

  // Function to stop animation
  function stopAnimation() {
    cancelAnimationFrame(animationFrameId); // Stops the ongoing animation frame loop
  }

  // Apply animation logic to the first, second, and third containers
  sliderContainers.forEach((container, index) => {
    const startPosition = index === 1 ? 25 : 0; // Second container starts from -1200px
    animateSlider(container, index === 1, startPosition, index);
  });

  // Scroll Function

  let lastScrollTop = 0;
  window.addEventListener('scroll', () => {
    const currentScrollTop = window.scrollY;

    // Calculate scroll speed
    const scrollSpeed = (currentScrollTop - lastScrollTop) / 20000;
    baseSpeed = Math.abs(scrollSpeed) + 0.05;

    stopAnimation(); // Stop previous animation before starting a new one
    // Adjust animation direction based on scroll direction
    sliderContainers.forEach((container, index) => {
      animateSlider(
        container,
        currentScrollTop > lastScrollTop ? index === 1 : index !== 1,
        lastScrollAmount[index],
        index
      );
    });

    lastScrollTop = currentScrollTop;
  });
});
