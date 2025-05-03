package utn.dacs.ms.conector.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public class ExerciseDTO {

    private Long id;

    private String name;

    private String description;

    @JsonProperty("exercise")
    private Long exerciseId; 

    private Integer language; // 4 = Español

    // Getters y setters

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

    public Long getExerciseId() {
        return exerciseId;
    }

    public void setExerciseId(Long exerciseId) {
        this.exerciseId = exerciseId;
    }

    public Integer getLanguage() {
        return language;
    }

    public void setLanguage(Integer language) {
        this.language = language;
    }
}
