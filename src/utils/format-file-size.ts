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
