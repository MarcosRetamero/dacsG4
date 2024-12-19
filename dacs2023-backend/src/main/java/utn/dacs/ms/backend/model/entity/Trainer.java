package utn.dacs.ms.backend.model.entity;

import lombok.Data;
import javax.persistence.*;

@Data
@Entity
public class Trainer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String specialty;

    private String name;

    private Integer age;       

    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id", unique = true, nullable = false)
    private KeycloakUser user;

}
