using System;
using System.Collections.Generic;
using System.IO;
using conference_api.Data;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace conference_api.Imports
{
    public class DataImporter
    {
        public void LoadData(ApplicationDbContext db)
        {
            using var stream = File.OpenRead("Imports/conference-data.json");
            using var reader = new JsonTextReader(new StreamReader(stream));

            var speakerNames = new Dictionary<string, Speaker>();
            var tracks = new Dictionary<string, Track>();

            JArray conference = JArray.Load(reader);
            var speakers = new Dictionary<string, Speaker>();

            foreach (var jToken1 in conference)
            {
                var conferenceDay = (JObject)jToken1;
                foreach (var jToken in conferenceDay["rooms"]!)
                {
                    var roomData = (JObject)jToken;
                    var track = new Track
                    {
                        Name = roomData["name"]!.ToString()
                    };

                    foreach (var jToken2 in roomData["sessions"]!)
                    {
                        var sessionData = (JObject)jToken2;
                        var session = new Session
                        {
                            Title = sessionData["title"]!.ToString(),
                            Abstract = sessionData["description"]!.ToString(),
                            StartTime = sessionData["startsAt"]!.Value<DateTime>(),
                            EndTime = sessionData["endsAt"]!.Value<DateTime>(),
                        };

                        track.Sessions.Add(session);

                        foreach (var jToken3 in sessionData["speakers"]!)
                        {
                            var speakerData = (JObject)jToken3;
                            if (!speakers.TryGetValue(speakerData["id"]!.ToString(), out Speaker? speaker))
                            {
                                speaker = new Speaker
                                { 
                                    Name = speakerData["name"]!.ToString()
                                };
                                db.Speakers.Add(speaker);
                            }

                            session.SessionSpeakers.Add(new SessionSpeaker
                            {
                                Speaker = speaker,
                                Session = session
                            });
                        }
                    }

                    db.Tracks.Add(track);
                }
            }

            db.SaveChanges();
        }
    }
}