import {getRoleList} from '../../util/index'

const state={
    roleList:[]
}

const getters={
    getRoleList(){
        return state.roleList
    }
}

const mutations={
    REQ_roleList(state,payload){
        state.roleList=payload
    }
}

const actions={
    getRoleAction({commit}){
        getRoleList()
        .then(res=>{
            if(res.data.code=200){
                commit('REQ_roleList',res.data.list)
            }
        })
    }
}

export default{
    state,
    getters,
    mutations,
    actions,
    //命名空间
    namespaced:true
}