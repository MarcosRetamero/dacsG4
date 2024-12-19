package utn.dacs.ms.backend.model.entity;

import lombok.Data;
import javax.persistence.*;

@Data
@Entity
public class Exercise {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String description;

    private String image;
}
