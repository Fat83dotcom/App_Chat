using Microsoft.AspNetCore.SignalR;
using WebSocketTest.Models;

namespace WebSocketTest.Hubs
{
    public class ChatHub : Hub
    {
        public async Task JoinChat(UserConnection connection)
        {
            await Clients
                .All
                .SendAsync("ReceiveMessage", "admin", $"{connection.UserName} nas joined");
        }

        public async Task JoinSpecificChatRoom(UserConnection connection)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, connection.ChatRoom);
            await Clients
                .Group(connection.ChatRoom)
                .SendAsync(
                    "ReceiveMessage", "admin", $"{connection.UserName} nas joined {connection.ChatRoom}"
                );
        }
    }
}
