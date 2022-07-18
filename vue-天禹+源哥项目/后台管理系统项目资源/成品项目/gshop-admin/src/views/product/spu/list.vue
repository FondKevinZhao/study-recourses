<template>
  <div>
    <el-card>
      <CategorySelector :isShowList="isShowSpuList" @changeCategory="changeCategory"></CategorySelector>
    </el-card>
    <el-card style="margin-top: 20px">
      <div v-show="isShowSpuList">
        <el-button
          type="primary"
          icon="el-icon-plus"
          @click="AddSpuForm"
          :disabled="!category3Id"
          >添加SPU</el-button
        >
        <el-table :data="spuList" style="width: 100%" border>
          <el-table-column label="序号" width="80" type="index" align="center">
          </el-table-column>
          <el-table-column prop="spuName" label="SPU名称"> </el-table-column>
          <el-table-column prop="description" label="SPU描述">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="{ row }">
              <HintButton
                size="mini"
                type="success"
                icon="el-icon-plus"
                title="添加SKU"
                @click="addSkuForm(row)"
              ></HintButton>
              <HintButton
                size="mini"
                type="primary"
                icon="el-icon-edit"
                title="修改SPU"
                @click="updateSpuForm(row)"
              ></HintButton>
              <HintButton
                size="mini"
                type="info"
                icon="el-icon-info"
                title="查看SKU列表"
                @click="showSkuList(row)"
              ></HintButton>
              <el-popconfirm
                :title="`你确定要删除${row.spuName}吗？`"
                style="margin-left: 10px"
                @onConfirm="deleteSpuForm(row)"
              >
                <HintButton
                  slot="reference"
                  size="mini"
                  type="danger"
                  icon="el-icon-delete"
                  title="删除SPU"
                ></HintButton>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>

        <el-pagination
          style="text-align: center"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page"
          :page-sizes="[2, 5, 10]"
          :page-size="limit"
          layout=" prev, pager, next, jumper,->, sizes,total"
          :total="total"
        >
        </el-pagination>
      </div>
      <SpuForm
        ref="spuForm"
        v-show="isShowSpuForm"
        :category3Id="category3Id"
        :visible.sync="isShowSpuForm"
        @success="spuFormSuccess"
        @cancel="spuFormCancel"
      ></SpuForm>
      <SkuForm 
        ref="skuForm"
        v-show="isShowSkuForm" 
        :category1Id="category1Id"
        :category2Id="category2Id"
        :category3Id="category3Id"
        :visible.sync="isShowSkuForm"
      ></SkuForm>
    </el-card>
    <el-dialog :title="`${dialogTitle}=>SKU列表`" :visible.sync="dialogTableVisible">
      <el-table :data="skuList" border>
        <el-table-column prop="skuName" label="名称" width="150"></el-table-column>
        <el-table-column prop="price" label="价格(元)"></el-table-column>
        <el-table-column prop="weight" label="重量(KG)"></el-table-column>
        <el-table-column label="默认图片">
          <template slot-scope="{row}">
            <img :src="row.skuDefaultImg" style="width:100px;height:100px" alt="">
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import SpuForm from "../components/SpuForm.vue";
import SkuForm from "../components/SkuForm.vue";
export default {
  name: "Spu",
  data() {
    return {
      category1Id: "",
      category2Id: "",
      category3Id: "",
      spuList: [],
      page: 1,
      limit: 2,
      total: 0,
      isShowSpuForm: false,
      isShowSkuForm: false,
      dialogTableVisible: false,
      skuList:[],
      dialogTitle:""
    };
  },
  methods: {
    handleSizeChange(value) {
      this.limit = value;
      this.getSpuList();
    },
    handleCurrentChange(value) {
      this.page = value;
      this.getSpuList();
    },
    changeCategory({ categoryId, level }) {
      if (level === 1) {
        this.category1Id = categoryId;
        this.category2Id = "";
        this.category3Id = "";
      } else if (level === 2) {
        this.category2Id = categoryId;
        this.category3Id = "";
      } else if (level === 3) {
        this.category3Id = categoryId;
        this.getSpuList();
      }
    },
    async getSpuList(newPage) {
      const { page, limit, category3Id } = this;
      if (!category3Id) return;
      let list = await this.$API.spu.getSpuList(
        newPage ? newPage : page,
        limit,
        category3Id
      );
      this.spuList = list.data.records;
      this.total = list.data.total;
    },
    AddSpuForm() {
      this.isShowSpuForm = true;
      this.$refs.spuForm.initAddSpuForm();
    },
    updateSpuForm(row) {
      this.flag = true;
      this.isShowSpuForm = true;
      this.$refs.spuForm.initUpdateSpuForm(row);
    },
    showSkuForm() {
      this.isShowSkuForm = true;
    },
    spuFormSuccess() {
      if (this.flag) {
        this.getSpuList();
      } else {
        this.getSpuList(1);
      }
      this.flag = false;
    },
    async deleteSpuForm(row) {
      try {
        await this.$API.spu.deleteSpu(row.id);
        this.$message.success("删除SPU成功");
        this.getSpuList(this.spuList.length > 1 ? this.page : this.page - 1);
      } catch (error) {
        this.$message.info("删除SPU失败");
      }
    },
    spuFormCancel() {
      this.flag = false;
    },
    addSkuForm(row){
      this.isShowSkuForm = true;
      this.$refs.skuForm.initAddSkuForm(row);
    },
    async showSkuList(row){
      const skuList = await this.$API.sku.getSkuList(row.id);
      this.skuList = skuList.data;
      this.dialogTableVisible = true
      this.dialogTitle = row.spuName;
    }
  },
  computed: {
    isShowSpuList() {
      return !this.isShowSpuForm && !this.isShowSkuForm;
    },
  },
  components: {
    SpuForm,
    SkuForm,
  },
};
</script>

<style lang="scss">
</style>