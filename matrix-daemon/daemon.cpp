#include <QCoreApplication>
#include "connection.h"
#include "room.h"
#include <iostream>
#include <curl/curl.h>

void triggerAuraAPI(const std::string& endpoint) {
    CURL* curl = curl_easy_init();
    if(curl) {
        std::string url = "http://aura-api:8000/api/" + endpoint;
        curl_easy_setopt(curl, CURLOPT_URL, url.c_str());
        curl_easy_perform(curl);
        curl_easy_cleanup(curl);
    }
}

int main(int argc, char *argv[]) {
    QCoreApplication a(argc, argv);

    Connection conn("https://matrix.org", "user", "pass");
    conn.login();
    Room room = conn.joinRoom("!yourroomid:matrix.org");

    room.onMessage([&](const std::string& sender, const std::string& body){
        std::cout << sender << ": " << body << std::endl;
        if(body == "!start_live") triggerAuraAPI("start_live_stream");
        else if(body == "!stop_live") triggerAuraAPI("stop_live_stream");
        else if(body.rfind("!playlist ",0) == 0) {
            std::string pl = body.substr(10);
            triggerAuraAPI("set_playlist/" + pl);
        }
    });

    return a.exec();
}
