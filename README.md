<!-- Name -->
<a href="https://github.com/nevendyulgerov/shape-collection">
    <h1>
        Shape Collection
    </h1>
</a>

<p>Utility for manipulating data in arrays of objects.</p>


## Installation

Run `npm install shape-collection --save`

## Usage

```javascript
import { shape } from 'shape-collection';

const arr = [{
  users: ['aa', 'bb']
}, {
  users: ['kk', 'zz', 'xyz']
}];

const users = shape(arr).reduceTo('users').fetch();

// users contains:
// ["aa", "bb", "kk", "zz", "xyz"]
```

## Syntax

```javascript
const arr = [{ id: 'abc' }, { id: 'xyz' }]
shape(arr).filterByProp('id', 'abc').fetchIndex(0);
```

### Parameters

- **items** - array (of objects), **REQUIRED**

## API

### fetch

`Function`. Returns the shaped collection.

### fetchIndex(index)

`Function`. Returns item at a specific index from the shaped collection.

### filterByUnique(key, value)

`Function`. Filters the collection by unique value:

```javascript
import { shape } from 'shape-collection';

const arr = [{
  id: 1,
  users: ['aa', 'bb']
}, {
  id: 2,
  users: ['kk', 'zz', 'xyz']
}];

const user = shape(arr).filterByUnique('id', 1).fetchIndex(0);

// user contains:
// {id: 1, users: ['aa', 'bb']}
```

### filterByDuplicate(key, length = 2)

`Function`. Filter and extract duplicate items from collection:

```javascript
const arr = [{
  id: 1,
  type: 'b',
  users: ['aa', 'bb']
}, {
  id: 1,
  type: 'a',
  users: ['kk', 'zz', 'xyz']
}, , {
  id: 3,
  type: 'a',
  users: ['kk', 'zz', 'xyz']
}];

const duplicates = shape(arr).filterByDuplicate('id').fetch();

// duplicates contains:
// [{ id: 1, type: 'b' ... }, { id: 1, type: 'a' ... }]
```

### filterByProp(key, value)

`Function`. Filter collection by property value:

```javascript
const arr = [{
  id: 1,
  type: 'b',
  users: ['aa', 'bb']
}, {
  id: 1,
  type: 'a',
  users: ['kk', 'zz', 'xyz']
}, , {
  id: 3,
  type: 'a',
  users: ['kk', 'zz', 'xyz']
}];

const item = shape(arr).filterByProp('id', 3).fetch();

// item contains:
// [{ id: 3, type: 'a' ... }]
```

### sortBy(key, type, direction)

`Function`. Sort collection by key, type and direction:

```javascript
const arr = [{
  id: 1,
  type: 'b',
  users: ['aa', 'bb']
}, {
  id: 1,
  type: 'a',
  users: ['kk', 'zz', 'xyz']
}, , {
  id: 3,
  type: 'a',
  users: ['kk', 'zz', 'xyz']
}];

const sortedById = shape(arr).sortBy({
  key: 'id', // string, **REQUIRED**
  type: 'number', // string, default = 'string'
  direction = 'desc' // string, defaul = 'asc'
}).fetch();

// sortedById contains:
// [{ id: 3 ... }, { id: 1 ... }, { id: 1 ... }]
```

Available options for `sortBy` are:

- type
    - `number`
    - `string`
    - `date` - new Date() fields
    - `combo` - combination of two string fields

- direction
    - `asc`
    - `desc`

### reduceTo(key)

`Function`. Reduce collection to another collection:

```javascript
const arr = [{
  id: 1,
  type: 'b',
  users: ['aa', 'bb']
}, {
  id: 2,
  type: 'a',
  users: ['kk', 'zz', 'xyz']
}, {
  id: 3,
  type: 'a',
  users: ['ff', 'hhh', 'eeee', 'kk']
}];

const users = shape(arr).reduceTo('users').fetch();

// users contains:
// ["aa", "bb", "kk", "zz", "xyz", "ff", "hhh", "eeee", "kk"]
```

## Examples

```javascript
const groups = [{
   id: 1,
   type: 'day_group',
   events: {
       summerBreak: {
           startDate: '22/06/2018',
           endDate: '22/09/2018'
       },
       winterBreak: {
           startDate: '22/12/2018',
           endDate: '02/01/2019'
       }
   },
   users: [{
       id: 'abc',
       name: 'John Doe',
       age: 33,
       exams: [{
           name: 'English B1',
           score: 5
       }, {
           name: 'Exam B',
           score: 10
       }]
   }, {
       id: 'xyz',
       name: 'Teddy Williams',
       age: 42,
       exams: [{
           name: 'English B1',
           score: 6
       }, {
           name: 'Exam B',
           score: 3
       }]
   }, {
       id: 'zzz',
       name: 'Jake McCoy',
       age: 14,
       exams: []
   }]
}, {
   id: 2,
   type: 'evening_group',
   events: {
       summerBreak: {
           startDate: '12/06/2018',
           endDate: '12/09/2018'
       },
       winterBreak: {
           startDate: '01/12/2018',
           endDate: '01/02/2019'
       }
   },
   users: [{
       id: 'yyy',
       name: 'Teddy Smith',
       age: 23,
       exams: [{
           name: 'English B1',
           score: 3
       }, {
           name: 'Exam B',
           score: 7
       }]
   }, {
       id: 'jjj',
       name: 'Jane Doe',
       age: 42,
       exams: [{
           name: 'English B1',
           score: 4
       }, {
           name: 'Exam B',
           score: 1
       }]
   }]
}, {
   id: 3,
   type: 'weekend_group',
   users: []
}];

const examsSortedByName = shape(groups)
    .reduceTo('users')
    .reduceTo('exams')
    .sortBy('name')
    .fetch();

// examsSortedByName contains
/*
[
    {name: "English B1", score: 5},
    {name: "English B1", score: 6},
    {name: "English B1", score: 3},
    {name: "English B1", score: 4},
    {name: "Exam B", score: 10},
    {name: "Exam B", score: 3},
    {name: "Exam B", score: 7},
    {name: "Exam B", score: 1}
]
*/

const examsSortedByScore = shape(groups)
    .reduceTo('users')
    .reduceTo('exams')
    .sortBy('score', 'number', 'desc')
    .fetch();

// examsSortedByScore contains
/*
[
    {name: "Exam B", score: 10},
    {name: "Exam B", score: 7},
    {name: "English B1", score: 6},
    {name: "English B1", score: 5},
    {name: "English B1", score: 4},
    {name: "Exam B", score: 3},
    {name: "English B1", score: 3},
    {name: "Exam B", score: 1}
]
*/

// getting nested props from object fields
const summerBreaks = shape(groups).reduceTo('events.summerBreak').fetch();

// summerBreaks contains
/*
[
    {startDate: "22/06/2018", endDate: "22/09/2018"},
    {startDate: "12/06/2018", endDate: "12/09/2018"}
]
*/
```
