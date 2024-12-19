package utn.dacs.ms.backend.dto;

import java.util.List;

public class TrainingPlanDto {

    private Long id;
    private String name;
    private String description;
    private List<Long> trainingRoutineIds; // List of training routines associated

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

    public List<Long> getTrainingRoutineIds() {
        return trainingRoutineIds;
    }

    public void setTrainingRoutineIds(List<Long> trainingRoutineIds) {
        this.trainingRoutineIds = trainingRoutineIds;
    }
}
