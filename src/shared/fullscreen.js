export async function requestFullscreen(ele) {
  if (ele.requestFullscreen) {
    await ele.requestFullscreen();
  } else if (ele.msRequestFullscreen) {
    await ele.msRequestFullscreen();
  } else if (ele.mozRequestFullScreen) {
    await ele.mozRequestFullScreen();
  } else if (ele.webkitRequestFullscreen) {
    await ele.webkitRequestFullscreen();
  }
}

export async function exitFullscreen() {
  if (document.fullscreenElement) {
    await document.exitFullscreen();
  }
}
