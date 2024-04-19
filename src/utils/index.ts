export function formatFileSize(size: number) {
  if (size > 1000_000_000) {
    return (size / 1000_000_000).toFixed(2) + "GB";
  } else if (size > 1000_000) {
    return (size / 1000_000).toFixed(2) + "MB";
  } else if (size > 1000) {
    return (size / 1000).toFixed(2) + "KB";
  } else {
    return size + "B";
  }
}

export function formatTime(input: number) {
  return [Math.floor(input / 3600), Math.floor((input % 3600) / 60), Math.floor(input % 60)]
    .map((input) => (input < 10 ? "0" : "") + input)
    .join(":");
}
