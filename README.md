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

## Shape API
All methods available under the `shape` API, morph data into arrays. To retrieve the morphed array, call `fetch()` at the end of your sequence. Then, you can take full advantage of `array-extras` methods like `map`, `sort` and `filter`. All methods, which accept `key` as property, support nested key look-ups like `user.details.createdAt`. This works for nested object properties only.

### fetch

`Function`. Returns the morphed collection.

### fetchIndex(index)

`Function`. Returns item at a specific index from the morphed collection.

### filterByUnique(key)

`Function`. Filters the collection by unique values for given key:

```javascript
import { shape } from 'shape-collection';

const arr = [{
  id: 1,
  users: ['aa', 'bb']
}, {
  id: 2,
  users: ['kk', 'zz', 'xyz']
}, {
  id: 1,
  users: ['aa', 'bb']
}, {
  id: 2,
  users: ['kk', 'zz', 'xyz']
}];

const uniqueItems = shape(arr).filterByUnique('id').fetch();

// uniqueItems contains:
// [{ id: 1, users: ['aa', 'bb'] }, { id: 2, users: ['kk', 'zz', 'xyz'] }]
```

This function filters by first found unique value. All subsequent identical values are ignored.

### filterByDuplicate(key)

`Function`. Filter the collection by duplicate values for given key:

```javascript
const arr = [{
  id: 1,
  type: 'b',
  users: ['aa', 'bb']
}, {
  id: 1,
  type: 'a',
  users: ['kk', 'zz', 'xyz']
}, {
  id: 3,
  type: 'a',
  users: ['kk', 'zz', 'xyz']
}];

const duplicates = shape(arr).filterByDuplicate('id').fetch();

// duplicates contains:
// [{ id: 1, type: 'b' ... }, { id: 1, type: 'a' ... }]
```

### filterByProp(key, value)

`Function`. Filter collection by key-value pair comparison:

```javascript
const arr = [{
  id: 1,
  type: 'b',
  users: ['aa', 'bb']
}, {
  id: 1,
  type: 'a',
  users: ['kk', 'zz', 'xyz']
}, {
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
}, {
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

### reduceTo(key, augmenter = (item, prop, key) => {})

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

You can also pass an optional `augmenter` function to `reduceTo` as a second argument. An augmenter is a special function, invoked only when you are reducing arrays of objects to another array of objects. It can be useful, when you want to extract a nested array of objects but also want to keep track of their parent objects after they have been reduced. Here's an example:

```javascript
const users = [{
    id: 1,
    type: 'day_group',
    grades: {
        english: 4,
        driving: 7
    }
}, {
    id: 2,
    type: 'evening_group',
    grades: {
        english: 6,
        driving: 10
    }
}, {
    id: 3,
    type: 'weekend_group',
    grades: []
}];

const gradesWithUserId = shape(users)
    .reduceTo('grades', ({ id }) => ({ id }))
    .fetch();

// gradesWithUserId contains
/*
[
    { english: 4, driving: 7, id: 1 },
    { english: 6, driving: 10, id: 2 }
]
```

The `augmenter` method returns an object, which is then merged into the respective reduced item. With an augmenter you can add identifiers to your morphed collections.

The following params are passed to `augmenter`:
- item - the parent item
- prop - the currently reduced-to item
- key - key passed to the `reduceTo` function

## extractNestedProp
A helper utility method for retrieval of object properties at any level.

```javascript
import { extractNestedProp } from 'shape-collection';

const users = [{
    id: 1,
    type: 'day_group',
    grades: {
        english: 4,
        driving: 7
    }
}, {
    id: 2,
    type: 'evening_group',
    grades: {
        english: 6,
        driving: 10
    }
}, {
    id: 3,
    type: 'weekend_group',
    grades: []
}];

const [ firstUser ] = users;
const englishGrade = extractNestedProp(firstUser, 'grades.english');

// englishGrade contains
// 4
```

`extractNestedProp` works on any level as long as the prop at the requested key is an object. For multiple keys like `grades.english` this means that grades must be an object. This methods returns `undefined` if no such key exists in the target object.

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

// getting nested props from object fields, using comma-separated keys
const summerBreaks = shape(groups).reduceTo('events.summerBreak').fetch();

// summerBreaks contains
/*
[
    {startDate: "22/06/2018", endDate: "22/09/2018"},
    {startDate: "12/06/2018", endDate: "12/09/2018"}
]
*/

const nestedItems = [{
    id: 1,
    type: 'a',
    items: [{
        id: 11,
        type: 'aa',
        items: [{
            id: 111,
            type: 'aaa',
            items: [{
                id: 1111,
                type: 'aaaa'
            }]
        }]
    }]
}, {
    id: 2,
    type: 'b',
    items: [{
        id: 22,
        type: 'bb',
        items: [{
            id: 222,
            type: 'bbb',
            items: [{
                id: 2222,
                type: 'bbbb'
            }]
        }]
    }]
}, {
    id: 3,
    type: 'c',
    items: [{
        id: 33,
        type: 'cc',
        items: [{
            id: 333,
            type: 'ccc'
        }]
    }]
}];

const nestedItems = shape(nestedItems)
    .reduceTo('items')
    .reduceTo('items')
    .reduceTo('items')
    .fetch();

// nestedItems contains:
/*
[
    {id: 1111, type: "aaaa"},
    {id: 2222, type: "bbbb"}
]
*/
```
