const HazelcastPortable = require(`../HazelcastPortable`);
const Long = require(`long`);

const WILDE_CARD = `*`;
const KEY_JOINER = `,`;


class Filter extends HazelcastPortable {

    static get FACTORY_ID() { return 1; }
    static get CLASS_ID() { return 4; }

    static getClassName() { return Filter.name };

    static get FIRST_KEY_WILDE_CARD() { return `${WILDE_CARD}${KEY_JOINER}${WILDE_CARD}${KEY_JOINER}${WILDE_CARD}`; }
    static get SECOND_KEY_WILDE_CARD() { return `${WILDE_CARD}${KEY_JOINER}${WILDE_CARD}`; }

    constructor({ networkId, deviceTypeId, deviceId, eventName, name } = {}) {
        super();

        const me = this;

        me.networkId = networkId;
        me.deviceTypeId = deviceTypeId;
        me.deviceId = deviceId;
        me.eventName = eventName;
        me.name = name;

        me.firstKey = ``;
        me.secondKey = ``;
        me.deviceIgnoredFirstKey = ``;
        me.complexKey = ``;

        me._buildKeys();
    }

    _buildKeys() {
        const me = this;

        me.firstKey = [me.networkId || WILDE_CARD, me.deviceTypeId || WILDE_CARD, me.deviceId || WILDE_CARD].join(KEY_JOINER);
        me.secondKey = [me.eventName || WILDE_CARD, me.name || WILDE_CARD].join(KEY_JOINER);
        me.deviceIgnoredFirstKey = [me.networkId || WILDE_CARD, me.deviceTypeId || WILDE_CARD, WILDE_CARD].join(KEY_JOINER);

        me.complexKey = `${me.getFirstKey()}${me.getSecondKey()}`;
    }

    getFirstKey() {
        const me = this;

        return me.firstKey;
    }

    getDeviceIgnoredFirstKey() {
        const me = this;

        return me.deviceIgnoredFirstKey;
    }

    getSecondKey() {
        const me = this;

        return me.secondKey;
    }

    getComplexKey() {
        const me = this;

        return me.complexKey;
    }

    toString() {
        const me = this;

        return JSON.stringify({
            networkId: me.networkId,
            deviceTypeId: me.deviceTypeId,
            deviceId: me.deviceId,
            eventName: me.eventName,
            name: me.name
        });
    }

    getFactoryId() {
        return Filter.FACTORY_ID;
    }

    getClassId() {
        return Filter.CLASS_ID;
    }

    writePortable(writer) {
        const me = this;

        writer.writeLong("networkId", Long.fromNumber(me.networkId, false));
        writer.writeLong("deviceTypeId", Long.fromNumber(me.deviceTypeId , false));
        writer.writeUTF("deviceId", me.deviceId);
        writer.writeUTF("eventName", me.eventName);
        writer.writeUTF("name", me.name);
    }

    readPortable(reader) {
        const me = this;

        me.networkId = reader.readLong("networkId").toNumber();
        me.deviceTypeId = reader.readLong("deviceTypeId").toNumber();
        me.deviceId = reader.readUTF("deviceId");
        me.eventName = reader.readUTF("eventName");
        me.name = reader.readUTF("name");

        me._buildKeys();
    }
}


module.exports = Filter;
