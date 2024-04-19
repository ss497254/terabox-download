import { setHTML } from "./html";
import { getKeyboardActions } from "./keyboard-actions";
import { formatFileSize } from "./utils";

function attachVideoPlayer({ src, poster, size }: any) {
  const wrapper = document.getElementById("wrapper") as HTMLDivElement;
  const message = document.getElementById("message") as HTMLDivElement;
  const video = document.createElement("video") as HTMLVideoElement;

  video.src = src;
  video.poster = poster;
  video.loop = true;

  wrapper.appendChild(video);
  message.innerText = formatFileSize(size);

  function showMessage(str: string) {
    const self = showMessage as any;

    message.innerText = str;

    clearTimeout(self.timeout);
    self.timeout = setTimeout(() => {
      message.innerText = "";
    }, 3000);
  }

  const Actions = getKeyboardActions(video, src, size);

  window.addEventListener("keydown", (event) => {
    try {
      const { code } = event;

      if (code in Actions) showMessage(Actions[code](event));
    } catch (e) {
      console.warn(e);
    }
  });

  window.addEventListener("blur", () => (video.muted = true));
  window.addEventListener("focus", () => (video.muted = false));
}

export function setupVideoPlayer({ server_filename, dlink, thumbs, size }: any) {
  setHTML(server_filename);
  attachVideoPlayer({ src: dlink, poster: thumbs.url3, size });
}
