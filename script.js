let activeVideos = 0; // Tracks the number of videos currently displayed
const maxVideos = 200; // Maximum number of videos to display at once
let pendingVideos = 0; // Tracks the number of videos waiting to be displayed

document.addEventListener('DOMContentLoaded', function () {
    const queryParams = new URLSearchParams(window.location.search);
    const viewers = parseInt(queryParams.get('viewers'), 10);
    pendingVideos = viewers - maxVideos; // Set the initial number of pending videos

    // Create the initial set of videos up to maxVideos or the total viewer count, whichever is smaller
    const initialVideoCount = Math.min(viewers, maxVideos);
    for (let i = 0; i < initialVideoCount; i++) {
        createAndAnimateVideo();
    }
});

function createAndAnimateVideo() {
    activeVideos++; // Increment active videos count

    let startPosBottom = Math.random() * 700
    const startPosLeft = Math.random() * 100
    const videoUrl = "https://zmolmhdrozzmhordgtnx.supabase.co/storage/v1/object/public/memes/4db7bdb781-CrabRave.webm";
    const videoElement = document.createElement('video');
    videoElement.autoplay = true;
    videoElement.muted = true; // Ensure video is muted
    videoElement.loop = true;
    videoElement.innerHTML = `<source src="${videoUrl}" type="video/webm">`;
    videoElement.style.position = 'absolute';
    videoElement.style.left = `${startPosLeft}%`;
    videoElement.style.bottom = `${startPosBottom}%`;
    videoElement.style.width = '100px'; // Set as needed

    videoElement.classList.add('videoFadeOut');

    document.getElementById('container').appendChild(videoElement);

    const fadeOutDuration = Math.random() * 2 + 1; // 1 to 3 seconds
    videoElement.style.animationDuration = `${fadeOutDuration}s`;

    const animationInterval = setInterval(() => {
        startPosBottom += 2;
        rotateLeft = Math.random() * 10;
        rotateRight = Math.random() * 10;
        videoElement.style.bottom = `${startPosBottom}px`;
        videoElement.style.transform = `rotate(${rotateLeft}deg) rotateY(${rotateRight}deg)`;
    }, 20); // Adjust for smoother animation

    setTimeout(() => {
        videoElement.style.opacity = '0';
        clearInterval(animationInterval); // Stop the upward movement
        setTimeout(() => {
            videoElement.remove()

            activeVideos--; // Decrement active videos count

            if (pendingVideos > 0) {
                pendingVideos--; // Decrement pending videos count
                createAndAnimateVideo(); // Create a new video if there are pending ones
            }

        }, 500); // Remove after fade out effect completes
    }, fadeOutDuration * 1000 + 500); // Start fade out after 2 seconds

}
