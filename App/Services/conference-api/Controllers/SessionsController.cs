using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using conference_api.Data;
using conference_api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Session;
using Microsoft.EntityFrameworkCore;

namespace conference_api.Controllers
{
    [ApiController]
    [Route("sessions")]
    public class SessionsController : ControllerBase
    {
        private readonly IDbContextFactory<ApplicationDbContext> _dbContextFactory;

        public SessionsController(IDbContextFactory<ApplicationDbContext> dbContextFactory)
        {
            _dbContextFactory = dbContextFactory;
        }

        [HttpGet()]
        public async Task<List<SessionResponseModel>> GetSessions()
        {
            await using var dbContext = _dbContextFactory.CreateDbContext();
            return await dbContext.Sessions
                .Include(m => m.SessionSpeakers)
                .Select(m => MapToResponseModel(m))
                .ToListAsync();
        }

        [HttpGet("{sessionId:int}")]
        public async Task<SessionResponseModel> GetSession(int sessionId)
        {
            await using var dbContext = _dbContextFactory.CreateDbContext();
            var session = await dbContext.Sessions
                .Include(m => m.SessionSpeakers)
                .FirstAsync(m => m.Id == sessionId);

            return MapToResponseModel(session);
        }

        [HttpPost("fromIds")]
        public async Task<List<SessionResponseModel>> GetSessions([FromBody] IEnumerable<int> sessionIds)
        {
            await using var dbContext = _dbContextFactory.CreateDbContext();
            return await dbContext.Sessions
                .Include(m => m.SessionSpeakers)
                .Where(m => sessionIds.Any(n => n == m.Id))
                .Select(m => MapToResponseModel(m))
                .ToListAsync();
        }

        private static SessionResponseModel MapToResponseModel(Session session) => new()
        {
            Id = session.Id,
            Abstract = session.Abstract,
            Duration = session.Duration,
            Title = session.Title,
            EndTime = session.EndTime,
            SpeakerIds = session.SessionSpeakers.Select(m => m.SpeakerId).ToList(),
            StartTime = session.StartTime,
            TrackId = session.TrackId
        };
    }
}