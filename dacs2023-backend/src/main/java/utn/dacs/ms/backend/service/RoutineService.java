package utn.dacs.ms.backend.service;

import utn.dacs.ms.backend.dto.RoutineDto;
import java.util.List;

public interface RoutineService {
    List<RoutineDto> getAllRoutines();
    RoutineDto getRoutineById(Long id);
    RoutineDto createRoutine(RoutineDto routineDto);
    RoutineDto updateRoutine(Long id, RoutineDto routineDto);
    void deleteRoutine(Long id);
    List<RoutineDto> getRoutinesByCustomerId(String userId);

}
