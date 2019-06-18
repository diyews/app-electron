export interface AnswerResponse {
  data: (Answer)[] | null;
  paging: AnswerResponsePaging;
}
export interface Answer {
  __more: boolean;
  id: number;
  type: string;
  answer_type: string;
  question: Question;
  author: Author;
  url: string;
  is_collapsed: boolean;
  created_time: number;
  updated_time: number;
  extras: string;
  is_copyable: boolean;
  is_normal: boolean;
  voteup_count: number;
  comment_count: number;
  is_sticky: boolean;
  admin_closed_comment: boolean;
  comment_permission: string;
  can_comment: CanComment;
  reshipment_settings: string;
  _content: string;
  content: string;
  editable_content: string;
  excerpt: string;
  collapsed_by: string;
  collapse_reason: string;
  annotation_action?: null;
  mark_infos?: (null)[] | null;
  relevant_info: RelevantInfo;
  suggest_edit: SuggestEdit;
  is_labeled: boolean;
  reward_info: RewardInfo;
  relationship: Relationship;
}
interface Question {
  type: string;
  id: number;
  title: string;
  question_type: string;
  created: number;
  updated_time: number;
  url: string;
  relationship: null;
}
interface Author {
  id: string;
  url_token: string;
  name: string;
  avatar_url: string;
  avatar_url_template: string;
  is_org: boolean;
  type: string;
  url: string;
  user_type: string;
  headline: string;
  badge?: (null)[] | null;
  gender: number;
  is_advertiser: boolean;
  follower_count: number;
  is_followed: boolean;
  is_privacy: boolean;
}
interface CanComment {
  reason: string;
  status: boolean;
}
interface RelevantInfo {
  is_relevant: boolean;
  relevant_type: string;
  relevant_text: string;
}
interface SuggestEdit {
  reason: string;
  status: boolean;
  tip: string;
  title: string;
  unnormal_details: UnnormalDetails;
  url: string;
}
interface UnnormalDetails {
  status: string;
  description: string;
  reason: string;
  reason_id: number;
  note: string;
}
interface RewardInfo {
  can_open_reward: boolean;
  is_rewardable: boolean;
  reward_member_count: number;
  reward_total_money: number;
  tagline: string;
}
interface Relationship {
  is_author: boolean;
  is_authorized: boolean;
  is_nothelp: boolean;
  is_thanked: boolean;
  is_recognized: boolean;
  voting: number;
  upvoted_followees?: (null)[] | null;
}
export interface AnswerResponsePaging {
  is_end: boolean;
  is_start: boolean;
  next: string;
  previous: string;
  totals: number;
}
