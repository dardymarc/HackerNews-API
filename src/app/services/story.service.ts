@Injectable({ providedIn: 'root' })
export class StoryService {
  constructor(private http: HttpClient) {}

  getStories(page: number, search: string) {
    return this.http.get<any[]>(
      `/api/stories?page=${page}&pageSize=20&search=${search}`
    );
  }
}
