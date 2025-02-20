using System.Collections.Concurrent;
using WebSocketTest.Models;

namespace WebSocketTest.DataService
{
    public class SharedDB
    {
        private readonly ConcurrentDictionary<string, UserConnection> _connections = new();
        public ConcurrentDictionary<string, UserConnection> Connections => _connections;
    }
}
