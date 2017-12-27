
class HazelcastPortable {

    static get GLOBAL_PORTABLE_VERSION() { return 0; }

    getVersion() {
        return HazelcastPortable.GLOBAL_PORTABLE_VERSION;
    }

}

module.exports = HazelcastPortable;
