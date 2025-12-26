/*
 * @name: Locket Gold Ultimate (RevenueCat + API Fix)
 * @author: Quoc Khanh Media
 */

const url = $request.url;
let body = $response.body;

if (body) {
    let obj = JSON.parse(body);

    // 1. Xử lý cổng RevenueCat (Mở khóa tính năng Premium/Gold)
    if (url.includes("/v1/subscribers/")) {
        obj.subscriber.subscriptions = {
            "gold": {
                "is_sandbox": false,
                "ownership_type": "PURCHASED",
                "billing_issues_detected_at": null,
                "period_type": "annual",
                "expires_date": "2099-12-31T23:59:59Z",
                "purchase_date": "2024-01-01T00:00:00Z",
                "store": "app_store"
            }
        };
        obj.subscriber.entitlements = {
            "gold": {
                "expires_date": "2099-12-31T23:59:59Z",
                "purchase_date": "2024-01-01T00:00:00Z",
                "product_identifier": "locket_gold_annual"
            }
        };
    }

    // 2. Xử lý cổng Locket-labs (Mở video 15s và Huy hiệu)
    if (url.includes("/v1/user/me") || url.includes("/v1/config")) {
        if (obj.data) {
            obj.data.is_gold = true;
            obj.data.feature_flags = {
                ...obj.data.feature_flags,
                "can_use_themes": true,
                "can_use_icons": true,
                "can_record_15s": true,
                "show_gold_badge": true
            };
        }
        if (obj.video_limit) obj.video_limit = 15;
    }

    body = JSON.stringify(obj);
}

$done({ body });
