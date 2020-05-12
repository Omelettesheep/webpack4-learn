// function getComponent() {
//     return import(/* webpackChunkName: "lodash" */ 'lodash').then(({default: _}) => {
//         const element = document.createElement('div');
//         element.innerHTML = _.join(['Hello', 'webpack'], ' ');
//         return element;

//    }).catch(err => 'An error occurred while loading the component');
// }

// 使用async和await
async function getComponent() {
    var element = document.createElement('div');
    const { default: _ } = await import(/* webpackChunkName: "lodash" */ 'lodash');
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');
    return element;
}

getComponent().then(component => {
    document.body.appendChild(component)
})