const HazelcastPortable = require(`./HazelcastPortable`);


class HazelcastEntityComparator extends HazelcastPortable {

    static get FACTORY_ID() { return 1; }
    static get CLASS_ID() { return 7; }

    static getClassName() { return HazelcastEntityComparator.name };


    getFactoryId() { return HazelcastEntityComparator.FACTORY_ID; };

    getClassId() { return HazelcastEntityComparator.CLASS_ID; };

    writePortable(writer) {};

    readPortable(reader) {};

    sort(o1, o2) {
        const timestamp1 = new Date(o1[1].timestamp).getTime();
        const timestamp2 = new Date(o2[1].timestamp).getTime();

        return timestamp2 - timestamp1;
    }
}


module.exports = HazelcastEntityComparator;
