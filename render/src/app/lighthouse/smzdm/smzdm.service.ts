import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Observer } from 'rxjs';
import { SMZDM_SERCH, SmzdmItem } from './smzdm.model';

@Injectable()
export class SmzdmService {

    constructor(private httpClient: HttpClient) {
    }

    static urlFactory(type, timesout) {
        return `${SMZDM_SERCH}?filter=${type}&type=a&timesort=${timesout}`;
    }

    getItems(type, timesort) {
        const ob = Observable.create((observer: Observer<any>) => {
            this.httpClient.get<SmzdmItem[]>(SmzdmService.urlFactory(type, timesort))
                .subscribe(data => {
                    data.forEach(x => {
                        x.article_content = x.article_content.replace(/<.*?>/g, '');
                    });
                    observer.next(data);
                }, error => {
                    observer.error(error);
                }, () => {
                    observer.complete();
                });
        });
        return ob;
    }
}
