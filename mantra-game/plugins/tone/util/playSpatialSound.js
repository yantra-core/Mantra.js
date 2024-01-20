// Method to play spatial sound
// TODO: needs to use pool of synths, this creates too many synths
export default function playSpatialSound(particle, blackHole) {
  if (!this.toneStarted) {
    Tone.start();
    this.toneStarted = true;
  }

  // Calculate panning based on particle's position relative to black hole
  const gameWidth = this.game.width; // Use actual game width
  const xPosition = (particle.position.x - blackHole.position.x) / gameWidth;
  const panner = new Tone.Panner(xPosition).toDestination();

  // Calculate velocity factor
  const velocityMagnitude = Math.sqrt(particle.velocity.x ** 2 + particle.velocity.y ** 2);
  const maxVelocity = 10; // Replace with maximum expected velocity in your game
  const velocityFactor = velocityMagnitude / maxVelocity;

  // Create FM Synth for water drop sound
  const fmSynth = new Tone.FMSynth({
    harmonicity: 8,
    modulationIndex: 2,
    oscillator: { type: 'sine' },
    envelope: {
      attack: 0.01,
      decay: 0.2,
      sustain: 0,
      release: 0.1
    },
    modulation: { type: 'square' },
    modulationEnvelope: {
      attack: 0.01,
      decay: 0.2,
      sustain: 0,
      release: 0.1
    }
  }).connect(panner);

  // Adjust parameters based on velocity
  const duration = 0.2 + (0.3 * (1 - velocityFactor)); // Shorter duration for faster particles
  const pitchDrop = velocityFactor * 24; // Higher drop for faster particles

  // Trigger the FM Synth with a pitch drop
  fmSynth.triggerAttack("C4", Tone.now());
  setTimeout(() => {
    fmSynth.setNote(`C${4 - pitchDrop}`, Tone.now());
    fmSynth.triggerRelease(Tone.now() + duration);
  }, 10);

  // Optionally: Add a delay for a more spacious effect
  // const feedbackDelay = new Tone.FeedbackDelay("8n", 0.5).toDestination();
  // fmSynth.connect(feedbackDelay);
}