using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Threading;

namespace server.Sessions
{
    public class SessionProvider
    {
        private readonly Dictionary<Guid, SessionData> _sessions;
        private readonly Timer _timer;
        private object _lock;
        public SessionProvider()
        {
            _lock = new object();
            _sessions = new Dictionary<Guid, SessionData>();
            _timer = new Timer((z) =>
              {
                  lock (_lock)
                  {
                      var Now = DateTime.Now;
                      var Temps = _sessions.Where(x => x.Value.Time < Now.AddMinutes(-5)).ToArray();
                      for (int i = 0; i < Temps.Length; i++)
                      {
                          _sessions.Remove(Temps[i].Key);
                          //Console.WriteLine(Temps[i]);
                      }
                  }
              }, null, TimeSpan.FromMinutes(5), TimeSpan.FromMinutes(5));
        }
        public void Add(Guid Key, string PubKey)
        {
            lock (_lock)
            {
                _sessions.TryAdd(Key, new SessionData(PubKey, DateTime.Now));
            }
        }
        public void Remove(Guid Key)
        {
            lock (_lock)
            {
                try
                {
                    _sessions.Remove(Key);
                }
                catch { }
            }
        }
        public bool Get(Guid Key, string pk)
        {
            if (_sessions.TryGetValue(Key, out var T))
            {
                bool flag = false;
                lock (_lock)
                {
                    flag = string.Equals(_sessions[Key].PubKey, pk);
                    _sessions[Key].Time = DateTime.Now;
                }
                return flag;
            }
            return false;
        }

        class SessionData
        {
            public SessionData(string pk, DateTime t)
            {
                PubKey = pk;
                Time = t;
            }
            public string PubKey { get; set; }
            public DateTime Time { get; set; }
            public override string ToString()
            {
                return $"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA{PubKey}-{Time}";
            }
        }
    }
}
