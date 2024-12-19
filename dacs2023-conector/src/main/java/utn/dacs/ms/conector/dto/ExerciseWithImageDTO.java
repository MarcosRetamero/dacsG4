package utn.dacs.ms.conector.dto;

import lombok.Data;

@Data
public class ExerciseWithImageDTO {
    private ExerciseDTO exercise;
    private ExerciseImageDTO image;
} 