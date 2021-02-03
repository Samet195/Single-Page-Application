from http.server import HTTPServer, SimpleHTTPRequestHandler

if __name__ == '__main__':
    try:
        print(f"Server started at http://localhost:8000/\n{'=' * 40}")
        HTTPServer(("localhost", 8000), SimpleHTTPRequestHandler).serve_forever()
    except KeyboardInterrupt:
        print("Server stopped")
        exit()
