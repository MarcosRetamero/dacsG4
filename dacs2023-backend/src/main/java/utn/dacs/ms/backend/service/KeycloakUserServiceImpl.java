package utn.dacs.ms.backend.service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import utn.dacs.ms.backend.dto.KeycloakUserDto;
import utn.dacs.ms.backend.model.entity.KeycloakUser;
import utn.dacs.ms.backend.model.repository.KeycloakUserRepository;

@Service
public class KeycloakUserServiceImpl implements KeycloakUserService {

    @Autowired
    private KeycloakUserRepository keycloakUserRepository;

    @Override
    public Optional<KeycloakUser> getById(Long id) {
        return keycloakUserRepository.findById(id);
    }

    @Override
    public List<KeycloakUser> getAll() {
        return keycloakUserRepository.findAll();
    }

    @Override
    public KeycloakUser save(KeycloakUser entity) {
        return keycloakUserRepository.save(entity);
    }

    @Override
    public void delete(Long id) {
        Optional<KeycloakUser> keycloakUser = getById(id);
        keycloakUser.ifPresent(keycloakUserRepository::delete);
    }

    @Override
    public Boolean existById(Long id) {
        return keycloakUserRepository.existsById(id);
    }

    @Override
    public List<KeycloakUser> find(Map<String, Object> filter) {
        throw new UnsupportedOperationException("No implementado");
    }

    @Override
    public KeycloakUser getBy(Map<String, Object> filter) {
        throw new UnsupportedOperationException("No implementado");
    }
    
    
    //// METODO PARA LA AUTENTICACIÓN DE KEYCLOAK CUANDO SE LOGEA EL USUARIO
    
    
    /**
     * Guarda un usuario Keycloak, verificando si ya existe antes de crearlo.
     * 
     * @param userDto Datos del usuario a registrar.
     * @return Mensaje indicando si el usuario ya existía o si fue creado.
     */
    public String saveKeycloakUser(KeycloakUserDto userDto) {
        // Verificar si el usuario ya existe por Keycloak ID
        Optional<KeycloakUser> existingUserByKeycloakId = keycloakUserRepository.findByKeycloakId(userDto.getKeycloakId());
        if (existingUserByKeycloakId.isPresent()) {
            return "User already exists with Keycloak ID: " + userDto.getKeycloakId();
        }

        // Verificar si el usuario ya existe por Email
        Optional<KeycloakUser> existingUserByEmail = keycloakUserRepository.findByEmail(userDto.getEmail());
        if (existingUserByEmail.isPresent()) {
            return "User already exists with Email: " + userDto.getEmail();
        }

        // Crear y guardar el usuario
        KeycloakUser user = new KeycloakUser();
        user.setKeycloakId(userDto.getKeycloakId());
        user.setEmail(userDto.getEmail());
        user.setState(userDto.getState() != null ? userDto.getState() : true);
        user.setId(userDto.getId());

        keycloakUserRepository.save(user);
        return "User saved successfully!";
    }
    
}
