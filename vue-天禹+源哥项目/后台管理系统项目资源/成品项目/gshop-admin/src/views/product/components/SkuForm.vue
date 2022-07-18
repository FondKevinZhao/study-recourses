<template>
  <div>
    <el-form :model="skuForm" label-width="80px">
      <el-form-item label="SPU名称"> {{spuForm.spuName}} </el-form-item>
      <el-form-item label="SKU名称">
        <el-input
          v-model="skuForm.skuName"
          placeholder="请输入SKU名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="价格(元)">
        <el-input
          v-model="skuForm.price"
          type="number"
          placeholder="请输入SKU价格"
        ></el-input>
      </el-form-item>
      <el-form-item label="重量(千克)">
        <el-input
          v-model="skuForm.weight"
          type="number"
          placeholder="请输入SKU重量"
        ></el-input>
      </el-form-item>
      <el-form-item label="规格描述">
        <el-input
          v-model="skuForm.skuDesc"
          type="textarea"
          placeholder="请输入SKU规格描述"
          rows="4"
        ></el-input>
      </el-form-item>
      <el-form-item label="平台属性">
        <el-form :inline="true" label-width="100px">
          <el-form-item :label="attr.attrName" v-for="attr in attrList" :key="attr.id">
            <el-select v-model="attr.attrIdValueId" placeholder="请输入">
              <el-option :label="attrValue.valueName" :value="`${attr.id}:${attrValue.id}`" v-for="attrValue in attr.attrValueList" :key="attrValue.id"> </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-form :inline="true" label-width="100px">
          <el-form-item :label="saleAttr.saleAttrName" v-for="saleAttr in spuSaleAttrList" :key="saleAttr.id">
            <el-select v-model="saleAttr.attrIdValueId" placeholder="请输入">
              <el-option :label="saleAttrValue.saleAttrValueName" :value="`${saleAttr.id}:${saleAttrValue.id}`" v-for="saleAttrValue in saleAttr.spuSaleAttrValueList" :key="saleAttrValue.id"> </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="图片列表">
        <el-table :data="spuImageList" style="width: 100%" border @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column label="图片">
              <template slot-scope="{row}">
                  <img :src="row.imgUrl" style="width:100px;height:100px;" alt="">
              </template>
          </el-table-column>
          <el-table-column prop="imgName" label="名称"> </el-table-column>
          <el-table-column label="操作">
              <template slot-scope="{row}">
                  <el-button type="primary" v-if="row.isDefault==='0'" @click="setDefault(row)">设为默认</el-button>
                  <el-tag type="success" v-else>默认</el-tag>
              </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item label="">
        <el-button type="primary" @click="save">保存</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "SkuForm",
  data() {
    return {
      skuForm: {
        category3Id: "",
        price: "",
        spuId: 0,
        tmId: 0,
        weight: "",
        skuDefaultImg: "",
        skuDesc: "",
        skuName: "",
        skuAttrValueList: [
          //   {
          //     attrId: 0,
          //     attrName: "string",
          //     id: 0,
          //     skuId: 0,
          //     valueId: 0,
          //     valueName: "string",
          //   },
        ],
        skuImageList: [
          //   {
          //     id: 0,
          //     imgName: "string",
          //     imgUrl: "string",
          //     isDefault: "string",
          //     skuId: 0,
          //     spuImgId: 0,
          //   },
        ],
        skuSaleAttrValueList: [
          //   {
          //     id: 0,
          //     saleAttrId: 0,
          //     saleAttrName: "string",
          //     saleAttrValueId: 0,
          //     saleAttrValueName: "string",
          //     skuId: 0,
          //     spuId: 0,
          //   },
        ],
      },
      spuForm: {},
      attrList: [],
      spuSaleAttrList: [],
      spuImageList: [],
      selectedImageList:[]
    };
  },
  props: ["category1Id", "category2Id", "category3Id"],
  methods: {
    cancel() {
      this.$emit("update:visible", false);
    },
    async initAddSkuForm(spuForm) {
      const { category1Id, category2Id, category3Id } = this;
      this.spuForm = spuForm;
      const promise1 = this.$API.attr.getAttrInfoList(
        category1Id,
        category2Id,
        category3Id
      );
      const promise2 = this.$API.sku.getSpuSaleAttrList(spuForm.id);
      const promise3 = this.$API.sku.getSpuImageList(spuForm.id);

      const result = await Promise.all([promise1, promise2, promise3]);
      this.attrList = result[0].data;
      this.spuSaleAttrList = result[1].data;
      const spuImageList = result[2].data;
      spuImageList.forEach(item=>item.isDefault = "0");
      this.spuImageList = spuImageList;
    },
    handleSelectionChange(val) {
        // console.log(val)
        this.selectedImageList = val;
    },
    setDefault(row){
        this.selectedImageList.forEach(item => item.isDefault="0");
        row.isDefault="1";
        this.skuForm.skuDefaultImg = row.imgUrl;
    },
    async save(){
      // 1.收集所有需要的数据
      const {skuForm,spuForm,attrList,spuSaleAttrList,selectedImageList,category3Id} = this;

      // 2.整理数据格式(满足请求所需格式)
      //向skuForm中存入父组件传入的三级分类Id
      skuForm.category3Id = category3Id;
      
      //向skuForm中存入当前Spu的品牌Id
      skuForm.tmId = spuForm.tmId;
      
      //向skuForm中存入当前Spu的id
      skuForm.spuId = spuForm.id;
      
      //处理平台属性列表
      //skuForm.skuAttrValueList中的每个对象都必须要有attrId(平台属性id)和valueId(平台属性值id)
      skuForm.skuAttrValueList = attrList.reduce((pre,attr)=>{
        const attrIdValueId = attr.attrIdValueId;
        if(attrIdValueId){
          const [attrId,valueId] = attrIdValueId.split(':');
          pre.push({
            attrId,
            valueId
          })
        }
        return pre;
      },[])
      
      //处理销售属性列表
      //skuForm.spuSaleAttrList中的每个对象都必须要有saleAttrId(销售属性id)和saleAttrValueId(销售属性值id)
      skuForm.spuSaleAttrList = spuSaleAttrList.reduce((pre,saleAttr)=>{
        const attrIdValueId = saleAttr.attrIdValueId;
        if(attrIdValueId){
          const [saleAttrId,saleAttrValueId] = attrIdValueId.split(':');
          pre.push({
            saleAttrId,
            saleAttrValueId
          })
        }
        return pre;
      },[])
      
      //处理sku图片列表
      //skuForm.skuImageList中的每个对象都必须要有imgName(图片名称),imgUrl(图片链接),isDefault(是否是默认展示图),spuImgId(该图片的id)
      skuForm.skuImageList = selectedImageList.map(({imgName,imgUrl,isDefault,id:spuImgId})=>{
        return {
              imgName,
              imgUrl,
              isDefault,
              spuImgId
            }
      });

      try {
      // 3.发送请求
        await this.$API.sku.addOrUpdate(skuForm);

      // 4.成功做什么
        this.$message.success('添加SKU成功');
        this.$emit('update:visible',false);
        this.resetData()

      } catch (error) {
      // 5.失败做什么
        this.$message.success('添加SKU失败');

      }
    },
    resetData(){
      Object.assign(this.$data,this.$options.data());
    }
  },
};
</script>