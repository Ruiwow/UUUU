<template>
  <div>
    <el-dialog
      :title="isInfo.isAdd ? '添加秒杀活动' : '修改活动'"
      :visible.sync="isInfo.isShow"
      :before-close="cancel"
      center
    >
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item
          prop="title"
          label="活动名称"
          :label-width="formLabelWidth"
        >
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item
          prop="begintime"
          label="活动期限"
          :label-width="formLabelWidth"
        >
          <div class="block">
            <el-date-picker
              v-model="value2"
              type="datetimerange"
              :picker-options="pickerOptions"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              align="right"
              value-format="timestamp"
            >
            </el-date-picker>
          </div>
        </el-form-item>

        <el-form-item
          prop="first_cateid"
          label="一级分类"
          :label-width="formLabelWidth"
        >
          <el-select v-model="form.first_cateid" placeholder="请选择" @change="changeId">
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
          <el-select v-model="form.second_cateid" @change="a" placeholder="请选择">
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
          prop="goodsid"
          label="商品"
          :label-width="formLabelWidth"
        >
          <el-select v-model="form.goodsid" placeholder="请选择">
            <el-option
              v-for="item in goods"
              :key="item.id"
              :label="item.goodsname"
              :value="item.id"
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
import { getSeckAdd, getSeckEdit, getSeckInfo,getGoodsList } from "../../util/index";

export default {
  data() {
    return {
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },

      value2: [],
children:'',
goods:'',
      form: {
        title: "", //用户名称
        begintime: "", //所属角色
        endtime: "",
        first_cateid:'',
        second_cateid:'',
        goodsid:'',
        status: 1, //状态1正常2禁用
      },

      //上级菜单

      rules: {
        roleid: [{ required: true, message: "请选择", trigger: "blur" }],
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
      cateList: "cate/getCateList",
      goodsList: "goods/getGoodsList",  
    }),
  },

  mounted() {
    this.getCateList();
    this.getGoodsList()
  },
  methods: {
    ...mapActions({
      getGoodsList: "goods/getGoodsAction",
      getCateList: "cate/getCateListAct",
      getSeckList: "seck/getSeckAction",
      
    }),

    changeId(e){
      
      this.cateList.forEach(item=>{
        if(item.id==e){
        this.children=item.children;
        }
      })
    
    },


    a(e){
       this.goods=''
      console.log(e);
      console.log(this.form.first_cateid);
    getGoodsList({'fid':this.form.first_cateid,'sid':e}).then(res=>{
     this.goods=res.data.list
    })
    
    
    },
    reset() {
      this.form = {
        title: "", //用户名称
        begintime: "", //所属角色
        endtime: "",
        first_cateid:'',
        second_cateid:'',
        goodsid:'',
        status: 1, //状态1正常2禁用
      };
this.value2=[]
     this.children=''
this.goods=''
      //    this.$refs.tree.setCheckedKeys();
    },
    cancel() {
      this.reset();
      this.$emit("cancel", false);
    },
    add() {
      
     this.form.begintime=this.value2[0];
     this.form.endtime=this.value2[1];

      getSeckAdd(this.form).then((res) => {
        if (res.data.code == 200) {
          this.$message.success(res.data.msg);
          this.getSeckList();
          this.cancel();
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    // 获取一条内容，并渲染
    getOne(id) {
     
      getSeckInfo({ id }).then((res) => {
       
        if (res.data.code == 200) {
          this.form = res.data.list;
          this.form.id = id;
          this.a(this.form.second_cateid)
          this.changeId(this.form.first_cateid )
          let a1=this.form.begintime
          let a2=this.form.endtime
          this.value2.push(a1,a2)
   
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    update() {
       this.form.begintime=this.value2[0];
     this.form.endtime=this.value2[1];

      getSeckEdit(this.form).then((res) => {
        if (res.data.code == 200) {
          this.$message.success(res.data.msg);
          this.getSeckList();
          this.cancel();
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
  },
};
</script>

<style lang="stylus" scoped></style>