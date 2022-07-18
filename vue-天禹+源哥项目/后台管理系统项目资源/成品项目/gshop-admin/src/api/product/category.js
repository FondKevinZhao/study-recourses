import request from '../../utils/request';
export default {
    // GET /admin/product/getCategory1
    getCategory1(){
        return request.get(`/admin/product/getCategory1`)
    },

    // GET /admin/product/getCategory2/{category1Id}
    getCategory2(category1Id){
        return request.get(`/admin/product/getCategory2/${category1Id}`)
    },

    // GET /admin/product/getCategory3/{category2Id}
    getCategory3(category2Id){
        return request.get(`/admin/product/getCategory3/${category2Id}`)
    }
}