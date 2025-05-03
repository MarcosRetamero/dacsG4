package utn.dacs.ms.conector.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;

@Data
public class ExerciseImageDTO {
    private Long id;

    @JsonProperty("exercise")
    private Long exerciseId;

    private String image;

    @JsonProperty("is_main")
    private boolean isMain;
}
