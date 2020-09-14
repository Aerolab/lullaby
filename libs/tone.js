export const Tone = function(context) {
  const self = this;
  self.playing = !1;
  self.volume = 1;
  self.balance = 0;
  self.frequency = 440;
  self.type = "sine";
  self.lastVolRampData = { startTime: null, startVal: null, endVal: null };
  self.oscillator = self.gainNode = self.fadeGainNode = self.mergerNode = self.leftGainNode = self.rightGainNode = null;
  self.oscillatorStopTimeoutID = null;

  /**
   *
   * @param frequency [0, 20000]
   * @param waveType (sine,square,triangle,sawtooth)
   * @param volume [0, 1]
   * @param balance [-1, +1] Left -1, Center 0, Right +1
   */
  self.init = function(frequency, waveType, volume, balance) {
    self.gainNode = context.createGain();
    self.fadeGainNode = context.createGain();
    self.mergerNode = context.createChannelMerger(2);
    self.leftGainNode = context.createGain();
    self.rightGainNode = context.createGain();
    self.leftGainNode.connect(self.mergerNode, 0, 0);
    self.rightGainNode.connect(self.mergerNode, 0, 1);
    self.mergerNode.connect(self.gainNode);
    self.gainNode.connect(self.fadeGainNode);
    self.fadeGainNode.connect(context.destination);
    self.frequency = frequency || 440;
    self.type = waveType || "sine";
    self.volume = volume || 1;
    self.balance = balance || 0;
    self.leftGainNode.gain.value = Math.min(1, 1 - self.balance);
    self.rightGainNode.gain.value = Math.min(1, 1 + self.balance);
    self.gainNode.gain.value = self.volume;
    self.fadeGainNode.gain.value = 0;
  };

  self.play = function(c) {
    void 0 === c && (c = TonePlayer.context.currentTime);
    if (self.oscillatorStopTimeoutID)
      clearTimeout(self.oscillatorStopTimeoutID);
    else {
      if (self.playing) return !1;
      self.oscillator = context.createOscillator();
      self.oscillator.connect(self.leftGainNode);
      self.oscillator.connect(self.rightGainNode);
      self.oscillator.frequency.value = self.frequency;
      self.oscillator.type = self.type;
      self.oscillator.start(c);
    }
    self.fadeGainNode.gain.setTargetAtTime(
      1,
      c,
      TonePlayer.SET_TARGET_TIME_CONSTANT
    );
    self.playing = !0;
  };

  self.stop = function(c) {
    if (!self.playing) return !1;
    void 0 === c && (c = TonePlayer.context.currentTime);
    self.fadeGainNode.gain.setTargetAtTime(
      0,
      c,
      TonePlayer.SET_TARGET_TIME_CONSTANT
    );
    self.oscillatorStopTimeoutID = setTimeout(function() {
      self.oscillator.stop();
      self.oscillatorStopTimeoutID = null;
      self.playing = !1;
    }, 1e3 *
      (c - context.currentTime + 8 * TonePlayer.SET_TARGET_TIME_CONSTANT));
  };

  self.setFreq = function(c) {
    self.frequency = c;
    self.playing &&
      self.oscillator.frequency.setTargetAtTime(c, context.currentTime, 0.03);
  };

  self.setType = function(a) {
    self.type = a;
    self.playing && (self.oscillator.type = a);
  };

  self.setBalance = function(c) {
    self.balance = c;
    if (self.playing) {
      self.leftGainNode.gain.setTargetAtTime(
        Math.min(1, 1 - c),
        context.currentTime,
        TonePlayer.SET_TARGET_TIME_CONSTANT
      );
      self.rightGainNode.gain.setTargetAtTime(
        Math.min(1, 1 + c),
        context.currentTime,
        TonePlayer.SET_TARGET_TIME_CONSTANT
      );
    } else {
      self.leftGainNode.gain.setValueAtTime(
        Math.min(1, 1 - c),
        context.currentTime
      );
      self.rightGainNode.gain.setValueAtTime(
        Math.min(1, 1 + c),
        context.currentTime
      );
    }
  };

  self.setVolume = function(c) {
    self.playing
      ? self.gainNode.gain.setTargetAtTime(
          c,
          context.currentTime,
          TonePlayer.SET_TARGET_TIME_CONSTANT
        )
      : self.gainNode.gain.setValueAtTime(c, context.currentTime);
    self.volume = c;
  };
};

export const TonePlayer = {
  array: [],
  current: null,
  playing: !1,
  CAN_RELY_ON_GAIN_VALUE: !0,
  SET_TARGET_TIME_CONSTANT: 0.05,
  init: function() {
    if (TonePlayer.context) return;
    if (window.AudioContext) {
      TonePlayer.context = new AudioContext();
    } else if (window.webkitAudioContext) {
      TonePlayer.context = new window.webkitAudioContext();
    } else {
      throw new Error("Cannot initialize AudioContext");
    }

    // Create a default tone player
    if (!TonePlayer.current) {
      TonePlayer.createTone();
    }
  },
  destroy: function() {
    if (TonePlayer.context) {
      TonePlayer.context.close();
      delete TonePlayer.context;
    }
  },
  createTone: function() {
    if (TonePlayer.current) return;
    TonePlayer.current = new Tone(TonePlayer.context);
    TonePlayer.current.init();
    TonePlayer.array.push(TonePlayer.current);
  },
  removeTone: function(a) {
    if (!TonePlayer.array[a]) return !1;
    for (a += 1; a < TonePlayer.array[TonePlayer.array.length]; a++)
      TonePlayer.array[a - 1] = TonePlayer.array[a];
    --TonePlayer.array.length;
  },
  select: function(a) {
    if (!TonePlayer.array[a]) return !1;
    TonePlayer.current = TonePlayer.array[a];
  },
  play: function() {
    if (TonePlayer.playing) return;
    TonePlayer.init();
    TonePlayer.playing = !0;
    "suspended" === TonePlayer.context.state && TonePlayer.context.resume();
    for (var a = 0; a < TonePlayer.array.length; a++)
      TonePlayer.array[a].play(TonePlayer.context.currentTime + 0.1);
  },
  stop: function() {
    if (!TonePlayer.playing) return;
    TonePlayer.playing = !1;
    for (var a = 0; a < TonePlayer.array.length; a++)
      TonePlayer.array[a].stop(TonePlayer.context.currentTime + 0.1);
  },
  setFreq: function(frequency) {
    TonePlayer.init();
    TonePlayer.current.setFreq(frequency);
  },
  setBalance: function(balance) {
    TonePlayer.init();
    TonePlayer.current.setBalance(balance);
  },
  /** Any of sine,square,triangle,sawtooth */
  setWaveType: function(waveType) {
    TonePlayer.init();
    TonePlayer.current.setType(waveType);
  },
  setVolume: function(volume) {
    TonePlayer.init();
    TonePlayer.current.setVolume(volume);
  }
};

export const calculateERB = freq => {
  return 24.7 * (0.00437 * freq + 1);
};
