#!/usr/bin/env bash
set -eux pipefail

frontend_response=$(curl --silent --show-error http://localhost:8080/hello.html)
test "$frontend_response" = "Hello from frontend"

backend_response=$(curl --silent --show-error http://localhost:8080/api/)
test "$backend_response" = "<h1>Hello World!</h1>"

: OK
