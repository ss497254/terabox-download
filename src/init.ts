import downloadLink from "./utils/download-link";
import { setupVideoPlayer } from "./video-player";

export async function init() {
  const { search, host, pathname } = window.location;

  if (!["/sharing/link"].includes(pathname)) return;

  window.stop();

  const query = new URLSearchParams(search);
  const surl = query.get("surl");

  if (!surl) return;

  const { list, error } = await downloadLink(`https://${host}/sharing/link?surl=${surl}`);

  if (error) {
    console.warn(error);
  } else if (!Array.isArray(list)) {
    console.warn("Error while downloading link\n", list);
  } else {
    setupVideoPlayer(list[0]);
  }
}
