[Fact]
public async Task Filters_By_Search()
{
    var mockService = new Mock<IHackerNewsClient>();
    var cache = new MemoryCache(new MemoryCacheOptions());

    mockService.Setup(x => x.GetNewestStoryIdsAsync())
        .ReturnsAsync(new List<int> { 1 });

    mockService.Setup(x => x.GetItemAsync(1))
        .ReturnsAsync(new HackerNewsItem { Title = "Angular News" });

    var service = new StoryService(mockService.Object, cache);

    var result = await service.GetStoriesAsync(1, 10, "Angular");

    Assert.Single(result);
}
