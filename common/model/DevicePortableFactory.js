const DeviceNotification = require(`./DeviceNotification`);
const DeviceCommand = require(`./DeviceCommand`);
const HivePrincipal = require(`../auth/HivePrincipal`);
const Filter = require(`./eventbus/Filter`);
const Subscriber = require(`./eventbus/Subscriber`);


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
            case Subscriber.CLASS_ID:
                portable = new Subscriber();
                break;
        }

        return portable;
    }
}


module.exports = DevicePortableFactory;
