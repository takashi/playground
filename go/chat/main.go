package main

import (
	"log"
	"net/http"
	"path/filepath"
	"sync"
	"text/template"
)

type TemplateHandler struct {
	once     sync.Once
	filename string
	templ    *template.Template
}

func (t *TemplateHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	t.once.Do(func() {
		t.templ = template.Must(template.ParseFiles(filepath.Join(t.filename)))
	})
	t.templ.Execute(w, nil)
}

func main() {
	http.Handle("/", &TemplateHandler{filename: "chat.html"})

	if err := http.ListenAndServe(":8080", nil); err != nil {
		log.Fatal("ListenAndServe:", err)
	}
}
