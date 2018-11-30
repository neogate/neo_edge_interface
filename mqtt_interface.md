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




# MQTT TO INFLUXDB

[Reference](https://docs.influxdata.com/influxdb/v1.7/write_protocols/line_protocol_tutorial/)

```
weather,location=us-midwest temperature=82 1465839830100400200
  |    -------------------- --------------  |
  |             |             |             |
  |             |             |             |
+-----------+--------+-+---------+-+---------+
|measurement|,tag_set| |field_set| |timestamp|
+-----------+--------+-+---------+-+---------+
```

## measurement字段
在archive中，为机型名，即原先type字段
在alarms中，统一为__alarms__

## tag_set字段
包含id, box, class, name, type等，不用的tag用 `,` 分隔，不加空格，id,box等的值不使用`""`
性能考虑，tag字段需要进行排序，如box,class,id,name,type

## field_set字段
实际etag数据字段，根据etag数据类型更改字段名为 `dataType_etag`, 如`number_quantity`。
etag的值，如果是float，直接写值，如果是number，值后加i表示其为整型，如果是string，需要加`""`
- Floats - by default, InfluxDB assumes all numerical field values are floats. Store the field value 82 as a float:
    ```
    weather,location=us-midwest temperature=82 1465839830100400200
    ```
- Integers - append an i to the field value to tell InfluxDB to store the number as an integer. Store the field value 82 as an integer:
    ```
    weather,location=us-midwest temperature=82i 1465839830100400200
    ```
- Strings - double quote string field values (more on quoting in Line Protocol below). Store the field value too warm as a string:
    ```
    weather,location=us-midwest temperature="too warm" 1465839830100400200
    ```
- Booleans - specify TRUE with t, T, true, True, or TRUE. Specify FALSE with f, F, false, False, or FALSE. Store the field value true as a Boolean:
    ```
    weather,location=us-midwest too_hot=true 1465839830100400200
    ```

### timestamp字段
精度为ns

### 关于空格
内容中，只有两个空格，位于tag_set和field_set之间，field_set和timestamp之间，不同set之间用`,`分隔

## Example
### 假设存在机型 kongyaji
```js
{
  name: "kongyaji",
  hash: "9999asd7fa",
  alias: "空压机A",
  version: "v0.1",
  description: "花木成畦手自栽花木成畦手自栽",
  instanceId: "asdfqsdffasdf123",
  etags: {
    current: { dataType: "float" },
    quantity: { dataType: "number" },
    start: { dataType: "boolean" },
    stop: { dataType: "boolean" },
    info: { dataType: "string"}
  },
  alarms: {
      currentHigh: { text: "current too high", class: "warning"}
  },
  archives: {}
}
```

- /equipment/archive
    ```
    kongyaji,box=MAABBCCDDEE,id=asdfqsdffasdf123,stateinfo=停机 float_current=10.5,number_quantity=102i,boolean_start=true,boolean_stop=false,number_state=1i,string_info="stringvalue" 1542332070257931008
    ```
- /equipment/alarm
    ```
    __alarms__,box=MAABBCCDDEE,class=warning,id=asdfqsdffasdf123,name=currentHigh,type=kongyaji state=true,value=1,text="current too high" 1542332070257931008
    ```
- /equipment/state
    ```
    __states__,box=MAABBCCDDEE,id=asdfqsdffasdf123,type=kongyaji,stateinfo=停机 state=1i, 1542332070257931008
    ```

### 假设 kongyaji 更改 current的dataType改为number
- /equipment/archive
    ```
    kongyaji,box=MAABBCCDDEE,id=asdfqsdffasdf123 number_current=11i,number_quantity=102i,boolean_start=true,boolean_stop=false,string_info="stringvalue" 1542332070257931008
    ```

# 系统关键字，不能作为etag, archive, alarm名字及其它字段名

- time
- measurement
- tag
- field
- tags
- fields
- id
- box
- name
- class
- type
- status
- value