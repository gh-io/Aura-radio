mkdir build
cd build
cmake ..
make
sudo make install

         +----------------+
         |  DJ / Live Mic |
         +--------+-------+
                  |
                  v
           +------+-------+
           | Icecast / HLS |
           +------+-------+
                  |
        ---------------------
        |                   |
+-------v-------+   +-------v-------+
| Web Player    |   | Mobile Player |
+---------------+   +---------------+

        +----------------+
        | Aura.radio API |
        +--------+-------+
                 ^
                 |
          +------v------+
          | qmatrixclient|
          |  C++ Daemon |
          +-------------+
       (Matrix chat control)
