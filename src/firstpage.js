const React = require('react');
require('./content');
const firstpageCSS = require('./static/firstpage.less')

class Firstpage extends React.Component{
     render() {
         return (<div><h1 className={'fpage'}>受邀人和邀请人都可享有对应奖品</h1></div>);
     }
}
module.exports = Firstpage;