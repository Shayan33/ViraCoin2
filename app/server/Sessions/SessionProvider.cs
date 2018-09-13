using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Threading;

namespace server.Sessions
{
    public class SessionProvider
    {
        private readonly Dictionary<Guid, DateTime> _sessions;
        private readonly Timer _timer;
        private object _lock;
        public SessionProvider()
        {
            _lock = new object();
            _sessions = new Dictionary<Guid, DateTime>();
            _timer = new Timer((z) =>
              {
                  lock (_lock)
                  {
                      var Now = DateTime.Now;
                      var Temps = _sessions.Where(x => x.Value.AddMinutes(5) < Now);
                      foreach (var item in Temps)
                      {
                          _sessions.Remove(item.Key);
                      }
                  }
              }, null, TimeSpan.FromMinutes(5), TimeSpan.FromMinutes(5));
        }
        public void Add(Guid Key)
        {
            lock (_lock)
            {
                _sessions.TryAdd(Key, DateTime.Now);
            }
        }
        public void  Remove(Guid Key)
        {
            lock (_lock)
            {
                try
                {
                    _sessions.Remove(Key);
                }
                catch{}
            }
        }
    }
}
