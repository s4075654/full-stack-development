let timerID = null;

function startProcessing() {
    // Check notifications every 10 seconds
    timerID = setInterval(() => {
        fetch('/notification/process', {
            method: 'POST',
            credentials: 'include'
        })
        .then(response => {
            if (response.ok) {
                // Trigger UI update
                self.postMessage('update');
            }
        })
        .catch(error => {
            self.postMessage({ status: 'error', error: error.message });
        });
    }, 10000);
}

self.onmessage = function(e) {
    switch(e.data.command) {
        case 'start':
            if (!timerID) {
                startProcessing();
            }
            break;
        case 'stop':
            clearInterval(timerID);
            timerID = null;
            break;
    }
};