const desktopPage = document.querySelector(".page");

function fadingOutPage() {
  desktopPage.addEventListener("fadingOutProcess", function () {
    desktopPage.style.animation = "fadeOutPage 0.5s ease-in-out forwards";
    console.log("fading Out Now");
  });
}

fadingOutPage();

function triggerFadingOut(element) {
  const fadingOutEvent = new Event("fadingOutProcess");
  desktopPage.dispatchEvent(fadingOutEvent);

  const destination = element.dataset.href;

  setTimeout(() => {
    window.location.href = destination;
  }, 500);
}

window.addEventListener("pageshow", function () {
  desktopPage.style.animation = "none";
  void desktopPage.offsetWidth;
  desktopPage.style.animation = "fadeInPage 0.5s ease-in-out forwards";
});
