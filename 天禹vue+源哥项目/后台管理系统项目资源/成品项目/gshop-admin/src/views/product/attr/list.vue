<template>
  <div>
      <el-card>
        <CategorySelector @changeCategory="changeCategory"/>
      </el-card>
      
      <el-card style="margin-top:20px;">
          <div v-show="isShowList">
            <el-button type="primary" icon="el-icon-plus" @click="showAddDiv" :disabled="!category3Id">添加属性</el-button>
            <el-table 
              style="width: 100%;margin-top:20px;" 
              border
              :data="attrList"
            >
              <el-table-column
                label="序号"
                type="index"
                align="center"
                width="80">
              </el-table-column>
              <el-table-column
                prop="attrName"
                label="属性名称"
                width="150">
              </el-table-column>
              <el-table-column
                label="属性值列表"
                width="width">
                <template slot-scope={row}>
                  <el-tag type="info" v-for="value in row.attrValueList" :key="value.id">{{value.valueName}}</el-tag>
                </template>
              </el-table-column>
              <el-table-column
                prop="prop"
                label="操作"
                width="150">
                <template slot-scope="{row}">
                  <HintButton size="mini" type="primary" icon="el-icon-edit" title="编辑" @click="showUpdateDiv(row)"/>
                  <el-popconfirm 
                    :title="`你确定要删除${row.attrName}吗？`"
                    @onConfirm="deleteAttr(row)">
                    <HintButton  slot="reference" size="mini" type="danger" icon="el-icon-delete" title="删除"/>
                  </el-popconfirm>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div v-show="!isShowList">
            <el-form :inline="true" :model="attrForm">
              <el-form-item label="属性名">
                <el-input v-model="attrForm.attrName" placeholder="请输入属性名"></el-input>
              </el-form-item>
            </el-form>

            <el-button type="primary" icon="el-icon-plus" @click="addAttrName" :disabled="!attrForm.attrName">添加属性</el-button>
            <el-button @click="isShowList = true">取消</el-button>

            <el-table
              :data="attrForm.attrValueList"
              style="width: 100%;margin:20px 0;"
              border
            >
              <el-table-column
                label="序号"
                type="index"
                width="80"
                align="center"
                >
              </el-table-column>
              <el-table-column
                label="属性值名称"
              >
                <template slot-scope="{row,$index}">
                  <el-input 
                    :ref="$index"
                    v-if="row.isEdit" 
                    v-model="row.valueName" 
                    placeholder="请输入属性值名称"
                    @blur="toLook(row)"
                    size="mini"
                    ></el-input>
                  <span style="display:block;width:100%;" v-else @click="toEdit(row,$index)">{{row.valueName}}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="操作">
                <template slot-scope="{row,$index}">
                  <el-popconfirm
                    :title="`你确定删除${row.valueName}吗？`"
                    @onConfirm="attrForm.attrValueList.splice($index,1)"
                  >                  
                    <HintButton  
                      slot="reference" 
                      size="mini" 
                      type="danger" 
                      title="删除" 
                      icon="el-icon-delete"
                    />
                  </el-popconfirm>
                </template>
              </el-table-column>
            </el-table>

            <el-button type="primary" @click="save" :disabled="attrForm.attrValueList.length===0">保存</el-button>
            <el-button @click="isShowList = true">取消</el-button>
          </div>
      </el-card>
  </div>
</template>

<script>
import cloneDeep from 'lodash/cloneDeep';
export default {
    name:"Attr",
    data(){
      return{
        category1Id:"",
        category2Id:"",
        category3Id:"",
        attrList:[],
        isShowList:true,
        attrForm:{
          attrName: "",
          attrValueList:[],
          categoryId: null,
          categoryLevel: 3
    //     "attrValueList": [
    //       {
    //         "attrId": 0,
    //         "id": 0,
    //         "valueName": "string"
    //       }
    //     ],
    //     "categoryId": 0,
    //     "categoryLevel": 0,
    //     "id": 0
        }
      }
    },
    methods:{
      changeCategory({categoryId,level}){
        if(level === 1){
          this.category1Id = categoryId;
          this.category2Id = "";
          this.category3Id = "";
          this.attrList = [];
        }else if(level === 2){
          this.category2Id = categoryId;
          this.category3Id = "";
          this.attrList = [];
        }else if(level === 3){
          this.category3Id = categoryId;
          this.getAttrInfoList();
        }
      },
      async getAttrInfoList(){
          const {category1Id,category2Id,category3Id} = this;
          let attrList = await this.$API.attr.getAttrInfoList(category1Id,category2Id,category3Id);
          this.attrList = attrList.data;
      },
      showAddDiv(){
        this.isShowList = false;
        this.attrForm = {
          attrName: "",
          attrValueList:[],
          categoryId: this.category3Id,
          categoryLevel: 3
        }
      },
      addAttrName(){
        this.attrForm.attrValueList.push({
          attrId: this.attrForm.id,
          valueName: "",
          isEdit:true
        })

        this.$nextTick(()=>{
          this.$refs[this.attrForm.attrValueList.length - 1].focus();
        })
      },
      showUpdateDiv(row){
        this.isShowList = false;
        this.attrForm = cloneDeep(row);
        this.attrForm.attrValueList.forEach((item)=>{
          this.$set(item,'isEdit',false);
        });
      },
      toLook(row){
        const valueName = row.valueName;
        if(!valueName.trim()){
          this.$message.info('属性值名称不能为空!!!')
          return;
        }
        let isRepeat = this.attrForm.attrValueList.some((item)=>{
          if(item!==row){
            return item.valueName === row.valueName;
          }
        })
        if(isRepeat){
          this.$message.info('属性值名称不能重复!!!')
          return;
        }
        row.isEdit = false;
      },
      toEdit(row,$index){
        row.isEdit = true;

        this.$nextTick(()=>{
          this.$refs[$index].focus();
        })
      },
      async save(){
        /*
          1.当属性值列表中没有内容,无法发送保存请求
          2.将所有属性值名称为空的对象都排除
          3.如果当前没有属性名,无法保存
          4.将无用的属性删除,例如:isEdit
        */
        const attrForm = this.attrForm;

        const attrValueList = attrForm.attrValueList.filter((item)=>{
          if(item.valueName){
            delete item.isEdit;
            return true;
          }
          return false;
        });
        
        if(!attrValueList.length||!attrForm.attrName){
          this.$message.info('保存失败,属性名/属性值不能为空!!!');
          return;
        }

        try{
          await this.$API.attr.addOrUpdate(attrForm);
          this.$message.success('保存成功');
          this.getAttrInfoList();
        }catch(e){
          this.$message.error('保存失败');
        }
        
        this.isShowList = true;
      },
      async deleteAttr(row){
        try{
          await this.$API.attr.deleteAttr(row.id);
          this.$message.success('保存成功');
          this.getAttrInfoList();
        }catch(e){
          this.$message.error('删除失败');
        }
      }
    }
}
</script>

<style lang="scss">

</style>