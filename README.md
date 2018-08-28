### mock-script

mock-script 使用JSON语法模板，为你快速生成mock数据

#### 基础使用方法

```javascript
var json = `[
  "{{repeat(1, 4)}}",{
    province: "{{province()}}",
    city: "{{city()}}",
    country: "{{country()}}",
    name: "{{lastName()}}{{firstName()}}"
  }
]`
var mock = new MockScript(json);
var result = mock.get();
console.log(JSON.stringify(result))
```

#### json模板语法

```json
[
  "{{repeat(1, 10)}}",{
    province: "{{province()}}",
    city: "{{city()}}",
    country: "{{country()}}",
    name: "{{lastName()}}{{firstName()}}"
  }
]
```

生成后的数据

```json
[
  {"province":"北京市","city":"石家庄市","country":"东城区","name":"赵安超"},
  {"province":"天津市","city":"唐山市","country":"西城区","name":"钱远岑"}
]
```
