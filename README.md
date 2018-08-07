# Box config schema

## 专用名词解释

### edge: 指网关

### tag: 工业数据

### device: 产生实际数据的源 plc | sensor | io

```json
{
  "definitions": {
    "type": "object",
    "properties": {
      "id": {
        "type": "string",
        "description": "盒子的ID,唯一标识",
        "examples": ["ABCDEDS9u2342"]
      },
      "name": {
        "type": "string",
        "description": "盒子可被用户识别的名称",
        "examples": ["一号焊接机"]
      },
      "edgeModel": {
        "type": "object",
        "description": "盒子自身数据模型",
        "properties": {
          "signalStrength": {
            "type": "number",
            "description": "网络信号强度",
            "default": 0,
            "examples": [25]
          },
          "cellular": {
            "type": "object",
            "description": "网络运营商信息",
            "properties": {
              "carrier": {
                "type": "string",
                "description": "网络运营商名称",
                "examples": ["China Mobile"]
              },
              "simNumber": {
                "type": "string",
                "description": "SIM卡手机号",
                "examples": ["13305758888"]
              },
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
            "description": "盒子网络接口信息",
            "properties": {
              "[key: string]": {
                "type": "object",
                "description": "网卡key的接口信息",
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
              }
            },
            "serialPorts": {
              "type": "array",
              "items": { "type": "string" },
              "description": "串口名称列表"
            },
            "defaultRoute": {
              "type": "string",
              "description": "默认route"
            }
          },
          "location": {
            "type": "object",
            "description": "盒子地理位置信息",
            "properties": {
              "longitude": { "type": "number" },
              "latitude": { "type": "number" },
              "radius": { "type": "number" },
              "address": { "type": "string" }
            }
          },
          "cpu": {
            "type": "object",
            "description": "盒子CPU信息",
            "properties": {
              "type": { "type": "string" },
              "usage": { "type": "number" },
              "temperature": { "type": "number" }
            }
          },
          "memory": {
            "type": "object",
            "description": "盒子内存信息",
            "properties": {
              "type": { "type": "string" },
              "usage": { "type": "number" },
              "temperature": { "type": "number" }
            }
          }
        }
      },
      "extModel": {
        "type": "object",
        "description": "盒子连接工业设备/传感器模型",
        "properties": {
          "devices": {
            "type": "object",
            "description": "工业设备/传感器节点",
            "properties": {
              "[key: string]": {
                "type": "object",
                "description": "工业设备/传感器Key定义",
                "properties": {
                  "protocal": {
                    "type": "string",
                    "description": "工业设备/传感器协议",
                    "enum": [
                      "s7",
                      "modbusTCP",
                      "modbusRTU",
                      "cip",
                      "hitachi",
                      "idec"
                    ]
                  },
                  "s7Param": {
                    "type": "object",
                    "properties": {
                      "slot": {
                        "type": "number"
                      },
                      "rack": {
                        "type": "number"
                      }
                    }
                  },
                  "modbusParam": {
                    "type": "object",
                    "properties": {
                      "endianness": {
                        "type": "string",
                        "description": "数据端序",
                        "enum": ["big-endian", "little-endian"]
                      }
                    }
                  },
                  "devInterface": {
                    "type": "object",
                    "description": "工业设备/传感器通信接口",
                    "properties": {
                      "type": {
                        "type": "string",
                        "description": "接口",
                        "enum": ["UDP", "TCP", "serial"]
                      },
                      "serialParam": {
                        "type": "object",
                        "properties": {
                          "port": {"type": "string"},
                          "baudRate": {
                            "type": "number",
                            "description": "波特率",
                            "enum": [1200, 2400, 4800, 9600, 14400, 19200, 38400, 57600, 115200]
                          },
                          "parity": {
                            "type": "string",
                            "example": ["none", "even", "odd", "mark", "space"]
                          },
                          "dataBits": {
                            "type": "number",
                            "enum": [5, 6, 7, 8]
                          },
                          "stopBits": {
                            "type": "number",
                            "enum": [1, 1.5, 2]
                          },
                          "rs": {
                            "type": "string",
                            "example": ["rs232", "rs422", "rs485"]
                          },
                          "stationNumber": {
                            "type": "number"
                          }
                        }
                      },
                      "networkParam": {
                        "type": "object",
                        "properties": {
                          "port": {
                            "type": "number",
                            "description": "工业设备/传感器端口"
                          },
                          "address": {
                            "type": "string",
                            "description": "工业设备/传感器地址",
                            "example": ["192.168.0.1"]
                          }
                        }
                      }
                    }
                  },
                  "cycle": {
                    "type": "number",
                    "description": "工业设备/传感器扫描周期 ms"
                  },
                  "timeout": { "type": "number" },
                  "description": {"type": "string"}
                }
              }
            }
          },
          "tags": {
            "type": "object",
            "description": "工业数据定义",
            "properites": {
              "[key: string]": {
                "type": "object",
                "description": "工业数据名Key定义",
                "properties": {
                  "device": {
                    "type": "string",
                    "description": "数据来源于哪个工业设备/传感器"
                  },
                  "address": {
                    "type": "string",
                    "description": "数据在工业设备/传感器中的地址",
                    "examples": ["MW900"]
                  },
                  "datatype": {
                    "type": "string",
                    "description": "数据类型",
                    "enum": [
                      "BOOL",
                      "INT16",
                      "INT32",
                      "INT64",
                      "REAL32",
                      "REAL64",
                      "WORD",
                      "DWORD",
                      "BYTE"
                    ]
                  },
                  "description": {
                    "type": "string",
                    "description": "数据描述"
                  },
                  "unit": { "type": "string", "description": "数据单位" }
                }
              }
            }
          },
          "alarms": {
            "type": "object",
            "description": "设备报警定义",
            "properites": {
              "[key: string]": {
                "type": "object",
                "description": "设备报警Key定义",
                "properties": {
                  "text": { "type": "string" },
                  "source": { "type": "string" },
                  "threshold": { "type": "string" },
                  "operator": {
                    "type": "string",
                    "enum": [">", ">=", "==", "!=", "<=", "<"]
                  },
                  "deadband": { "type": "number" },
                  "deadbandMode": {
                    "type": "string",
                    "enum": ["abs", "percentage"]
                  },
                  "delay": { "type": "number" }
                }
              }
            }
          }
        }
      }
    }
  }
}

```

## QA

### Q: 云端如何获取盒子连接设备拓扑结构

### A: 盒子上传设备模型数据

### Q: 如何避免数据伪造

### A: 模型认证, 云端接收的工业数据与盒子模型进行校验来判断数据真伪

## Q

### Q: 数据请求模式, 云端是否需要主动向盒子请求数据

### Q: 云端对盒子的数据请求的模型, 如请求盒子以 1min 为间隔发送数据, 是否还会有数据取消发送命令

### Q: 多个数据请求方对盒子同时请求数据的时候, 服务如何进行优化处理
