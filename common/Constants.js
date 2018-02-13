/**
 * DeviceHive constants
 */
class Constants {

    //Internal use
   static get UTF8() { return `utf8`; }
   static get PERSISTENCE_UNIT() { return `default`; }
   static get WEBSOCKET_SERVER_URL() { return `websocket.url`; }
   static get REST_SERVER_URL() { return `rest.url`; }
   static get NULL_SUBSTITUTE() { return ``; }
   static get MIN_WAIT_TIMEOUT() { return 0; }
   static get DEFAULT_WAIT_TIMEOUT() { return `30`; }
   static get MAX_WAIT_TIMEOUT() { return 60; }
   static get MAX_LOGIN_ATTEMPTS() { return `user.login.maxAttempts`; }
   static get INITIAL_LOGIN_ATTEMPTS() { return 0; }
   static get MAX_LOGIN_ATTEMPTS_DEFAULT() { return 10; }
   static get LAST_LOGIN_TIMEOUT() { return `user.login.lastTimeout`; } // 1 hour
   static get LAST_LOGIN_TIMEOUT_DEFAULT() { return 1000; } // 1 hour
   static get WEBSOCKET_MAX_BUFFER_SIZE() { return 10 * 1024; }
   static get WEBSOCKET_TIMEOUT() { return 4 * 60 * 1000; }
   static get DEFAULT_TAKE() { return 100; }
   static get DEFAULT_SKIP() { return 0; }
   static get DEFAULT_RETURN_UPDATED_COMMANDS() { return false; }
   static get DEFAULT_TAKE_STR() { return `100`; }
   static get DEFAULT_SKIP_STR() { return `0`; }
   static get CURRENT_USER() { return `current`; }
   static get BASIC_AUTH_SCHEME() { return `Basic`; }
   static get TOKEN_SCHEME() { return `Bearer`; }
   static get AUTH_DEVICE_ID_HEADER() { return `Auth-DeviceID`; }
   static get AUTH_DEVICE_KEY_HEADER() { return `Auth-DeviceKey`; }
   static get PING() { return Buffer.from(`devicehive-ping`, Constants.UTF8); }
   static get DEVICE_OFFLINE_STATUS() { return `Offline`; }
   static get ENV_SECRET_VAR_NAME() { return `JWT_SECRET`; }
   static get DB_SECRET_VAR_NAME() { return `jwt.secret`; }
   static get REQUEST_TOPIC() { return `request_topic`; }
   static get USER_ID() { return `userId`; }

    //API constants
   static get INFO() { return `info`; }
   static get CACHE_INFO() { return `cacheInfo`; }
   static get CLUSTER_INFO() { return `clusterInfo`; }
   static get CONFIGURATION() { return `configuration`; }
   static get DEVICE_ID() { return `deviceId`; }
   static get DEVICE_IDS() { return `deviceIds`; }
   static get NAMES() { return `names`; }
   static get TIMESTAMP() { return `timestamp`; }
   static get START_TIMESTAMP() { return `start`; }
   static get END_TIMESTAMP() { return `end`; }
   static get LIMIT() { return `limit`; }
   static get COMMAND_ID() { return `commandId`; }
   static get RETURN_COMMANDS() { return `returnCommands`; }
   static get RETURN_UPDATED_COMMANDS() { return `returnUpdatedCommands`; }
   static get RETURN_NOTIFICATIONS() { return `returnNotifications`; }
   static get NOTIFICATION() { return `notification`; }
   static get NOTIFICATIONS() { return `notifications`; }
   static get NOTIFICATION_ID() { return `notificationId`; }
   static get USER() { return `user`; }
   static get USERS() { return `users`; }
   static get COMMAND() { return `command`; }
   static get COMMANDS() { return `commands`; }
   static get PAYLOAD() { return `payload`; }
   static get SUBSCRIPTION_ID() { return `subscriptionId`; }
   static get SUBSCRIPTIONS() { return `subscriptions`; }
   static get ID() { return `id`; }
   static get NAME() { return `name`; }
   static get NAME_PATTERN() { return `namePattern`; }
   static get VALUE() { return `value`; }
   static get LABEL() { return `label`; }
   static get STATUS() { return `status`; }
   static get NETWORK() { return `network`; }
   static get NETWORKS() { return `networks`; }
   static get NETWORK_ID() { return `networkId`; }
   static get NETWORK_IDS() { return `networkIds`; }
   static get NETWORK_NAME() { return `networkName`; }
   static get DEVICE_TYPE() { return `deviceType`; }
   static get DEVICE_TYPES() { return `deviceTypes`; }
   static get DEVICE_TYPE_ID() { return `deviceTypeId`; }
   static get DEVICE_TYPE_IDS() { return `deviceTypeIds`; }
   static get SORT_FIELD() { return `sortField`; }
   static get SORT_ORDER() { return `sortOrder`; }
   static get TAKE() { return `take`; }
   static get SKIP() { return `skip`; }
   static get DOMAIN() { return `domain`; }
   static get LOGIN() { return `login`; }
   static get DEVICE() { return `device`; }
   static get DEVICES() { return `devices`; }
   static get TYPE() { return `type`; }
   static get DEFAULT_SESSION_TIMEOUT() { return 1200000; }

   static get ANY() { return `*`; }
   static get GET_NETWORK() { return `GetNetwork`; }
   static get GET_DEVICE_TYPE() { return `GetDeviceType`; }
   static get GET_DEVICE() { return `GetDevice`; }
   static get GET_DEVICE_NOTIFICATION() { return `GetDeviceNotification`; }
   static get GET_DEVICE_COMMAND() { return `GetDeviceCommand`; }
   static get REGISTER_DEVICE() { return `RegisterDevice`; }
   static get CREATE_DEVICE_NOTIFICATION() { return `CreateDeviceNotification`; }
   static get CREATE_DEVICE_COMMAND() { return `CreateDeviceCommand`; }
   static get UPDATE_DEVICE_COMMAND() { return `UpdateDeviceCommand`; }
   static get GET_CURRENT_USER() { return `GetCurrentUser`; }
   static get UPDATE_CURRENT_USER() { return `UpdateCurrentUser`; }
   static get MANAGE_USER() { return `ManageUser`; }
   static get MANAGE_CONFIGURATION() { return `ManageConfiguration`; }
   static get MANAGE_NETWORK() { return `ManageNetwork`; }
   static get MANAGE_DEVICE_TYPE() { return `ManageDeviceType`; }
   static get MANAGE_TOKEN() { return `ManageToken`; }
   static get MANAGE_PLUGIN() { return `ManagePlugin`; }

   static get BOOTSTRAP_SERVERS() { return `bootstrap.servers`; }
   static get NOTIFICATION_TOPIC_NAME() { return `device_notification`; }
   static get COMMAND_TOPIC_NAME() { return `device_command`; }
   static get COMMAND_UPDATE_TOPIC_NAME() { return `device_command_update`; }
   static get ZOOKEEPER_CONNECT() { return `zookeeper.connect`; }
   static get GROOP_ID() { return `group.id`; }
   static get ZOOKEEPER_SESSION_TIMEOUT_MS() { return `session.timeout.ms`; }
   static get ZOOKEEPER_CONNECTION_TIMEOUT_MS() { return `connection.timeout.ms`; }
   static get ZOOKEEPER_SYNC_TIME_MS() { return `sync.time.ms`; }
   static get AUTO_COMMIT_INTERVAL_MS() { return `auto.commit.interval.ms`; }
   static get THREADS_COUNT() { return `threads.count`; }

   static get WELCOME_MESSAGE() { return `The DeviceHive RESTful API is now running, please refer to documentation to get the list of available resources.`; }

   static get COMMAND_EVENT() { return `COMMAND_EVENT` }
   static get COMMAND_UPDATE_EVENT() { return `COMMAND_UPDATE_EVENT` }
   static get COMMANDS_UPDATE_EVENT() { return `COMMANDS_UPDATE_EVENT` }
   static get NOTIFICATION_EVENT() { return `NOTIFICATION_EVENT` }
}


module.exports = Constants;
