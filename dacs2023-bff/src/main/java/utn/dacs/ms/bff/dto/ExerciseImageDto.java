package utn.dacs.ms.bff.dto;

import lombok.Data;

@Data
public class ExerciseImageDto {
    private Long id;
    private String image;
    private Long exercise_base;
}
