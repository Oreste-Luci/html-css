window.addEventListener('load', function() {

    // Video Element
    video = document.getElementById('video');
    
    // Progress Bar Element
    pbarContainer = document.getElementById('pbar-container');
    pbar = document.getElementById('pbar');
    
    // Play Button Element
    playButton = document.getElementById('play-button');
    
    // Time field
    timeField = document.getElementById('time-field');
    
    // Sound Button
    soundButton = document.getElementById('sound-button');
    sbarContainer = document.getElementById('sbar-container');
    sbar = document.getElementById('sbar');
    
    // Fullscreen button
    fullscreenButton = document.getElementById('fullscreen-button');
    
    video.load(); // Making sure the video loads before it can be played
    video.addEventListener('canplay',function(){
        
        playButton.addEventListener('click', playOrPause, false);
        pbarContainer.addEventListener('click', skip, false);
        updatePlayer();
        soundButton.addEventListener('click', muteOrUmute, false);
        sbarContainer.addEventListener('click', changeVolume, false);
        fullscreenButton.addEventListener('click', fullscreen, false);
        
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
    timeField.innerHTML = getFormattedTime();
    
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

function getFormattedTime() {
    // Returns time in format mm:ss
    
    // Video Elapsed Time
    var seconds = Math.round(video.currentTime);
    var minutes = Math.floor(seconds/60);
    
    if (minutes > 0) {
        seconds -= minutes * 60;
    }

    if (seconds.toString().length === 1) {
        seconds = '0' + seconds;
    }

    // Video Total Time
    var totalSeconds = Math.round(video.duration);
    var totalMinutes = Math.floor(totalSeconds/60);
    
    if (totalMinutes > 0) {
        totalSeconds -= totalMinutes * 60;
    }
    
    if (totalSeconds.toString().length === 1) {
        totalSeconds = '0' + totalSeconds;
    }
    
    return minutes + ':' + seconds + ' / ' + totalMinutes + ':' + totalSeconds;
}

function muteOrUmute() {
    
    if (!video.muted) {
        video.muted = true;
        soundButton.src = 'images/mute.png';
        sbar.style.display = 'none';
    } else {
        video.muted = false;
        soundButton.src = 'images/sound.png';
        sbar.style.display = 'block';
    }
}

function changeVolume(clickEvent) {
    
    var mouseX = clickEvent.pageX - sbarContainer.offsetLeft;
    var sbarWidth = window.getComputedStyle(sbarContainer).getPropertyValue('width');
    sbarWidth = parseFloat(sbarWidth.substr(0, sbarWidth.length - 2)); // removing th px from the end of the string

    video.volume = (mouseX/sbarWidth); // The volume has a value between 0 and 1
    
    sbar.style.width = video.volume * 100 + '%';
    
    // Unmutting the video
    video.muted = false;
    soundButton.src = 'images/sound.png';
    sbar.style.display = 'block';

}

function fullscreen() {
    
    // Check if the browser allows fullscreen
    if (video.requestFullscreen) {
        video.requestFullscreen();
    } else if (video.webkitRequestFullscreen) {
        video.webkitRequestFullscreen();
    } else if (video.mozRequestFullscreen) {
        video.mozRequestFullscreen();
    } else if (video.msRequestFullscreen) {
        video.msRequestFullscreen();
    }
}