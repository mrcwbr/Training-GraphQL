using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using conference_api.Data;
using conference_api.Models;
using conference_api.Models.Request;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Session;
using Microsoft.EntityFrameworkCore;

namespace conference_api.Controllers
{
    [ApiController]
    [Route("attendees")]
    public class AttendeesController : ControllerBase
    {
        private readonly IDbContextFactory<ApplicationDbContext> _dbContextFactory;

        public AttendeesController(IDbContextFactory<ApplicationDbContext> dbContextFactory)
        {
            _dbContextFactory = dbContextFactory;
        }

        [HttpGet()]
        public async Task<List<AttendeeResponseModel>> GetAttendees()
        {
            await using var dbContext = _dbContextFactory.CreateDbContext();
            return await dbContext.Attendees
                .Include(m => m.SessionsAttendees)
                .Select(m => MapToResponseModel(m))
                .ToListAsync();
        }

        [HttpGet("{attendeeId:int}")]
        public async Task<AttendeeResponseModel> GetAttendee(int attendeeId)
        {
            await using var dbContext = _dbContextFactory.CreateDbContext();
            var attendee = await dbContext.Attendees
                .Include(m => m.SessionsAttendees)
                .FirstAsync(m => m.Id == attendeeId);

            return MapToResponseModel(attendee);
        }

        [HttpPost]
        public async Task<IActionResult> CreateAttendee(CreateAttendeeRequestModel request)
        {
            await using var dbContext = _dbContextFactory.CreateDbContext();
            var attendeeAlreadyExists = await dbContext.Attendees.AnyAsync(m => m.EmailAddress == request.EMailAddress && m.UserName == request.UserName);
            if (attendeeAlreadyExists)
                return new BadRequestObjectResult($"User with email '${request.EMailAddress}' and userName '${request.UserName}' already exists.");

            var newAttendee = new Attendee()
            {
                EmailAddress = request.EMailAddress,
                FirstName = request.FirstName,
                LastName = request.LastName,
                UserName = request.UserName
            };

            var attendeeEntity = dbContext.Attendees.Add(newAttendee);

            if (request.SessionIds != null && request.SessionIds.Any())
                attendeeEntity.Entity.SessionsAttendees = request.SessionIds.Select(m => new SessionAttendee() { SessionId = m, AttendeeId = attendeeEntity.Entity.Id }).ToList();
            
            await dbContext.SaveChangesAsync();

            return new OkObjectResult(MapToResponseModel(attendeeEntity.Entity));
        }

        private static AttendeeResponseModel MapToResponseModel(Attendee attendee) => new()
        {
            Id = attendee.Id,
            EmailAddress = attendee.EmailAddress,
            FirstName = attendee.FirstName,
            LastName = attendee.LastName,
            SessionIds = attendee.SessionsAttendees.Select(n => n.SessionId),
            UserName = attendee.UserName
        };
    }
}