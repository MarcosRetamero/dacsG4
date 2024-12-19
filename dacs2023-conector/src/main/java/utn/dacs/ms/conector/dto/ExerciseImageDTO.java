package utn.dacs.ms.conector.dto;

import lombok.Data;

@Data
public class ExerciseImageDTO {
    private Long id;
    private String image;
    private Long exercise_base;
}
