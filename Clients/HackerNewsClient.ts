public class HackerNewsClient : IHackerNewsClient
{
    private readonly HttpClient _http;

    public HackerNewsClient(HttpClient http)
    {
        _http = http;
    }

    public async Task<List<int>> GetNewestStoryIdsAsync()
    {
        return await _http.GetFromJsonAsync<List<int>>(
            "https://hacker-news.firebaseio.com/v0/newstories.json"
        ) ?? new();
    }

    public async Task<HackerNewsItem?> GetItemAsync(int id)
    {
        return await _http.GetFromJsonAsync<HackerNewsItem>(
            $"https://hacker-news.firebaseio.com/v0/item/{id}.json"
        );
    }
}
