// import Vue from 'vue'
import Router from 'vue-router'
import Foo from './views/foo.vue'
import Register from './views/register.vue'
import Password from './views/password.vue'
import Forget from './views/forgetpwd.vue'
import My from './views/my.vue'
import BasicInformation from './views/basicInformation.vue'
import Company from './views/company.vue'
import Connect from './views/connect.vue'
import ChangePwd from './views/changePwd.vue'
import CompanyType from "./views/companyType.vue"
import AddCompany from "./views/addCompany.vue"
import WorkOrder from "./views/workOrder.vue"
import OrderDone from "./views/order/done.vue"
import OrderDetail from "./views/order/orderDetail.vue"
import OrderAssign from "./views/order/assign.vue"
import DeviceDetail from "./views/deviceDetail.vue"
import Map from "./views/Map.vue"
import Report from "./views/report.vue"
import AddEquipment from "./views/addEquipment.vue"
import PeopleList from "./views/peopleList.vue"
import Device from "./views/device.vue"
import DeviceName from "./views/deviceDetail/name.vue"
import DeviceCategory from "./views/deviceDetail/category.vue"
import DeviceBrand from "./views/deviceDetail/brand.vue"
import DeviceModel from "./views/deviceDetail/model.vue"
import DeviceCompany from "./views/deviceDetail/useCompany.vue"
import DevicePhoto from "./views/deviceDetail/photo.vue"
import DevicePosition from "./views/deviceDetail/position.vue"
import DeviceNote from "./views/deviceDetail/note.vue"
import DeviceqrCode from "./views/deviceDetail/qrCode.vue"
import DeviceStandard from "./views/deviceDetail/standard.vue"
import DeviceBatchNumber from "./views/deviceDetail/batchNumber.vue"
import DeviceWarrantyTime from "./views/deviceDetail/warrantyTime.vue"
// import CompanyName from "./views/basicInformation/companyName.vue"
import MyExplanation from "./views/basicInformation/explanation.vue"
import Logo from "./views/basicInformation/logo.vue"
import MyTradeRange from "./views/basicInformation/tradeRange.vue"
//import CategoryOne from "./views/deviceDetail/category.one.vue"

Vue.use(Router)

export default new Router({
    routes: [
        { path: '/login', component: Foo },
        { path: '/register', component: Register },
        { path: '/password', component: Password },
        { path: '/forgetpwd', component: Forget },
        {
            path: '/my', component: My,
            children: [
                {
                    path: 'basicInformation', component: BasicInformation,
                    children: [
                        { path: 'companyInformation/:value', component: MyExplanation },
                        { path: 'photo/:value', component: Logo },
                        { path: 'Categorys/:value', component: MyTradeRange },
                    ]
                },
                { path: 'connect', component: Connect },
                { path: 'changePwd', component: ChangePwd },
                { path: 'report', component: Report },
                {
                    path: 'peopleList', component: PeopleList,
                    children: [
                        { path: 'map/:id/:name', component: Map }
                    ]
                }
            ]
        },
        {
            path: '/workOrder', component: WorkOrder,
            children: [

                {
                    path: 'orderDetail/:id', component: OrderDetail,
                    children: [
                        { name: 'assign', path: 'assign', component: OrderAssign },
                        { name: 'done', path: 'done', component: OrderDone },
                    ]
                }
            ]
        },
        {
            path: '/device', component: Device, children: [
                {
                    path: 'detail/:id', component: AddEquipment,
                    children: [
                        { path: 'equipmentName', name: 'equipmentName', component: DeviceName },
                        { path: 'category', name: 'category', component: DeviceCategory },
                        { path: 'brand', name: 'brand', component: DeviceBrand },
                        { path: 'equipmentModel', name: 'equipmentModel', component: DeviceModel },
                        { path: 'useCompany', name: 'useCompany', component: DeviceCompany },
                        { path: 'position', name: 'position', component: DevicePosition },
                        { path: 'note', name: 'note', component: DeviceNote },
                        { path: 'qrCode', name: 'qrCode', component: DeviceqrCode },
                        { path: 'photoes', name: 'photoes', component: DevicePhoto },
                        { path: 'standard', name: 'standard', component: DeviceStandard },
                        { path: 'batchNumber', name: 'batchNumber', component: DeviceBatchNumber },
                        { path: 'warrantyTime', name: 'warrantyTime', component: DeviceWarrantyTime },


                    ]
                }
            ]
        },
        { path: '/companyType', component: CompanyType },
        { path: '/addCompany', component: AddCompany },
        { path: '/company', component: Company },
        { path: '/map/:id/:name', component: Map },
        { path: '/addEquipment/:id', component: AddEquipment },
        { path: '/', redirect: '/workOrder' }
    ]
})