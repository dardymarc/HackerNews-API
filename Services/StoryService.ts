public class StoryService : IStoryService
{
    private readonly IHackerNewsClient _client;
    private readonly IMemoryCache _cache;

    private const string CacheKey = "newstories";

    public StoryService(IHackerNewsClient client, IMemoryCache cache)
    {
        _client = client;
        _cache = cache;
    }

    public async Task<List<HackerNewsItem>> GetStoriesAsync(int page, int pageSize, string? search)
    {
        var stories = await _cache.GetOrCreateAsync(CacheKey, async entry =>
        {
            entry.AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(5);

            var ids = await _client.GetNewestStoryIdsAsync();

            var tasks = ids.Take(200).Select(id => _client.GetItemAsync(id));
            var results = await Task.WhenAll(tasks);

            return results
                .Where(x => x != null && x.Type == "story")
                .ToList()!;
        });

        if (!string.IsNullOrWhiteSpace(search))
        {
            stories = stories!
                .Where(s => s.Title?.Contains(search, StringComparison.OrdinalIgnoreCase) == true)
                .ToList();
        }

        return stories!
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .ToList();
    }
}
