import request from '../../utils/request';
export default {
    getPageList(page,limit){
        return request.get(`/admin/product/baseTrademark/${page}/${limit}`);
    },
    addOrUpdate(info){
        if(info.id){
            return request.put(`/admin/product/baseTrademark/update`,info);
        }else{
            return request.post(`/admin/product/baseTrademark/save`,info);
        }
    },
    deleteTradeMark(id){
        return request.delete(`/admin/product/baseTrademark/remove/${id}`);
    },

    //GET /admin/product/baseTrademark/getTrademarkList
    getBaseTrademark(){
        return request.get(`/admin/product/baseTrademark/getTrademarkList`);
    },
}