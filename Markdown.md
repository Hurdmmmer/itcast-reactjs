ReactJS 入门
-
`umi` 前端开发使用的模型为 `page` `model` `service` <Br>
`page`  为前端页面, 在根目录的 `/src/pages` 下都是页面 <br>
`model` 为数据层, 处理数据的 js 文件, 目录: `/src/models` 中 <br>
`service` 请求后端数据操作. 使用异步请求<br>
`src/layouts` 目录下是整个项目的基础布局文件
### 异步请求数据
在 src 目录下创建 utils 目录, 创建 request.js 文件
```js
function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    }
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
}
/**
 * Requests a URL, returning a promise.
 *
 * @param {string} url The URL we want to request
 * @param {object} [options] The options we want to pass to "fetch"
 * @return {object} An object containing either "data" or "err"
 */
export default async function request(url, options) {
    const response = await fetch(url, options);
    checkStatus(response);
    return await response.json();
}

```
model 层中引入该 js 文件用于异步请求
```js
import request from '../utils/request'
export default {
    namespace: 'xxx',
    state: {
        // 该模型中的一些属性
    },
    reducers: {
        // 一些正常的同步方法
    },
    effects: {
        // 这里定义异步方法
        *initData(params, sagaEffects) { //定义异步方法
                    const {call, put} = sagaEffects; //获取到call、put方法
                    const url = "/ds/list"; // 定义请求的url
                    let data = yield call(request, url); //执行请求
                    yield put({ // 调用reducers中的方法
                        type : "addNewData", //指定方法名
                        data : data  // 传递ajax回来的数据, 注意 put 会指定调用的同步方法[reducers 中定义的方法], 
                                     // 该调用的方法会在 定义的方法的入参添加一个参数, 使用该参数才能获取到 put 方法,去到的值
                                     // 参见 ListData.js 中的 addNewData 方法
                    });
                }
    }
    
}
```
### nmi 开启组件
1. 在`umi`配置文件`config.js`配置 <br>
```js
export  default {
    plugins: [
            ['umi-plugin-react', {
                dva: true,    // 开启数据管理, 使用 @connect 管理model层
                antd: true    // 开启 reactjs 组件
            }]
        ]
}
```
2. 在 `src/layouts` 创建 `index.js` 将配置该文件是 `umi` 主路由页面, 存放整个页面的公共 `layout` 布局<Br>
3. 在布局文件中引入 `src/pages` 中所有的页面, 参见 `index.js` 中的 `{this.props.children}` 代码<Br>
4. 配置页面路由, `config/config.js`  