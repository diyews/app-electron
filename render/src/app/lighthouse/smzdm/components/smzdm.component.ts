import { Component, NgZone, ViewChild, ElementRef, OnInit, AfterViewChecked } from '@angular/core';
import { SmzdmService } from '../smzdm.service';
import { SMZDM_ITEM_TYPE, SmzdmItem } from '../smzdm.model';

@Component({
    selector: 'smzdm',
    templateUrl: '../views/smzdm.component.html',
    styleUrls: ['../styles/smzdm.component.scss']
})

export class SmzdmComponent implements OnInit, AfterViewChecked {
    @ViewChild('scrollElement', { static: true }) scrollElement: ElementRef;

    private itemListModel: SmzdmItem[] = [];
    private minRating = 10;
    lastTimesort: number = +new Date() / 1e3;
    itemList: SmzdmItem[] = [];
    loading = false;

    constructor(private smzdmService: SmzdmService,
                private zone: NgZone
    ) {
        this.fetchItemList();
    }

    ngOnInit() {
        /*this.smzdmService.getItems(SMZDM_ITEM_TYPE.electronic, this.lastTimesort)
            .subscribe(data => {
                console.log(data);
            })*/
        this.zone.runOutsideAngular(() => {
            this.scrollElement.nativeElement.addEventListener('scroll', this.onScroll.bind(this));
        });
    }

    onScroll(e: Event) {
        const ele = e.target as HTMLElement;
        if (ele.scrollHeight - (ele.clientHeight + ele.scrollTop) < 800) {
            this.zone.run(() => {
                this.fetchItemList();
            });
        }
    }

    fetchItemList() {
        if (this.loading) {
            return;
        }
        this.loading = true;

        this.smzdmService.getItems(SMZDM_ITEM_TYPE.ELECTRONIC, this.lastTimesort)
            .subscribe(data => {
                // console.log(data);
                this.itemListModel = this.itemListModel.concat(data);
                this.itemList = this.itemList.concat(data.filter(v => v.article_rating >= this.minRating));
                this.lastTimesort = data[data.length - 1].timesort;

                this.loading = false;

                if (this.itemList.length < 10) {
                    this.fetchItemList();
                }
            }, error => {
                this.loading = false;
            });
    }

    ngAfterViewChecked() {
        const ele = this.scrollElement.nativeElement;
        if ( (ele.scrollHeight === (ele.clientHeight + ele.scrollTop)) && !this.loading ) {
            this.fetchItemList();
        }
    }
}
