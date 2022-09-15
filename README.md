# tao-vue
## taovue-router
* 插件化：实现 VueRouter 类和 install 方法
* 实现全局组件 router-link router-view
* 监听 url 变化：监听 hashchange or popstate 事件
* 响应最新 url
* 嵌套路由解决: 标记 view 深度
* 路由匹配时获取深度层级的 matched 数组
## taovuex
* 整个应用的状态集中至一个 store 保存
* 必须通过规定的方式修改 store 数据, store 则可预测到这些变更
* ssr 把 store 的当前的状态做一个快照渲染成 html
* 创建响应式 state, 保持 mutations actions getters
* 实现 commit 根据用户传入btype 执行对应 mutation
* 实现 dispatch 根据用户传入btype 执行对应 mutation, 同时传递上下文
* 实现 getters 对 state 作派生
