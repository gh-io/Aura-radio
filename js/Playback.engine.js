function playSelected() {
    if (AuraState.selection.size === 0) return;

    AuraState.queue = Array.from(AuraState.selection);
    AuraState.nowPlayingIndex = 0;
    playCurrent();
}
function playCurrent() {
    const track = AuraState.queue[AuraState.nowPlayingIndex];
    if (!track) return;

    DOM.audio.src = track.stream_url || track.url;
    DOM.audio.play();
}
function playNext() {
    AuraState.nowPlayingIndex++;
    if (AuraState.nowPlayingIndex < AuraState.queue.length) {
        playCurrent();
    }
}
