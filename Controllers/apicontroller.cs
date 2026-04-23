[ApiController]
[Route("api/[controller]")]
public class StoriesController : ControllerBase
{
    private readonly IStoryService _service;

    public StoriesController(IStoryService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<IActionResult> Get(
        int page = 1,
        int pageSize = 20,
        string? search = null)
    {
        var result = await _service.GetStoriesAsync(page, pageSize, search);
        return Ok(result);
    }
}
