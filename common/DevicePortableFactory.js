const DeviceNotification = require(`./DeviceNotification.js`);

class DevicePortableFactory {

    create(classId) {
        let portable = null;

        switch (classId) {
            case DeviceNotification.CLASS_ID:
                portable = new DeviceNotification();
                break;
        }

        return portable;
    }
}


module.exports = DevicePortableFactory;
