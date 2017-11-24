const ProxyMessage = require(`./ProxyMessage`);
const NotificationCreatePayload = require(`./payload/NotificationCreatePayload.js`);
const TopicCreatePayload = require(`./payload/TopicCreatePayload.js`);
const TopicSubscribePayload = require(`./payload/TopicSubscribePayload.js`);


class ProxyMessageBuilder {

    static createTopic(payload) {
        return new ProxyMessage({
            type: `topic`,
            action: `create`,
            payload: new TopicCreatePayload(payload).toObject()
        });
    };

    static listTopics() {
        return new ProxyMessage({
            type: `topic`,
            action: `list`
        });
    };

    static subscribeTopic(payload) {
        return new ProxyMessage({
            type: `topic`,
            action: `subscribe`,
            payload: (new TopicSubscribePayload(payload)).toObject()
        });
    };

    static unsubscribeTopic() {
        return new ProxyMessage({
            type: `topic`,
            action: `unsubscribe`
        });
    };

    static createNotification(payload) {
        return new ProxyMessage({
            type: `notif`,
            action: `create`,
            payload: (new NotificationCreatePayload(payload)).toObject()
        });
    };

    static health() {
        return new ProxyMessage({
            type: `health`
        });
    };

}

module.exports = ProxyMessageBuilder;