# @yantra-core/binary-bitstream-buffer

## or the `bbb` for short

## ALPHA STATUS

`bbb` is the theoretically most data efficient way to encode and compress typed data in JavaScript over the wire.


## Data Types

| Data Type        | Description                                   | Range or Notes                                 |
|------------------|-----------------------------------------------|-----------------------------------------------|
| Null             | Represents a null value                       | -                                             |
| Boolean          | Represents a boolean value (true/false)       | -                                             |
| UInt2            | Unsigned integer                              | 0 to 3                                        |
| UInt3            | Unsigned integer                              | 0 to 7                                        |
| UInt4            | Unsigned integer                              | 0 to 15                                       |
| UInt5            | Unsigned integer                              | 0 to 31                                       |
| UInt6            | Unsigned integer                              | 0 to 63                                       |
| UInt7            | Unsigned integer                              | 0 to 127                                      |
| UInt8            | Unsigned integer                              | 0 to 255                                      |
| UInt9            | Unsigned integer                              | 0 to 511                                      |
| UInt10           | Unsigned integer                              | 0 to 1023                                     |
| UInt11           | Unsigned integer                              | 0 to 2047                                     |
| UInt12           | Unsigned integer                              | 0 to 4095                                     |
| UInt16           | Unsigned integer                              | 0 to 65,535                                   |
| UInt32           | Unsigned integer (32-bit)                     | 0 to 4,294,967,295                            |
| Int4             | Signed integer                                | -8 to 7                                       |
| Int6             | Signed integer                                | -32 to 31                                     |
| Int8             | Signed integer                                | -128 to 127                                   |
| Int10            | Signed integer                                | -512 to 511                                   |
| Int16            | Signed integer                                | -32,768 to 32,767                             |
| Int32            | Signed integer (32-bit)                       | -2,147,483,648 to 2,147,483,647               |
| Float32          | 32-bit floating-point number                  | Approximately ±1.5 × 10^-45 to ±3.4 × 10^38   |
| Float64          | 64-bit floating-point number                  | Approximately ±5.0 × 10^-324 to ±1.8 × 10^308 |
| EntityId         | Represents an entity identifier               | -                                             |
| Rotation8        | Represents a rotation value with 8-bit precision | -                                          |
| ASCIIString      | Represents an ASCII string                    | -                                             |
| UTF8String       | Represents a UTF-8 encoded string             | -                                             |
| RGB888           | Represents an RGB color with 24-bit color depth | -                                           |
| RotationFloat32  | Represents a rotation value with 32-bit floating-point precision | -                          |



## Tests

see: `./test` folder


Most of this code was originally from: 

 - https://github.com/timetocode/nengi/tree/master/core/binary
 - https://github.com/inolen/bit-buffer

The previous core binary bitstream buffer implementations remain the same, we have extended the code to support typed objected arrays and schema definitions.