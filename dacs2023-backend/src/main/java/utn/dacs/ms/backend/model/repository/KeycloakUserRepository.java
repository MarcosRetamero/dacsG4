package utn.dacs.ms.backend.model.repository;

import java.util.Optional;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import utn.dacs.ms.backend.model.entity.KeycloakUser;

@Repository
public interface KeycloakUserRepository extends JpaRepository<KeycloakUser, Long> {

	  Optional<KeycloakUser> findByKeycloakId(UUID keycloakId);
	    
	    Optional<KeycloakUser> findByEmail(String email);
}
