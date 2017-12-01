
class HazelcastEntityComparator {

    sort(o1, o2) {
        const o1Time = new Date(o1[1].timestamp).getTime();
        const o2Time = new Date(o2[1].timestamp).getTime();

        return o1Time < o2Time ? -1 : (o1Time === o2Time ? 0 : 1);
    }

}

module.exports = HazelcastEntityComparator;
