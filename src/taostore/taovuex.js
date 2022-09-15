// 实现一个插件
// 实现Store
let Vue;

class Store {
  constructor(options) {
    this._mutations = options.mutations
    this._actions = options.actions
    this._wrappedGetters = options.getters
    
    const computed = {}
    this.getters = {}
    const store = this
    Object.keys(this._wrappedGetters).forEach(key => {
      // 用户自定义的 getter
      const fn = store._wrappedGetters[key]
      // 转化为 computed 使用的无参形式
      computed[key] = function() {
        return fn(store.state)
      }
      Object.defineProperty(store.getters, key, {
        get: () => store._vm[key]
      })
    })
    // 响应式处理的数据
    // this.state = new Vue({
    //   data: options.state
    // })
    this._vm = new Vue({
      data: {
        // 添加$$, Vue就不会代理
        // 向外隐藏
        $$state: options.state
      },
      computed
    })
    this.commit = this.commit.bind(this)
    this.dispatch = this.dispatch.bind(this)
  }
  // 
  // get state() {
  //   return this._vm._data.$$state
  // }
  get state() {
    return this._vm._data.$$state
  }
  set state(v) {
    console.error('请使用replaceState重置状态');
  }
  // 修改状态，commit('add', payload)
  commit(type, payload) {
    // 1.根据type获取mutation
    const mutation = this._mutations[type]
    if(!mutation) {
      console.error('mutation不存在');
      return 
    }
    mutation(this.state, payload)
  }
  // dispatch('add', payload)
  dispatch(type, payload) {
    const action = this._actions[type]
    if(!action) {
      console.error('action不存在');
      return 
    }
    action(this, payload)
  }

}
function install(_Vue) {
  Vue = _Vue;
  // 注册$store
  Vue.mixin({
    beforeCreate() {
      if (this.$options.store) {
        Vue.prototype.$store = this.$options.store
      }
    }
  })
}
// 现在导出的就是Vuex
export default { Store, install };
