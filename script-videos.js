document.addEventListener('DOMContentLoaded', () => {
    const stations = document.querySelectorAll('.station-card');
    const modal = document.getElementById('videoModal');
    const modalVideo = document.getElementById('modalPlayer');
    const closeModalBtn = document.querySelector('.close-modal');
    const backdrop = document.querySelector('.modal-backdrop');

    stations.forEach(station => {
        station.addEventListener('click', () => {
            const videoUrl = station.getAttribute('data-video');
            if (videoUrl) {
                modalVideo.src = videoUrl;
                modalVideo.load();
                modal.classList.add('active');
            }
        });
    });

    function closeModal() {
        modal.classList.remove('active');
        modalVideo.pause();
        modalVideo.src = "";
    }

    closeModalBtn.addEventListener('click', closeModal);
    backdrop.addEventListener('click', closeModal);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
});
