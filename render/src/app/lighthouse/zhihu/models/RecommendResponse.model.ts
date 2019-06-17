export interface RecommendResponse {
  data?: (RecommendList)[] | null;
  paging: RecommendResponsePaging;
  fresh_text: string;
}
export interface RecommendList {
  __more: boolean;
  id: string;
  type: string;
  offset: number;
  verb: string;
  created_time: number;
  updated_time: number;
  target: RecommendAnswer;
  brief: string;
  uninterest_reasons?: (UninterestReasonsEntity)[] | null;
  attached_info: string;
  actors?: (ActorsEntity)[] | null;
  show_actor_time: boolean;
  action_text: string;
  action_text_tpl: string;
  action_card: boolean;
}
export interface RecommendAnswer {
  __more: boolean;
  id: number;
  type: string;
  url: string;
  author: Author;
  content: string;
  created_time: number;
  updated_time: number;
  voteup_count: number;
  thanks_count: number;
  comment_count: number;
  is_copyable: boolean;
  question: Question;
  thumbnail: string;
  excerpt: string;
  excerpt_new: string;
  preview_type: string;
  preview_text: string;
  visited_count: number;
  title?: string;
}
interface Author {
  id: string;
  type: string;
  url: string;
  user_type: string;
  url_token: string;
  name: string;
  headline: string;
  avatar_url: string;
  is_org?: boolean | null;
  gender?: number | null;
  badge?: (null)[] | null;
  followers_count?: number | null;
  is_following?: boolean | null;
  is_followed?: boolean | null;
}
interface Question {
  id: number;
  type: string;
  url: string;
  author: Author;
  title: string;
  created: number;
  answer_count: number;
  follower_count: number;
  comment_count: number;
  bound_topic_ids?: (number)[] | null;
  is_following: boolean;
  excerpt: string;
  question_type: string;
}
interface UninterestReasonsEntity {
  reason_id: number;
  reason_type: string;
  object_token: string;
  object_type: string;
  reason_text: string;
}
interface ActorsEntity {
  id: string;
  type: string;
  url: string;
  avatar_url: string;
  name: string;
  excerpt: string;
  introduction: string;
  meta?: Meta | null;
}
interface Meta {
  id: number;
  category: string;
  type: string;
}
export interface RecommendResponsePaging {
  previous: string;
  next: string;
  is_end: boolean;
}
