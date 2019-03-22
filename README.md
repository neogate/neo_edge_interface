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
| POWER ON | /edge/box/{box_id}/online<br>`{ modelhash: 'asdfasdf' }` | |
| EP CONNECT | /edge/equipment/{ep_id}/online | |
| DEVICE MANAGEMENT ROUTING | /edge/box/{box_id}/device/status<br>`{ uuid: 'asdfadsf' device1: 'ONLINE', device2: 'LOST', }`<br>device 状态可单个发送 | /cloud/box/{box_id}/device/diagnose<br>`{ uuid: 'sdfasdf', device: /sdfs/; }` |
| MODEL SET | /edge/box/{box_id}/model/setfeedback<br>`{ reust: 200, errormsg: '', uuid: '' }` | /cloud/box/{box_id}/model/set<br>`{ uuid: 'sdfs', hash: '', model: {} }` |
| MODEL QUERY FROM EDGE | /edge/box/{box_id}/model/query | /cloud/box/{box_id}/model/data |
| MODEL QUERY FROM CLOUD | /edge/box/{box_id}/model/data | /cloud/box/{box_id}/model/query |
| MODEL HASH QUERY | /edge/box/{box_id}/model/hash | /cloud/box/{box_id}/model/hashquery |
| ACTIVE ALARM / ARCHIVE / STATE | /edge/equipment/{ep_id}/{encode}/alarm<br>/edge/equipment/{ep_id}/{encode}/state<br>/edge/equipment/{ep_id}/{encode}/archive<br> | |
| SET PROPERTY | /edge/equipment/{ep_id}/{encode}/{item}/property/setfeedback<br>`{ uuid: 'asdfa', result: 200, errormsg: 'asdfasd' }` | /cloud/equipment/{ep_id}/{encode}/{item}/property/set<br>`{ uuit: 'asdfa', enable: true or false }` |
| QUERY PROPERTY | /edge/equipment/{ep_id}/{encode}/{item}/property/data<br>`{ uuid: 'asdfsad', enable: true }` | /cloud/equipment/{ep_id}/{encode}/{item}/property/query<br>`{ uuid: 'asdfasd' }` |
| CACHE ALARM / ARCHIVE / STATE | /edge/equipment/{ep_id}/{encode}/alarm_cache<br>/edge/equipment/{ep_id}/{encode}/state_cache<br>/edge/equipment/{ep_id}/{encode}/archive_cache | |
| BOX DATA READ | /edge/box/{box_id}/{encode}/data<br>`{ uuid: 'asdfa', device: 'plc1', value: { tag1: {}, tag2: {} } }` | /cloud/box/{box_id}/{encode}/read<br>`{ uuid: 'asdfa', device: 'plc1', tags: ['tag1', 'tag2'] }`<br>只读一次 |
| EQUIPMENT DATA READ | /edge/equipment/{ep_id}/{encode}/data | /cloud/equipment/{ep_id}/{encode}/read<br>`{ uuid: 'sadf', etag1: {mode: 'interval | onchange | onetime', interval: '10000'} }` |
| DATA WRITE | /edge/equipment/{ep_id}/{encode}/writefeedback<br>`{ uuid: 'asdfas', result: 200 errormsg: '' }`<br>result: 参考HTTP STATUS | /cloud/equipment/{ep_id}/{encode}/write<br>`{ uuid: 'asdfasdf', etagName: 'etag1', value: 2000 }` |
| OFFLINE | /edge/box/{box_id}/offline<br>`{ equpments: ['ep1', 'ep2'] }` | |

## ENCODE
- `encode: json | influxLine | binery | xml | string`
- `item: alarm | state | archive or ...`