
import './App.css'

import { useEffect, useState } from 'react';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';

const NotificationComponent = () => {
  const [notifications, setNotifications] = useState([]);
  const [connection, setConnection] = useState(null);

  useEffect(() => {
    // Cria uma conexão com o hub SignalR
    const newConnection = new HubConnectionBuilder()
      .withUrl('http://localhost:5226/notificationHub') // URL do hub
      .configureLogging(LogLevel.Information)
      .withAutomaticReconnect() // Reconexão automática
      .build();

    // Inicia a conexão
    newConnection.start()
      .then(() => {
        console.log('Conectado ao hub SignalR');
        setConnection(newConnection);
      })
      .catch((err) => {
        console.error('Erro ao conectar ao hub:', err);
      });

    // Escuta o evento "ReceiveNotification" enviado pelo servidor
    newConnection.on('ReceiveNotification', (message) => {
      console.log('Nova notificação recebida:', message);
      setNotifications((prevNotifications) => [...prevNotifications, message]);
    });

    // Limpa a conexão quando o componente é desmontado
    return () => {
      if (newConnection) {
        newConnection.stop();
      }
    };
  }, []);

  return (
    <div>
      <h1>Notificações em Tempo Real</h1>
      <p>Conectado ao servidor SignalR.</p>
      <ul>
        {notifications.map((notification, index) => (
          <li key={index}>{notification}</li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationComponent;
