/*
 * @name: Locket Gold Ultimate Unlock
 * @author: Quoc Khanh Media
 * @description: Unlock Gold, Badge, Icon, Theme, 15s Video
 */

const url = $request.url;
let body = $response.body;

if (body) {
    let obj = JSON.parse(body);

    // 1. Mở khóa Full tính năng Gold & Huy hiệu
    if (url.includes("/v1/user/me")) {
        obj.data = {
            ...obj.data,
            "is_gold": true,
            "is_gold_member": true,
            "gold_expiration_date": "2099-12-31T23:59:59Z",
            "feature_flags": {
                "can_use_themes": true,
                "can_use_icons": true,
                "can_record_15s": true,
                "show_gold_badge": true
            }
        };
    }

    // 2. Ép trạng thái Subscription (Để duy trì sau khi tắt VPN)
    if (url.includes("/v1/subscriptions")) {
        obj = {
            "subscriptions": [{
                "type": "gold",
                "status": "active",
                "expires_at": "2099-12-31T23:59:59Z",
                "is_trial": false
            }],
            "entitlements": ["gold"]
        };
    }

    // 3. Mở giới hạn quay Video 15 giây
    if (url.includes("/v1/config")) {
        obj.max_video_duration = 15;
        obj.video_limit = 15;
    }

    body = JSON.stringify(obj);
}

$done({ body });
