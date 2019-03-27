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
| ACTIVE ALARM / ARCHIVE / STATE | /edge/equipment/{encode}/{ep_id}/alarm/data<br>/edge/equipment/{encode}/{ep_id}/state/data<br>/edge/equipment/{encode}/{ep_id}/archive/data<br> | |
| ALARM / ARCHIVE / STATE FEEDBACK | /edge/equipment/{encode}/{ep_id}/alarm/readback<br>/edge/equipment/{encode}/{ep_id}/state/readback<br>/edge/equipment/{encode}/{ep_id}/archive/readback<br> | /cloud/equipment/json/{ep_id}/{item}/read<br>`{uuid: '', encode: 'influxline', object_id: '*'}` |
| SET PROPERTY | /edge/equipment/{encode}/{ep_id}/{item}/writepropertyback<br>`{ uuid: 'asdfa', result: 200, object_id: /regex/, errormsg: 'asdfasd' }` | /cloud/equipment/{encode}/{ep_id}/{item}/writeproperty<br>`{ uuit: 'asdfa', object_id: /regex/, enable: true or false }` |
| QUERY PROPERTY | /edge/equipment/{encode}/{ep_id}/{item}/readpropertyback<br>`{ uuid: 'asdfsad', key: true }` | /cloud/equipment/{encode}/{ep_id}/{item}/property/readproperty<br>`{ uuid: 'asdfasd', object_id: /regex/, }` |
| BOX DATA READ | /edge/box/{encode}/{box_id}/realdb/readback<br>`{ uuid: 'asdfa', device: 'plc1', data: { tag1: { value:20688 , timestamp:1553487445553487444 , quality:0 , type:10}, tag2: { value:20688 , timestamp:1553487445553487444 , quality:0 , type:10} } }` | /cloud/box/{encode}/{box_id}/realdb/read<br>`{ uuid: 'asdfa', device: 'plc1', tag: /*/ }`<br>只读一次 |
| BOX DATA WRITE | /edge/box/{encode}/{box_id}/realdb/writeback<br> | /cloud/box/{encode}/{box_id}/realdb/write<br> |
| EQUIPMENT DATA READ | /edge/equipment/{encode}/{ep_id}/realdb/data | /cloud/equipment/{encode}/{ep_id}/realdb/read<br>`{ uuid: 'sadf', interval: 10000, etag: /*/}` |
| DATA WRITE | /edge/equipment/{encode}/{ep_id}/realdb/writeback<br>`{ uuid: 'asdfas', result: 200 errormsg: '' }`<br>result: 参考HTTP STATUS | /cloud/equipment/{encode}/{ep_id}/realdb/write<br>`{ uuid: 'asdfasdf', etagName: 'etag1', value: 2000 }` |
| OFFLINE | /edge/box/json/{box_id}/box/offline<br>`{ equpments: ['ep1', 'ep2'] }` | |

## TOPIC
`/{direction}/{object}/{encode}/{objId}/{item}/{itemcode}`

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
  - state
  - archive
  - realdb
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