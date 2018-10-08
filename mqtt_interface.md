# NetEase MQTT Interface

#### version 0.1

##### 2018-8-13

### Basic MQTT Topic Structure

`/prefix/[boxid]/[direction]/[type]/[subtype]`

- direction
  - command {% Cloud to box %}
  - edge {% Box to cloud %}
- type
  - management
  - livedata
  - alarmdata
  - historicdata remove
  - logdata
  - userdefine
- subtype

### Management

- Cloud query box model

  `[direction] = command`

  `[type] = management`

  `[subtype] = modelquery`

  ```js
  topic = "/prefix/[boxid]/command/management/modelquery";
  ```

  ```js
  payload = {};
  
  ```

- Box online

  `[direction] = edge`

  `[type] = management`

  `[subtype] = online`

  ```js
  topic = "/prefix/[boxid]/edge/management/online";
  ```

  ```js
  payload = {
    online: true
  };

  ```

- Box feedback model

  `[direction] = edge`

  `[type] = management`

  `[subtype] = modeldata`

  ```js
  topic = "/prefix/[boxid]/edge/management/modeldata";
  ```

  ```js
  payload = {
    id: "",
    name: "",
    boxinfo: EdgeModelSchema,
    equipment: ExtModelSchema
  };
  ```

- Cloud set box model

  `[direction] = command`

  `[type] = management`

  `[subtype] = modelset`

  ```js
  topic = "/prefix/[boxid]/command/management/modelset";
  ```

  ```js
  payload = ModelSetSchema;
  ```

- Box feedback modelset result

  `[direction] = edge`

  `[type] = management`

  `[subtype] = modelsetresult`

  ```js
  topic = "/prefix/[boxid]/edge/management/modelsetresult";
  ```

  ```js
  payload = {
    result: "OK | Failure",
    errorInfo: "",
    errorCode: ""
  };
  ```

- Cloud query single device status

  `[direction] = command`

  `[type] = management`

  `[subtype] = devicequery`

  ```js
  topic = "/prefix/[boxid]/command/management/devicequery";
  ```

  ```js
  payload = {
    device: deviceName
  };
  ```

- Box feedback / report single device status

  `[direction] = edge`

  `[type] = management`

  `[subtype] = devicedata`

  ```js
  topic = "/prefix/[boxid]/edge/management/devicedata";
  ```

  ```js
  payload = {
    deviceName: DeviceStatusSchema
  };
  ```

- Cloud query batch devices status

  `[direction] = command`

  `[type] = management`

  `[subtype] = devicesquery`

  ```js
  topic = "/prefix/[boxid]/command/management/devicesquery";
  ```

  ```js
  payload = {
    devices: ["device1", "device2"]
  };
  ```

- Box feedback / report batch devices status

  `[direction] = edge`

  `[type] = management`

  `[subtype] = devicesdata`

  ```js
  topic = "/prefix/[boxid]/edge/management/devicesdata";
  ```

  ```js
  payload = {
    device1: DeviceStatusSchema,
    device2: DeviceStatusSchema,
    ...
  };
  ```
### Livedata
- Cloud query tag live data
  `[direction] = command`

  `[type] = livedata`

  `[subtype] = tagname`

  ```js
  topic = "/prefix/[boxid]/command/livedata/tagname";
  ```

  ```js
  payload = {};
  ```
- Box feedback/report tag live data
  `[direction] = edge`

  `[type] = livedata`

  `[subtype] = tagname`

  ```js
  topic = "/prefix/[boxid]/edge/instanceId/livedata/tagname";
  ```

  ```js
  payload = {
    value: 1000,
    timestamp: '',
    quality: ''
  };
  ```

### Alarmdata
- Cloud query alarm data/status
  `[direction] = command`

  `[type] = alarmdata`

  `[subtype] = alarmname`

  ```js
  topic = "/prefix/[boxid]/command/alarmdata/alarmname";
  ```

  ```js
  payload = {};
  ```
- Box feedback/report alarm data
  `[direction] = edge`

  `[type] = alarmdata`

  `[subtype] = tagname`

  ```js
  topic = "/prefix/[boxid]/edge/alarmdata/tagname";
  ```

  ```js
  payload = {
    text: "",
    value: "",
    triggerValue: "",
    timestamp: "",
    status: "come | go | acknowledge"
  };
  ```

### Historicdata
- Cloud query historic data
  `[direction] = command`

  `[type] = historicdata`

  `[subtype] = historicname / alarmname`

  ```js
  topic = "/prefix/[boxid]/command/historicdata/historicname";
  ```

  ```js
  payload = {
    begin: '',
    end: ''
  };
  ```
- Box feedback/resend(after network restore) historic data
  `[direction] = edge`

  `[type] = historicdata`

  `[subtype] = historicname / alarmname`

  ```js
  topic = "/prefix/[boxid]/edge/historicdata/historicname";
  ```

  ```js
  payload = {
    value: 1000,
    timestamp: '',
    quality: '',
    total: 10000,
    count: 121
  };
  ```
  ```js
  topic = "/prefix/[boxid]/edge/historicdata/alarmname";
  ```

  ```js
  payload = {
    text: "",
    value: "",
    triggerValue: "",
    timestamp: "",
    status: "come | go | acknowledge",
    total: 10000,
    count: 121
  };
  ```

### Q
- Q1: Cloud Command 流水号
  - Q1.1: feedback / report 是否需要区别
- Q2: Cloud端主动请求盒子数据的模式，逐条响应还是按发送模式响应
- Q3: Cloud App 数据请求，数据源是否全部都是来自于TSDB，是否有可能从盒子直接读取




# NEW MQTT DATA
## topic
/equipemt/data
## payload
4个 ‘_’开头的字段是固定字段

其它字段为etag，只能以字母开头

```json
{
  "_id": "equipment id, global unique",
  "_box": "box id, global unique",
  "_type": "equipment model name / type, global unchanged, db measurement / sheet name",
  "_ts": 1538975996608,
  "current": 10.2,
  "voltage": 120
}
```