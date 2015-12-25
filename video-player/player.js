window.addEventListener('load', function() {

    // Video Element
    video = document.getElementById('video');
    
    // Progress Bar Element
    pbarContainer = document.getElementById('pbar-container');
    pbar = document.getElementById('pbar');
    
    // Play Button Element
    playButton = document.getElementById('play-button');

    video.load(); // Making sure the video loads before it can be played
    video.addEventListener('canplay',function(){
        
        playButton.addEventListener('click', playOrPause, false);
        pbarContainer.addEventListener('click', skip, false);
        
    }, false);
    
}, false);

function playOrPause() {

    if (video.paused) {
        video.play();
        playButton.src = 'images/pause.png';
        update = setInterval(updatePlayer, 30); // Calling the updatePlayer function every 30ms
    } else {
        video.pause();
        playButton.src = 'images/play.png';
        window.clearInterval(update);
    }
}

function updatePlayer() {

    var percentage = (video.currentTime/video.duration) * 100;
    pbar.style.width = percentage + '%';
    
    if (video.ended) {
        window.clearInterval(update);
        playButton.src = 'images/replay.png';
    }
}

function skip(clickEvent) {
    
    var mouseX = clickEvent.pageX - pbarContainer.offsetLeft; // Capturing position of click. Subtact offset of container from left of the page
    var pbarWidth = window.getComputedStyle(pbarContainer).getPropertyValue('width');
    pbarWidth = parseFloat(pbarWidth.substr(0, pbarWidth.length - 2)); // removing th px from the end of the string
    
    video.currentTime = (mouseX/pbarWidth) * video.duration; // Updating video location
    
    updatePlayer();
}
