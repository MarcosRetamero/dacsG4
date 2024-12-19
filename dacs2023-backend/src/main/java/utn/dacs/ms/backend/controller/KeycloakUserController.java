package utn.dacs.ms.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import utn.dacs.ms.backend.dto.KeycloakUserDto;
import utn.dacs.ms.backend.model.entity.KeycloakUser;
import utn.dacs.ms.backend.service.KeycloakUserService;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/keycloak_user")
public class KeycloakUserController {

    @Autowired
    private KeycloakUserService keycloakUserService;
    
    
    
    @PostMapping("/save-user")
    public String saveKeycloakUser(@RequestBody KeycloakUserDto userDto) {
        return keycloakUserService.saveKeycloakUser(userDto);
    }

    // Obtener todos los usuarios
    @GetMapping
    public List<KeycloakUser> getAllUsers() {
        return keycloakUserService.getAll();
    }

    // Obtener un usuario por ID
    @GetMapping("/{id}")
    public ResponseEntity<KeycloakUser> getUserById(@PathVariable Long id) {
        Optional<KeycloakUser> user = keycloakUserService.getById(id);
        return user.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Crear un nuevo usuario
    @PostMapping
    public ResponseEntity<KeycloakUser> createUser(@RequestBody KeycloakUser keycloakUser) {
        if (keycloakUser.getKeycloakId() == null) {
            keycloakUser.setKeycloakId(UUID.randomUUID()); // Generar UUID si no se proporciona
        }
        KeycloakUser createdUser = keycloakUserService.save(keycloakUser);
        return ResponseEntity.ok(createdUser);
    }

    // Actualizar un usuario existente
    @PutMapping("/{id}")
    public ResponseEntity<KeycloakUser> updateUser(
            @PathVariable Long id,
            @RequestBody KeycloakUser updatedUser
    ) {
        if (!keycloakUserService.existById(id)) {
            return ResponseEntity.notFound().build();
        }
        updatedUser.setId(id); // Asegurar que el ID coincida con el de la ruta
        KeycloakUser savedUser = keycloakUserService.save(updatedUser);
        return ResponseEntity.ok(savedUser);
    }

    // Eliminar un usuario
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        if (!keycloakUserService.existById(id)) {
            return ResponseEntity.notFound().build();
        }
        keycloakUserService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
