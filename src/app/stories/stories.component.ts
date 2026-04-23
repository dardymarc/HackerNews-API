@Component({
  selector: 'app-stories',
  templateUrl: './stories.component.html'
})
export class StoriesComponent implements OnInit {
  stories: any[] = [];
  page = 1;
  search = '';

  constructor(private service: StoryService) {}

  ngOnInit() {
    this.load();
  }

  load() {
    this.service.getStories(this.page, this.search)
      .subscribe(data => this.stories = data);
  }

  onSearch() {
    this.page = 1;
    this.load();
  }

  next() {
    this.page++;
    this.load();
  }

  prev() {
    if (this.page > 1) {
      this.page--;
      this.load();
    }
  }
}
