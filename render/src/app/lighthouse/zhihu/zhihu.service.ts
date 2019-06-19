import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// @ts-ignore
import PouchDB from 'pouchdb';
import { RecommendResponse, RecommendResponsePaging } from './models/RecommendResponse.model';
import { AnswerResponse, AnswerResponsePaging } from './models/AnswerResponse.model';
import { PouchDBPutResult } from '@app/declarations/pouchdb';

interface ViewedAnswer {
  _id: string;
  questionId: number;
  updateTime: number;
  [prop: string]: any;
}

interface AnswerPagingDoc {
  _id: string; // questionId
  _rev?: string;
  paging: AnswerResponsePaging;
}

@Injectable()
export class ZhihuService {
  private v4Api = `https://www.zhihu.com/api/v4/`;
  private recommendUrl = 'https://www.zhihu.com/api/v3/feed/topstory/recommend?desktop=true';
  private recommendPaging: RecommendResponsePaging;
  private lastQuestionId: number;
  private lastAnswerPagingDoc: AnswerPagingDoc;
  private answerPaging: AnswerResponsePaging;
  private viewAnswersIndexedDBName = 'zhihu_viewed_answers';
  private viewAnswersIndexedDB = new PouchDB<ViewedAnswer>(this.viewAnswersIndexedDBName);
  private answerPagingIndexedDBName = 'zhihu_answer_paging';
  private answerPagingIndexedDB = new PouchDB<AnswerPagingDoc>(this.answerPagingIndexedDBName);

  constructor(private http: HttpClient,
  ) {
    this.viewAnswersIndexedDB.createIndex({
      index: {
        fields: ['questionId'],
      },
    });
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
  
  /*
  * IndexedDB last question current paging (not next)
  * eg: last returned paging , current returned paging, store last returned paging
  * */
  async fetchAnswer({ questionId, answerId }: { questionId: number, answerId?: number }): Promise<AnswerResponse> {
    let url = `${this.v4Api}questions/${questionId}/answers?include=data%5B*%5D.is_normal%2Cadmin_closed_comment%2Creward_info%2Cis_co
    llapsed%2Cannotation_action%2Cannotation_detail%2Ccollapse_reason%2Cis_sticky%2Ccollapsed_by%2Csuggest_edit%2Ccomment_count%2Ccan
    _comment%2Ccontent%2Ceditable_content%2Cvoteup_count%2Creshipment_settings%2Ccomment_permission%2Ccreated_time%2Cupdated_time%2Cr
    eview_info%2Crelevant_info%2Cquestion%2Cquestion.content%2Cexcerpt%2Crelationship.is_authorized%2Cis_author%2Cvoting%2Cis_thanked
    %2Cis_nothelp%2Cis_labeled%2Cis_recognized%2Cpaid_info%3Bdata%5B*%5D.mark_infos%5B*%5D.url%3Bdata%5B*%5D.author.follower_count%2C
    badge%5B*%5D.topics&offset=&limit=6&sort_by=default&platform=desktop`;
    if (questionId !== this.lastQuestionId) {
      this.lastQuestionId = questionId;
      this.lastAnswerPagingDoc = null;
      this.answerPaging = null;
      try {
        const pagingDoc = await this.answerPagingIndexedDB.get<AnswerPagingDoc>(questionId + '');
        this.lastAnswerPagingDoc = pagingDoc;
        this.answerPaging = pagingDoc.paging;
        url = this.answerPaging.next;
      } catch (e) {
      }
    } else {
      url = this.answerPaging.next;
    }

    const data = await this.http.get(url).toPromise() as AnswerResponse;
    const innerAnswerPaging = this.answerPaging;
    this.answerPaging = data.paging;

    // Answer to IndexedDB
    const doc: AnswerPagingDoc = {
      _id: `${questionId}`,
      paging: data.paging,
    };
    if (!this.lastAnswerPagingDoc) {
      this.putAnswerPaging(doc);
    } else if (+this.lastAnswerPagingDoc._id === questionId && !innerAnswerPaging) {
      doc._rev = this.lastAnswerPagingDoc._rev;
      this.putAnswerPaging(doc);
    }

    return data;
  }

  fetchViewedAnswerByQuestionId(questionId: number) {
    return this.viewAnswersIndexedDB.find({
      selector: {
        questionId,
      }
    });
  }
  
  putViewedAnswer(doc: ViewedAnswer) {
    return this.viewAnswersIndexedDB.put(doc);
  }

  removeViewedAnswer({ id, rev}: PouchDBPutResult) {
    return this.viewAnswersIndexedDB.remove(id, rev);
  }
  
  putAnswerPaging(doc: AnswerPagingDoc) {
    return this.answerPagingIndexedDB.put(doc)
      .then()
      .catch(e => {
        console.log(e);
      });
  }
}
