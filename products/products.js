document.addEventListener("DOMContentLoaded", () => {
    const previewContainers = document.querySelectorAll(".product-preview");
    const mainImage = document.getElementById("main-img");

    if (previewContainers.length > 0) {
        const firstContainer = previewContainers[0];
        mainImage.src = firstContainer.querySelector("img").src;
        mainImage.style.display = "block";

        previewContainers.forEach(div => div.classList.remove("highlighted"));
        firstContainer.classList.add("highlighted");
    } else {
        mainImage.style.display = "none";
    }

    previewContainers.forEach(div => {
        div.addEventListener("mouseover", function () {
            showImage(this.querySelector("img").src);

            previewContainers.forEach(div => div.classList.remove("highlighted"));
            this.classList.add("highlighted");
        });
    });
});

function showImage(src) {
    const mainImage = document.getElementById("main-img");

    if (mainImage && mainImage.src !== src) {
        mainImage.src = src;
    }
}