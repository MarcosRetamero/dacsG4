package utn.dacs.ms.backend.model.entity;

import lombok.Data;
import javax.persistence.*;

@Data
@Entity
public class Customer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Double actualWeight;
    private Integer stature;
    private Integer age;
    private String name;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "assigned_trainer_id", nullable = true)  // Relación con 'Trainer'
    private Trainer assignedTrainer;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "training_plan_id", nullable = true)  // Relación con 'TrainingPlan'
    private TrainingPlan trainingPlan;

    @ManyToOne(fetch = FetchType.LAZY)  // Relación de uno a uno con 'KeycloakUser'
    @JoinColumn(name = "user_id", referencedColumnName = "id", unique = true, nullable = true)
    private KeycloakUser user; // Relación con KeycloakUser

}