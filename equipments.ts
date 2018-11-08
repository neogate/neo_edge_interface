export enum PlcProtocal {
  S7 = 's7',
  ModbusTCP = 'modbusTCP',
  ModbusUDP = 'modbusUDP',
  ModbusRTU = 'modbusRTU',
  ModbusASSIC = 'modbusASSIC',
  CIP = 'cip',
  HITACHI = 'hitachi',
  IDEC = 'idec',
  MC = 'mc',
}
export enum Scale {
  Linear = 'linear'
}
export enum Endianness {
  BigEndian = 'big-endian',
  LittleEndian = 'little-endian',
}
export enum Datatype {
  BOOL = 'BOOL',
  INT16 = 'INT16',
  INT32 = 'INT32',
  INT63 = 'INT64',
  REAL32 = 'REAL32',
  REAL64 = 'REAL64',
  WORD = 'WORD',
  DWORD = 'DWORD',
  BYTE = 'BYTE',
}
export enum PlcOperator {
  GT = '>',
  GE = '>=',
  EQ = '==',
  NE = '!=',
  LE = '<=',
  LT = '<',
}
export enum RSParisty {
  NONE = 'none',
  EVEN = 'even',
  ODD = 'odd',
  MARK = 'mark',
  SPACE = 'space',
}
export enum RSInterface {
  RS232 = 'rs232',
  RS422 = 'rs422',
  RS485 = 'rs485',
}
export enum DevType {
  UDP = 'UDP',
  TCP = 'TCP',
  Serial = 'serial',
}
export enum DeadbandMode {
  ABS = 'abs',
  PERCENTAGE = 'percentage',
}
export enum LogMode {
  CURRENT = 'current',
  MAXIMUM = 'maximum',
  MINIMUM = 'minimum',
  DIFFER = 'differ',
  ACCUM = 'accum',
}
export interface Device {
  name?: string;
  protocal: PlcProtocal;
  tags: {[name: string]: Tag};
  disable?: boolean;
  slot?: number;
  rack?: number;
  endianness?: Endianness;
  dev_if_type: DevType;
  dev_if_serial_port?: string;
  dev_if_serial_baudrate?: number;
  dev_if_serial_parity?: RSParisty;
  dev_if_serial_databits?: number;
  dev_if_serial_stopbits?: number;
  dev_if_serial_rs?: RSInterface;
  dev_if_serial_stationnumber?: number;
  dev_if_nw_port?: number;
  dev_if_nw_address?: string;
  cycle?: number;
  timeout?: number;
  description?: string;
}
export interface Tag {
  name?: string;
  address: string;
  datatype: Datatype;
  description?: string;
  sample?: number;
  readonly?: boolean;
  scale?: Scale;
  rawMin?: number;
  rawMax?: number;
  scaledMin?: number;
  scaledMax?: number;
}
export interface ETag {
  name?: string;
  source?: string; // "<plc2.current> + <plc2.current>"
  unit?: string; // 'A'
  description?: string;
  public?: boolean;
  sample?: number; // 's'
  writable?: boolean; // if writable, source should be just plctag, could not a expression
}
export interface Alarm {
  name?: string;
  text: string;
  class?: string;
  trigger?: string;
  off_trigger?: string;
  bit?: number;
  delay?: number;
}
export interface Archive {
  name?: string;
  source: string;
  deadband?: number;
  deadbandmode?: DeadbandMode;
  trigger?: string;
  cycle: number;
  sample: number;
  mode?: LogMode;
}

export interface Equipment {
  name: string;
  hash: string;
  alias: string;
  version: string;
  description?: string;
  instanceId?: string | number;
  etags: {[name: string]: ETag};
  alarms?: {[name: string]: Alarm};
  archives?: {[name: string]: Archive};
}

export interface Box {
  equipments: {[name: string]: Equipment};
  devices: {[name: string]: Device};
}

export interface Dbset {
  length?: number;
  lengthSection?: number;
  capacity?: number;
  capacitySection?: number;
}