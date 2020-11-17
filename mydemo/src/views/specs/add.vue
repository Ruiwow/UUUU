<template>
  <div>
    <el-dialog
      :title="isInfo.isAdd ? '添加商品规格' : '修改商品规格'"
      :visible.sync="isInfo.isShow"
      :before-close="cancel"
      center
    >
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item
          prop="specsname"
          label="规格名称"
          :label-width="formLabelWidth"
        >
          <el-input v-model="form.specsname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          v-for="(item, index) in domains"
          :key="index"
          label="规格属性"
          :label-width="formLabelWidth"
        >
          <el-input
            class="inp"
            v-model="item.value"
            autocomplete="off"
          ></el-input>
          <el-button v-if="index == 0" type="primary" @click="addDomain"
            >添加规格属性</el-button
          >
          <el-button v-else @click="Del(index)" type="danger">删除</el-button>
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
        <el-button v-else @click="update()" type="primary">修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { getSpecsAdd, getSpecsEdit, getSpecsInfo } from "../../util/index";

export default {
  data() {
    return {
      domains: [
        {
          value: "",
        },
      ],
      form: {
        specsname: "", // 规格名称
        attrs: "", //规格属性
        status: 1, //状态1正常2禁用
      },

      //上级菜单

      rules: {
        roleid: [{ required: true, message: "请选择", trigger: "blur" }],
        specsname: [
          { required: true, message: "请输入规格名称", trigger: "blur" },
          { min: 2, max: 8, message: "长度在 2 到 8 个字符", trigger: "blur" },
        ],
      },
      formLabelWidth: "120px",
    };
  },
  props: ["isInfo"],

  methods: {
    ...mapActions({
      getSpecsList: "specs/getSpecsAction",

      getCountAction: "specs/getCountAction",
    }),
    reset() {
      this.form = {
        specsname: "", // 规格名称
        attrs: "", //规格属性
        status: 1, //状态1正常2禁用
      };

      this.domains = [
        {
          value: "",
        },
      ];
    },
    cancel() {
      this.reset();
      this.$emit("cancel", false);
    },
    add() {
     

      this.form.attrs = this.domains.map((item) => item.value).join(",");
 console.log(this.form);
      getSpecsAdd(this.form).then((res) => {
        if (res.data.code == 200) {
          this.$message.success(res.data.msg);
          this.getSpecsList();
          this.getCountAction();
          this.cancel();
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    // 获取一条内容，并渲染
    getOne(id) {
      getSpecsInfo({ id }).then((res) => {
        if (res.data.code == 200) {
          let data = res.data.list[0];
          this.form = data;
          data.attrs.map((item, index) => {
            if (index == 0) {
              this.domains[0].value = item;
            } else {
              this.domains.push({
                value: item,
              });
            }
          });
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    update() {
 this.form.attrs = this.domains.map((item) => item.value).join(',')
      console.log( this.form.attrs);
    
      getSpecsEdit(this.form).then((res) => {
        console.log(res);
        if (res.data.code == 200) {
          this.$message.success(res.data.msg);
          this.getSpecsList();
            this.getCountAction();
          this.cancel();
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },

    addDomain() {
      this.domains.push({
        value: "",
      });
    },
    Del(index) {
      this.domains.splice(index, 1);
    },
  },
};
</script>

<style lang="stylus" scoped>
.inp {
  width: 78%;
}
</style>