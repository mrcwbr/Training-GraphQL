using System.Collections.Generic;

namespace conference_api.Models
{
    public class SpeakerResponseModel
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Bio { get; set; }
        public string? WebSite { get; set; }
        public IEnumerable<int>? SessionIds { get; set; }
    }
}