<template>
  <div>
    <el-dialog
      :title="isInfo.isAdd ? '添加角色' : '修改角色'"
      :visible.sync="isInfo.isShow"
      :before-close="cancel"
      center
    >
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item
          prop="rolename"
          label="角色名称"
          :label-width="formLabelWidth"
        >
          <el-input v-model="form.rolename" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色权限" :label-width="formLabelWidth">
          <el-tree
            :data="menuList"
            default-expand-all
            node-key="id"
            ref="tree"
            :props="{
              children: 'children',
              label: 'title',
            }"
            show-checkbox
            check-strictly
          >
          </el-tree>
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
import { getRoleAdd, getRoleInfo, getRoleEdit } from "../../util/index";

export default {
  data() {
    return {
      iconList: [
        "el-icon-s-tools",
        "el-icon-setting",
        "el-icon-s-goods",
        "el-icon-goods",
        "el-icon-menu",
      ],
      form: {
        rolename: "", // 角色名称
        menus: "", //角色权限
        status: 1, //状态1正常2禁用
      },

      //上级菜单

      rules: {
        rolename: [
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
      menuList: "menu/getMenuList",
    }),
  },

  mounted() {
    this.getMenuList();
  },
  methods: {
    ...mapActions({
      getMenuList: "menu/getMenuListAction",
      getRoleList:'role/getRoleAction'
    }),
    reset() {
      this.form = {
        rolename: "", // 角色名称
        menus: "", //角色权限
        status: 1, //状态1正常2禁用
      };
      this.$refs.tree.setCheckedKeys([]);
      //    this.$refs.tree.setCheckedKeys();
    },
    cancel() {
      this.reset();
      this.$emit("cancel", false);
    },
    add() {
      
      this.form.menus = this.$refs.tree.getCheckedKeys().join(',');
      getRoleAdd(this.form)
      .then(res=>{
        if(res.data.code==200){
            this.$message.success(res.data.msg)
            this.getRoleList()
            this.cancel()
        }else{
             this.$message.error(res.data.msg);
        }
      })
    },
    // 获取一条内容，并渲染
    getOne(id){
      
        getRoleInfo({id})
      .then(res=>{
       
        if(res.data.code==200){
             this.form=res.data.list
           
            this.form.menus= this.$refs.tree.setCheckedKeys(this.form.menus.split(",")); 

          this.form.id=id
        }else{
           this.$message.error(res.data.msg);
        }
      })
    },
    update(){
           this.form.menus = this.$refs.tree.getCheckedKeys().join(',');
      getRoleEdit(this.form)
      .then(res=>{
        if(res.data.code==200){
            this.$message.success(res.data.msg)
            this.getRoleList()
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