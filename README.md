### `twofac`

A web implementation of [Steam flavored Two-Factor Authentication](https://support.steampowered.com/kb_article.php?ref=8625-wrah-9030).

The `server` subfolder isn't currently hosted anywhere but provides an interface to an optional databases where secrets can be stored. They are encrypted both in transit (assuming the internet-facing proxy enforces HTTPS, which it should always do) and when being stored (see `server/src/crypto` for details).
