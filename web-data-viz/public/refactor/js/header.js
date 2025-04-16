window.addEventListener('scroll', function () {
    var header = document.getElementById("header");
    var div = document.getElementById("section-hero-id");


    var headerRect = header.getBoundingClientRect();
    var divRect = div.getBoundingClientRect();


    if (headerRect.top <= divRect.top) {
        header.classList.remove("mudarCor");
    } else {
        header.classList.add("mudarCor");
    }
});