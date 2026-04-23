public interface IHackerNewsClient
{
    Task<List<int>> GetNewestStoryIdsAsync();
    Task<HackerNewsItem?> GetItemAsync(int id);
}
