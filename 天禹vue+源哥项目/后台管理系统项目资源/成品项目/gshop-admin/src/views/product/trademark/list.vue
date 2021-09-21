<template>
  <div class="trademark-container">
    <el-button type="primary" icon="el-icon-plus" @click="openTradeMarkDialog"
      >添加</el-button
    >
    <el-table border :data="tradeMarkList" style="width: 100%; margin: 20px 0">
      <el-table-column label="序号" type="index" align="center" width="80">
      </el-table-column>
      <el-table-column prop="tmName" label="品牌名称" width="width">
      </el-table-column>
      <el-table-column prop="logoUrl" label="品牌LOGO" width="width">
        <template slot-scope="{ row }">
          <img :src="row.logoUrl" style="width: 100px; height: 80px" alt="" />
        </template>
      </el-table-column>
      <el-table-column label="操作" width="width">
        <template slot-scope="{ row }">
          <el-button
            type="warning"
            icon="el-icon-edit"
            size="mini"
            @click="openTradeMarkDialog(row)"
            >编辑</el-button
          >
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            @click="deleteTradeMark(row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      @size-change="handleSizeChange"
      @current-change="getTradeMarkList"
      style="text-align: center"
      :current-page="page"
      :page-sizes="[3, 10, 20]"
      :page-size="limit"
      layout="prev, pager, next, jumper,->, sizes,total"
      :total="total"
    >
    </el-pagination>

    <el-dialog
      :title="title"
      :visible.sync="dialogFormVisible"
      style="width: 80%"
    >
      <el-form :model="tmForm" :rules="rules" ref="tmForm">
        <el-form-item label="品牌名称" label-width="100px" prop="tmName">
          <el-input v-model="tmForm.tmName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="品牌LOGO" label-width="100px" prop="logoUrl">
          <el-upload
            class="avatar-uploader"
            action="/dev-api/admin/product/fileUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="tmForm.logoUrl" :src="tmForm.logoUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <div class="el-upload__tip" slot="tip">
              只能上传jpg/png文件，且不超过500kb
            </div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addOrUpdate">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
const validateTmName = (rule,value,callback) =>{
  if(value.length<2||value.length>10){
    callback(new Error("品牌名称长度必须大于2,小于10"))
  }else{
    callback();
  }
}
export default {
  name: "TradeMark",
  data() {
    return {
      page: 1,
      limit: 3,
      tradeMarkList: [],
      total: 0,

      dialogFormVisible: false, //用于控制dialog组件的显示隐藏

      //用于搜集当前表单中所有的数据
      tmForm: {
        tmName: "",
        logoUrl: "",
      },

      rules: {
        tmName: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { validator: validateTmName, trigger: "blur" },
        ],
        logoUrl: [
          { required: true, message: "请选择需要上传的LOGO图片", trigger: "change" },
        ],
      },
    };
  },
  mounted() {
    this.getTradeMarkList();
  },
  methods: {
    async getTradeMarkList(page = 1) {
      this.page = page;
      let result = await this.$API.trademark.getPageList(this.page, this.limit);
      if (result.code === 200) {
        this.tradeMarkList = result.data.records;
        this.total = result.data.total;
      }
    },
    handleSizeChange(limit) {
      this.limit = limit;
      this.getTradeMarkList();
    },

    //upload上传案例中所需内容
    handleAvatarSuccess(res, file) {
      // this.imageUrl = URL.createObjectURL(file.raw);
      this.tmForm.logoUrl = res.data;
    },
    beforeAvatarUpload(file) {
      const types = ["image/jpeg", "image/png"];
      const isJPGorPNG = types.includes(file.type);
      // const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPGorPNG) {
        this.$message.error("上传头像图片只能是 JPG 或者 PNG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPGorPNG && isLt2M;
    },
    //用于监视用户点击添加/修改品牌操作
    openTradeMarkDialog(row) {
      this.dialogFormVisible = true;
      if (row.id) {
        this.tmForm = { ...row };
      } else {
        this.tmForm = {
          tmName: "",
          logoUrl: "",
        };
      }
    },
    // 用于监视用户点击dialog组件中确定按钮操作
    addOrUpdate() {
      this.$refs.tmForm.validate(async (valid) => {
          if (valid) {
            let trademark = this.tmForm;
            try {
              await this.$API.trademark.addOrUpdate(trademark);
              this.$message.success(this.title + "成功!");
              this.getTradeMarkList(trademark.id ? this.page : 1);
            } catch (e) {
              this.$message.error(this.title + "失败!");
            }
            this.dialogFormVisible = false;
          } else {
            // console.log('error submit!!');
            return false;
          }
        });
    },
    // 用于监视用户点击删除按钮操作
    deleteTradeMark(row) {
      this.$confirm(`此操作将永久删除${row.tmName}, 是否继续?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          await this.$API.trademark.deleteTradeMark(row.id);
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          this.getTradeMarkList(
            this.tradeMarkList.length > 1 ? this.page : this.page - 1
          );
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
  computed: {
    title() {
      return this.tmForm.id ? "修改品牌" : "添加品牌";
    },
  },
};
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>