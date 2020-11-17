<template>
  <div>
    <el-dialog
      :title="isInfo.isAdd ? '添加管理员' : '修改管理员'"
      :visible.sync="isInfo.isShow"
      :before-close="cancel"
      center
    >
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item
          prop="roleid"
          label="所属角色"
          :label-width="formLabelWidth"
        >
         <el-select v-model="form.roleid" placeholder="请选择">
          
            <el-option
              v-for="item in roleList"
              :key="item.id"
              :label="item.rolename"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item  prop="username" label="用户名称" :label-width="formLabelWidth">
           <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item  prop="password" label="密码" :label-width="formLabelWidth">
           <el-input v-model="form.password" autocomplete="off"></el-input>
        <el-alert
    title="若留空则不修改"
    type="info">
  </el-alert>
        </el-form-item>

        <el-form-item label="状态" :label-width="formLabelWidth">
          <!-- 可以使用active-color属性与inactive-color属性来设置开关的背景色。 -->
          <el-switch
            v-model="form.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="2"
          >
          </el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel()">取 消</el-button>
        <el-button v-if="isInfo.isAdd" @click="add()" type="primary"
          >添 加</el-button
        >
        <el-button v-else   @click="update()"  type="primary">修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { getUserAdd, getUserEdit,getUserInfo } from "../../util/index";

export default {
  data() {
    return {
     
      form: {
    
        username: "", //用户名称
        roleid:'',//所属角色
        password:'',
        status: 1, //状态1正常2禁用
      },
      pwd:'',

      //上级菜单

      rules: {
        roleid: [
          { required: true, message: "请选择", trigger: "blur" },
        
        ],
        username: [
          { required: true, message: "请输入角色名称", trigger: "blur" },
          { min: 2, max: 8, message: "长度在 2 到 8 个字符", trigger: "blur" },
        ],
      },
      formLabelWidth: "120px",
    };
  },
  props: ["isInfo"],

  computed: {
    ...mapGetters({
      roleList: "role/getRoleList",

    }),
  },

  mounted() {
    this.getRoleList();

  },
  methods: {
    ...mapActions({
      getUserList: "user/getUserAction",
      getRoleList:'role/getRoleAction',
       getUserCount:'user/getCountAction',
    }),
    reset() {
      this.form = {
        username: "", //用户名称
        roleid:'',//所属角色
        password:'',
        status: 1, //状态1正常2禁用
      };
      
      //    this.$refs.tree.setCheckedKeys();
    },
    cancel() {
      this.reset();
      this.$emit("cancel", false);
    },
    add() {
      
      getUserAdd(this.form)
      .then(res=>{
        if(res.data.code==200){
            this.$message.success(res.data.msg)
            this.getUserList()
            this.getUserCount()
            this.cancel()
        }else{
             this.$message.error(res.data.msg);
        }
      })
    },
    // 获取一条内容，并渲染
    getOne(uid){
    
      getUserInfo({uid})
      .then(res=>{
        console.log(res);
        if(res.data.code==200){
            this.form=res.data.list
          this.form.uid=uid
       this.form.password=''
        }else{
           this.$message.error(res.data.msg);
        }
      })
    },
    update(){ 
      getUserEdit(this.form)
      .then(res=>{
        if(res.data.code==200){
            this.$message.success(res.data.msg)
            this.getUserList()
            this.cancel()
        }else{
             this.$message.error(res.data.msg);
        }
      })
    }
  },
};
</script>

<style lang="stylus" scoped></style>