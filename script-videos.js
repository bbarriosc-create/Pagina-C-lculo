const cards = document.querySelectorAll(".station-card");
const modal = document.getElementById("videoModal");
const player = document.getElementById("modalPlayer");
const closeBtn = document.querySelector(".close-modal");
const backdrop = document.querySelector(".modal-backdrop");

cards.forEach(card => {

    card.addEventListener("click", () => {

        const videoURL = card.getAttribute("data-video");

        player.src = videoURL + "?autoplay=1";

        modal.classList.add("active");

    });

});

function cerrarModal() {

    modal.classList.remove("active");

    player.src = "";

}

closeBtn.addEventListener("click", cerrarModal);

backdrop.addEventListener("click", cerrarModal);