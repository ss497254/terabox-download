import { formatFileSize, formatTime } from "./utils";
import { exitFullscreen, requestFullscreen } from "./utils/fullscreen";

export function getKeyboardActions(
  video: HTMLVideoElement & Record<string, any>,
  src: string,
  size: number
): Record<string, (e: KeyboardEvent) => string> {
  const info = document.getElementById("info") as HTMLDivElement;

  return {
    KeyC: function () {
      video.controls = !video.controls;
      return "Controls: " + (video.controls ? "on" : "off");
    },
    KeyD: function (e) {
      // shift key will force to download again.
      if (video.downloaded && !e.shiftKey) {
        return "Video already downloaded.";
      } else {
        const a = document.createElement("a");
        a.href = src;
        a.download = "true";
        a.click();
        video.downloaded = true;

        return "Downloading...";
      }
    },
    KeyF: function () {
      if (video.fullscreen) {
        video.fullscreen = false;

        exitFullscreen();
        return "Fullscreen: off";
      } else {
        video.fullscreen = true;

        requestFullscreen();
        return "Fullscreen: on";
      }
    },
    KeyI: function () {
      if (info.innerText) {
        info.innerText = "";
      } else {
        info.innerText = [`Size: ${formatFileSize(size)}`, `Downloaded: ${video.downloaded ?? false}`].join("\n");
      }
      return "";
    },
    KeyM: function () {
      video.muted = !video.muted;
      return "Mute: " + (video.muted ? "on" : "off");
    },
    KeyR: function (e) {
      if (e.ctrlKey) return "";

      const rotate = ((video.rotate ?? 0) + 90) % 360;
      video.rotate = rotate;

      video.style.transform = `rotate(${rotate}deg)`;
      return `Rotate: ${rotate}deg`;
    },
    Space: function () {
      if (video.paused) {
        video.play();
        return "Play";
      } else {
        video.pause();
        return "Pause";
      }
    },
    ArrowRight: function () {
      video.currentTime = video.currentTime + 5;
      return formatTime(video.currentTime) + " / " + formatTime(video.duration);
    },
    ArrowLeft: function () {
      video.currentTime = video.currentTime - 5;
      return formatTime(video.currentTime) + " / " + formatTime(video.duration);
    },
    ArrowUp: function () {
      video.volume = Math.min(video.volume + 0.1, 1);
      return "Volume: " + Math.round(video.volume * 100) + "%";
    },
    ArrowDown: function () {
      video.volume = Math.max(video.volume - 0.1, 0);
      return "Volume: " + Math.round(video.volume * 100) + "%";
    },
    BracketRight: function () {
      video.style.scale = (parseFloat(video.style.scale ? video.style.scale : "1") + 0.1).toFixed(2);
      return "Scale: " + video.style.scale;
    },
    BracketLeft: function () {
      video.style.scale = (parseFloat(video.style.scale ? video.style.scale : "1") - 0.1).toFixed(2);
      return "Scale: " + video.style.scale;
    },
  };
}
