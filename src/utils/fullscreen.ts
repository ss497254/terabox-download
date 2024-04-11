export function requestFullscreen() {
  if (document.documentElement.requestFullscreen) {
    document.documentElement.requestFullscreen();
  } else if (
    "webkitRequestFullscreen" in document.documentElement &&
    typeof document.documentElement.webkitRequestFullscreen === "function"
  ) {
    document.documentElement.webkitRequestFullscreen();
  }
}

export function exitFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if ("webkitExitFullscreen" in document && typeof document.webkitExitFullscreen === "function") {
    document.webkitExitFullscreen();
  }
}
