# mefa (Developing)

A meta framework for micro-frontend, which is inspired by [Mooa](https://github.com/phodal/mooa) and [Single-SPA](https://github.com/CanopyTax/single-spa).

## Usage

#### Portal System

```javascript
import { mefa } from 'mefa'

// use Iframe Object to initailize 
this.mefa = new Mefa(this.$refs.subsystem)
// register you sub application 
this.mefa.registerApplication({app: '1', route: '/', link: 'http://localhost:4002/'})

```

```javascript
// trigger your sub application to change
this.mefa.navigateTo({app, route})
```

#### SubSystem

```javascript
import { appMefa } from 'subMefa' 

// listen the command for routeupdate
appMefa.onRouteUpdate((path) => {
  route( path );
});
```


## DEMO

[Here is the link](https://github.com/brandonxiang/mefa/tree/master/examples)

## ROADMAP

issue[#1](https://github.com/brandonxiang/mefa/issues/1)

## LICENSE

MIT@[BrandonX](https://github.com/brandonxiang/mefa/blob/master/LICENSE)
