// OOP: abstraction

// 2 ways of abstraction

// 1. using interface
// idea
interface MediaPlayer {
  play(): void;
  pause(): void;
  stop(): void;
}

// implementation
class MusicPlayer implements MediaPlayer {
  play(): void {
    console.log("Music playing...");
  }

  pause(): void {
    console.log("Music paused.");
  }

  stop(): void {
    console.log("Music stopped.");
  }
}

const myPlayer = new MusicPlayer();
myPlayer.play();

// 2. using abstract class
// idea
abstract class MyPlayer {
  abstract play(): void;
  abstract pause(): void;
  abstract stop(): void;
}

// implementation
class SongPlayer extends MyPlayer {
  play(): void {
    console.log("Music playing...");
  }

  pause(): void {
    console.log("Music paused.");
  }

  stop(): void {
    console.log("Music stopped.");
  }
}

const songPlayer = new SongPlayer();
songPlayer.stop();
