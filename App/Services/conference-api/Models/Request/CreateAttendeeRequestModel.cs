using System.Collections.Generic;

namespace conference_api.Models.Request
{
    public class CreateAttendeeRequestModel
    {
        public string FirstName { get; set; } = null!;
        public string LastName { get; set; } = null!;
        public string UserName { get; set; } = null!;
        public string EMailAddress { get; set; } = null!;

        public IEnumerable<int>? SessionIds { get; set; }
    }
}