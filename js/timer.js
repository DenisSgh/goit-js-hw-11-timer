class CountdownTimer {
  DELAY = 1000;

  constructor({ selector, targetDate }) {
    this.selector = selector;
    this.targetDate = targetDate;
    this.intervalId = null;

    this.start();
  }

  start() {
    this.intervalId = setInterval(() => {
      const deltaTime = this.targetDate - Date.now();

      if (deltaTime < 0) {
        clearInterval(this.intervalId);
        return;
      }

      const time = this.getTimeComponents(deltaTime);

      this.updateTimer(time);
    }, this.DELAY);
  }

  updateTimer({ days, hours, mins, secs }) {
    const container = document.querySelector(this.selector);
    const refs = {
      days: container.querySelector('[data-value="days"]'),
      hours: container.querySelector('[data-value="hours"]'),
      mins: container.querySelector('[data-value="mins"]'),
      secs: container.querySelector('[data-value="secs"]'),
    };

    refs.days.textContent = days;
    refs.hours.textContent = hours;
    refs.mins.textContent = mins;
    refs.secs.textContent = secs;

    return;
  }

  getTimeComponents(time) {
    const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
    const hours = this.pad(
      Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    );
    const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));

    return { days, hours, mins, secs };
  }

  pad(value) {
    return String(value).padStart(2, '0');
  }
}

new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date('May 15, 2021 17:21'),
});
