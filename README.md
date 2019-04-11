# dynogels-promise

This package was created for two main reasons:

1. the maintainer of [dynogels](https://github.com/clarkie/dynogels) has not fixed a vulnerability that exists in the package eventhough a PR has been submitted for fixing that close to year now. See [here](https://github.com/clarkie/dynogels/pull/155)

2. The promisified version, [dynogels-promisified](https://github.com/andrewoh531/dynogels-promisified) of that package also has outdated dependencies. The [PR](https://github.com/andrewoh531/dynogels-promisified/pull/5) submitted there is also almost a year.

The projects is great, so decided to combine the both projects and deploy it as dynogels-promise



## Installation

```sh
> npm install dynogels-promise
```


## Usage

All methods available in [dynogels](https://github.com/clarke/dynogels) have been promisified and and can be assessed by appending `Async` to the methods

```javascript
const dynogels = require('dynogels-promise')

const Todo = dynogels.define('Todo', {
  timestamps: true,
  hashKey: 'id',
  schema: {
    id: joi.string().required(),
    done: joi.boolean.default(false),
    content: joi.string().required()
  }
})

//=> Create Todo
const newTodo = await Todo.createAsync({ id: uuid(), content: 'Write this doc' })

//=> Get a Todo item
const todo = await Todo.getAsync('4549b30d-4a4a-4230-82d4-3286c9348d24')
```
