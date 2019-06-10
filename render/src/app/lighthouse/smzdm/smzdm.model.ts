export const SMZDM_SERCH = 'https://faxian.smzdm.com/json_more';

export const SMZDM_ITEM_TYPE = {
    ELECTRONIC: 'h1s0t0f163c0'
};

export interface SmzdmItem {
    article_id: string;
    article_url: string;
    article_pic_url: string;
    article_pic_style: string;
    article_title: string;
    article_price: string;
    article_referrals: string;
    article_is_anonymous: number;
    article_avatar: string;
    article_u_num: number;
    article_avatar_url: string;
    article_display_date: string;
    article_date: string;
    article_content: string;
    article_yh_type: string;
    article_mall: string;
    article_mall_url: string;
    article_link: string;
    article_link_list?: (null)[] | null;
    article_taobao_url: ArticleTaobaoUrl;
    article_rating: number;
    article_collection: string;
    article_comment: number;
    article_top_category: string;
    article_mall_domain: string;
    article_is_review: string;
    home_url: string;
    timesort: number;
    article_channel_note: string;
    is_black_five: number;
    gtm: Gtm;
    stock_status_note: string;
    is_out: number;
    is_timeout: number;
    mobile_exclusive: string;
    product_icon_type: string;
    article_product_icon: string;
    article_channel: string;
    new_page_type: boolean;
    article_button_name: string;
}
export interface ArticleTaobaoUrl {
    is_taobao: boolean;
    taobao_url: string;
    href: string;
}
export interface Gtm {
    id: string;
    title: string;
    brand: string;
    rmb_price: number;
    mall: string;
    channel_dimension: string;
    dimension4: string;
    buy_domain: string;
    dimension20: string;
    dimension12: string;
    dimension32: string;
    cates_str: string;
    dimension25: string;
    dimension34: string;
    object: string;
}
