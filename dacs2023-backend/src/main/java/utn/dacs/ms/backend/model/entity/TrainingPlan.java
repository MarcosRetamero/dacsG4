package utn.dacs.ms.backend.model.entity;

import lombok.Data;
import javax.persistence.*;

@Data
@Entity
public class TrainingPlan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String goal;

    private Integer daysInWeek;

    private Integer totalCustomers;

    @ManyToOne
    @JoinColumn(name = "trainer_id", nullable = false)
    private Trainer trainer;
}
