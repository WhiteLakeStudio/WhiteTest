document.addEventListener('DOMContentLoaded', function() {
document.querySelectorAll("video").forEach(v => v.play().catch(()=>{}));

document.querySelectorAll("video[data-src]").forEach(video => {

    const src = video.dataset.src;

    const source = document.createElement("source");
    source.src = src;
    source.type = "video/webm";

    video.appendChild(source);

    video.load();

});
    
    function resizeImages() {
        const galleryLines = document.querySelectorAll('.img_gallery_line');
    
        galleryLines.forEach(line => {
            const mediaElements = line.querySelectorAll('.img_g');
            if (mediaElements.length === 0) return;
    
            const firstMediaElement = mediaElements[0];
            const firstMediaHeight = firstMediaElement.videoHeight || firstMediaElement.naturalHeight;
    
            if (window.innerWidth >= 1000) {
                mediaElements.forEach(media => {
                    const mediaWidth = media.videoWidth || media.naturalWidth;
                    const mediaHeight = media.videoHeight || media.naturalHeight;
                    const newWidth = (firstMediaHeight * mediaWidth) / mediaHeight;
                    media.style.width = `${newWidth}px`;
                    media.style.height = `${firstMediaHeight}px`;
                });
    
                const totalWidth = Array.from(mediaElements).reduce((sum, media) => sum + parseFloat(media.style.width), 0);
                const scaleFactor = line.clientWidth / totalWidth;
                mediaElements.forEach(media => {
                    const mediaWidth = parseFloat(media.style.width);
                    media.style.width = `${mediaWidth * scaleFactor}px`;
                    media.style.height = `${firstMediaHeight * scaleFactor}px`;
                });
            } else {
                mediaElements.forEach(media => {
                    media.style.width = '100%';
                    media.style.height = 'auto';
                });
            }
        });
    }
    
    window.addEventListener('resize', resizeImages);
    resizeImages();

    const mediaElements = document.querySelectorAll('.img_g');

    mediaElements.forEach(media => {
        media.addEventListener('load', resizeImages);
        if (media.tagName === 'VIDEO') {
            media.addEventListener('loadedmetadata', resizeImages);
        }
    });

    const fullscreenOverlay = document.getElementById('fullscreen-overlay');
    const fullscreenImage = document.getElementById('fullscreen-image');
    const fullscreenVideo = document.getElementById('fullscreen-video');
    const fullscreenTitle = document.getElementById('fullscreen-title');
    const fullscreenDescription = document.getElementById('fullscreen-description');
    const fullscreenClient = document.getElementById('fullscreen-client');
    const closeFullscreen = document.getElementById('close-fullscreen');
    const fullProjectButton = document.getElementById('full-project-button');

    mediaElements.forEach(media => {
        media.addEventListener('click', function() {
            const title = this.getAttribute('data-title');
            const description = this.getAttribute('data-description');
            const client = this.getAttribute('data-client');
            const fullProjectLink = this.getAttribute('data-full-project-link');

            if (this.tagName === 'VIDEO') {
                fullscreenImage.style.display = 'none';
                fullscreenVideo.style.display = 'block';
                fullscreenVideo.src = this.src;
            } else {
                fullscreenImage.style.display = 'block';
                fullscreenVideo.style.display = 'none';
                fullscreenImage.src = this.src;
            }

            fullscreenTitle.textContent = title;
            fullscreenDescription.textContent = description;
            fullscreenClient.textContent = client;
            fullProjectButton.onclick = () => {
                window.location.href = fullProjectLink;
            };
            fullscreenOverlay.style.display = 'flex';

            // Додаємо можливість скролінгу в повноекранному режимі після ширини екрану 1000 пікселів
            if (window.innerWidth <= 1000) {
                fullscreenOverlay.style.overflowY = 'auto';
            } else {
                fullscreenOverlay.style.overflowY = 'hidden';
            }
        });
    });

    closeFullscreen.addEventListener('click', function() {
        fullscreenOverlay.style.display = 'none';
    });

    fullscreenOverlay.addEventListener('click', function(event) {
        if (event.target === fullscreenOverlay) {
            fullscreenOverlay.style.display = 'none';
        }
    });
});

function toggleMenu() {
    const navMenu = document.querySelector('.nav-menu');
    navMenu.classList.toggle('active');

}
