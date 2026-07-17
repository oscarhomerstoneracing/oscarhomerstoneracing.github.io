// Countdown to the next BRSCC Fiesta Junior round.
// Rounds auto-advance: once a weekend ends, the countdown moves to the next one.
document.addEventListener('DOMContentLoaded', function () {
  var box = document.getElementById('countdown');
  if (!box) return;

  // start = first race-day morning, end = last day evening (local UK time).
  var rounds = [
    { name: 'Donington Park', start: '2026-07-18T09:00:00+01:00', end: '2026-07-19T19:00:00+01:00', dates: '18–19 July' },
    { name: 'Brands Hatch', start: '2026-08-15T09:00:00+01:00', end: '2026-08-16T19:00:00+01:00', dates: '15–16 August' },
    { name: 'Silverstone', start: '2026-09-19T09:00:00+01:00', end: '2026-09-20T19:00:00+01:00', dates: '19–20 September' },
    { name: 'Oulton Park', start: '2026-10-17T09:00:00+01:00', end: '2026-10-17T19:00:00+01:00', dates: '17 October' }
  ];

  var nameEl = document.getElementById('cd-race');
  var dateEl = document.getElementById('cd-date');
  var cells = {
    d: document.getElementById('cd-days'),
    h: document.getElementById('cd-hours'),
    m: document.getElementById('cd-mins'),
    s: document.getElementById('cd-secs')
  };

  function pad(n) { return n < 10 ? '0' + n : '' + n; }

  function tick() {
    var now = Date.now();
    var current = null, live = false;

    for (var i = 0; i < rounds.length; i++) {
      var start = new Date(rounds[i].start).getTime();
      var end = new Date(rounds[i].end).getTime();
      if (now < start) { current = rounds[i]; break; }
      if (now >= start && now <= end) { current = rounds[i]; live = true; break; }
    }

    if (!current) {
      box.querySelector('.cd-title').textContent = '2026 season complete — 2027 dates coming soon';
      box.querySelector('.cd-cells').style.display = 'none';
      return;
    }

    nameEl.textContent = current.name;
    dateEl.textContent = current.dates;

    if (live) {
      box.classList.add('live');
      box.querySelector('.cd-label').textContent = 'Race weekend — live now';
      box.querySelector('.cd-cells').style.display = 'none';
      return;
    }

    box.classList.remove('live');
    box.querySelector('.cd-cells').style.display = '';
    var diff = new Date(current.start).getTime() - now;
    var days = Math.floor(diff / 86400000);
    var hours = Math.floor((diff % 86400000) / 3600000);
    var mins = Math.floor((diff % 3600000) / 60000);
    var secs = Math.floor((diff % 60000) / 1000);
    cells.d.textContent = pad(days);
    cells.h.textContent = pad(hours);
    cells.m.textContent = pad(mins);
    cells.s.textContent = pad(secs);
  }

  tick();
  setInterval(tick, 1000);
});
