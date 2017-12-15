const DeviceNotification = require(`./DeviceNotification.js`);
const DeviceCommand = require(`./DeviceCommand.js`);
const HivePrincipal = require(`./HivePrincipal.js`);
const Filter = require(`./eventbus/Filter.js`);
const Subscription = require(`./eventbus/Subscription.js`);
const Subscriber = require(`./eventbus/Subscriber.js`);


class DevicePortableFactory {

    create(classId) {
        let portable = null;

        switch (classId) {
            case DeviceNotification.CLASS_ID:
                portable = new DeviceNotification();
                break;
            case DeviceCommand.CLASS_ID:
                portable = new DeviceCommand();
                break;
            case HivePrincipal.CLASS_ID:
                portable = new HivePrincipal();
                break;
            case Filter.CLASS_ID:
                portable = new Filter();
                break;
            case Subscription.CLASS_ID:
                portable = new Subscription();
                break;
            case Subscriber.CLASS_ID:
                portable = new Subscriber();
                break;
        }

        return portable;
    }
}


module.exports = DevicePortableFactory;
