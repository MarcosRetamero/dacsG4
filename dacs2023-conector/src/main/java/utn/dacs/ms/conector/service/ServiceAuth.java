package utn.dacs.ms.conector.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import utn.dacs.ms.conector.api.client.AuthClient;
import javax.annotation.PostConstruct;
import java.util.HashMap;
import java.util.Map;

@Service
public class ServiceAuth {

    private final AuthClient authClient;
    private String accessToken;
    private String refreshToken;

    @Value("${api.credentials.username}")
    private String username;
    
    @Value("${api.credentials.password}")
    private String password;

    public ServiceAuth(AuthClient authClient) {
        this.authClient = authClient;
    }

    @PostConstruct
    public void init() {
        authenticate();
    }

    public void authenticate() {
        if (username == null || password == null) {
            throw new RuntimeException("Credentials not properly initialized");
        }

        Map<String, String> credentials = new HashMap<>();
        credentials.put("username", username);
        credentials.put("password", password);

        try {
            Map<String, String> tokenResponse = authClient.getToken(credentials);
            this.accessToken = tokenResponse.get("access");
            this.refreshToken = tokenResponse.get("refresh");
        } catch (Exception e) {
            throw new RuntimeException("Failed to authenticate: " + e.getMessage(), e);
        }
    }

    public String getAccessToken() {
        // Si el token ha caducado, refrescarlo
        if (isAccessTokenExpired()) {
            refreshAccessToken();
        }
        return accessToken;
    }

    public void refreshAccessToken() {
        Map<String, String> refreshRequest = new HashMap<>();
        refreshRequest.put("refresh", this.refreshToken);

        try {
            Map<String, String> tokenResponse = authClient.refreshToken(refreshRequest);
            this.accessToken = tokenResponse.get("access");
        } catch (Exception e) {
            throw new RuntimeException("Failed to refresh token: " + e.getMessage(), e);
        }
    }

    private boolean isAccessTokenExpired() {
        // Implementar lógica para verificar si el token ha expirado
        // Esto puede ser basado en la expiración del token o tiempo transcurrido
        return false; // Placeholder: Implementa tu propia lógica
    }
}