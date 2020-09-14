const notchFilterWidth = 200; // Aprox.

export default class Tinnitus {
  constructor(frequency, volume) {
    this.frequency = parseFloat(frequency);
    this.volume = volume || 0.5;
    this.populateFrequencies([this.frequency]);
  }

  // ERB means Equivalent Rectangular Bandwidth. Usually means two tones are indistinguishable at that distance.
  calculateERB(freq) {
    return 24.7 * (0.00437 * freq + 1);
  }

  // This has support for multiple tones but we typically use one
  populateFrequencies(tinnitusFrequencies) {
    this.frequencies = [];

    tinnitusFrequencies.forEach(t => {
      // Two tones are (usually) indistinguishable at 1 ERB, so we set the notch size to +- 1 ERB of the identified tinnitus frequency.
      const erb = this.calculateERB(t);

      this.frequencies.push({ freq: t });

      for (
        let freq = notchFilterWidth;
        freq <= erb - notchFilterWidth / 2;
        freq += notchFilterWidth
      ) {
        this.frequencies.push({ freq: t + freq });
        this.frequencies.push({ freq: t - freq });
      }
    });
  }

  init() {
    if (this.ctx && this.gain) return;
    this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    this.gain = this.ctx.createGain();
    this.gain.connect(this.ctx.destination);
    this.gain.gain.value = this.volume;

    this.scriptProcessor = null;
    this.f = false;
    this.isPlaying = false;
  }

  play() {
    this.init();
    if (this.isPlaying) return;
    this.isPlaying = true;

    for (let ix = 0; ix < this.frequencies.length; ix++) {
      const f = this.frequencies[ix];
      if (!f.filter) {
        f.filter = this.ctx.createBiquadFilter();
      }
      f.filter.type = "notch";
      f.filter.frequency.value = f.freq;
      f.filter.Q.value = 10.0; // About 200hz wide

      // Chain all the filters together, from first to last
      if (ix > 0) {
        this.frequencies[ix - 1].filter.connect(f.filter);
      }
    }

    if (!this.scriptProcessor) {
      let n = 4096;
      this.scriptProcessor = this.ctx.createScriptProcessor(n, 1, 1);

      this.scriptProcessor.onaudioprocess = function(e) {
        for (let t = e.outputBuffer.getChannelData(0), o = 0; n > o; o++) {
          t[o] = 2 * Math.random() - 1;
        }
      };
    }

    this.scriptProcessor.connect(this.frequencies[0].filter);
    this.frequencies[this.frequencies.length - 1].filter.connect(this.gain);
  }

  stop() {
    if (!this.isPlaying) return;
    this.isPlaying = false;

    this.frequencies.forEach(f => {
      f.filter && f.filter.disconnect() && delete f.filter;
    });
  }

  setVolume(volume) {
    this.gain.gain.value = volume;
  }
}
