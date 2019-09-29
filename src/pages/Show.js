import React from 'react';
import HelloWorld from './HelloWorld';

class Show extends React.Component{
    render() {
        return <HelloWorld name="zhangsan"> china</HelloWorld>;
    }
}

export default Show;