# FUNCTION:
	1. DATA
	2. VPN
	3. DEBUG
	4. MODEL
	5. OTA
	6. NET

# TOPIC
| PHASE | EDGE -> CLOUD | CLOUD -> EDGE |
| :--- | :--- | :--- |
| POWER ON | /edge/box/json/{box_id}/box/online<br>`{ modelhash: 'asdfasdf' }` | |
| EP CONNECT | /edge/equipment/json/{ep_id}/equipment/online<br>`{ status: 'GOOD | BAD | LOST' }` | |
| DEVICE MANAGEMENT ROUTING | /edge/box/json/{box_id}/device/status<br>`{ device1: 'ONLINE', device2: 'LOST', }`<br>device 状态可单个发送 | |
| DEVICE MANAGEMENT ROUTING | /edge/box/json/{box_id}/device/statusback<br>`{ uuid: 'asdfadsf' device1: 'ONLINE', device2: 'LOST', }`<br>device 状态可单个发送 | /cloud/box/json/{box_id}/device/status<br>`{ uuid: 'sdfasdf', device: /sdfs/; }` |
| MODEL SET | /edge/box/json/{box_id}/model/setback<br>`{ reust: 200, errormsg: '', uuid: '' }` | /cloud/box/json/{box_id}/model/set<br>`{ uuid: 'sdfs', hash: '', model: {} }` |
| MODEL QUERY FROM EDGE | /edge/box/json/{box_id}/model/read | /cloud/box/json/{box_id}/model/readback |
| MODEL QUERY FROM CLOUD | /edge/box/json/{box_id}/model/readback | /cloud/box/json/{box_id}/model/read |
| MODEL HASH QUERY | /edge/box/json/{box_id}/model/hashback | /cloud/box/json/{box_id}/model/hash |
| **ACTIVE ALARM / ARCHIVE** | /edge/equipment/influxline/{ep_id}/alarm/data<br>/edge/equipment/influxline/{ep_id}/archive/data<br>/edge/equipment/json/{ep_id}/alarm/data<br>`{"alarm": "string", "class": "string", "message": "string", "direction": true, "timestamp": 121312}`<br>/edge/equipment/json/{ep_id}/archive/data<br> | |
| ALARM / ARCHIVE FEEDBACK | /edge/equipment/{encode}/{ep_id}/alarm/readback<br> | /cloud/equipment/json/{ep_id}/{item}/read<br>`{uuid: '', encode: 'influxline', object_id: '*'}` |
| SET PROPERTY | /edge/equipment/{encode}/{ep_id}/{item}/writepropertyback<br>`{ uuid: 'asdfa', result: 200, object_id: /regex/ or [id], errormsg: 'asdfasd' }` | /cloud/equipment/{encode}/{ep_id}/{item}/writeproperty<br>`{ uuit: 'asdfa', object_id: /regex/ or [id], enable: true or false }` |
| **QUERY PROPERTY** | /edge/equipment/{encode}/{ep_id}/{item}/readpropertyback<br>`{ uuid: 'asdfsad', key: true }` | /cloud/equipment/{encode}/{ep_id}/{item}/property/readproperty<br>`{ uuid: 'asdfasd', object_id: /regex/ or [id], }` |
| *BOX DATA READ* | /edge/box/{encode}/{box_id}/realdb/readback<br>`{ uuid: 'asdfa', device: 'plc1', data: { tag1: { value:20688 , timestamp:1553487445553487444 , quality:0 , type:10}, tag2: { value:20688 , timestamp:1553487445553487444 , quality:0 , type:10} } }` | /cloud/box/{encode}/{box_id}/realdb/read<br>`{ uuid: 'asdfa', device: 'plc1', tag: /regex/ or [id] }`<br>只读一次 |
| BOX DATA WRITE | /edge/box/{encode}/{box_id}/realdb/writeback<br> | /cloud/box/{encode}/{box_id}/realdb/write<br> |
| *EQUIPMENT DATA READ* | /edge/equipment/{encode}/{ep_id}/realdb/read<br>`{uuid: ''}`<br>/edge/equipment/{encode}/{ep_id}/realdb/data<br>`{ data: { tag1: { value:20688 , timestamp:1553487445553487444 , quality:0 , type:10, appid: ['id1', 'id2']} } }` | /cloud/equipment/{encode}/{ep_id}/realdb/read<br>`{ uuid: 'sadf', interval: {appid1: 1000, appid2: 2000}, etag: /regex/ or [id]}` |
| DATA WRITE | /edge/equipment/{encode}/{ep_id}/realdb/writeback<br>`{ uuid: 'asdfas', result: 200 errormsg: '' }`<br>result: 参考HTTP STATUS | /cloud/equipment/{encode}/{ep_id}/realdb/write<br>`{ uuid: 'asdfasdf', etagName: 'etag1', value: 2000 }` |
| INFLUX TAG WRITE | /edge/equipment/{encode}/{ep_id}/influxtag/writeback<br>`{ uuid: 'asdfas', result: 200 errormsg: '' }`<br>result: 参考HTTP STATUS | /cloud/equipment/{encode}/{ep_id}/influxtag/write<br>`{ uuid: 'asdfasdf', influxtags: {tag1: '', tag2: ''} }` |
| OFFLINE | /edge/box/json/{box_id}/box/offline<br>`{ equpments: ['ep1', 'ep2'] }` | |

## TOPIC
`/{direction}/{object}/{encode}/{objId}/{item}/{itemcode}`

### Cloud -> Edge
**ObjId broadcast code:** `_`

- direction
  - edge
  - cloud
- object
  - box
  - equipment
- encode
  - json
  - influxline
  - binery
  - xml
  - string
- item
  - alarm
  - archive
  - realdb
  - influxtag
  - alarmcache
  - staetcache
  - archivecache
  - model
  - device
  - box
  - equipment
- itemcode
  - online
  - offline
  - status
  - statusback
  - write
  - writeback
  - writeproperty
  - writepropertyback
  - readproperty
  - readpropertyback
  - read
  - readback
  - write
  - writeback
  - hash
  - hashback
  - data

## INTERVAL
- 0: stop
- positive value: interval
- -1: one shot
- < -1: on change

# Clear data in iot.zephyiot.com
- login to iot.zephyiot.com
- `docker exec -it influxdb-dev bash`
- `curl -XPOST "http://localhost:8086/query?pretty=true" --data-urlencode "q=DROP DATABASE test"`