/*
 * @name: Locket Gold Exclusive by Quoc Khanh Media
 * @description: Unlock Gold, Badge, Icon, Theme & 15s Video
 */

const url = $request.url;
let body = $response.body;

if (body) {
    let obj = JSON.parse(body);

    // 1. Mở khóa Gold & Huy hiệu (Endpoint: /v1/user/me hoặc /v1/subscriptions)
    if (url.includes("/v1/user/me") || url.includes("/v1/subscriptions")) {
        obj.data = {
            ...obj.data,
            "is_gold": true,
            "is_gold_member": true,
            "subscription_active": true,
            "gold_expiration_date": "2099-12-31T23:59:59Z",
            "feature_flags": {
                "can_use_themes": true,
                "can_use_icons": true,
                "can_record_15s": true,
                "show_gold_badge": true
            },
            "badge_type": "gold_exclusive"
        };
        
        // Thêm thông tin đăng ký để giữ trạng thái
        obj.subscriptions = [{
            "type": "gold",
            "status": "active",
            "expires_at": "2099-12-31T23:59:59Z"
        }];
    }

    // 2. Logic cho Video 15s
    if (url.includes("/v1/config")) {
        if (obj.video_limit) obj.video_limit = 15;
        if (obj.max_video_duration) obj.max_video_duration = 15;
    }

    body = JSON.stringify(obj);
}

$done({ body });
