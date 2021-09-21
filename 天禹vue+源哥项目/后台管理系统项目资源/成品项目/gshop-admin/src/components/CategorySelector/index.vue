<template>
  <div>
      <el-form :inline="true" :model="cForm" class="demo-form-inline" :disabled="!isShowList">
        <el-form-item label="一级分类">
          <el-select v-model="cForm.category1Id" placeholder="请选择" @change="changeCategory1">
            <el-option
             v-for="(c1,index) in category1List"  
             :label="c1.name"
             :value="c1.id" 
             :key="index"
             ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类">
          <el-select v-model="cForm.category2Id" placeholder="请选择" @change="changeCategory2">
            <el-option
             v-for="(c2,index) in category2List"  
             :label="c2.name"
             :value="c2.id" 
             :key="index"
             ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="三级分类">
          <el-select v-model="cForm.category3Id" placeholder="请选择" @change="changeCategory3">
            <el-option
             v-for="(c3,index) in category3List"  
             :label="c3.name"
             :value="c3.id" 
             :key="index"
             ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
  </div>
</template>

<script>
export default {
    name:"CategorySelector",
    data(){
      return {
        cForm:{
          category1Id:"",
          category2Id:"",
          category3Id:""
        },
        category1List:[],
        category2List:[],
        category3List:[]
      }
    },
    props:{
      isShowList:{
        type:Boolean,
        default:true
      }
    },
    mounted(){
      this.getCategory1();
    },
    methods:{
      async getCategory1(){
        let category1List = await this.$API.category.getCategory1();
        this.category1List = category1List.data;
      },
      async changeCategory1(){
        this.cForm.category2Id = "";
        this.cForm.category3Id = "";
        this.category2List=[];
        this.category3List=[];
        let category2List = await this.$API.category.getCategory2(this.cForm.category1Id);
        this.category2List = category2List.data;

        this.$emit('changeCategory',{categoryId:this.cForm.category1Id,level:1});
      },
      async changeCategory2(){
        this.cForm.category3Id = "";
        this.category3List=[];
        let category3List = await this.$API.category.getCategory3(this.cForm.category2Id);
        this.category3List = category3List.data;

        this.$emit('changeCategory',{categoryId:this.cForm.category2Id,level:2});
      },
      async changeCategory3(){
        this.$emit('changeCategory',{categoryId:this.cForm.category3Id,level:3});
      },
    }
}
</script>

<style lang="scss">

</style>