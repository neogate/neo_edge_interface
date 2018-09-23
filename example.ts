const MP = {
  name: "空压机",
  hash: "9999asd7fa",
  alias: "空压机A",
  version: "v0.1",
  description: "花木成畦手自栽花木成畦手自栽",
  instanceId: "asdfqsdffasdf123",
  etags: {
    current1: { unit: "A", writabe: true, public: true, sample: 10 },
    current2: { unit: 'A', public: false },
    pressure: { unit: "Bar" },
    alarms: {},
    usage: {}
  },
  alarms: {
      oilpum: {}
  },
  archives: {}
};

const boxModel = {
  equipments: [
      {
        name: "空压机",
        hash: "9999asd7fa",
        alias: "空压机A",
        version: "v0.1",
        description: "花木成畦手自栽花木成畦手自栽",
        instanceId: "asdfqsdffasdf123",
        etags: {
          current: { unit: "A", source: 'plc1.c', writabe: true },
          pressure: { unit: "Bar", source: 'plc2.p * 1000'  },
          alarms: {source: 'combine(plc1.a, plc2.b, plc1.c)'},
          usage: { source: 'box.cpuusage'}
        },
        alarms: {},
        archives: {}
      }
  ],
  devices: {
    plc1: {
      protocal: "S7",
      tags: {
        c: {
          address: "V100",
          datatype: "REAL32",
          readonly: true,
          scale: "linear",
          rawMin: 0,
          rawMax: 10,
          scaledMin: 0,
          scaledMax: 100
        }
      },
      dev_if_type: "TCP",
      dev_if_nw_port: 102,
      dev_if_nw_address: "192.168.1.100",
      cycle: 1000,
      timeout: 5000
    },
    plc2: {
        protocal: "S7",
        tags: {
          p: {
            address: "V100",
            datatype: "REAL32",
            readonly: true,
            scale: "linear",
            rawMin: 0,
            rawMax: 10,
            scaledMin: 0,
            scaledMax: 100
          }
        },
        dev_if_type: "TCP",
        dev_if_nw_port: 102,
        dev_if_nw_address: "192.168.1.101",
        cycle: 1000,
        timeout: 5000
      }
  }
};
