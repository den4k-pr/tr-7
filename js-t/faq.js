document.addEventListener('DOMContentLoaded', function() {
    var faqQuestions = document.querySelectorAll('.s12-faq-question');
    
    faqQuestions.forEach(function(question) {
      question.addEventListener('click', function() {
        var item = this.parentElement;
        var wrapper = item.querySelector('.s12-faq-answer-wrapper');
        var isActive = item.classList.contains('active');
        
        // (Опціонально) Закрити всі інші відкриті питання
        // document.querySelectorAll('.s12-faq-item').forEach(function(otherItem) {
        //   otherItem.classList.remove('active');
        //   otherItem.querySelector('.s12-faq-answer-wrapper').style.maxHeight = null;
        // });
        
        if (!isActive) {
          item.classList.add('active');
          wrapper.style.maxHeight = wrapper.scrollHeight + "px";
        } else {
          item.classList.remove('active');
          wrapper.style.maxHeight = null;
        }
      });
    });
  });
// Плашки s2 (Mobility + Flexibility, Strength): згортають/розгортають картки своєї групи
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.s2-toggle').forEach(function(pill) {
      var wrapper = pill.parentElement.querySelector('.s2-collapse');
      if (!wrapper) return;

      // Після розгортання знімаємо обмеження, щоб висота підлаштовувалась під ресайз (vw)
      wrapper.addEventListener('transitionend', function(e) {
        if (e.propertyName === 'max-height' && !pill.classList.contains('collapsed')) {
          wrapper.style.maxHeight = 'none';
        }
      });

      pill.addEventListener('click', function() {
        if (pill.classList.contains('collapsed')) {
          pill.classList.remove('collapsed');
          wrapper.style.maxHeight = wrapper.scrollHeight + "px";
        } else {
          pill.classList.add('collapsed');
          wrapper.style.maxHeight = wrapper.scrollHeight + "px";
          wrapper.offsetHeight; // reflow, щоб анімація стартувала з поточної висоти
          wrapper.style.maxHeight = '0px';
        }
      });
    });
  });
