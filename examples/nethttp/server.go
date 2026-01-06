package main

import (
	"net/http"

	"github.com/gorilla/mux"
	"github.com/rs/cors"
)

func main() {
	r := mux.NewRouter()
	r.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		w.Write([]byte("{\"hello\": \"world\"}"))
	})

	// Use default options
	handler := cors.Default().Handler(r)
	http.ListenAndServe(":8080", handler)
}

c := cors.New(cors.Options{
    AllowedOrigins: []string{"http://foo.com", "http://foo.com:8080"},
    AllowCredentials: true,
    // Enable Debugging for testing, consider disabling in production
    Debug: true,
})

// Insert the middleware
handler = c.Handler(handler)
