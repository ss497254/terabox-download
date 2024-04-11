import { setHTML } from "./html";
import { formatFileSize } from "./utils/format-file-size";
import { exitFullscreen, requestFullscreen } from "./utils/fullscreen";

export function setupVideoPlayer({ server_filename, dlink, thumbs, size }: any) {
  setHTML(server_filename);
  attachVideoPlayer({ src: dlink, poster: thumbs.url3, size });
}

function attachVideoPlayer({ src, poster, size }: any) {
  const root = document.getElementById("root") as HTMLDivElement;
  const overlay = document.getElementById("overlay") as HTMLDivElement;
  const video = document.createElement("video");

  video.src = src;
  video.poster = poster;

  root.appendChild(video);
  overlay.innerText = formatFileSize(size);

  function showMessage(str: string) {
    const self = showMessage as any;

    overlay.innerText = str;

    clearTimeout(self.timeout);
    self.timeout = setTimeout(() => {
      overlay.innerText = "";
    }, 3000);
  }

  const Actions: Record<string, (e: KeyboardEvent) => void> = {
    KeyC: function () {
      if (video.controls) {
        video.controls = false;
        showMessage("Controls: off");
      } else {
        video.controls = true;
        showMessage("Controls: on");
      }
    },
    KeyD: function () {
      if (video.controls) {
        video.controls = false;
        showMessage("Fullscreen: off");
      } else {
        video.controls = true;
        showMessage("Fullscreen: on");
      }
    },
    KeyF: function () {
      if (video.getAttribute("fullscreen") !== "true") {
        requestFullscreen();
        video.setAttribute("fullscreen", "true");
        showMessage("Fullscreen: on");
      } else {
        exitFullscreen();
        video.setAttribute("fullscreen", "false");
        showMessage("Fullscreen: off");
      }
    },
    KeyM: function () {
      if (video.getAttribute("muted") !== "true") {
        video.muted = true;
        video.setAttribute("muted", "true");
        showMessage("Mute: on");
      } else {
        video.muted = false;
        video.setAttribute("muted", "false");
        showMessage("Mute: off");
      }
    },
    KeyR: function () {
      const r = video.getAttribute("rotate");

      if (!r) {
        video.style.transform = "rotate(90deg)";
        video.setAttribute("rotate", "90deg");
        showMessage("Rotate: 90deg");
      } else if (r === "90deg") {
        video.style.transform = "rotate(180deg)";
        video.setAttribute("rotate", "180deg");
        showMessage("Rotate: 180deg");
      } else if (r === "180deg") {
        video.style.transform = "rotate(270deg)";
        video.setAttribute("rotate", "270deg");
        showMessage("Rotate: 270deg");
      } else if (r === "270deg") {
        video.style.transform = "rotate(0deg)";
        video.removeAttribute("rotate");
        showMessage("Rotate: 0deg");
      }
    },
    Space: function () {
      if (video.paused) {
        video.play();
        showMessage("Play");
      } else {
        video.pause();
        showMessage("Pause");
      }
    },
    ArrowRight: function () {
      video.currentTime = video.currentTime + 5;
      showMessage("Skip: +5sec");
    },
    ArrowLeft: function () {
      video.currentTime = video.currentTime - 5;
      showMessage("Skip: -5sec");
    },
    ArrowUp: function () {
      video.volume = Math.min(video.volume + 0.1, 1);
      showMessage("Volume: +10%");
    },
    ArrowDown: function () {
      video.volume = Math.max(video.volume - 0.1, 0);
      showMessage("Volume: -10%");
    },
    BracketRight: function () {
      video.style.scale = (parseFloat(video.style.scale ? video.style.scale : "1") + 0.1).toFixed(2).toString();
      showMessage("Skip: +0.1");
    },
    BracketLeft: function () {
      video.style.scale = (parseFloat(video.style.scale ? video.style.scale : "1") - 0.1).toFixed(2).toString();
      showMessage("Skip: -0.1");
    },
  };

  document.addEventListener("keydown", (event) => {
    try {
      const { code } = event;

      if (code in Actions) Actions[code](event);
    } catch (e) {
      console.warn(e);
    }
  });
}
