builder.Services.AddMemoryCache();

builder.Services.AddScoped<StoryService>();
builder.Services.AddScoped<IStoryService>(provider =>
{
    var inner = provider.GetRequiredService<StoryService>();
    var cache = provider.GetRequiredService<IMemoryCache>();
    return new CachedStoryService(inner, cache);
});
