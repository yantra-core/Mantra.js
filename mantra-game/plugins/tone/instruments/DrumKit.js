export default class DrumKit {
  constructor() {
    this.kick = new Tone.MembraneSynth().toDestination();
    this.snare = new Tone.NoiseSynth({
      noise: { type: 'white' },
      envelope: { attack: 0.005, decay: 0.1, sustain: 0 }
    }).toDestination();
    this.hiHatClosed = new Tone.MetalSynth({
      frequency: 200,
      envelope: { attack: 0.001, decay: 0.1, sustain: 0 },
      harmonicity: 5.1,
      modulationIndex: 32,
      resonance: 4000,
      octaves: 1.5
    }).toDestination();
    this.hiHatOpen = new Tone.MetalSynth({
      frequency: 200,
      envelope: { attack: 0.001, decay: 0.3, sustain: 0 },
      harmonicity: 5.1,
      modulationIndex: 32,
      resonance: 4000,
      octaves: 1.5
    }).toDestination();
    this.tomLow = new Tone.MembraneSynth({
      pitchDecay: 0.05,
      octaves: 4,
      oscillator: { type: 'sine' },
      envelope: { attack: 0.001, decay: 0.4, sustain: 0.01 }
    }).toDestination();
    this.tomHigh = new Tone.MembraneSynth({
      pitchDecay: 0.05,
      octaves: 6,
      oscillator: { type: 'sine' },
      envelope: { attack: 0.001, decay: 0.2, sustain: 0.01 }
    }).toDestination();
  }

  play(sound) {
    switch (sound) {
      case 'kick':
        this.kick.triggerAttackRelease('C1', '8n');
        break;
      case 'snare':
        this.snare.triggerAttackRelease('8n');
        break;
        case 'hat':
          this.hiHatClosed.triggerAttackRelease('32n');
          break;  
      case 'hiHatClosed':
        this.hiHatClosed.triggerAttackRelease('32n');
        break;
      case 'hiHatOpen':
        this.hiHatOpen.triggerAttackRelease('8n');
        break;
      case 'tomLow':
        this.tomLow.triggerAttackRelease('G2', '8n');
        break;
      case 'tomHigh':
        this.tomHigh.triggerAttackRelease('A4', '8n');
        break;
      default:
        console.log('Unknown drum sound');
    }
  }
}