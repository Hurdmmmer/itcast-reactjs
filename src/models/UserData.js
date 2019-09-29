import request from '../utils/request'

export default {
    namespace:'users',
    state: {
        data: [

        ]
    },
    reducers: {
        setData(format, data) {
            return data;
        }
    },
    effects: {
        * initData(params, sugEffects) {
            const {call, put} = sugEffects;
            const url = 'userList';
            let data = yield call(request, url);
            yield put({
                type: 'setData',
                data: data
            })
        }
    }
}