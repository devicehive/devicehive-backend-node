# DeviceHive Backend service (NodeJS implementation)

# Start up

Before start Backend application the next components should be ready to use:
- Postgresql Database
- Hazelcast Database
- DeviceHive WS Proxy

To start backend application just use next command:

    node ./application/DeviceHiveBackendApplication.js

# Configuration
## Application
    [path-to-backend-project]/application/config.json

- _**LOGGER_LEVEL**_ - Application logging level (default: "info")

Each configuration field can be overridden with corresponding environmental variable with "BACKEND" prefix, for example:

    BACKEND.LOGGER_LEVEL=debug

Prefix separator can be overridden by **_ENVSEPARATOR_** environmental variable. Example:

    ENVSEPARATOR=_
    BACKEND_LOGGER_LEVEL=debug

## DeviceHive WS Proxy client
    [path-to-backend-project]/proxy/config.json

- _**WS_PROXY_ENDPOINT**_ - URL to WebSocket server of DeviceHive WS Proxy (default: "ws://localhost:3000")

Each configuration field can be overridden with corresponding environmental variable with "PROXY" prefix, for example:

    PROXY.WS_PROXY_ENDPOINT=ws://localhost:3001

Prefix separator can be overridden by **_ENVSEPARATOR_** environmental variable. Example:

    ENVSEPARATOR=_
    PROXY_WS_PROXY_ENDPOINT=ws://localhost:3001

## Postgres
    [path-to-backend-project]/db/server/config.json

- _**HOST**_ - Postgres server host (default: "localhost")
- _**PORT**_ - Postgres server port (default: 5432)
- _**DATABASE**_ - Postgres database name (default: "devicehive")
- _**PASSWORD**_ - Postgres user password (default: "12345")
- _**USER**_ - Postgres user login (default: "postgres")

Each configuration field can be overridden with corresponding environmental variable with "POSTGRES" prefix, for example:

    POSTGRES.PORT=6000

Prefix separator can be overridden by **_ENVSEPARATOR_** environmental variable. Example:

    ENVSEPARATOR=_
    POSTGRES_PORT=6000

## Hazelcast
    [path-to-backend-project]/service/hazelcast/config.json

- _**ADDRESSES**_ - List of Hazelcast servers addresses separated by comma (default: "127.0.0.1:5701,")
- _**GROUP_NAME**_ - Hazelcast group name (default: "dev")
- _**GROUP_PASSWORD**_ - Hazelcast group password (default: "dev-pass")
- _**EVENT_THREAD_COUNT**_ - Event Threading configuration (default: 5)
- _**LOGGING**_ - Hazelcast logging level (default: "off")

Each configuration field can be overridden with corresponding environmental variable with "HAZELCAST" prefix, for example:

    HAZELCAST.GROUP_NAME=dev2

Prefix separator can be overridden by **_ENVSEPARATOR_** environmental variable. Example:

    ENVSEPARATOR=_
    HAZELCAST_GROUP_NAME=dev2
