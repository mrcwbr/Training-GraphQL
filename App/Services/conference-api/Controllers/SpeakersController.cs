using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using conference_api.Data;
using conference_api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Session;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query.SqlExpressions;

namespace conference_api.Controllers
{
    [ApiController]
    [Route("speakers")]
    public class SpeakersController : ControllerBase
    {
        private readonly IDbContextFactory<ApplicationDbContext> _dbContextFactory;

        public SpeakersController(IDbContextFactory<ApplicationDbContext> dbContextFactory)
        {
            _dbContextFactory = dbContextFactory;
        }

        [HttpGet()]
        public async Task<List<SpeakerResponseModel>> GetSpeakers()
        {
            await using var dbContext = _dbContextFactory.CreateDbContext();
            return await dbContext.Speakers
                .Include(m => m.SessionSpeakers)
                .Select(m => MapToResponseModel(m))
                .ToListAsync();
        }

        [HttpGet("{speakerId:int}")]
        public async Task<SpeakerResponseModel> GetSpeaker(int speakerId)
        {
            await using var dbContext = _dbContextFactory.CreateDbContext();
            var speaker = await dbContext.Speakers
                .Include(m => m.SessionSpeakers)
                .FirstAsync(m => m.Id == speakerId);

            return MapToResponseModel(speaker);
        }

        [HttpPost("fromIds")]
        public async Task<List<SpeakerResponseModel>> GetSpeakers([FromBody] IEnumerable<int> speakerIds)
        {
            await using var dbContext = _dbContextFactory.CreateDbContext();
            return await dbContext.Speakers
                .Include(m => m.SessionSpeakers)
                .Where(m => speakerIds.Any(n => n == m.Id))
                .Select(m => MapToResponseModel(m))
                .ToListAsync();
        }

        private static SpeakerResponseModel MapToResponseModel(Speaker speaker) => new()
        {
            Id = speaker.Id,
            Bio = speaker.Bio,
            Name = speaker.Name,
            WebSite = speaker.WebSite,
            SessionIds = speaker.SessionSpeakers.Select(n => n.SessionId)
        };
    }
}