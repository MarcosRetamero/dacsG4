package utn.dacs.ms.backend.dto;

import java.util.List;

public class TrainingRoutineDto {

    private Long id;
    private String name;
    private String description;
    private List<Long> exerciseIds; // List of exercises in the routine

    // Getters and setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<Long> getExerciseIds() {
        return exerciseIds;
    }

    public void setExerciseIds(List<Long> exerciseIds) {
        this.exerciseIds = exerciseIds;
    }
}
