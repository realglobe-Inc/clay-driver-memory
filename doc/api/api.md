# clay-driver-memory@1.2.0

Clay driver to store data on memory.

+ Functions
  + [create(args)](#clay-driver-memory-function-create)
+ [MemoryDriver](clay-driver-memory-classes) Class
  + [new MemoryDriver()](#clay-driver-memory-classes-memory-driver-constructor)
  + [driver.connect(config)](#clay-driver-memory-classes-memory-driver-connect)
  + [driver.disconnect(config)](#clay-driver-memory-classes-memory-driver-disconnect)
  + [driver.create(namepath, data)](#clay-driver-memory-classes-memory-driver-create)
  + [driver.read(namepath)](#clay-driver-memory-classes-memory-driver-read)
  + [driver.update(namepath, data)](#clay-driver-memory-classes-memory-driver-update)
  + [driver.delete(namepath)](#clay-driver-memory-classes-memory-driver-delete)
  + [driver.cursor(namepath, options)](#clay-driver-memory-classes-memory-driver-cursor)
  + [driver.assertConnected()](#clay-driver-memory-classes-memory-driver-assertConnected)

## Functions

<a class='md-heading-link' name="clay-driver-memory-function-create" ></a>

### create(args) -> `MemoryDriver`

Create driver instance

| Param | Type | Description |
| ----- | --- | -------- |
| args | * |  |



<a class='md-heading-link' name="clay-driver-memory-classes"></a>

## MemoryDriver Class

Abstract driver


<a class='md-heading-link' name="clay-driver-memory-classes-memory-driver-constructor" ></a>

### new MemoryDriver()

Constructor of MemoryDriver class



<a class='md-heading-link' name="clay-driver-memory-classes-memory-driver-connect" ></a>

### driver.connect(config) -> `Promise`

Connect driver

| Param | Type | Description |
| ----- | --- | -------- |
| config | Object |  |


<a class='md-heading-link' name="clay-driver-memory-classes-memory-driver-disconnect" ></a>

### driver.disconnect(config) -> `Promise`

Disconnect driver

| Param | Type | Description |
| ----- | --- | -------- |
| config | Object |  |


<a class='md-heading-link' name="clay-driver-memory-classes-memory-driver-create" ></a>

### driver.create(namepath, data) -> `Promise`

Create data with namepath

| Param | Type | Description |
| ----- | --- | -------- |
| namepath | string | Namepath string |
| data | Object | Resource data to create |


<a class='md-heading-link' name="clay-driver-memory-classes-memory-driver-read" ></a>

### driver.read(namepath) -> `Promise`

Read data with namepath

| Param | Type | Description |
| ----- | --- | -------- |
| namepath | string | Namepath string |


<a class='md-heading-link' name="clay-driver-memory-classes-memory-driver-update" ></a>

### driver.update(namepath, data) -> `Promise`

Update data with namepath

| Param | Type | Description |
| ----- | --- | -------- |
| namepath | string | Namepath string |
| data | Object | Resource data to create |


<a class='md-heading-link' name="clay-driver-memory-classes-memory-driver-delete" ></a>

### driver.delete(namepath) -> `Promise`

Delete data with namepath

| Param | Type | Description |
| ----- | --- | -------- |
| namepath | string | Namepath string |


<a class='md-heading-link' name="clay-driver-memory-classes-memory-driver-cursor" ></a>

### driver.cursor(namepath, options) -> `Promise.<Driver.Cursor>`

Get cursor to iterate

| Param | Type | Description |
| ----- | --- | -------- |
| namepath | string | Namepath string |
| options | Object | Optional settings |


<a class='md-heading-link' name="clay-driver-memory-classes-memory-driver-assertConnected" ></a>

### driver.assertConnected()

Assert that driver connected



