/*
 * @name: Hypic VIP Exclusive Unlock
 * @author: Quoc Khanh Media
 * @description: Mở khóa tính năng VIP cho ứng dụng Hypic
 */

const url = $request.url;
let body = $response.body;

if (body) {
    let obj = JSON.parse(body);

    // 1. Xử lý thông tin VIP người dùng
    if (url.includes("/vip/info") || url.includes("/user/profile")) {
        obj.data = {
            ...obj.data,
            "is_vip": true,
            "vip_type": 1,
            "expire_time": 4102444799, // Năm 2099
            "status": 1,
            "can_use_vip": true,
            "is_free_trial": false,
            "subscription_plan": "annual_vip"
        };
    }

    // 2. Mở khóa quyền truy cập tài nguyên (Filter, AI, Tool VIP)
    if (url.includes("/resource/privilege")) {
        obj.data = {
            ...obj.data,
            "has_privilege": true,
            "privilege_type": 1
        };
    }

    body = JSON.stringify(obj);
}

$done({ body });
