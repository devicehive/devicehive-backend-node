var Client = require('hazelcast-client').Client;
var Config = require('hazelcast-client').Config;
var cfg = new Config.ClientConfig();
var Predicates = require('hazelcast-client').Predicates;
var Long = require('long');


class HazelcastHelper {

    static preparePredicate({ id, fields1, fields2, fields3, fields4 }) {
        const predicates = [];

        if (id) { predicates.push(Predicates.isEqualTo(`id`, id)); }
        if (fields1) { predicates.push(Predicates.inPredicate(`field1`, fields1)); }
        if (fields2) { predicates.push(Predicates.inPredicate(`field2`, fields2)); }
        if (fields3) { predicates.push(Predicates.inPredicate(`field3`, fields3)); }
        if (fields4) { predicates.push(Predicates.inPredicate(`field4`, fields4)); }

        return predicates.length > 1 ? Predicates.and(predicates) : predicates[0];
    }
}

class MyPortableFactory {

    create(classId) {
        let portable = null;

        switch (classId) {
            case MyProtable.CLASS_ID:
                portable = new MyProtable();
                break;
        }

        return portable;
    }
}

class MyProtable {

    static get FACTORY_ID() { return 1; }
    static get CLASS_ID() { return 1; }

    constructor({ id, field1, field2, field3, field4 } = {}) {
        const me = this;

        me.id = id;
        me.field1 = field1;
        me.field2 = field2;
        me.field3 = field3;
        me.field4 = field4;
    }

    getFactoryId() {
        return MyProtable.FACTORY_ID;
    };

    getClassId() {
        return MyProtable.CLASS_ID;
    };

    writePortable(writer) {
        const me = this;

        writer.writeLong("id", Long.fromNumber(me.id, false));
        writer.writeUTF("field1", me.field1);
        writer.writeLong("field2", Long.fromNumber(me.field2, false));
        writer.writeLong("field3", Long.fromNumber(me.field3, false));
        writer.writeLong("field4", Long.fromNumber(new Date(me.field4).getTime(), false));
    };

    readPortable(reader) {
        const me = this;

        me.id = reader.readLong("id").toNumber();
        me.field1 = reader.readUTF("field1");
        me.field2 = reader.readLong("field2").toNumber();
        me.field3 = reader.readLong("field3").toNumber();
        me.field4 = reader.readLong("field4").toNumber();
    };
}

cfg.serializationConfig.portableVersion = '0';
cfg.serializationConfig.portableFactories[1] = new MyPortableFactory();

Client.newHazelcastClient(cfg).then(function (client) {
    var map = client.getMap('objects');
    var obj = new MyProtable({id: 1, field1:'a', field2:2, field3:2, field4:3});
    map.put(1, obj).then(function () {
        return map.valuesWithPredicate(HazelcastHelper.preparePredicate({
            id: 1,
            fields1: [ 'a' ]
        })).catch((err) => {
           console.log(err);
        });
    }).then(function (obj) {
        console.log(obj);
        client.shutdown();
    });
});
