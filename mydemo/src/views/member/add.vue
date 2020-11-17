<template>
  <div>
    <el-dialog
      :title="isInfo.isAdd ? '' : '修改会员信息'"
      :visible.sync="isInfo.isShow"
      :before-close="cancel"
      center
    >
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item prop="phone" label="手机号" :label-width="formLabelWidth">
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          prop="nickname"
          label="昵称"
          :label-width="formLabelWidth"
        >
          <el-input v-model="form.nickname" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item
          prop="password"
          label="密码"
          :label-width="formLabelWidth"
        >
          <el-input v-model="Newpassword" autocomplete="off"></el-input>
          <span>留空则不修改</span>
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

        <el-button @click="update()" type="primary">修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { getMemberEdit, getMemberInfo } from "../../util/index";

export default {
  data() {
    return {
      Newpassword: "",
      form: {
        uid: "", // 规格名称
        nickname: "", //规格属性
        phone: "",
        password: "",
        status: 1, //状态1正常2禁用
      },

      //上级菜单

      rules: {
        phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          {
            min: 10,
            max: 12,
            message: "长度在 10 到 12 个数字",
            trigger: "blur",
          },
        ],
        nickname: [
          { required: true, message: "请输入昵称", trigger: "blur" },
          { min: 2, max: 8, message: "长度在 2 到 8 个字符", trigger: "blur" },
        ],
      },
      formLabelWidth: "120px",
    };
  },
  props: ["isInfo"],

  methods: {
    ...mapActions({
      getMemberList: "member/getMemberAction",
    }),
    reset() {
      this.form = {
        uid: "", // 规格名称
        nickname: "", //规格属性
        phone: "",
        password: "",
        status: 1, //状态1正常2禁用
      };
      this.Newpassword = "";
    },
    cancel() {
      this.reset();
      this.$emit("cancel", false);
    },
    // 获取一条内容，并渲染
    getOne(uid) {
      getMemberInfo({ uid }).then((res) => {
        if (res.data.code == 200) {
          this.form = res.data.list;
          this.form.uid = uid;
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },

    update() {
      if (!this.Newpassword == "") {
        this.form.password = this.Newpassword;
      }
console.log(this.form);
      getMemberEdit(this.form).then((res) => {
       
        if (res.data.code == 200) {
          this.$message.success(res.data.msg);
          this.getMemberList();

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