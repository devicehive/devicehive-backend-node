const hazelcastService = require(`../../service/hazelcast/HazelcastService`);
const DeviceNotification = require(`../../common/model/DeviceNotification`);


setTimeout(() => {
    hazelcastService.find(DeviceNotification.getClassName(), {
        deviceIds: "e50d6085-2aba-48e9-b1c3-73c673e414be",
    })
        .then((result) => {
            console.log(result);
        })
        .catch((error) => {
            console.log(error);
            debugger;
        });
}, 1000);

