# clay-driver-memory@4.0.1

Clay driver to store data on memory.

+ Functions
  + [create(args)](#clay-driver-memory-function-create)
+ [`MemoryDriver`](#clay-driver-memory-class) Class
  + [new MemoryDriver()](#clay-driver-memory-class-memory-driver-constructor)
  + [driver.one(resourceName, id)](#clay-driver-memory-class-memory-driver-one)
  + [driver.list(resourceName, condition)](#clay-driver-memory-class-memory-driver-list)
  + [driver.create(resourceName, attributes)](#clay-driver-memory-class-memory-driver-create)
  + [driver.update(resourceName, id, attributes)](#clay-driver-memory-class-memory-driver-update)
  + [driver.destroy(resourceName, id)](#clay-driver-memory-class-memory-driver-destroy)
  + [driver.drop(resourceName)](#clay-driver-memory-class-memory-driver-drop)
  + [driver.resources()](#clay-driver-memory-class-memory-driver-resources)

## Functions

<a class='md-heading-link' name="clay-driver-memory-function-create" ></a>

### create(args) -> `MemoryDriver`

Create driver instance

| Param | Type | Description |
| ----- | --- | -------- |
| args | * |  |



<a class='md-heading-link' name="clay-driver-memory-class"></a>

## `MemoryDriver` Class

Driver to store data on memory

**Extends**:

+ `Driver`



<a class='md-heading-link' name="clay-driver-memory-class-memory-driver-constructor" ></a>

### new MemoryDriver()

Constructor of MemoryDriver class



<a class='md-heading-link' name="clay-driver-memory-class-memory-driver-one" ></a>

### driver.one(resourceName, id) -> `Promise.<ClayEntity>`

Get single entity from resource

| Param | Type | Description |
| ----- | --- | -------- |
| resourceName | string | Name of resource |
| id | ClayId | Resource id |


<a class='md-heading-link' name="clay-driver-memory-class-memory-driver-list" ></a>

### driver.list(resourceName, condition) -> `Promise.<ClayCollection>`

List entities from resource

| Param | Type | Description |
| ----- | --- | -------- |
| resourceName | string | Name of resource |
| condition | ListCondition | List condition query |


<a class='md-heading-link' name="clay-driver-memory-class-memory-driver-create" ></a>

### driver.create(resourceName, attributes) -> `Promise.<ClayEntity>`

Create a new entity with resource

| Param | Type | Description |
| ----- | --- | -------- |
| resourceName | string | Name of resource |
| attributes | Object | Resource attributes to create |


<a class='md-heading-link' name="clay-driver-memory-class-memory-driver-update" ></a>

### driver.update(resourceName, id, attributes) -> `Promise.<ClayEntity>`

Update an existing entity in resource

| Param | Type | Description |
| ----- | --- | -------- |
| resourceName | string | Name of resource |
| id | ClayId | Resource id |
| attributes | Object | Resource attributes to update |


<a class='md-heading-link' name="clay-driver-memory-class-memory-driver-destroy" ></a>

### driver.destroy(resourceName, id) -> `Promise.<number>`

Delete a entity resource

| Param | Type | Description |
| ----- | --- | -------- |
| resourceName | string | Name of resource |
| id | ClayId | Resource id |


<a class='md-heading-link' name="clay-driver-memory-class-memory-driver-drop" ></a>

### driver.drop(resourceName) -> `Promise.<boolean>`

Drop resource

| Param | Type | Description |
| ----- | --- | -------- |
| resourceName | string | Name of resource |


<a class='md-heading-link' name="clay-driver-memory-class-memory-driver-resources" ></a>

### driver.resources() -> `Promise.<Resource>`

List resources



