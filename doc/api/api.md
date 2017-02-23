# clay-driver-memory@2.1.1

Clay driver to store data on memory.

+ Functions
  + [create(args)](#clay-driver-memory-function-create)
+ [`MemoryDriver`](clay-driver-memory-classes) Class
  + [new MemoryDriver()](#clay-driver-memory-classes-memory-driver-constructor)
  + [driver.one()](#clay-driver-memory-classes-memory-driver-one)
  + [driver.list()](#clay-driver-memory-classes-memory-driver-list)
  + [driver.create()](#clay-driver-memory-classes-memory-driver-create)
  + [driver.update()](#clay-driver-memory-classes-memory-driver-update)
  + [driver.destroy()](#clay-driver-memory-classes-memory-driver-destroy)
  + [driver.drop()](#clay-driver-memory-classes-memory-driver-drop)
  + [driver.one(namespace, id)](#clay-driver-memory-classes-memory-driver-one)
  + [driver.list(namespace, condition)](#clay-driver-memory-classes-memory-driver-list)
  + [driver.create(namespace, attributes)](#clay-driver-memory-classes-memory-driver-create)
  + [driver.update(namespace, id, attributes)](#clay-driver-memory-classes-memory-driver-update)
  + [driver.destroy(namespace, id)](#clay-driver-memory-classes-memory-driver-destroy)

## Functions

<a class='md-heading-link' name="clay-driver-memory-function-create" ></a>

### create(args) -> `MemoryDriver`

Create driver instance

| Param | Type | Description |
| ----- | --- | -------- |
| args | * |  |



<a class='md-heading-link' name="clay-driver-memory-classes"></a>

## `MemoryDriver` Class

Driver to store data on memory

**Extends**: 

+ `Driver`



<a class='md-heading-link' name="clay-driver-memory-classes-memory-driver-constructor" ></a>

### new MemoryDriver()

Constructor of MemoryDriver class



<a class='md-heading-link' name="clay-driver-memory-classes-memory-driver-one" ></a>

### driver.one()



<a class='md-heading-link' name="clay-driver-memory-classes-memory-driver-list" ></a>

### driver.list()



<a class='md-heading-link' name="clay-driver-memory-classes-memory-driver-create" ></a>

### driver.create()



<a class='md-heading-link' name="clay-driver-memory-classes-memory-driver-update" ></a>

### driver.update()



<a class='md-heading-link' name="clay-driver-memory-classes-memory-driver-destroy" ></a>

### driver.destroy()



<a class='md-heading-link' name="clay-driver-memory-classes-memory-driver-drop" ></a>

### driver.drop()



<a class='md-heading-link' name="clay-driver-memory-classes-memory-driver-one" ></a>

### driver.one(namespace, id) -> `Promise.<ClayEntity>`

Get single resource from namespace

| Param | Type | Description |
| ----- | --- | -------- |
| namespace | string | Namespace to work with |
| id | ClayId | Resource id |


<a class='md-heading-link' name="clay-driver-memory-classes-memory-driver-list" ></a>

### driver.list(namespace, condition) -> `Promise.<ClayCollection>`

List resource in namespace

| Param | Type | Description |
| ----- | --- | -------- |
| namespace | string | Namespace to work with |
| condition | ListCondition | List condition query |


<a class='md-heading-link' name="clay-driver-memory-classes-memory-driver-create" ></a>

### driver.create(namespace, attributes) -> `Promise.<ClayEntity>`

Create data with namespace

| Param | Type | Description |
| ----- | --- | -------- |
| namespace | string | Namepath string |
| attributes | Object | Resource attributes to create |


<a class='md-heading-link' name="clay-driver-memory-classes-memory-driver-update" ></a>

### driver.update(namespace, id, attributes) -> `Promise.<ClayEntity>`

Update data with namespace

| Param | Type | Description |
| ----- | --- | -------- |
| namespace | string | Namepath string |
| id | ClayId | Resource id |
| attributes | Object | Resource attributes to update |


<a class='md-heading-link' name="clay-driver-memory-classes-memory-driver-destroy" ></a>

### driver.destroy(namespace, id) -> `Promise.<number>`

Delete data with namespace

| Param | Type | Description |
| ----- | --- | -------- |
| namespace | string | Namepath string |
| id | ClayId | Resource id |




