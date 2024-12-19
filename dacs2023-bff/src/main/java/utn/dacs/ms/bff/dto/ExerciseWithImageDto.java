package utn.dacs.ms.bff.dto;

import lombok.Data;

@Data
public class ExerciseWithImageDto {
    private ExerciseDto exercise;
    private ExerciseImageDto image;
} 