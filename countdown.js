let remainingTime = 30 * 60; // 30 perc

function countdown() {
    if (remainingTime >= 0) {
        const minutes = Math.floor(remainingTime / 60);
        const seconds = remainingTime % 60;
        postMessage({ minutes, seconds });
        remainingTime--;
        setTimeout(countdown, 1000);
    } else {
        postMessage({ done: true });
    }
}

countdown();