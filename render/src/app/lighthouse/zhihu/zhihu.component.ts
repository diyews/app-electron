import { Component, OnInit } from '@angular/core';
import { ZhihuService } from './zhihu.service';
import { RecommendList } from './models/RecommendResponse.model';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-zhihu',
  templateUrl: './zhihu.component.html',
  styleUrls: ['./zhihu.component.scss']
})
export class ZhihuComponent implements OnInit {
  list: RecommendList[] = [];
  listLoading = false;

  constructor(private zhihuService: ZhihuService,
              ) { }

  ngOnInit() {
    this.fetchRecommend();
  }
  
  fetchRecommend() {
    if (this.listLoading) {
      return;
    }
    this.listLoading = true;
    this.zhihuService.fetchRecommend()
      .pipe(
        finalize(() => this.listLoading = false)
      )
      .subscribe((data) => {
        this.list = this.list.concat(data.data);
      });
  }
}
