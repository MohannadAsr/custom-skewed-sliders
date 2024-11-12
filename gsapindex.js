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

// Images Size [lg,sm]
const imagesSize = [22, 20];

document.addEventListener('DOMContentLoaded', () => {
  const sliderContainers = document.querySelectorAll('.slider-container');
  let baseSpeed = 10;
  let scrollDirection = 1;

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

  function setupGSAPAnimation(container, reverse = false, index, last) {
    gsap.set(container, { xPercent: last ?? reverse ? -25 : 0 });

    const tl = gsap.timeline({
      repeat: -1,
      paused: true,
      onUpdate: () => {
        const currentX = gsap.getProperty(container, 'xPercent');
        lastScrollAmount[index] = currentX;
        // console.log('Current xPercent:', lastScrollAmount);
      },
    });

    tl.to(container, {
      xPercent: reverse ? 0 : -25,
      duration: 15,
      ease: 'none',
    });

    return tl;
  }

  // Create animations for each container
  let timelines = Array.from(sliderContainers).map((container, index) => {
    const reverse = index === 1;
    return setupGSAPAnimation(container, reverse, index);
  });

  timelines.forEach((tl) => tl.repeat(-1).yoyo(true).play());

  let lastScrollTop = 0;
  let currentScrollTop = 0;

  window.addEventListener('scroll', () => {
    currentScrollTop = window.scrollY;
    scrollDirection = currentScrollTop > lastScrollTop ? 1 : -1;
    lastScrollTop = currentScrollTop;

    // // Pause all timelines, update direction, and replay with new speed

    timelines.forEach((tl) => {
      tl.pause();
      tl.reverse();
      tl.play();
      tl.pause();
      tl.timeScale(1.9);
      tl.tweenTo('sine.in');
      tl.reverse();
      tl.play();
    });
  });

  window.addEventListener('scrollend', () => {
    timelines.forEach((tl) => {
      tl.tweenTo('none');
      // tl.repeat(-1).play();
    });
  });
});
