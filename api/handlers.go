package api

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strconv"
	"strings"

	"most-active-github-users-counter/top"
)

// CORS middleware
func enableCORS(w http.ResponseWriter) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
}

// GitHubUsersHandler handles requests to fetch GitHub users
func GitHubUsersHandler(w http.ResponseWriter, r *http.Request) {
	enableCORS(w)

	if r.Method == "OPTIONS" {
		w.WriteHeader(http.StatusOK)
		return
	}

	if r.Method != "GET" {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	// Parse query parameters
	token := r.URL.Query().Get("token")
	if token == "" {
		http.Error(w, "Missing GitHub token", http.StatusBadRequest)
		return
	}

	preset := r.URL.Query().Get("preset")
	locationParam := r.URL.Query().Get("locations")
	amountParam := r.URL.Query().Get("amount")
	considerParam := r.URL.Query().Get("consider")

	// Set defaults
	amount := 256
	consider := 1000
	var locations []string
	var excludeLocations []string

	// Parse amount
	if amountParam != "" {
		if parsed, err := strconv.Atoi(amountParam); err == nil {
			amount = parsed
		}
	}

	// Parse consider
	if considerParam != "" {
		if parsed, err := strconv.Atoi(considerParam); err == nil {
			consider = parsed
		}
	}

	// Parse locations
	if locationParam != "" {
		locations = strings.Split(locationParam, ",")
		for i, loc := range locations {
			locations[i] = strings.TrimSpace(loc)
		}
	}

	// Handle preset if provided
	if preset != "" {
		// You'll need to import your presets logic here
		// For now, we'll handle it as a simple location
		if preset == "worldwide" {
			locations = []string{}
		} else {
			locations = []string{preset}
		}
	}

	// Create options
	opts := top.Options{
		Token:            token,
		Locations:        locations,
		ExcludeLocations: excludeLocations,
		Amount:           amount,
		ConsiderNum:      consider,
	}

	// Fetch data
	data, err := top.GithubTop(opts)
	if err != nil {
		log.Printf("Error fetching GitHub data: %v", err)
		http.Error(w, fmt.Sprintf("Error fetching data: %v", err), http.StatusInternalServerError)
		return
	}

	// Set content type and encode response
	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(data); err != nil {
		log.Printf("Error encoding JSON: %v", err)
		http.Error(w, "Error encoding response", http.StatusInternalServerError)
		return
	}
}

// PresetsHandler returns available presets
func PresetsHandler(w http.ResponseWriter, r *http.Request) {
	enableCORS(w)

	if r.Method == "OPTIONS" {
		w.WriteHeader(http.StatusOK)
		return
	}

	if r.Method != "GET" {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	// This would return your presets - you'll need to expose them from your main package
	presets := map[string]string{
		"worldwide": "Worldwide",
		"usa":       "United States",
		"germany":   "Germany",
		"uk":        "United Kingdom",
		"france":    "France",
		"canada":    "Canada",
		"australia": "Australia",
		"japan":     "Japan",
		"india":     "India",
		"brazil":    "Brazil",
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(presets)
}