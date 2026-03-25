type NoteData = { freq: number; start: number; dur: number; vol?: number; wave?: OscillatorType };

// ═══ PREMIUM SOUND ENGINE — with reverb, harmonics, and rich tones ═══

function createPremiumCtx() {
  const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();

  // Convolution reverb for spacious, professional sound
  const convolver = ctx.createConvolver();
  const rate = ctx.sampleRate;
  const length = rate * 2.5;
  const impulse = ctx.createBuffer(2, length, rate);
  for (let ch = 0; ch < 2; ch++) {
    const d = impulse.getChannelData(ch);
    for (let i = 0; i < length; i++) {
      d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / length, 2.2) * 0.5;
    }
  }
  convolver.buffer = impulse;

  // Mix bus
  const dry = ctx.createGain();
  const wet = ctx.createGain();
  const master = ctx.createGain();
  dry.gain.value = 0.65;
  wet.gain.value = 0.35;
  master.gain.value = 0.9;
  dry.connect(master);
  convolver.connect(wet);
  wet.connect(master);
  master.connect(ctx.destination);

  return { ctx, dry, convolver, master };
}

function richNote(
  ctx: AudioContext, dry: GainNode, rev: ConvolverNode,
  freq: number, start: number, dur: number, vol: number = 0.12, wave: OscillatorType = "sine"
) {
  const t = ctx.currentTime + start;

  // Fundamental
  const o1 = ctx.createOscillator();
  const g1 = ctx.createGain();
  o1.type = wave;
  o1.frequency.setValueAtTime(freq, t);
  g1.gain.setValueAtTime(0, t);
  g1.gain.linearRampToValueAtTime(vol, t + 0.035);
  g1.gain.setValueAtTime(vol * 0.85, t + dur * 0.65);
  g1.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  o1.connect(g1);
  g1.connect(dry);
  g1.connect(rev);
  o1.start(t);
  o1.stop(t + dur + 0.1);

  // Octave harmonic (warm body)
  if (wave === "sine") {
    const o2 = ctx.createOscillator();
    const g2 = ctx.createGain();
    o2.type = "sine";
    o2.frequency.setValueAtTime(freq * 2.001, t); // slight detune for richness
    g2.gain.setValueAtTime(0, t);
    g2.gain.linearRampToValueAtTime(vol * 0.12, t + 0.05);
    g2.gain.exponentialRampToValueAtTime(0.0001, t + dur * 0.7);
    o2.connect(g2);
    g2.connect(dry);
    o2.start(t);
    o2.stop(t + dur * 0.8);

    // Sub harmonic (depth)
    const o3 = ctx.createOscillator();
    const g3 = ctx.createGain();
    o3.type = "sine";
    o3.frequency.setValueAtTime(freq * 0.5, t);
    g3.gain.setValueAtTime(0, t);
    g3.gain.linearRampToValueAtTime(vol * 0.06, t + 0.06);
    g3.gain.exponentialRampToValueAtTime(0.0001, t + dur * 0.5);
    o3.connect(g3);
    g3.connect(rev);
    o3.start(t);
    o3.stop(t + dur * 0.6);

    // Shimmer (fifth above, very quiet)
    const o4 = ctx.createOscillator();
    const g4 = ctx.createGain();
    o4.type = "triangle";
    o4.frequency.setValueAtTime(freq * 3.002, t);
    g4.gain.setValueAtTime(0, t);
    g4.gain.linearRampToValueAtTime(vol * 0.04, t + 0.07);
    g4.gain.exponentialRampToValueAtTime(0.0001, t + dur * 0.4);
    o4.connect(g4);
    g4.connect(rev);
    o4.start(t);
    o4.stop(t + dur * 0.5);
  }
}

function playMelody(melody: NoteData[], duration: number = 11000) {
  try {
    const { ctx, dry, convolver } = createPremiumCtx();
    melody.forEach(n => richNote(ctx, dry, convolver, n.freq, n.start, n.dur, n.vol, n.wave));
    setTimeout(() => ctx.close(), duration + 3000);
  } catch { /* silent */ }
}

// ═══ POSITIVE NOTIFICATION SOUNDS (USCIS Approval) — ~10 seconds each ═══

export const SOUNDS: { id: string; name: string; emoji: string; play: () => void }[] = [
  {
    id: "celebration",
    name: "Grand Celebration",
    emoji: "🎉",
    play: () => playMelody([
      { freq: 523, start: 0, dur: 0.5 }, { freq: 659, start: 0.4, dur: 0.5 }, { freq: 784, start: 0.8, dur: 0.6 },
      { freq: 1047, start: 1.3, dur: 1.0, vol: 0.18 }, { freq: 784, start: 1.3, dur: 1.0, vol: 0.08 },
      { freq: 880, start: 2.5, dur: 0.35 }, { freq: 988, start: 2.85, dur: 0.35 }, { freq: 1047, start: 3.2, dur: 0.5 },
      { freq: 1175, start: 3.7, dur: 0.4 }, { freq: 1319, start: 4.1, dur: 0.7, vol: 0.16 },
      { freq: 2093, start: 5.0, dur: 0.25, wave: "triangle", vol: 0.06 }, { freq: 2637, start: 5.2, dur: 0.25, wave: "triangle", vol: 0.05 },
      { freq: 784, start: 5.6, dur: 0.35 }, { freq: 880, start: 5.95, dur: 0.35 }, { freq: 1047, start: 6.3, dur: 0.55, vol: 0.16 },
      { freq: 1319, start: 6.9, dur: 0.5, vol: 0.15 }, { freq: 1568, start: 7.4, dur: 0.7, vol: 0.16 },
      { freq: 1047, start: 8.2, dur: 2.0, vol: 0.12 }, { freq: 1319, start: 8.2, dur: 2.0, vol: 0.1 },
      { freq: 1568, start: 8.2, dur: 2.0, vol: 0.08 }, { freq: 2093, start: 8.7, dur: 1.5, wave: "triangle", vol: 0.04 },
    ]),
  },
  {
    id: "victory",
    name: "Victory March",
    emoji: "🏆",
    play: () => playMelody([
      { freq: 392, start: 0, dur: 0.18, wave: "square", vol: 0.08 }, { freq: 392, start: 0.2, dur: 0.18, wave: "square", vol: 0.08 },
      { freq: 392, start: 0.4, dur: 0.18, wave: "square", vol: 0.08 },
      { freq: 523, start: 0.65, dur: 0.7, vol: 0.14 }, { freq: 392, start: 0.65, dur: 0.7, vol: 0.07 },
      { freq: 659, start: 1.5, dur: 0.3 }, { freq: 587, start: 1.8, dur: 0.18 }, { freq: 523, start: 2.0, dur: 0.18 },
      { freq: 587, start: 2.2, dur: 0.18 }, { freq: 659, start: 2.4, dur: 0.5, vol: 0.14 },
      { freq: 784, start: 3.0, dur: 0.45, vol: 0.14 }, { freq: 880, start: 3.45, dur: 0.35, vol: 0.14 },
      { freq: 1047, start: 3.9, dur: 0.9, vol: 0.16 }, { freq: 784, start: 3.9, dur: 0.9, vol: 0.08 },
      { freq: 659, start: 5.0, dur: 0.25 }, { freq: 784, start: 5.25, dur: 0.25 }, { freq: 880, start: 5.5, dur: 0.25 },
      { freq: 1047, start: 5.8, dur: 0.45, vol: 0.16 }, { freq: 1175, start: 6.25, dur: 0.35 },
      { freq: 1319, start: 6.6, dur: 0.55, vol: 0.16 },
      { freq: 1568, start: 7.3, dur: 0.9, vol: 0.16 }, { freq: 1047, start: 7.3, dur: 0.9, vol: 0.08 },
      { freq: 1047, start: 8.4, dur: 2.0, vol: 0.1 }, { freq: 1319, start: 8.4, dur: 2.0, vol: 0.08 },
      { freq: 1568, start: 8.4, dur: 2.0, vol: 0.07 }, { freq: 2093, start: 9.0, dur: 1.5, vol: 0.04 },
    ]),
  },
  {
    id: "sparkle",
    name: "Starlight Magic",
    emoji: "✨",
    play: () => playMelody([
      { freq: 880, start: 0, dur: 0.6, wave: "triangle", vol: 0.1 },
      { freq: 1175, start: 0.45, dur: 0.6, wave: "triangle", vol: 0.1 },
      { freq: 1397, start: 0.9, dur: 0.6, wave: "triangle", vol: 0.1 },
      { freq: 1760, start: 1.5, dur: 0.25, wave: "triangle", vol: 0.07 }, { freq: 2093, start: 1.75, dur: 0.25, wave: "triangle", vol: 0.06 },
      { freq: 2349, start: 2.0, dur: 0.25, wave: "triangle", vol: 0.05 }, { freq: 2637, start: 2.25, dur: 0.35, wave: "triangle", vol: 0.04 },
      { freq: 659, start: 2.8, dur: 0.45 }, { freq: 784, start: 3.25, dur: 0.45 },
      { freq: 880, start: 3.7, dur: 0.55, vol: 0.14 }, { freq: 1047, start: 4.25, dur: 0.7, vol: 0.14 },
      { freq: 2093, start: 5.1, dur: 0.18, wave: "triangle", vol: 0.05 }, { freq: 2637, start: 5.3, dur: 0.18, wave: "triangle", vol: 0.04 },
      { freq: 3136, start: 5.5, dur: 0.2, wave: "triangle", vol: 0.03 },
      { freq: 784, start: 6.0, dur: 0.45 }, { freq: 988, start: 6.45, dur: 0.45 },
      { freq: 1175, start: 6.9, dur: 0.55, vol: 0.14 }, { freq: 1568, start: 7.45, dur: 0.9, vol: 0.12 },
      { freq: 1047, start: 8.4, dur: 1.8, wave: "triangle", vol: 0.07 }, { freq: 1568, start: 8.4, dur: 1.8, vol: 0.06 },
      { freq: 2093, start: 8.9, dur: 1.3, wave: "triangle", vol: 0.03 },
    ]),
  },
  {
    id: "approved",
    name: "Case Approved!",
    emoji: "✅",
    play: () => playMelody([
      { freq: 880, start: 0, dur: 0.18 }, { freq: 880, start: 0.22, dur: 0.18 },
      { freq: 523, start: 0.55, dur: 0.45, vol: 0.14 }, { freq: 659, start: 1.0, dur: 0.35, vol: 0.14 },
      { freq: 784, start: 1.35, dur: 0.45, vol: 0.14 }, { freq: 1047, start: 1.85, dur: 0.9, vol: 0.16 },
      { freq: 880, start: 2.9, dur: 0.3 }, { freq: 784, start: 3.2, dur: 0.22 }, { freq: 880, start: 3.45, dur: 0.22 },
      { freq: 1047, start: 3.7, dur: 0.45, vol: 0.14 }, { freq: 1175, start: 4.15, dur: 0.35, vol: 0.14 },
      { freq: 1319, start: 4.5, dur: 0.6, vol: 0.16 },
      { freq: 1047, start: 5.3, dur: 0.22 }, { freq: 1175, start: 5.55, dur: 0.22 }, { freq: 1319, start: 5.8, dur: 0.22 },
      { freq: 1568, start: 6.1, dur: 0.7, vol: 0.16 },
      { freq: 1319, start: 6.9, dur: 0.3 }, { freq: 1568, start: 7.2, dur: 0.35 },
      { freq: 2093, start: 7.6, dur: 1.0, vol: 0.14 },
      { freq: 1047, start: 8.7, dur: 1.8, vol: 0.1 }, { freq: 1319, start: 8.7, dur: 1.8, vol: 0.08 },
      { freq: 1568, start: 8.7, dur: 1.8, vol: 0.07 }, { freq: 2093, start: 8.7, dur: 1.8, vol: 0.05 },
    ]),
  },
  {
    id: "happy",
    name: "Joy & Happiness",
    emoji: "😊",
    play: () => playMelody([
      { freq: 523, start: 0, dur: 0.22 }, { freq: 659, start: 0.25, dur: 0.22 }, { freq: 784, start: 0.5, dur: 0.22 },
      { freq: 1047, start: 0.8, dur: 0.5, vol: 0.14 },
      { freq: 880, start: 1.5, dur: 0.25 }, { freq: 784, start: 1.75, dur: 0.18 }, { freq: 880, start: 1.95, dur: 0.25 },
      { freq: 1047, start: 2.3, dur: 0.45, vol: 0.14 }, { freq: 1175, start: 2.75, dur: 0.22 },
      { freq: 1319, start: 3.0, dur: 0.6, vol: 0.16 },
      { freq: 1047, start: 3.8, dur: 0.18 }, { freq: 1175, start: 4.0, dur: 0.18 }, { freq: 1319, start: 4.2, dur: 0.18 },
      { freq: 1175, start: 4.4, dur: 0.18 }, { freq: 1319, start: 4.6, dur: 0.18 }, { freq: 1568, start: 4.8, dur: 0.5, vol: 0.16 },
      { freq: 784, start: 5.5, dur: 0.45 }, { freq: 880, start: 5.95, dur: 0.35 }, { freq: 1047, start: 6.3, dur: 0.55, vol: 0.14 },
      { freq: 1319, start: 6.85, dur: 0.45 }, { freq: 1568, start: 7.3, dur: 0.7, vol: 0.16 },
      { freq: 1047, start: 8.1, dur: 1.8, vol: 0.1 }, { freq: 1319, start: 8.1, dur: 1.8, vol: 0.08 },
      { freq: 1568, start: 8.1, dur: 1.8, vol: 0.06 }, { freq: 2093, start: 8.6, dur: 1.3, wave: "triangle", vol: 0.03 },
    ]),
  },
  {
    id: "freedom",
    name: "Freedom Bells",
    emoji: "🔔",
    play: () => playMelody([
      { freq: 659, start: 0, dur: 1.4, wave: "triangle", vol: 0.14 }, { freq: 1319, start: 0, dur: 0.9, vol: 0.05 },
      { freq: 784, start: 1.2, dur: 1.4, wave: "triangle", vol: 0.14 }, { freq: 1568, start: 1.2, dur: 0.9, vol: 0.05 },
      { freq: 1047, start: 2.4, dur: 1.4, wave: "triangle", vol: 0.12 }, { freq: 2093, start: 2.4, dur: 0.9, vol: 0.04 },
      { freq: 784, start: 3.8, dur: 0.35 }, { freq: 880, start: 4.15, dur: 0.35 }, { freq: 1047, start: 4.5, dur: 0.5, vol: 0.14 },
      { freq: 659, start: 5.2, dur: 1.6, wave: "triangle", vol: 0.12 }, { freq: 784, start: 5.2, dur: 1.6, wave: "triangle", vol: 0.1 },
      { freq: 1047, start: 5.2, dur: 1.6, vol: 0.06 },
      { freq: 1319, start: 7.0, dur: 0.9, wave: "triangle", vol: 0.1 }, { freq: 1568, start: 7.4, dur: 0.9, wave: "triangle", vol: 0.1 },
      { freq: 2093, start: 7.8, dur: 1.0, wave: "triangle", vol: 0.08 },
      { freq: 784, start: 8.8, dur: 2.0, wave: "triangle", vol: 0.08 }, { freq: 1047, start: 8.8, dur: 2.0, wave: "triangle", vol: 0.06 },
      { freq: 1568, start: 8.8, dur: 2.0, vol: 0.04 },
    ]),
  },
  {
    id: "fireworks",
    name: "Fireworks Show",
    emoji: "🎆",
    play: () => playMelody([
      { freq: 150, start: 0, dur: 0.12, vol: 0.08 }, { freq: 400, start: 0.12, dur: 0.08 }, { freq: 900, start: 0.2, dur: 0.06 },
      { freq: 1200, start: 0.28, dur: 0.5, wave: "triangle", vol: 0.08 }, { freq: 1568, start: 0.33, dur: 0.4, vol: 0.06 },
      { freq: 1047, start: 0.8, dur: 0.6, vol: 0.1 }, { freq: 1319, start: 0.9, dur: 0.5, vol: 0.08 },
      { freq: 180, start: 1.7, dur: 0.1, vol: 0.08 }, { freq: 450, start: 1.8, dur: 0.08 }, { freq: 1000, start: 1.88, dur: 0.06 },
      { freq: 1400, start: 1.95, dur: 0.5, wave: "triangle", vol: 0.08 },
      { freq: 880, start: 2.5, dur: 0.7, vol: 0.12 }, { freq: 1175, start: 2.6, dur: 0.6, vol: 0.1 },
      { freq: 1568, start: 2.7, dur: 0.5, vol: 0.08 },
      { freq: 200, start: 3.6, dur: 0.08, vol: 0.06 }, { freq: 800, start: 3.7, dur: 0.35, wave: "triangle", vol: 0.07 },
      { freq: 220, start: 4.1, dur: 0.08, vol: 0.06 }, { freq: 900, start: 4.2, dur: 0.35, wave: "triangle", vol: 0.07 },
      { freq: 240, start: 4.6, dur: 0.08, vol: 0.06 }, { freq: 1000, start: 4.7, dur: 0.35, wave: "triangle", vol: 0.07 },
      { freq: 784, start: 5.3, dur: 0.8, vol: 0.12 }, { freq: 988, start: 5.4, dur: 0.7, vol: 0.1 },
      { freq: 1175, start: 5.5, dur: 0.6, vol: 0.08 }, { freq: 1397, start: 5.6, dur: 0.5, vol: 0.06 },
      { freq: 1568, start: 5.7, dur: 0.9, vol: 0.12 }, { freq: 1760, start: 5.8, dur: 0.8, vol: 0.08 },
      { freq: 2093, start: 5.9, dur: 0.7, wave: "triangle", vol: 0.06 },
      { freq: 2349, start: 6.8, dur: 0.35, wave: "triangle", vol: 0.04 }, { freq: 2637, start: 7.1, dur: 0.35, wave: "triangle", vol: 0.03 },
      { freq: 2793, start: 7.4, dur: 0.35, wave: "triangle", vol: 0.03 },
      { freq: 1047, start: 8.0, dur: 2.2, vol: 0.08 }, { freq: 1319, start: 8.0, dur: 2.2, vol: 0.06 },
      { freq: 1568, start: 8.0, dur: 2.2, vol: 0.05 },
    ]),
  },
  {
    id: "dream",
    name: "American Dream",
    emoji: "🗽",
    play: () => playMelody([
      { freq: 392, start: 0, dur: 0.7, vol: 0.12 }, { freq: 494, start: 0.6, dur: 0.7, vol: 0.12 },
      { freq: 523, start: 1.2, dur: 0.9, vol: 0.14 }, { freq: 392, start: 1.2, dur: 0.9, vol: 0.06 },
      { freq: 587, start: 2.3, dur: 0.55 }, { freq: 659, start: 2.85, dur: 0.55, vol: 0.14 },
      { freq: 784, start: 3.4, dur: 0.9, vol: 0.16 }, { freq: 523, start: 3.4, dur: 0.9, vol: 0.08 },
      { freq: 880, start: 4.5, dur: 0.45, vol: 0.14 }, { freq: 784, start: 4.95, dur: 0.3 },
      { freq: 880, start: 5.25, dur: 0.35 }, { freq: 1047, start: 5.6, dur: 0.9, vol: 0.16 },
      { freq: 1175, start: 6.5, dur: 0.35, vol: 0.14 }, { freq: 1319, start: 6.85, dur: 0.35, vol: 0.14 },
      { freq: 1568, start: 7.2, dur: 1.1, vol: 0.16 }, { freq: 1047, start: 7.2, dur: 1.1, vol: 0.08 },
      { freq: 784, start: 7.2, dur: 1.1, vol: 0.06 },
      { freq: 1047, start: 8.5, dur: 2.2, vol: 0.1 }, { freq: 784, start: 8.5, dur: 2.2, vol: 0.08 },
      { freq: 523, start: 8.5, dur: 2.2, vol: 0.06 }, { freq: 1319, start: 9.0, dur: 1.7, vol: 0.05 },
    ]),
  },
];

// ═══ ACTION REQUIRED SOUNDS (RFE / Additional Documents) — reassuring but attention-getting ═══

export const ACTION_SOUNDS: { id: string; name: string; emoji: string; play: () => void }[] = [
  {
    id: "urgent_bell",
    name: "Urgent Attention",
    emoji: "🔴",
    play: () => playMelody([
      { freq: 880, start: 0, dur: 0.35, vol: 0.16 }, { freq: 660, start: 0.4, dur: 0.35, vol: 0.14 },
      { freq: 880, start: 0.8, dur: 0.35, vol: 0.16 }, { freq: 660, start: 1.2, dur: 0.35, vol: 0.14 },
      { freq: 523, start: 1.8, dur: 0.45 }, { freq: 587, start: 2.25, dur: 0.35 },
      { freq: 659, start: 2.6, dur: 0.45 }, { freq: 784, start: 3.05, dur: 0.6, vol: 0.14 },
      { freq: 659, start: 3.8, dur: 0.3 }, { freq: 784, start: 4.1, dur: 0.3 },
      { freq: 880, start: 4.4, dur: 0.45, vol: 0.14 }, { freq: 1047, start: 4.85, dur: 0.7, vol: 0.14 },
      { freq: 784, start: 5.7, dur: 0.45 }, { freq: 880, start: 6.15, dur: 0.45 },
      { freq: 1047, start: 6.6, dur: 0.9, vol: 0.12 }, { freq: 784, start: 6.6, dur: 0.9, vol: 0.06 },
      { freq: 659, start: 7.7, dur: 1.8, vol: 0.08 }, { freq: 784, start: 7.7, dur: 1.8, vol: 0.06 },
      { freq: 1047, start: 8.2, dur: 1.5, wave: "triangle", vol: 0.04 },
    ]),
  },
  {
    id: "action_needed",
    name: "Action Needed",
    emoji: "📋",
    play: () => playMelody([
      { freq: 784, start: 0, dur: 0.25, vol: 0.14 }, { freq: 1047, start: 0.25, dur: 0.25, vol: 0.14 },
      { freq: 784, start: 0.6, dur: 0.25, vol: 0.12 }, { freq: 1047, start: 0.85, dur: 0.25, vol: 0.12 },
      { freq: 523, start: 1.3, dur: 0.4 }, { freq: 587, start: 1.7, dur: 0.4 },
      { freq: 659, start: 2.1, dur: 0.4 }, { freq: 784, start: 2.5, dur: 0.6, vol: 0.14 },
      { freq: 880, start: 3.3, dur: 0.3 }, { freq: 784, start: 3.6, dur: 0.22 },
      { freq: 659, start: 3.82, dur: 0.22 }, { freq: 784, start: 4.1, dur: 0.45, vol: 0.12 },
      { freq: 880, start: 4.55, dur: 0.35 }, { freq: 1047, start: 4.9, dur: 0.6, vol: 0.14 },
      { freq: 784, start: 5.7, dur: 0.35 }, { freq: 880, start: 6.05, dur: 0.35 },
      { freq: 1047, start: 6.4, dur: 0.45, vol: 0.12 }, { freq: 1175, start: 6.85, dur: 0.35 },
      { freq: 1319, start: 7.2, dur: 0.7, vol: 0.14 },
      { freq: 1047, start: 8.1, dur: 1.8, vol: 0.08 }, { freq: 784, start: 8.1, dur: 1.8, vol: 0.06 },
      { freq: 1319, start: 8.6, dur: 1.3, wave: "triangle", vol: 0.03 },
    ]),
  },
  {
    id: "docs_request",
    name: "Documents Requested",
    emoji: "📄",
    play: () => playMelody([
      { freq: 659, start: 0, dur: 0.5, wave: "triangle", vol: 0.12 },
      { freq: 880, start: 0.45, dur: 0.5, wave: "triangle", vol: 0.12 },
      { freq: 523, start: 1.3, dur: 0.35 }, { freq: 587, start: 1.65, dur: 0.35 },
      { freq: 659, start: 2.0, dur: 0.35 }, { freq: 784, start: 2.35, dur: 0.5, vol: 0.12 },
      { freq: 880, start: 2.85, dur: 0.35 }, { freq: 1047, start: 3.2, dur: 0.6, vol: 0.14 },
      { freq: 880, start: 4.0, dur: 0.3 }, { freq: 784, start: 4.3, dur: 0.22 },
      { freq: 880, start: 4.55, dur: 0.35 }, { freq: 1047, start: 4.9, dur: 0.6, vol: 0.12 },
      { freq: 659, start: 5.7, dur: 0.45 }, { freq: 784, start: 6.15, dur: 0.35 },
      { freq: 880, start: 6.5, dur: 0.35 }, { freq: 1047, start: 6.85, dur: 0.45, vol: 0.14 },
      { freq: 1175, start: 7.3, dur: 0.35 }, { freq: 1319, start: 7.65, dur: 0.7, vol: 0.14 },
      { freq: 1047, start: 8.5, dur: 2.0, vol: 0.08 }, { freq: 784, start: 8.5, dur: 2.0, vol: 0.06 },
      { freq: 1319, start: 9.0, dur: 1.5, wave: "triangle", vol: 0.04 },
    ]),
  },
];

export function playSoundById(id: string) {
  const sound = SOUNDS.find(s => s.id === id) || ACTION_SOUNDS.find(s => s.id === id);
  if (sound) sound.play();
}
