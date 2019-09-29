import React from 'react';
import {connect} from 'dva';

const namespace = 'list';

const mapStateToProps = (state) => {
    const listData = state[namespace].data;
    return {
        listData
    }
};
const mapDispatchToProps = (dispatch) => { // 定义方法，dispatch是内置函数
    return { //返回的这个对象将绑定到this.props对象中
        addNewData: () => { // 定义方法
            dispatch({ // 通过调用dispatch()方法，调用model中reducers的方法
                type: namespace + "/addNewData", // 指定方法，格式 namespace/方法名
            });
        },
        initData : () => { //新增初始化方法的定义
            dispatch({
                type: namespace + "/initData"
            });
        }
    }
};
@connect(mapStateToProps, mapDispatchToProps)
class List extends React.Component{

    // react 生命周期函数，创建完调用
    componentDidMount(){
        this.props.initData(); //组件加载完后进行初始化操作
    }

    render() {
        return(
                <div>
                    <ul>
                        {
                            this.props.listData.map((value, index) => {
                                return <li key={value.toString()}>{index}</li>
                            })
                        }
                    </ul>
                    <button onClick={() => {this.props.addNewData()}}>
                        添加
                    </button>
                </div>
            )
    }


    // constructor(prop) {
    //     super(prop);
    //     this.state = {
    //         dataList:[1,2,3],
    //         maxNum:3
    //     }
    // }
    //
    // render() {
    //     return (
    //         <div>
    //             <ul>
    //                 {
    //                     this.state.dataList.map((value, index) => {
    //                         return <li key={value.toString()}>{index}</li>
    //                     })
    //                 }
    //             </ul>
    //             <button onClick={
    //                 () => {
    //                     let max = this.state.maxNum + 1;
    //                     let list = [...this.state.dataList, max];
    //                     this.setState({
    //                         dataList: list,
    //                         maxNum: max
    //                     })
    //                 }
    //             }>
    //                 添加
    //             </button>
    //         </div>
    //     );
    // }
}

export default List;