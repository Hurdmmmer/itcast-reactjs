import request from '../utils/request'

export default {
    namespace: 'list',
    state: {
        data: [],
        maxNum: 1
    },
    reducers :{
        addNewData(state, result){ //state 是原先的数据， result 是 effets 中异步调用返回的数据
            if (result.data) {
                return result.data;   // 如果 state.data 中存在数据。 表示该函数是被异步调用初始化。 直接返回
            }
            let maxNum = state.maxNum + 1;
            let list = [...state.data, maxNum];
            return { // 返回更新后的state对象
                data : list,
                maxNum : maxNum
            }
        }
    },
    effects: { //新增effects配置，用于异步加载数据
        *initData(params, sagaEffects) { //定义异步方法
            const {call, put} = sagaEffects; //获取到call、put方法
            const url = "/ds/list"; // 定义请求的url
            let data = yield call(request, url); //执行请求
            yield put({ // 调用reducers中的方法
                type : "addNewData", //指定方法名
                data : data //传递ajax回来的数据
            });
        }
    }
}