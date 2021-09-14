using System.Collections.Generic;

namespace conference_api.Models
{
    public class AttendeeResponseModel
    {
        public int Id { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? UserName { get; set; }
        public string? EmailAddress { get; set; }

        public IEnumerable<int>? SessionIds { get; set; }
    }
}