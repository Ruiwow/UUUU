<template>
  <div>
    <el-dialog :title="isInfo.isAdd ?  '添加菜单' : '编辑菜单'" :visible="isInfo.isShow"  @close="toggleDialog('form')" center>
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item
          prop="title"
          label="菜单名称"
          :label-width="formLabelWidth"
        >
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="pid" label="上级菜单" :label-width="formLabelWidth">
          <el-select v-model="form.pid" placeholder="请选择" @change="changeMenu">
            <el-option label="顶级菜单" :value="0"></el-option>
            <el-option
              v-for="item in menuList"
              :key="item.id"
              :label="item.title"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单类型"  :label-width="formLabelWidth">
          <el-radio v-model="form.type" :label="1" disabled>目录</el-radio>
          <el-radio v-model="form.type" :label="2" disabled>菜单</el-radio>
        </el-form-item>
        <el-form-item v-if="form.type==1" label="菜单图标" :label-width="formLabelWidth">
          <!-- <el-input v-model="form.icon" autocomplete="off"></el-input> -->
           <el-select v-model="form.icon"  placeholder="请选择">
           <el-option
              v-for="item in iconList"
              :key="item"
              :label="item"
              :value="item"
            >
            </el-option>
            </el-select>
        </el-form-item>
        <el-form-item v-else label="菜单地址"  :label-width="formLabelWidth">
          <el-select v-model="form.url"  placeholder="请选择">
           <el-option
              v-for="item in indexRoutes"
              :key="item.path"
              :label="item.name"
              :value="item.path"
            >
            </el-option>
            </el-select>
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
        <el-button @click="cancel('form')">取 消</el-button>
        <el-button v-if="isInfo.isAdd" @click="add('form')" type="primary">添 加</el-button>
          <el-button v-else @click="update('form')" type="primary">修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getMenuAdd,getMenuInfo,getMenuEdit } from "../../util/index";
import { mapActions,mapGetters } from "vuex";
import {indexRoutes}  from '../../router'
export default {
  data() {
    return {
        iconList: [
        "el-icon-s-tools",
        "el-icon-setting",
        "el-icon-s-goods",
        "el-icon-goods",
        "el-icon-menu"
      ],
      form: {
        title: "", //标题
        pid: 0, //上级分类编号 默认是0 是顶级
        icon: "", //图标
        type: 1, //类型1目录2菜单
        url: "", //菜单地址
        status: 1, //状态1正常2禁用
      },
      indexRoutes:indexRoutes,
      //上级菜单
     
      rules: {
        title: [
          { required: true, message: "请输入菜单名称", trigger: "blur" },
          {
            min: 2,
            max: 20,
            message: "长度在 2 到 20 个字符",
            trigger: "blur",
          },
        ],
        pid: [{ required: true, message: "请选择上级菜单", trigger: "blur" }],
          icon:[],
         url:[],
      },
      formLabelWidth: "120px",
    };
  },
  props: ["isInfo"],

computed: {
  ...mapGetters({
    menuList:'menu/getMenuList'
  })
},
  methods: {
    ...mapActions({
      getMenuList: "menu/getMenuListAction",
    }),

    // 获取一条数据，根据id
    getOne(id){
     
      getMenuInfo({id})
      .then(res=>{
       
        if(res.data.code==200){
          this.form=res.data.list,
          this.form.id=id
        }else{
           this.$message.error(res.data.msg);
        }
      })
    },
  
    cancel(formName) {
 this.changeMenu();
      
      

          this.form={  title: "", //标题
        pid: 0, //上级分类编号 默认是0 是顶级
        icon: "", //图标
        type: 1, //类型1目录2菜单
        url: "", //菜单地址
        status: 1, //状态1正常2禁用
        },
          
      this.$emit("cancel", false);
    },
    toggleDialog(formName) {
      this.cancel(formName);
    },
    add(formName) {
     
      this.$refs[formName].validate((valid) => {
        if (valid) {
          getMenuAdd(this.form).then((res) => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
               this.cancel(formName);
              this.getMenuList();
            }else{
                this.$message.error(res.data.msg);
            }
          });
        }else{
             return false;
        }
      });
    },

// 修改
      update(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          getMenuEdit(this.form).then((res) => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
               this.cancel(formName);
              this.getMenuList();
            }else{
                this.$message.error(res.data.msg);
            }
          });
        }else{
             return false;
        }
      });
    },

   
    changeMenu(){
     
      if(this.form.pid==0){
        this.form.type=1;
      }else{
         this.form.type=2;
      }
    }
  },
};
</script>

<style lang="stylus" scoped></style>