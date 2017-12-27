const HazelcastPortable = require(`../HazelcastPortable`);
const Long = require(`long`);

const WILDE_CARD = `*`;
const KEY_JOINER = `,`;

class Filter extends HazelcastPortable {

    static get FACTORY_ID() { return 1; }
    static get CLASS_ID() { return 4; }

    static getClassName() { return Filter.name };

    static FIRST_KEY_WILDE_CARD() { return `${WILDE_CARD}${KEY_JOINER}${WILDE_CARD}${KEY_JOINER}${WILDE_CARD}`}
    static SECOND_KEY_WILDE_CARD() { return `${WILDE_CARD}${KEY_JOINER}${WILDE_CARD}`}

    constructor({ networkId, deviceTypeId, deviceId, eventName, name } = {}) {
        super();

        const me = this;

        me.networkId = networkId;
        me.deviceTypeId = deviceTypeId;
        me.deviceId = deviceId;
        me.eventName = eventName;
        me.name = name;
    }

    get deviceTypeId() {
        return this._deviceTypeId;
    }

    set deviceTypeId(value) {
        this._deviceTypeId = value;
    }

    get networkId() {
        return this._networkId;
    }

    set networkId(value) {
        this._networkId = value;
    }

    get deviceId() {
        return this._deviceId;
    }

    set deviceId(value) {
        this._deviceId = value;
    }

    get eventName() {
        return this._eventName;
    }

    set eventName(value) {
        this._eventName = value;
    }

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    getFirstKey() {
        const me = this;

        return [me.networkId || WILDE_CARD, me.deviceTypeId || WILDE_CARD, me.deviceId || WILDE_CARD].join(KEY_JOINER);
    }

    getDeviceIgnoredFirstKey() {
        const me = this;

        return [me.networkId || WILDE_CARD, me.deviceTypeId || WILDE_CARD, WILDE_CARD].join(KEY_JOINER);
    }

    getSecondKey() {
        const me = this;

        return [me.eventName || WILDE_CARD, me.name || WILDE_CARD].join(KEY_JOINER)
    }

    getFactoryId() {
        return Filter.FACTORY_ID;
    };

    getClassId() {
        return Filter.CLASS_ID;
    };

    writePortable(writer) {
        const me = this;

        writer.writeLong("networkId", Long.fromNumber(me.networkId, false));
        writer.writeLong("deviceTypeId", Long.fromNumber(me.deviceTypeId , false));
        writer.writeUTF("deviceId", me.deviceId);
        writer.writeUTF("eventName", me.eventName);
        writer.writeUTF("name", me.name);
    };

    readPortable(reader) {
        const me = this;

        me.networkId = reader.readLong("networkId").toNumber();
        me.deviceTypeId = reader.readLong("deviceTypeId").toNumber();
        me.deviceId = reader.readUTF("deviceId");
        me.eventName = reader.readUTF("eventName");
        me.name = reader.readUTF("name");
    };
}


module.exports = Filter;
