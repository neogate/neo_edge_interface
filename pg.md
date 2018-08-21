### model_devices
```sql
CREATE TABLE model_devices (
  id SERIAL PRIMARY KEY,
  name VARCHAR NOT NULL,
  protocal VARCHAR NOT NULL,
  slot INTEGER,
  rack INTEGER,
  endianness VARCHAR,
  disable BOOLEAN,
  dev_if_type VARCHAR NOT NULL,
  dev_if_serial_port VARCHAR,
  dev_if_serial_baudRate INTEGER,
  dev_if_serial_parity VARCHAR,
  dev_if_serial_dataBits INTEGER,
  dev_if_serial_stopBits REAL,
  dev_if_serial_rs VARCHAR,
  dev_if_serial_stationNumber INTEGER,
  dev_if_nw_port INTEGER,
  dev_if_nw_address VARCHAR,
  cycle INTEGER NOT NULL,
  timeout INTEGER NOT NULL,
  description TEXT
)
```

### model_tags
```sql
CREATE TABLE model_tags (
  id SERIAL PRIMARY KEY,
  name VARCHAR NOT NULL,
  deviceid INTEGER NOT NULL,
  address VARCHAR NOT NULL,
  datatype VARCHAR NOT NULL,
  description TEXT,
  unit VARCHAR
)
```

### model_alarms
```sql
CREATE TABLE model_alarms (
  id SERIAL PRIMARY KEY,
  name VARCHAR NOT NULL,
  text TEXT,
  source VARCHAR NOT NULL,
  threshold VARCHAR NOT NULL,
  deadband INTEGER,
  deadbandMode INTEGER,
  delay INTEGER
)
```

### model_archives
```sql
CREATE TABLE model_archives (
  id SERIAL PRIMARY KEY,
  name VARCHAR NOT NULL,
  source VARCHAR NOT NULL,
  trigger VARCHAR,
  deadband INTEGER,
  deadbandMode INTEGER,
  cycle INTEGER NOT NULL,
  sample INTEGER,
  mode VARCHAR,
  description TEXT
)
```

### model_db_set
```sql
CREATE TABLE model_db_set (
  id SERIAL PRIMARY KEY,
  length INTEGER NOT NULL,
  lengthSection INTEGER NOT NULL,
  capacity INTEGER NOT NULL,
  capacitySection INTEGER NOT NULL
)
```