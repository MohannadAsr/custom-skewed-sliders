// Customize Section

// Images List
const images = [
  // 1 Slider
  [
    'https://cdn2.hubspot.net/hubfs/53/image1.jpg',
    'https://cdn2.hubspot.net/hubfs/53/image2.jpg',
    'https://cdn2.hubspot.net/hubfs/53/image3.jpg',
    'https://cdn2.hubspot.net/hubfs/53/image4.jpg',
  ],
  // 2 Slider
  [
    'https://cdn2.hubspot.net/hubfs/53/image1.jpg',
    'https://cdn2.hubspot.net/hubfs/53/image2.jpg',
    'https://cdn2.hubspot.net/hubfs/53/image3.jpg',
    'https://cdn2.hubspot.net/hubfs/53/image4.jpg',
  ],
  // 3 Slider
  [
    'https://cdn2.hubspot.net/hubfs/53/image1.jpg',
    'https://cdn2.hubspot.net/hubfs/53/image2.jpg',
    'https://cdn2.hubspot.net/hubfs/53/image3.jpg',
    'https://cdn2.hubspot.net/hubfs/53/image4.jpg',
  ],
];

// Images Size [lg, sm]
const imagesSize = [22, 20];

// Animation Function Section
document.addEventListener('DOMContentLoaded', () => {
  const sliderContainers = document.querySelectorAll('.slider-container');
  let baseSpeed = 2; // Adjust the speed here for smoother animation

  function createSlides(container, index) {
    for (let i = 0; i < 4; i++) {
      images[index].forEach((src) => {
        const div = document.createElement('div');
        div.className = `w-[${imagesSize[1]}rem] inline-block lg:w-[${imagesSize[0]}rem] object-cover aspect-[592/333]`;
        const img = document.createElement('img');
        img.src = src;
        img.className = '!w-full !h-full object-cover';
        div.appendChild(img);
        container.appendChild(div);
      });
    }
  }

  sliderContainers.forEach(createSlides);

  let lastScrollAmount = [0, 0, 0];
  let intervals = []; // Store interval IDs for each slider

  function animateSlider(container, reverse = false, startPosition = 0, index) {
    let scrollAmount = startPosition;

    // Animation function to shift container content
    function startAnimation() {
      const speed = baseSpeed * 1 * (reverse ? -1 : 1);
      scrollAmount += speed;

      // Loop condition for seamless transition without cut
      console.log(scrollAmount);
      if (scrollAmount >= 28 && !reverse) {
        container.style.transition = 'none';
        scrollAmount = 0 + 28 - scrollAmount; // Reset position after moving completely to the right
        container.style.transform = `translateX(-${scrollAmount}%)`;
        console.log(scrollAmount);
      } else if (scrollAmount <= 0 && reverse) {
        container.style.transition = 'none';
        scrollAmount = 28 - 28 + scrollAmount; // Reset position after moving completely to the left
        console.log(scrollAmount);
        container.style.transform = `translateX(-${scrollAmount}%)`;
      } else {
        container.style.transition = 'transform 0.5s linear';
        container.style.transform = `translateX(-${scrollAmount}%)`;
      }

      lastScrollAmount[index] = scrollAmount;
    }

    // Clear any existing interval for this slider and start a new one
    clearInterval(intervals[index]);
    startAnimation();
    intervals[index] = setInterval(startAnimation, 500); // approx. 60 FPS
  }

  // Apply animation logic to each slider container
  sliderContainers.forEach((container, index) => {
    const startPosition = index === 1 ? 28 : 0;
    animateSlider(container, index === 1, startPosition, index);
  });

  function stopAnimation() {
    sliderContainers.forEach((container, index) => {
      clearInterval(intervals[index]);
    });
  }

  // Scroll adjustment (optional) — adjust animation speed on scroll
  let lastScrollTop = 0;
  window.addEventListener('scroll', () => {
    const currentScrollTop = window.scrollY;
    const scrollSpeed = (currentScrollTop - lastScrollTop) / 200;
    baseSpeed = Math.abs(scrollSpeed / 100) + 1;
    stopAnimation();
    // Adjust direction and reinitialize animation based on scroll direction
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
