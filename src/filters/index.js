const storage = weex.requireModule('storage')
export function userType(typeId) {
    var enums = {
        '1': '服务单位用户',
        '2': '使用单位用户',
        '4': '服务单位用户管理员',
        '8': '使用单位用户管理员',
        '16': '超级管理员',
        '32': '公共用户',
    }
    return enums[typeId] || '未知'
}

export function orderType(typeId) {
    return {
        '1': '需要维修',
        '2': '需要保养'
    }[typeId]
}

export function orderLevel(level) {
    return {
        '1': '普通工单',
        '2': '加急工单'
    }[level]
}
const _orderStateEnum = {
    '8': { name: '待派单', color: '', src: 'http://img.zmnbx.com//dist/Images/sendOrange.png' },
    '16': { name: '待服务', color: '', src: 'http://img.zmnbx.com//dist/Images/serverPink.png' },
    '32': { name: '工作中', color: '', src: 'http://img.zmnbx.com//dist/Images/workingGreen.png' },
    '64': { name: '未确认', color: '', src: 'http://img.zmnbx.com//dist/Images/unconfirmedPurple.png' },
    '128': { name: '未解决', color: '', src: 'http://img.zmnbx.com//dist/Images/notSolvedRed.png' },
    '256': { name: '已取消', color: '', src: 'http://img.zmnbx.com//dist/Images/cancelDarkGray.png' },
    '512': { name: '已关闭', color: '', src: 'http://img.zmnbx.com//dist/Images/closedDoneGray.png' },
    '1024': { name: '已完成', color: '', src: 'http://img.zmnbx.com//dist/Images/doneBlue.png' },
    '2048': { name: '已完成', color: '', src: 'http://img.zmnbx.com//dist/Images/doneBlue.png' },
    '4096': { name: '已转单', color: '', src: 'http://img.zmnbx.com//dist/Images/transfer.png' }
}
const _stateSvcAdmin = {
    '8': { name: '待派单', color: '', src: 'http://img.zmnbx.com//dist/Images/sendOrange.png' },
    '16': { name: '已派单', color: '', src: 'http://img.zmnbx.com//dist/Images/sendedBule.png' },
    '32': { name: '工作中', color: '', src: 'http://img.zmnbx.com//dist/Images/workingGreen.png' },
    '64': { name: '未确认', color: '', src: 'http://img.zmnbx.com//dist/Images/unconfirmedPurple.png' },
    '128': { name: '未解决', color: '', src: 'http://img.zmnbx.com//dist/Images/notSolvedRed.png' },
    '256': { name: '已取消', color: '', src: 'http://img.zmnbx.com//dist/Images/cancelDarkGray.png' },
    '512': { name: '已关闭', color: '', src: 'http://img.zmnbx.com//dist/Images/closedDoneGray.png' },
    '1024': { name: '已完成', color: '', src: 'http://img.zmnbx.com//dist/Images/doneBlue.png' },
    '2048': { name: '已完成', color: '', src: 'http://img.zmnbx.com//dist/Images/doneBlue.png' },
    '4096': { name: '已转单', color: '', src: 'http://img.zmnbx.com//dist/Images/transfer.png' }
}

export function orderState(state) {
    
    return _orderStateEnum[state]
}
  
export function orderStatePic(state) {  
    return _orderStateEnum[state].src;

}

export function orderSvcAdminPic(state) {  
    return _stateSvcAdmin[state].src;

}
