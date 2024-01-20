export default function playIntroJingle(currentMidi) {
  let that = this;
  const synths = [];
  //let currentMidi = startUpJingle;
  const now = Tone.now() + 0.5;
  currentMidi.tracks.forEach((track) => {
    //create a synth for each track
    this.synth = new Tone.PolySynth(Tone.Synth, {
      envelope: {
        attack: 0.02,
        decay: 0.1,
        sustain: 0.3,
        release: 1,
      },
    }).toDestination();
    synths.push(that.synth);
    //schedule all of the events
    // we have access to that.synth, can we listen for play note events?
    track.notes.forEach((note) => {
      that.playNote(
        note.name,
        note.duration,
        note.time + now,
        note.velocity
      )
    });
  });

}