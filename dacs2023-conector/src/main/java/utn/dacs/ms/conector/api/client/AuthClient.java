package utn.dacs.ms.conector.api.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.Map;

@FeignClient(
    name = "authClient",
    url = "${feign.client.apiClient.url}"
)
public interface AuthClient {

    @PostMapping("/token")
    Map<String, String> getToken(@RequestBody Map<String, String> credentials);

    @PostMapping("/token/refresh")
    Map<String, String> refreshToken(@RequestBody Map<String, String> refreshToken);
}