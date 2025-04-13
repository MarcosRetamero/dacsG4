package utn.dacs.ms.bff.dto;

import lombok.Data;

@Data
public class RoutineDto {
    private Long id;
    private String userId;
    private String routineName;
    private Integer day;
}
