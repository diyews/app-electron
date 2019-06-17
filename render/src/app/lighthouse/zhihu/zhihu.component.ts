import { Component, OnInit } from '@angular/core';
import { ZhihuService } from './zhihu.service';
import { RecommendList } from './models/RecommendResponse.model';

@Component({
  selector: 'app-zhihu',
  templateUrl: './zhihu.component.html',
  styleUrls: ['./zhihu.component.scss']
})
export class ZhihuComponent implements OnInit {
  list: RecommendList[] = [];

  constructor(private zhihuService: ZhihuService,
              ) { }

  ngOnInit() {
    this.zhihuService.fetchRecommend()
      .subscribe((data) => {
        this.list = this.list.concat(data.data);
      });
  }
}
