// hooks/useEcho.js

import { useEffect } from 'react';
import Echo from 'laravel-echo';
import { io } from 'socket.io-client';

const useEcho = () => {
  useEffect(() => {
    // Initialize the Echo client with Socket.IO
    const echo = new Echo({
      broadcaster: 'socket.io',
      host: 'http://localhost:6001', // Make sure this is your echo server's address
      client: io, // Using socket.io-client
    });

    // Subscribe to the 'transactions' channel and listen for 'TransactionCreated' event
    echo.channel('payments')
      .listen('.PaymentCreated', (e) => {
        console.log('New Payment:', e.transaction);
        // Update your UI with the new transaction
      });

    // Cleanup on component unmount
    return () => {
      echo.leaveChannel('payments');
    };
  }, []);

  // You can return anything if you need to use it elsewhere in the component
};

export default useEcho;
