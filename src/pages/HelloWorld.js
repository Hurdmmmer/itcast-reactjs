import React from 'react'

class HelloWorld extends React.Component {

    render() {
        return <div>hello world name = {this.props.name} address = {this.props.children}</div>;
    }
}

export default HelloWorld;
