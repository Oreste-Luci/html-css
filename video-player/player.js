window.addEventListener('load', function() {

    // Video Element
    video = document.getElementById('video');
    
    // Progress Bar Element
    pbar = document.getElementById('pbar');
    
    // Play Button Element
    playButton = document.getElementById('play-button');

    video.load(); // Making sure the video loads before it can be played
    video.addEventListener('canplay',function(){
        
        playButton.addEventListener('click', playOrPause, false);
        
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