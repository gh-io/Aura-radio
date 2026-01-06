package main

import (
	"net/http"

	"github.com/rs/cors"
)

func main() {
	c := cors.New(cors.Options{
		AllowedOrigins: []string{"http://foo.com"},
	})

	handler := http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		w.Write([]byte("{\"hello\": \"world\"}"))
	})

	http.ListenAndServe(":8080", c.Handler(handler))
}

c := cors.New(cors.Options{
    AllowedOrigins: []string{"http://foo.com", "http://foo.com:8080"},
    AllowCredentials: true,
    // Enable Debugging for testing, consider disabling in production
    Debug: true,
})

// Insert the middleware
handler = c.Handler(handler)
