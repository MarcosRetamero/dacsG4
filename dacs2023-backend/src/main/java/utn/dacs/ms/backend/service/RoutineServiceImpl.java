package utn.dacs.ms.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import utn.dacs.ms.backend.dto.RoutineDto;
import utn.dacs.ms.backend.model.entity.Routine;
import utn.dacs.ms.backend.model.repository.RoutineRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RoutineServiceImpl implements RoutineService {

    private final RoutineRepository routineRepository;

    @Override
    public List<RoutineDto> getAllRoutines() {
        return routineRepository.findAll().stream().map(this::convertToDto).collect(Collectors.toList());
    }

    @Override
    public RoutineDto getRoutineById(Long id) {
        return routineRepository.findById(id).map(this::convertToDto).orElse(null);
    }

    @Override
    public RoutineDto createRoutine(RoutineDto routineDto) {
        Routine routine = convertToEntity(routineDto);
        routine = routineRepository.save(routine);
        return convertToDto(routine);
    }

    @Override
    public RoutineDto updateRoutine(Long id, RoutineDto routineDto) {
        if (!routineRepository.existsById(id)) {
            return null;
        }
        Routine routine = convertToEntity(routineDto);
        routine.setId(id);
        return convertToDto(routineRepository.save(routine));
    }

    @Override
    public void deleteRoutine(Long id) {
        routineRepository.deleteById(id);
    }

    private RoutineDto convertToDto(Routine routine) {
        RoutineDto dto = new RoutineDto();
        dto.setId(routine.getId());
        dto.setUserId(routine.getUserId());
        dto.setRoutineName(routine.getRoutineName());
        dto.setDay(routine.getDay());
        return dto;
    }

    private Routine convertToEntity(RoutineDto dto) {
        Routine routine = new Routine();
        routine.setId(dto.getId());
        routine.setUserId(dto.getUserId());
        routine.setRoutineName(dto.getRoutineName());
        routine.setDay(dto.getDay());
        return routine;
    }
    
  
    @Override
    public List<RoutineDto> getRoutinesByCustomerId(String userId) {
        List<Routine> routines = routineRepository.findByUserId(userId);
        
        if (routines == null) {
            return List.of(); // <- aseguramos lista vacía en vez de null
        }

        return routines.stream()
                       .map(this::convertToDto)
                       .collect(Collectors.toList());
    }


}
