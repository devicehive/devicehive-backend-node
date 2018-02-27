const HazelcastEntityComparator = require(`./HazelcastEntityComparator`);


class DataSerializableFactory {

    create(classId) {
        let portable = null;

        switch (classId) {
            case HazelcastEntityComparator.CLASS_ID:
                portable = new HazelcastEntityComparator();
                break;
        }

        return portable;
    }
}


module.exports = DataSerializableFactory;
