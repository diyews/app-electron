import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RecommendResponse, RecommendResponsePaging } from './models/RecommendResponse.model';
import { AnswerResponse, AnswerResponsePaging } from './models/AnswerResponse.model';

@Injectable()
export class ZhihuService {
  private v4Api = `https://www.zhihu.com/api/v4/`;
  private recommendUrl = 'https://www.zhihu.com/api/v3/feed/topstory/recommend?desktop=true';
  private recommendPaging: RecommendResponsePaging;
  private lastQuestionId: number;
  private answerPaging: AnswerResponsePaging;

  constructor(private http: HttpClient,
  ) {
  }

  fetchRecommend(refresh = false) {
    const url = (!this.recommendPaging || refresh) ? this.recommendUrl : this.recommendPaging.next;

    return new Observable<RecommendResponse>(sb => {
      this.http.get(url)
        .subscribe((data: RecommendResponse) => {
          this.recommendPaging = data.paging;
          sb.next(data);
          sb.complete();
        }, sb.error.bind(sb));
    });
  }
  
  fetchAnswer({ questionId, answerId }: { questionId: number, answerId?: number }) {
    let url = `${this.v4Api}questions/${questionId}/answers?include=data%5B*%5D.is_normal%2Cadmin_closed_comment%2Creward_info%2Cis_co
    llapsed%2Cannotation_action%2Cannotation_detail%2Ccollapse_reason%2Cis_sticky%2Ccollapsed_by%2Csuggest_edit%2Ccomment_count%2Ccan
    _comment%2Ccontent%2Ceditable_content%2Cvoteup_count%2Creshipment_settings%2Ccomment_permission%2Ccreated_time%2Cupdated_time%2Cr
    eview_info%2Crelevant_info%2Cquestion%2Cquestion.content%2Cexcerpt%2Crelationship.is_authorized%2Cis_author%2Cvoting%2Cis_thanked
    %2Cis_nothelp%2Cis_labeled%2Cis_recognized%2Cpaid_info%3Bdata%5B*%5D.mark_infos%5B*%5D.url%3Bdata%5B*%5D.author.follower_count%2C
    badge%5B*%5D.topics&offset=&limit=6&sort_by=default&platform=desktop`;
    if (questionId !== this.lastQuestionId) {
      
    } else {
      url = this.answerPaging.next;
    }

    return new Observable<AnswerResponse>(sb => {
      this.http.get(url)
        .subscribe((data: AnswerResponse) => {
          this.answerPaging = data.paging;
          sb.next(data);
          sb.complete();
        }, sb.error.bind(sb));
    });
  }
}
