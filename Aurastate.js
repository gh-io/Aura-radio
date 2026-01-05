const AuraState = {
    serverUrl: "",
    collection: "tracks",
    results: [],
    queue: [],
    selection: new Set(),
    nowPlayingIndex: -1,

    mode: "queue",
    liveStreamUrl: null,

    liveSocket: null
};
// websocket connection
function connectLiveSocket() {
    disconnectLiveSocket();

    const wsUrl = AuraState.serverUrl
        .replace(/^http/, "ws")
        .replace(/\/$/, "") + "/live/ws";

    const socket = new WebSocket(wsUrl);
    AuraState.liveSocket = socket;

    socket.onopen = () => {
        console.log("Live metadata connected");
    };

    socket.onmessage = event => {
        try {
            const msg = JSON.parse(event.data);
            handleLiveMessage(msg);
        } catch {
            console.warn("Invalid live message");
        }
    };

    socket.onclose = () => {
        console.warn("Live metadata disconnected");
    };

    socket.onerror = err => {
        console.error("Live socket error", err);
    };
}
// message router
function handleLiveMessage(msg) {
    switch (msg.type) {
        case "now_playing":
            renderLiveMetadata(msg);
            break;

        case "listeners":
            renderListenerCount(msg.count);
            break;

        case "dj":
            renderDjInfo(msg.name);
            break;
    }
}
// live entry mode
function startLiveMode(streamUrl) {
    stopLiveMode();

    AuraState.mode = "live";
    AuraState.liveStreamUrl = streamUrl;

    DOM.audio.src = streamUrl;
    DOM.audio.play().catch(console.warn);

    connectLiveSocket();
}
// shutdown
function disconnectLiveSocket() {
    if (AuraState.liveSocket) {
        AuraState.liveSocket.close();
        AuraState.liveSocket = null;
    }
}
// rendering helpers
function stopLiveMode() {
    if (AuraState.mode !== "live") return;

    AuraState.mode = "queue";
    DOM.audio.pause();
    disconnectLiveSocket();
}

function renderListenerCount(count) {
    let el = document.getElementById("listener-count");
    if (!el) return;
    el.textContent = `${count} listening`;
}
function renderDjInfo(name) {
    let el = document.getElementById("dj-name");
    if (!el) return;
    el.textContent = `On Air: ${name}`;
}
<div id="live-status">
  <span id="dj-name"></span>
  <span id="listener-count"></span>
</div>
