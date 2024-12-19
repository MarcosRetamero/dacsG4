package utn.dacs.ms.conector.dto;

import lombok.Data;

@Data
public class ExerciseDTO {
    private Long id;
    private String name;
    private String description;
    private Long exercise_base;
} 