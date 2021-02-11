from http.server import HTTPServer, SimpleHTTPRequestHandler
import webbrowser

HOST, PORT = "localhost", 8000

if __name__ == '__main__':
  Server = HTTPServer((HOST, PORT), SimpleHTTPRequestHandler)
  try:
    print(f"Server started at http://{HOST}:{PORT}/")
    print("=" * 40)
    webbrowser.open("http://localhost:8000/")
    Server.serve_forever()

  except KeyboardInterrupt:
    Server.server_close
