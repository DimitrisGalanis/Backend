[![Express Logo](https://i.cloudup.com/zfY6lL7eFa-3000x3000.png)](http://expressjs.com/)

```js
import express from "express";
const app = express();

app.get("/", function (req, res) {
  res.send("Hello World");
});

app.listen(8800);
```

## Prerequisites

```console
node.js
```

## Installation

```console
$ npm install express
```

Follow [the official installing guide](http://expressjs.com/en/starter/installing.html)
for more information.
