#!/usr/bin/env python3
# -*- coding:UTF-8 -*-

""" Simple HTTP Server """

from http.server import HTTPServer, SimpleHTTPRequestHandler
import webbrowser

HOST, PORT = "127.0.0.1", 8000


def main():
    """ Main Function """
    server = HTTPServer((HOST, PORT), SimpleHTTPRequestHandler)
    try:
        print(f"Server started at http://{HOST}:{PORT}/")
        print("=" * 40)
        webbrowser.open(f"http://{HOST}:{PORT}/")
        server.serve_forever()

    except (KeyboardInterrupt, EOFError):
        server.server_close()


if __name__ == "__main__":
    main()
