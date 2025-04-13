package utn.dacs.ms.backend.model.entity;

import lombok.Data;
import javax.persistence.*;

@Data
@Entity
public class Customer {

    @Id
    private String id;
    private String email;   
    private Integer stature;
    private Integer age;
    private String goal;
    private String name;
    @Column(name = "actualweight") // Usa el nombre real en la BD
    private Float actualWeight;    

}