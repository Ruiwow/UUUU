<template>
  <div>
    <el-dialog
      :title="isInfo.isAdd ? '添加商品' : '修改商品'"
      :visible.sync="isInfo.isShow"
      :before-close="cancel"
      center
    >
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item
          prop="first_cateid"
          label="一级分类"
          :label-width="formLabelWidth"
        >
          <el-select
            v-model="form.first_cateid"
            placeholder="请选择"
            @change="changeId"
          >
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
          prop="second_cateid"
          label="二级分类"
          :label-width="formLabelWidth"
        >
          <el-select v-model="form.second_cateid" placeholder="请选择">
            <el-option
              v-for="item in children"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item
          prop="goodsname"
          label="商品名称"
          :label-width="formLabelWidth"
        >
          <el-input v-model="form.goodsname" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item
          prop="price"
          label="商品价格"
          :label-width="formLabelWidth"
        >
          <el-input v-model.number="form.price" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item
          prop="market_price"
          label="市场价格"
          :label-width="formLabelWidth"
        >
          <el-input v-model.number="form.market_price" autocomplete="off"></el-input>
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

        <el-form-item
          prop="specsid"
          label="商品规格"
          :label-width="formLabelWidth"
        >
          <el-select
            v-model="form.specsid"
            placeholder="请选择"
            @change="changAttr"
          >
            <el-option
              v-for="item in specsListAll"
              :key="item.id"
              :label="item.specsname"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item
          prop="specsattr"
          label="规格属性"
          :label-width="formLabelWidth"
        >
          <el-select v-model="form.specsattr" multiple placeholder="请选择">
            <el-option
              v-for="item in attrs"
              :key="item"
              :label="item"
              :value="item"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="是否新品" :label-width="formLabelWidth">
          <el-radio v-model="form.isnew" :label="1">是</el-radio>
          <el-radio v-model="form.isnew" :label="2">否</el-radio>
        </el-form-item>

        <el-form-item label="是否热卖推荐" :label-width="formLabelWidth">
          <el-radio v-model="form.ishot" :label="1">是</el-radio>
          <el-radio v-model="form.ishot" :label="2">否</el-radio>
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

        <el-form-item label="商品描述" :label-width="formLabelWidth">
          <quill-editor
            ref="text"
            v-model="content"
            class="myQuillEditor"
            :options="editorOption"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel()">取 消</el-button>
        <el-button v-if="isInfo.isAdd" @click="add()" type="primary"
          >添 加</el-button
        >
        <el-button v-else @click="update()" type="primary">修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import {
  getGoodsInfo,
  getGoodsEdit,
  getGoodsAdd,
  getGoodsDelete,
} from "../../util/index";
import { quillEditor } from "vue-quill-editor";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

export default {
  components: {
    quillEditor,
  },

  data() {
    return {
      content: "",
      editorOption: {},
      attrs: [],
      formLabelWidth: "120px",
      dialogImageUrl: "", //预览图片地址
      dialogVisible: false, //预览图片的弹框
      img: "", //用来接收图片信息
      fileList: [], //文件上传列表
      children: "",
      form: {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: "",
        market_price: "",
        img: "",
        description: "",
        specsid: "",
        specsattr: "",
        isnew: 1,
        ishot: 1,
        status: 1, //状态1正常2禁用
      },

      //上级菜单

      rules: {
        goodsname: [
          { required: true, message: "请输入商品名称", trigger: "blur" },
          { min: 2, max: 8, message: "长度在 2 到 8 个字符", trigger: "blur" },
        ],
        price: [
          { required: true, message: "请输入商品价格", trigger: "blur" },
          { type: "number", message: "商品价格必须为数字" },
        ],
        market_price: [
          { required: true, message: "请输入市场价格", trigger: "blur" },
          { type: "number", message: "市场价格必须为数字" },
        ],
        first_cateid: [
          { required: true, message: "请选择一级分类", trigger: "blur" },
        ],
        second_cateid: [
          { required: true, message: "请选择二级分类", trigger: "blur" },
        ],
        specsid: [
          { required: true, message: "请选择商品规格", trigger: "blur" },
        ],
        specsattr: [
          { required: true, message: "请选择规格属性", trigger: "blur" },
        ],
      },
      formLabelWidth: "120px",
    };
  },
  props: ["isInfo"],
  computed: {
    ...mapGetters({
      cateList: "cate/getCateList",
      specsList: "specs/getSpecsList",
      specsListAll:"specs/getSpecsListAll"
    }),
  },
  mounted() {
    this.getCateList();
    this.getSpecsList();
    this.getSpecsListAll();
    this.getGoodsList();
  },
  methods: {
    ...mapActions({
      getSpecsList: "specs/getSpecsAction",
      getSpecsListAll: "specs/getSpecsActionAll",
      getGoodsList: "goods/getGoodsAction",
      getCateList: "cate/getCateListAct",
      getCountAction: "goods/getCountAction",
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
     
    },
    //文件上传限制
    onExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      );
    },
    reset() {
      this.form = {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: "",
        market_price: "",
        img: "",
        description: "",
        specsid: "",
        specsattr: "",
        isnew: 1,
        ishot: 1,
        status: 1, //状态1正常2禁用
      };
      (this.fileList = []), (this.content = "");

      this.$refs["form"].resetFields();
    },

    changAttr(e) {
      this.form.specsattr = "";
      this.specsList.forEach((item) => {
        console.log(item);
        if (item.id == e) this.attrs = item.attrs;
      });
    },
    cancel() {
      this.reset();
      this.$emit("cancel", false);
    },

    changeId(e) {
      this.form.second_cateid = "";
      this.cateList.forEach((item) => {
        if (item.id == e) {
          this.children = item.children;
        }
      });

      console.log(this.children);
    },
    add() {
      this.form.description = this.content;
      this.form.price = Number(this.form.price);
      this.form.market_price = Number(this.form.market_price);
      let data = this.form;
      let file = new FormData();
      for (let i in data) {
        file.append(i, data[i]);
      }
      console.log(this.form);
      file.append("img", this.img);
      //            for (var value of file.values()) {
      //     console.log(value);
      //  }
      getGoodsAdd(file).then((res) => {
        if (res.data.code == 200) {
          this.$message.success(res.data.msg);
          this.cancel();
          this.getGoodsList();
          this.getCountAction();
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    // 获取一条内容，并渲染
    getOne(id) {
      getGoodsInfo({ id }).then((res) => {
        if (res.data.code == 200) {
          this.form = res.data.list;
          this.form.id = id;
          this.content = res.data.list.description;
          this.fileList = this.form.img
            ? [{ url: this.$Url + this.form.img }]
            : [];
        this.img=this.form.img
          this.form.specsattr = this.form.specsattr
            ? this.form.specsattr.split(",")
            : [];
          this.cateList.forEach((item) => {
            if (item.id == this.form.first_cateid) {
              this.children = item.children;
            }
            this.specsList.forEach((item) => {
              if (item.id == this.form.specsid) this.attrs = item.attrs;
            });
          });
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    update() {
      this.form.description = this.content;
      this.form.price = Number(this.form.price);
      this.form.market_price = Number(this.form.market_price);
      this.form.img=this.img
      console.log(this.img);
      let data = this.form;
      let file = new FormData();
      for (let i in data) {
        file.append(i, data[i]);
      }
    
      getGoodsEdit(file).then((res) => {
       
        if (res.data.code == 200) {
          this.$message.success(res.data.msg);
          this.getGoodsList();
          this.getCountAction();
          this.cancel();
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },

    Del(index) {
      this.domains.splice(index, 1);
    },
  },
};
</script>

<style lang="" scoped>
.inp {
  width: 78%;
}

.myQuillEditor {
  line-height: normal !important;
  height: 400px !important;
}
.dialog-footer {
  margin-top: 45px;
}
</style>