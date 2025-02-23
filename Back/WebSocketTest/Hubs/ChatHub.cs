using Microsoft.AspNetCore.SignalR;
using WebSocketTest.DataService;
using WebSocketTest.Models;

namespace WebSocketTest.Hubs
{
    public class ChatHub(SharedDB sharedDB) : Hub
    {
        private readonly SharedDB _sharedDB = sharedDB;
        public async Task JoinChat(UserConnection connection)
        {
            await Clients
                .All
                .SendAsync("ReceiveMessage", "admin", $"{connection.UserName} nas joined");
        }

        public async Task JoinSpecificChatRoom(UserConnection connection)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, connection.ChatRoom);
            _sharedDB.Connections[Context.ConnectionId] = connection;
            await Clients
                .Group(connection.ChatRoom)
                .SendAsync(
                    "ReceiveMessage", "admin", $"{connection.UserName} has joined {connection.ChatRoom}"
                );
        }

        private static string AddDateToMessage(string msg)
        {
            return $"{msg} : {String.Format("{0:g}", DateTime.Now)}";
        }

        public async Task SendMessage(string msg)
        {
            if (_sharedDB.Connections.TryGetValue(Context.ConnectionId, out UserConnection? connection))
            {
                await Clients.Group(connection.ChatRoom)
                    .SendAsync("ReceiveSpecificMessage", connection.UserName, AddDateToMessage(msg));
            }
        }
    }
}
