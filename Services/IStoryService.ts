public interface IStoryService
{
    Task<List<HackerNewsItem>> GetStoriesAsync(int page, int pageSize, string? search);
}
