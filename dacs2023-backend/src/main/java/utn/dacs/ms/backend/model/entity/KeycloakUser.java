package utn.dacs.ms.backend.model.entity;

import javax.persistence.*;

import lombok.Data;

import java.util.UUID;

@Data
@Entity
public class KeycloakUser {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private UUID keycloakId;

    private String email;

    private Boolean state = true;
}
