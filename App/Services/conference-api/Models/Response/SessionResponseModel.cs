using System;
using System.Collections;
using System.Collections.Generic;
using conference_api.Data;

namespace conference_api.Models
{
    public class SessionResponseModel
    {
        public int Id { get; set; }
        
        public string? Title { get; set; }
        
        public string? Abstract { get; set; }

        public DateTimeOffset? StartTime { get; set; }

        public DateTimeOffset? EndTime { get; set; }

        public TimeSpan Duration { get; set; }

        public int? TrackId { get; set; }
        
        public IEnumerable<int>? SpeakerIds { get; set; }
    }
}