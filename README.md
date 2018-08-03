# Box config schema

## 专用名词解释
### edge: 指网关
### tag: 工业数据
### device: 产生实际数据的源 plc | sensor | io

```json
{
  "type": "object",
  "properties": {
    "id": { "type": "string" },
    "name": { "type": "string" },
    "type": { "type": "string" },
    "edgeModel": {
      "type": "object",
      "properties": {
        "signalStrength": { "type": "string" },
        "cellular": {
          "type": "object",
          "properties": {
            "carrier": { "type": "string" },
            "simNumber": { "type": "string" },
            "icid": { "type": "string" },
            "networkMode": { "type": "string" },
            "networkModeSub": { "type": "string" },
            "lac": { "type": "number" },
            "mcc": { "type": "number" },
            "cid": { "type": "number" }
          }
        },
        "interfaces": {
          "type": "object",
          "properties": {
            "key": {
              "type": "object",
              "properties": {
                "ipv4": {
                  "type": "object",
                  "properties": {
                    "mac": { "type": "string" },
                    "vendor": { "type": "string" },
                    "netmask": { "type": "string" },
                    "gateway": { "type": "string" }
                  }
                },
                "ipv6": {
                  "type": "object",
                  "properties": {
                    "mac": { "type": "string" },
                    "vendor": { "type": "string" }
                  }
                }
              }
            },
            "serialPorts": { "type": "array" },
            "defaultRoute": { "type": "string" }
          },
        },
        "location": {
          "type": "object",
          "properties": {
            "longitude": { "type": "number" },
            "latitude": { "type": "number" },
            "radius": { "type": "number" },
            "address": { "type": "string" }
          }
        },
        "cpu": {
          "type": "object",
          "properties": {
            "type": { "type": "string" },
            "usage": { "type": "number" },
            "temperature": { "type": "number" }
          }
        },
        "memory": {
          "type": "object",
          "properties": {
            "type": { "type": "string" },
            "usage": { "type": "number" },
            "temperature": { "type": "number" }
          }
        }
      }
    },
    "extModel": {
      "tpye": "object",
      "properties": {
        "devices": {
          "type": "object",
          "properties": {
            "key": {
              "type": "object",
              "properties": {
                "type": { "type": "string" },
                "protocal": { "type": "string" },
                "address": { "type": "string" },
                "endianness": { "type": "boolean" },
                "subProtocal": { "type": "string" },
                "extra": { "type": "object" },
                "cycle": { "type": "number" },
                "timeout": { "type": "number" }
              }
            }
          }
        },
        "tags": {
          "type": "object",
          "properites": {
            "key": { "type": "object" },
            "properties": {
              "device": { "type": "string" },
              "address": { "type": "string" },
              "datatype": { "type": "string" },
              "description": { "type": "string" },
              "unit": { "type": "string" },
            }
          }
        },
        "alarms": {
          "type": "object",
          "properites": {
            "key": {
              "type": "object",
              "properties": {
                "text": { "type": "string" },
              }
            }
          }
        }
      }
    }
  }
}
```
