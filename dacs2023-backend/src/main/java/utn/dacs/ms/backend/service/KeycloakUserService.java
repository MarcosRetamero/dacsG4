package utn.dacs.ms.backend.service;

import utn.dacs.ms.backend.dto.KeycloakUserDto;
import utn.dacs.ms.backend.model.entity.KeycloakUser;

public interface KeycloakUserService extends CommonService<KeycloakUser> {

	String saveKeycloakUser(KeycloakUserDto userDto);
}
