(function () {
  console.log('[VideoSlides] Script initialized for s6');

var VIDEO_MAP = {
  '5.webp':  'https://itden-cdn.b-cdn.net/stretching/sdk23o.MP4'
};

  // 1. Ініціалізація Swiper Слайдера
  function initSwiper() {
    var gallerySwiperEl = document.querySelector('.s6-swiper');
    if (gallerySwiperEl) {
      var swiper = new Swiper(gallerySwiperEl, {
        slidesPerView: 'auto',
        spaceBetween: 10,
        pagination: {
          el: '.s6-pagination',
          clickable: true
        },
        navigation: {
          nextEl: '.s6-next',
          prevEl: '.s6-prev'
        }
      });

      swiper.on('slideChangeTransitionStart', killAllVideos);
      swiper.on('sliderMove', killAllVideos);

      // Ширина слайдів залежить від картинки, тому перераховуємо Swiper після завантаження кожної
      gallerySwiperEl.querySelectorAll('.s6-img').forEach(function (img) {
        if (!img.complete) img.addEventListener('load', function () { swiper.update(); });
      });
    }
  }

  // 2. Функція витягування посилання на відео з data-video або VIDEO_MAP
  function getVideoUrl(slide, img) {
    if (slide) {
      var directUrl = slide.getAttribute('data-video');
      if (directUrl) return directUrl;
    }
    if (!img) return null;
    var src = img.getAttribute('src') || img.getAttribute('data-src') || '';
    var filename = src.split('/').pop().split('?')[0];
    return VIDEO_MAP[filename] || null;
  }

  // 3. Знищення активних плеєрів та відновлення фотографій
  function killAllVideos() {
    var videos = document.querySelectorAll('.s6-slide video');
    videos.forEach(function (v) {
      v.pause();
      v.src = '';
      v.load();
      var parentSlide = v.closest('.s6-slide');
      if (parentSlide) {
        var parentImg = parentSlide.querySelector('.s6-img');
        if (parentImg) parentImg.style.cssText = '';
      }
      v.remove();
    });
  }

  // 4. Відкриття та відтворення відео
  function openVideo(slide, url) {
    killAllVideos();

    slide.style.setProperty('position', 'relative', 'important');
    slide.style.setProperty('overflow', 'hidden', 'important');

    var img = slide.querySelector('.s6-img');
    if (img) {
      img.style.cssText = 'visibility: hidden !important; opacity: 0 !important;';
    }

    var v = document.createElement('video');
    v.setAttribute('src', url);
    v.setAttribute('controls', '');
    v.setAttribute('playsinline', '');
    v.setAttribute('webkit-playsinline', '');
    v.setAttribute('autoplay', '');
    v.setAttribute('preload', 'auto');
    v.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100% !important;min-height:100%;object-fit:cover;z-index:99;background:#000;display:block;border-radius:12px;outline:none;';

    v.addEventListener('ended', function () { 
      killAllVideos(); 
    });

    slide.appendChild(v);

    var p = v.play();
    if (p && typeof p.then === 'function') {
      p.catch(function () {
        v.muted = true;
        v.play();
      });
    }
  }

  // 5. Глобальні слухачі подій
  function initGlobalListeners() {
    initSwiper();

    document.addEventListener('click', function (e) {
      if (e.target.tagName === 'VIDEO') return;

      var slide = e.target.closest('.s6-slide');
      if (!slide) return;

      var img = slide.querySelector('.s6-img');
      var url = getVideoUrl(slide, img);
      
      if (url) {
        e.preventDefault();
        e.stopPropagation();
        openVideo(slide, url);
      }
    }, true);

    document.addEventListener('touchmove', function (e) {
      if (e.target.tagName === 'VIDEO') return;
      if (e.target.closest('.s6-slide')) {
        killAllVideos();
      }
    }, { passive: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGlobalListeners);
  } else {
    initGlobalListeners();
  }
})();








(function () {
  console.log('[VideoSlides] Script initialized for s7');

  // 1. Ініціалізація Swiper Слайдера
  function initSwiper() {
    var gallerySwiperEl = document.querySelector('.s7-swiper');
    if (gallerySwiperEl) {
      var swiper = new Swiper(gallerySwiperEl, {
        slidesPerView: 'auto',
        spaceBetween: 14, 
        pagination: {
          el: '.s7-pagination',
          clickable: true
        },
        navigation: {
          nextEl: '.s7-next',
          prevEl: '.s7-prev'
        }
      });

      swiper.on('slideChangeTransitionStart', killAllVideos);
      swiper.on('sliderMove', killAllVideos);
    }
  }

  // 2. Функція витягування посилання на відео з data-video
  function getVideoUrl(slide) {
    if (slide) {
      return slide.getAttribute('data-video');
    }
    return null;
  }

  // 3. Знищення активних плеєрів та відновлення фотографій
  function killAllVideos() {
    var videos = document.querySelectorAll('.s7-slide video');
    videos.forEach(function (v) {
      v.pause();
      v.src = '';
      v.load();
      var parentSlide = v.closest('.s7-slide');
      if (parentSlide) {
        var parentImg = parentSlide.querySelector('.s7-img');
        var playBtn = parentSlide.querySelector('.s7-play-btn');
        if (parentImg) parentImg.style.cssText = '';
        if (playBtn) playBtn.style.display = 'flex';
      }
      v.remove();
    });
  }

  // 4. Відкриття та відтворення відео всередині s7-video-wrapper
  function openVideo(slide, url) {
    killAllVideos();

    var videoWrapper = slide.querySelector('.s7-video-wrapper');
    if (!videoWrapper) return;

    var img = videoWrapper.querySelector('.s7-img');
    var playBtn = videoWrapper.querySelector('.s7-play-btn');
    
    if (img) img.style.cssText = 'visibility: hidden !important; opacity: 0 !important;';
    if (playBtn) playBtn.style.display = 'none';

    var v = document.createElement('video');
    v.setAttribute('src', url);
    v.setAttribute('controls', '');
    v.setAttribute('playsinline', '');
    v.setAttribute('webkit-playsinline', '');
    v.setAttribute('autoplay', '');
    v.setAttribute('preload', 'auto');
    v.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100% !important;object-fit:cover;z-index:99;background:#000;display:block;border-radius:20px;outline:none;';

    v.addEventListener('ended', function () { 
      killAllVideos(); 
    });

    videoWrapper.appendChild(v);

    var p = v.play();
    if (p && typeof p.then === 'function') {
      p.catch(function () {
        v.muted = true;
        v.play();
      });
    }
  }

  // 5. Глобальні слухачі подій
  function initGlobalListeners() {
    initSwiper();

    document.addEventListener('click', function (e) {
      if (e.target.tagName === 'VIDEO') return;

      var slide = e.target.closest('.s7-slide');
      if (!slide) return;

      var url = getVideoUrl(slide);
      
      if (url) {
        e.preventDefault();
        e.stopPropagation();
        openVideo(slide, url);
      }
    }, true);

    document.addEventListener('touchmove', function (e) {
      if (e.target.tagName === 'VIDEO') return;
      if (e.target.closest('.s7-slide')) {
        killAllVideos();
      }
    }, { passive: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGlobalListeners);
  } else {
    initGlobalListeners();
  }
})();