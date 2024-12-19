package utn.dacs.ms.conector.config;

import feign.RequestInterceptor;
import utn.dacs.ms.conector.service.ServiceAuth;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class FeignConfig {

    private final ServiceAuth serviceAuth;

    public FeignConfig(ServiceAuth serviceAuth) {
        this.serviceAuth = serviceAuth;
    }

    @Bean
    public RequestInterceptor requestInterceptor() {
        return requestTemplate -> {
            String accessToken = serviceAuth.getAccessToken();
            if (accessToken == null) {
                throw new RuntimeException("Access token is missing or expired.");
            }
            requestTemplate.header("Authorization", "Bearer " + accessToken);
        };
    }
    
}
