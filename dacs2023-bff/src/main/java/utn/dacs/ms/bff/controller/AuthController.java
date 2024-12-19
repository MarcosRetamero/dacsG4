package utn.dacs.ms.bff.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import utn.dacs.ms.bff.api.client.MsApiBackendClient;
import utn.dacs.ms.bff.dto.KeycloakUserDto;
import utn.dacs.ms.bff.utils.Utils;


import java.util.UUID;

@RestController
public class AuthController {

    @Autowired
    private MsApiBackendClient msApiBackendClient;

    @PostMapping("/authenticate")
    public String authenticate() {
        try {
            // Extraer datos del token JWT
            String keycloakId = Utils.extractKeycloakId();
            String email = Utils.extractEmailFromToken();

            if (Utils.isNullOrEmptyStr(keycloakId) || Utils.isNullOrEmptyStr(email)) {
                return "Invalid token data: Keycloak ID or Email is missing.";
            }

            // Crear DTO con los datos extraídos del token
            KeycloakUserDto userDto = new KeycloakUserDto();
            userDto.setKeycloakId(UUID.fromString(keycloakId));
            userDto.setEmail(email);
            userDto.setState(true); // Estado por defecto en true (puedes personalizarlo si es necesario)

            // Enviar el DTO al backend
            String response = msApiBackendClient.saveKeycloakUser(userDto);
            return response;

        } catch (Exception e) {
            return "An error occurred while sending user data: " + e.getMessage();
        }
    }
}
