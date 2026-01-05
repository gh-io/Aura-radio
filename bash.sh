sudo apt install icecast2
sudo apt update
sudo apt install icecast2
DJ / Mixxx / CLI -> Icecast (/live.ogg) -> Browser Audio
                                 -> WebSocket -> Now Playing + Listeners
Backend REST API -> Playlist / Related Tracks -> UI Queue

git clone --recursive https://gitlab.xiph.org/xiph/icecast-server.git
git clone https://gitlab.xiph.org/xiph/icecast-server.git
cd icecast-server
git submodule update --init
