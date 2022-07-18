<template>
  <div>
    <el-form :model="spuForm" label-width="80px">
      <el-form-item label="SPU名称">
        <el-input
          v-model="spuForm.spuName"
          placeholder="请输入SPU名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="品牌">
        <el-select v-model="spuForm.tmId" placeholder="请选择品牌">
          <el-option :label="tradeMark.tmName" :value="tradeMark.id" v-for="tradeMark in baseTrademark" :key="tradeMark.id"> </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="SPU描述">
        <el-input
          v-model="spuForm.description"
          placeholder="请输入SPU描述"
          type="textarea"
          rows="4"
        ></el-input>
      </el-form-item>
      <el-form-item label="SPU图片">
        <el-upload
          action="/dev-api/admin/product/fileUpload"
          list-type="picture-card"
					:file-list="spuImageList"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
					:on-success="handleSuccess"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
				<el-dialog :visible.sync="dialogVisible">
					<img width="100%" :src="dialogImageUrl" alt="">
				</el-dialog>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-select v-model="spuSaleAttrName" :placeholder="unUsedSaleAttrList.length?`还有${unUsedSaleAttrList.length}未选中`:'没有了'">
          <el-option :label="saleAttr.name" :value="`${saleAttr.id}:${saleAttr.name}`" v-for="saleAttr in unUsedSaleAttrList" :key="saleAttr.id"> </el-option>
        </el-select>
        <el-button type="primary" icon="el-icon-plus" @click="addSaleAttr" :disabled="!spuSaleAttrName">添加销售属性</el-button>
        <el-table :data="spuForm.spuSaleAttrList" style="width: 100%;margin:20px 0;" border>
          <el-table-column type="index" label="序号" align="center" width="80">
          </el-table-column>
          <el-table-column prop="saleAttrName" label="属性名" width="150">
          </el-table-column>
          <el-table-column label="属性值名称列表" width="width">
						<template slot-scope="{row,$index}">
							<el-tag
								:key="spuSaleAttr.id"
								v-for="(spuSaleAttr,index) in row.spuSaleAttrValueList"
								closable
								:disable-transitions="false"
								@close="deleteSaleAttrValue(row,index)"
							>
								{{spuSaleAttr.saleAttrValueName}}
							</el-tag>
							<el-input
								class="input-new-tag"
								v-if="row.inputVisible"
								v-model="row.inputValue"
								ref="saveTagInput"
								size="small"
								placeholder="名称"
								@blur="handleBlur(row)"
							>
							</el-input>
							<el-button v-else class="button-new-tag" size="small" @click="showInput(row)">+ 添加</el-button>
						</template>
          </el-table-column>
          <el-table-column label="操作" width="150">
						<template slot-scope="{row,$index}">
							<HintButton type="danger" size="mini" icon="el-icon-delete" title="删除" @click="removeSaleAttr(row,$index)"></HintButton>
						</template>
          </el-table-column>
        </el-table>
				<el-button type="primary" @click="save">保存</el-button>
				<el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "SpuForm",
  data() {
    return {
      spuForm: {
        spuName: "",
        category3Id: 0,
        description: "",
        id: 0,
        tmId: "",
        spuImageList: [
          // {
          // "id": 0,
          // "imgName": "string",
          // "imgUrl": "string",
          // "spuId": 0
          // }
        ],
        spuSaleAttrList: [
          // {
          //     "baseSaleAttrId": 0,
          //     "id": 0,
          //     "saleAttrName": "string",
          //     "spuId": 0,
          //     "spuSaleAttrValueList": [
          //         {
          //         "baseSaleAttrId": 0,
          //         "id": 0,
          //         "isChecked": "string",
          //         "saleAttrName": "string",
          //         "saleAttrValueName": "string",
          //         "spuId": 0
          //         }
          //     ]
          // }
        ],
      },
      dialogImageUrl: "",
      dialogVisible: false,
			spuSaleAttrName:"",
			spuImageList:[],
			baseSaleAttrList:[],
			baseTrademark:[]
    };
  },
	props:["category3Id"],
  methods: {
    handleRemove(file, fileList) {
			this.spuImageList = fileList;
    },
    handleSuccess(response,file, fileList) {
			this.spuImageList = fileList;
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
		initUpdateSpuForm(row){
			/*
				更新SPU信息需要发送4个请求
					1.获取SPU详细信息
					GET /admin/product/getSpuById/{spuId}

					2.获取SPU所有图片的列表信息
					GET /admin/product/spuImageList/{spuId}

					3.获取所有的销售属性信息
					GET /admin/product/baseSaleAttrList

					4.获取所有的品牌信息
					GET /admin/product/baseTrademark/getTrademarkList
			
			*/
			this.getSpuInfo(row.id);
			this.getSpuImageList(row.id);
			this.getBaseSaleAttrList();
			this.getBaseTrademark();
		},
		initAddSpuForm(){
			this.getBaseSaleAttrList();
			this.getBaseTrademark();
		},
		async getSpuInfo(spuId){
			let result = await this.$API.spu.getSpuInfo(spuId);
			if(result.code===200){
				this.spuForm = result.data;
			}
		},
		async getSpuImageList(spuId){
			let result = await this.$API.sku.getSpuImageList(spuId);
			if(result.code===200){
				const spuImageList = result.data.forEach((spuImage)=>{
					spuImage.name = spuImage.imgName;
					spuImage.url = spuImage.imgUrl;
				})
				this.spuImageList = result.data;
			}
		},
		async getBaseSaleAttrList(){
			let result = await this.$API.spu.getBaseSaleAttrList();
			if(result.code===200){
				this.baseSaleAttrList = result.data;
			}
		},
		async getBaseTrademark(){
			let result = await this.$API.trademark.getBaseTrademark();
			if(result.code===200){
				this.baseTrademark = result.data;
			}
		},
		addSaleAttr(){
			const [baseSaleAttrId,saleAttrName] = this.spuSaleAttrName.split(':');
			this.spuForm.spuSaleAttrList.push({
				saleAttrName,
				baseSaleAttrId,
				spuSaleAttrValueList:[]
			});
			this.spuSaleAttrName = "";
		},
		removeSaleAttr(row,$index){
			this.spuForm.spuSaleAttrList.splice($index,1);
		},
		showInput(row){
			this.$set(row,'inputVisible',true);
			this.$nextTick(()=>{
				this.$refs.saveTagInput.focus();
			})
		},
		handleBlur(row){
			row.inputVisible = false;
			const isRepeat = row.spuSaleAttrValueList.some((item)=>item.saleAttrValueName === row.inputValue);
			if(!row.inputValue){
				this.$message.info('添加属性值失败,属性值名称不能为空!!!');
			}else if(isRepeat){
				this.$message.info('添加属性值失败,属性值名称不能重复!!!');
			}else{
				row.spuSaleAttrValueList.push({
					baseSaleAttrId:row.baseSaleAttrId,
					saleAttrValueName:row.inputValue
				})
			}
			row.inputValue = "";
		},
		deleteSaleAttrValue(row,index){
			row.spuSaleAttrValueList.splice(index,1);
		},
		async save(){
			// 收集数据
			const { spuForm , spuImageList } = this;

			// 整理参数
			// 1.spuImageList处理格式放入spuForm中
			spuForm.spuImageList = spuImageList.map(item=>(
				{
					imgName:item.name,
					imgUrl:item.imgUrl||item.response.data
				}
			))

			// 2.将父组件传入的category3Id放入到spuForm中
			spuForm.category3Id = this.category3Id;

			// 3.将spuForm.spuSaleAttrList中所有对象的inputVisible和inputValue属性去除
			spuForm.spuSaleAttrList.forEach(item=>{
				delete item.inputVisible;
				delete item.inputValue;
			});

			try {
			// 发送请求
			await this.$API.spu.addOrUpdate(spuForm);
			this.$message.success('保存成功');
			this.$emit('update:visible',false);
			this.$emit('success');
			this.resetData();

			// 成功的处理

			} catch (error) {
			// 失败的处理
			this.$message.info('保存失败');
			}

		},
		cancel(){
			this.$emit('update:visible',false);
			this.$emit('spuFormCancel');
			this.resetData();
		},
		resetData(){
			Object.assign(this.$data,this.$options.data());
		}
  },
	computed:{
		unUsedSaleAttrList(){
			const spuSaleAttrList = this.spuForm.spuSaleAttrList;
			const baseSaleAttrList = this.baseSaleAttrList;
			const usedSaleAttrObj = spuSaleAttrList.reduce((pre,item)=>{
				pre[item.baseSaleAttrId]=true;
				return pre;
			},{})

			const unUsedList =  baseSaleAttrList.filter((item)=>{
				return !usedSaleAttrObj[item.id]
			})

			return unUsedList;
		}
	}
};
</script>

<style>
.el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
</style>