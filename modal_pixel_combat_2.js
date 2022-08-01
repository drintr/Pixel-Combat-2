function modal(e) {
    if (is_correct_context(e.closed)) {
        // it's time to remind that the game is already installed
        let frame = document.createElement('IFRAME');
        frame.className = 'game-reminder-modal';
        frame.src = chrome.runtime.getURL('/modal.html');
        document.body.appendChild(frame);
        chrome.storage.onChanged.addListener(function (changes, namespace) {
            if (!frame)
                return;
            for (let [key, {newValue}] of Object.entries(changes))
                if ((key === 'closed' && newValue) || key === 'opened') {
                    // click inside iframe will close a modal
                    document.body.removeChild(frame);
                    frame = false;
                }
        });
        // click anywhere to close modal
        document.body.addEventListener('click', function (e) {
            if (frame)
                document.body.removeChild(frame);
        });
    } e.game && setTimeout(e.game);
}

function is_correct_context(closed) {
    if (closed)
        return false;
    if (typeof window.URLSearchParams === 'function') {
        let urlParams = new URLSearchParams(window.location.search);
        let q = urlParams.get("q") || urlParams.get("p");
        if (!q)
            return false;
        let tbm = urlParams.get('tbm');
        if (tbm === 'vid' || tbm === 'isch' || tbm === 'nws' || tbm === 'shop' || tbm === 'bks')
            return false;
        q = q.toLowerCase();
        // show modal only on search Pixel Combat 2 page
        return q.indexOf("Pixel Combat 2".toLowerCase()) > -1;
    }
    return false;
}

chrome.storage.local.get('closed,opened,game'.split(','), modal);
