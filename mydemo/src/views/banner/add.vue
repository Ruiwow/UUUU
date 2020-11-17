<template>
  <div>
    <el-dialog
      :title="isInfo.isAdd ? '添加轮播图' : '修改轮播图'"
      :visible="isInfo.isShow"
      @close="toggleDialog('form')"
      center
    >
      <el-form :model="form" :rules="rules" ref="form">
       
        <el-form-item
          prop="title"
          label="标题"
          :label-width="formLabelWidth"
        >
          <el-input v-model="form.title" autocomplete="off"></el-input>
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
import { getBannerAdd, getBannerInfo, getBannerEdit } from "../../util/index";
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      form: {
        id: 0, //上级分类编号 默认是0 是顶级
        title: "", //商品分类名称
        img: "", //图片(文件，一般用于二级分类)
        status: 1, //状态1正常2禁用
      },

      rules: {
        title: [
          { required: true, message: "请输入轮播图标题", trigger: "blur" },
        ],
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
      bannerList: "banner/getBannerList",
    }),
  },
  methods: {
    ...mapActions({
      getBannerList: "banner/getBannerListAct",
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
      getBannerInfo({ id }).then((res) => {
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
        id: 0, //上级分类编号 默认是0 是顶级
        title: "", //商品分类名称
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
          getBannerAdd(file).then((res) => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              this.cancel(formName);
              this.getBannerList();
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
          getBannerEdit(file).then((res) => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              this.cancel(formName);
              this.getBannerList();
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