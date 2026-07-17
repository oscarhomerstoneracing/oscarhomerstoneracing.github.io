// Scroll-driven "walk around the car" section.
// Stages cross-fade and the media card subtly rotates as you scroll,
// so it reads as turning around the #555 Fiesta.
document.addEventListener('DOMContentLoaded', function () {
  var section = document.getElementById('turntable');
  if (!section) return;

  var stages = Array.prototype.slice.call(section.querySelectorAll('.tt-stage'));
  var dots = Array.prototype.slice.call(section.querySelectorAll('.tt-progress .dot'));
  var hint = section.querySelector('.tt-hint');

  // Mark stages whose image actually loaded so the fallback hides.
  stages.forEach(function (stage) {
    var img = stage.querySelector('img');
    var media = stage.querySelector('.tt-media');
    if (!img || !media) return;
    if (img.complete) {
      // Already settled before we attached listeners: either loaded or failed.
      if (img.naturalWidth > 0) media.classList.add('has-img');
      else img.remove();
      return;
    }
    img.addEventListener('load', function () { media.classList.add('has-img'); });
    img.addEventListener('error', function () { img.remove(); });
  });

  var ticking = false;
  function update() {
    ticking = false;
    var rect = section.getBoundingClientRect();
    var vh = window.innerHeight;
    var total = rect.height - vh;
    var progress = Math.min(1, Math.max(0, -rect.top / total));

    var n = stages.length;
    var idx = Math.min(n - 1, Math.floor(progress * n));
    var local = (progress * n) - idx; // 0..1 within the current stage

    stages.forEach(function (stage, i) {
      var media = stage.querySelector('.tt-media');
      if (i === idx) {
        stage.classList.add('active');
        if (media) {
          // Sweep from -8deg to +8deg across the stage: the "turning" motion.
          var deg = -8 + local * 16;
          var scale = 0.96 + 0.04 * Math.sin(local * Math.PI);
          media.style.transform =
            'perspective(1200px) rotateY(' + deg.toFixed(2) + 'deg) scale(' + scale.toFixed(3) + ')';
        }
      } else {
        stage.classList.remove('active');
      }
    });

    dots.forEach(function (dot, i) {
      dot.classList.toggle('on', i === idx);
    });

    if (hint) hint.style.opacity = progress > 0.04 ? '0' : '1';
  }

  function onScroll() {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  update();
});
