## `twofac/server`

Expects the following environment variables to be provided

```bash
PORT=

MONGODB_NAME=
MONGODB_PASSWORD=
MONGODB_URI=

# If this is not provided a strong random secret is generated
# Note that doing so will invalidate all tokens on every restart
JWT_SECRET=

# This is optional and to be used when the proxy server is not listening on
# the server root
PREFIX=
```
