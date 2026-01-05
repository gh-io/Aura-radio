function bindEvents() {
    DOM.makeRequest.addEventListener("click", buildAndMakeRequest);
    DOM.nextTrack.addEventListener("click", playNext);

    DOM.clearSelection.addEventListener("click", clearSelection);
    DOM.prependQueue.addEventListener("click", () => addToQueue(true));
    DOM.appendQueue.addEventListener("click", () => addToQueue(false));
    DOM.removeQueue.addEventListener("click", removeFromQueue);
    DOM.playSelected.addEventListener("click", playSelected);

    DOM.audio.addEventListener("ended", playNext);
}
