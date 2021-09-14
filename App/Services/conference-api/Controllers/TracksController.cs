using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using conference_api.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace conference_api.Controllers
{
    [ApiController]
    [Route("tracks")]
    public class TracksController : ControllerBase
    {
        private readonly IDbContextFactory<ApplicationDbContext> _dbContextFactory;

        public TracksController(IDbContextFactory<ApplicationDbContext> dbContextFactory)
        {
            _dbContextFactory = dbContextFactory;
        }

        [HttpGet]
        public async Task<List<Track>> GetTracks()
        {
            await using var dbContext = _dbContextFactory.CreateDbContext();
            return await dbContext.Tracks.ToListAsync();
        }

        [HttpGet("{trackId:int}/sessions")]
        public async Task<List<Session>> GetTrackSessions(int trackId)
        {
            await using var dbContext = _dbContextFactory.CreateDbContext();
            return await dbContext.Tracks
                .Include(m => m.Sessions)
                .Where(m => m.Id == trackId)
                .SelectMany(m => m.Sessions)
                .ToListAsync();
        }
    }
}