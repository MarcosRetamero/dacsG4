package utn.dacs.ms.backend.model.entity;

import lombok.Data;
import javax.persistence.*;

@Data
@Entity
public class ExerciseRoutine {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "exercise_id", nullable = false)
    private Exercise exercise;

    @ManyToOne
    @JoinColumn(name = "training_routine_id", nullable = false)
    private TrainingRoutine trainingRoutine;

    private Integer sets;

    private Integer reps;
}
