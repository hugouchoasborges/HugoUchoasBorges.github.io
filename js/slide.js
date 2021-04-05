var slideIndex = 1;
//showDivs(slideIndex);
initDivs(slideIndex);

function initDivs(n) {
  var x = document.getElementsByClassName("img-fluid img-centered slide");
  for (i = 1; i <= x.length; i++) {
    showDivs(slideIndex, i)
  }
}

function plusDivs(n, id) {
  showDivs(slideIndex += n, id);
}

function currentDiv(n, id) {
  showDivs(slideIndex = n, id);
}

function showDivs(n, id = 1) {
  var i;
  var x = document.getElementsByClassName("img-fluid img-centered slide item-" + id);
  var dots = document.getElementsByClassName("demo-" + id);
  if (n > x.length) {slideIndex = 1}
  if (n < 1) {slideIndex = x.length}
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";  
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" w3-white", "");
  }
  x[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " w3-white";
}