function adjustWideImages() {
  const images = document.querySelectorAll(".art-section img");

  images.forEach(function (img) {
    function checkProportion() {

      if (img.naturalWidth > img.naturalHeight) {
        img.style.gridColumn = "span 2";
      } else {
        img.style.gridColumn = "span 1";
      }
    }


    if (img.complete) {
      checkProportion();
    } else {

      img.addEventListener("load", checkProportion);
    }
  });
}

adjustWideImages();
