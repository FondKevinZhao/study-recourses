import request from '../../utils/request';
export default {
    // GET /admin/product/attrInfoList/{category1Id}/{category2Id}/{category3Id}
    getAttrInfoList(category1Id,category2Id,category3Id){
        return request.get(`/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`)
    },

    // DELETE /admin/product/deleteAttr/{attrId}
    deleteAttr(attrId){
        return request.delete(`/admin/product/deleteAttr/${attrId}`)
    },

    // POST /admin/product/saveAttrInfo
    // {
    //     "attrName": "string",
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
    //   }
    addOrUpdate(attrInfo){
        return request.post(`/admin/product/saveAttrInfo`,attrInfo)
    },

    // GET /admin/product/getAttrValueList/{attrId}
    getAttrValueList(attrId){
        return request.get(`/admin/product/getAttrValueList/${attrId}`)
    },
}