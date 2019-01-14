//defined on cloud
const MP = {
  type: "设备类型",
  // hash: "9999asd7fa",
  alias: "空压机A",
  version: "v0.1",
  description: "花木成畦手自栽花木成畦手自栽",
  // instanceId: "asdfqsdffasdf123",
  etags: {
    current1: { unit: "A", writabe: true, public: true, sample: 10 },
    current2: { unit: 'A', public: false },
    pressure: { unit: "Bar" },
    alarms: {},
    usage: {}
  },
  alarms: {
    alarma: {
      text: 'sdf',
      class: 'warn',
      trigger: 'sss',
      untrigger: '',
      express: '',
      mode: 'express | etag',
      enable_exp: 'etag1',
      ondelay: 0,
      offdelay: 0,
    },
  },
  archives: {
    arch1: {
      source: 'current1', //etag name
      cycle: 60000, // unit: ms, <=0: onchange
      tmax: 60000, //
    }
  }
};

//drag mp to box to generate box mobel
//generate hash before model set to box
const boxModel = {
  equipments: {
    equipementName: {
      instanceId: "kongyaji",
      type: '设备类型',
      alias: "空压机A",
      version: "v0.1",
      description: "花木成畦手自栽花木成畦手自栽",
      influx_tags: [
        '将etag映射成influxdb的tag字段值'
      ],
      etags: {
        current: { unit: "A", source: 'plc1.c', writabe: true },
        pressure: { unit: "Bar", source: 'plc2.p * 1000'  },
        sss: {source: 'plc1.a + plc1.b'},
        usage: { source: 'box.cpuusage'}
      },
      alarms: {},
      archives: {}
    }
  },
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
