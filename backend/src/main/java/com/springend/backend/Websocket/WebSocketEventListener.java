package com.springend.backend.Websocket;

import org.springframework.context.ApplicationEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionConnectedEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

@Component
public class WebSocketEventListener implements ApplicationListener<ApplicationEvent> {

    @Override
    public void onApplicationEvent(ApplicationEvent event) {
        if(event instanceof SessionConnectedEvent) {
            //Aktion wenn Nutzer connected
        } else if (event instanceof SessionDisconnectEvent) {
            //Aktion wenn Nutzer disconnected
        }
    }
}
