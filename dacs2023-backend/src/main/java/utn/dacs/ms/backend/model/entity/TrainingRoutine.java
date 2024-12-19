package utn.dacs.ms.backend.model.entity;

import lombok.Data;
import javax.persistence.*;

@Data
@Entity
public class TrainingRoutine {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String muscularGroup;

    private Integer weekday;

    @ManyToOne
    @JoinColumn(name = "plan_id", nullable = false)
    private TrainingPlan plan;
}
