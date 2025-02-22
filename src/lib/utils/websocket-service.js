
  // lib/utils/websocket-service.js
  export class WebSocketService {
    constructor(url, onMessage) {
      this.url = url;
      this.onMessage = onMessage;
      this.reconnectAttempts = 0;
      this.maxReconnectAttempts = 5;
    }
  
    connect() {
      try {
        this.ws = new WebSocket(this.url);
        
        this.ws.onopen = () => {
          console.log('WebSocket connected');
          this.reconnectAttempts = 0;
        };
  
        this.ws.onmessage = (event) => {
          const data = JSON.parse(event.data);
          this.onMessage(data);
        };
  
        this.ws.onclose = () => {
          console.log('WebSocket disconnected');
          this.reconnect();
        };
  
        this.ws.onerror = (error) => {
          console.error('WebSocket error:', error);
        };
      } catch (error) {
        console.error('WebSocket connection error:', error);
        this.reconnect();
      }
    }
  
    reconnect() {
      if (this.reconnectAttempts < this.maxReconnectAttempts) {
        this.reconnectAttempts++;
        setTimeout(() => this.connect(), 1000 * this.reconnectAttempts);
      }
    }
  
    disconnect() {
      if (this.ws) {
        this.ws.close();
      }
    }
  
    send(data) {
      if (this.ws && this.ws.readyState === WebSocket.OPEN) {
        this.ws.send(JSON.stringify(data));
      }
    }
  }