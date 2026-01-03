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

# Clone your qmatrixclient repo (or use your source folder)
git clone <https://github.com/quotient-im/libQuotient.git> qmatrixclient
cd libQuotient

git clone <https://github.com/matrix-org/matrix.to.git> qmatrixclient
cd matrix.to

# Create a build folder
mkdir build && cd build

# Configure with cmake
cmake ..

# Compile
make -j$(nproc)

# Optional: Install system-wide
sudo make install
