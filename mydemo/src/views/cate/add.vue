<template>
  <div>
    <el-dialog
      :title="isInfo.isAdd ? '添加菜单' : '编辑菜单'"
      :visible="isInfo.isShow"
      @close="toggleDialog('form')"
      center
    >
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item prop="pid" label="上级分类" :label-width="formLabelWidth">
          <el-select v-model="form.pid" placeholder="请选择">
            <el-option label="顶级菜单" :value="0"></el-option>
            <el-option
              v-for="item in cateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          prop="catename"
          label="分类名称"
          :label-width="formLabelWidth"
        >
          <el-input v-model="form.catename" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="图片" :label-width="formLabelWidth">
          <el-upload
            action="#"
            list-type="picture-card"
            :on-preview="onPreview"
            :on-remove="onRemove"
            :auto-upload="false"
            :on-change="onChange"
            :file-list="fileList"
            :limit="1"
            :on-exceed="onExceed"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="" />
          </el-dialog>
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
        <el-button v-if="isInfo.isAdd" @click="add('form')" type="primary"
          >添 加</el-button
        >
        <el-button v-else @click="update('form')" type="primary"
          >修改</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getCateAdd, getCateInfo, getCateEdit } from "../../util/index";
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      form: {
        pid: 0, //上级分类编号 默认是0 是顶级
        catename: "", //商品分类名称
        img: "", //图片(文件，一般用于二级分类)
        status: 1, //状态1正常2禁用
      },

      rules: {
        catename: [
          { required: true, message: "请输入分类名称", trigger: "blur" },
          {
            min: 2,
            max: 20,
            message: "长度在 2 到 20 个字符",
            trigger: "blur",
          },
        ],
        pid: [{ required: true, message: "请选择上级分类", trigger: "blur" }],
      },
      formLabelWidth: "120px",
       dialogImageUrl: "", //预览图片地址
      dialogVisible: false, //预览图片的弹框
      img: "", //用来接收图片信息
      fileList: [] //文件上传列表
    };
  },
  props: ["isInfo"],

  computed: {
    ...mapGetters({
      cateList: "cate/getCateList",
    }),
  },
  methods: {
    ...mapActions({
      getCateList: "cate/getCateListAct",
    }),

      onChange(file) {
      this.img = file.raw;
    },
    //图片预览
    onPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    //图片移除
    onRemove(file, fileList) {
      this.form.img=''
    },
    //文件上传限制
    onExceed(files, fileList) {
        this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },

    // 获取一条数据，根据id
    getOne(id) {
      getCateInfo({ id }).then((res) => {
        if (res.data.code == 200) {
         
          this.form = res.data.list 
          this.form.id = id;
         this.fileList =this.form.img?[{url: `${this.$Url}${this.form.img}` }]:[]
        
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },

    cancel(formName) {
      this.form = {
        pid: 0, //上级分类编号 默认是0 是顶级
        catename: "", //商品分类名称
        img: "", //图片(文件，一般用于二级分类)
        status: 1, //状态1正常2禁用
      },
      this.img= "", //用来接收图片信息
       this.fileList= [] 
        this.$emit("cancel", false);
    },
    toggleDialog(formName) {
      this.cancel(formName);
    },
    add(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let data = this.form;
          let file = new FormData();
          for (let i in data) {
            file.append(i, data[i]);
          }
          file.append('img',this.img)
          getCateAdd(file).then((res) => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              this.cancel(formName);
              this.getCateList();
            } else {
              this.$message.error(res.data.msg);
            }
          });
        } else {
          return false;
        }
      });
    },

    // 修改
    update(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {

             let data = this.form;
          let file = new FormData();
          for (let i in data) {
            file.append(i, data[i]);
          }
          this.img=this.img?this.img:this.form.img
            file.append('img',this.img)
          getCateEdit(file).then((res) => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              this.cancel(formName);
              this.getCateList();
            } else {
              this.$message.error(res.data.msg);
            }
          });
        } else {
          console.log("err");
          return false;
        }
      });
    },
  },
};
</script>

<style lang="stylus" scoped>

</style>