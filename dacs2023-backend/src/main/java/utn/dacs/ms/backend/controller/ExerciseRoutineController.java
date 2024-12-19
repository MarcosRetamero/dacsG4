package utn.dacs.ms.backend.controller;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import utn.dacs.ms.backend.dto.ExerciseRoutineDto;
import utn.dacs.ms.backend.exceptions.ResourceNotFoundException;
import utn.dacs.ms.backend.model.entity.ExerciseRoutine;
import utn.dacs.ms.backend.service.ExerciseRoutineService;

@RestController
@RequestMapping(value = "/exercise-routine")
public class ExerciseRoutineController {

    @Autowired
    private ExerciseRoutineService exerciseRoutineService;

    @Autowired
    private ModelMapper modelMapper;

    @GetMapping("")
    public ResponseEntity<List<ExerciseRoutineDto>> getAll() {
        List<ExerciseRoutine> routines = exerciseRoutineService.getAll();
        List<ExerciseRoutineDto> data = routines.stream()
                                                .map(routine -> modelMapper.map(routine, ExerciseRoutineDto.class))
                                                .collect(Collectors.toList());
        return new ResponseEntity<>(data, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ExerciseRoutineDto> getById(@PathVariable(value = "id") Long id) throws ResourceNotFoundException {
        Optional<ExerciseRoutine> routine = exerciseRoutineService.getById(id);
        if (routine.isEmpty()) {
            throw new ResourceNotFoundException("ExerciseRoutine not found");
        }
        ExerciseRoutineDto data = modelMapper.map(routine.get(), ExerciseRoutineDto.class);
        return new ResponseEntity<>(data, HttpStatus.OK);
    }

    @PostMapping("")
    public ResponseEntity<ExerciseRoutineDto> create(@RequestBody ExerciseRoutineDto routineDto) {
        ExerciseRoutine routine = modelMapper.map(routineDto, ExerciseRoutine.class);
        ExerciseRoutineDto data = modelMapper.map(exerciseRoutineService.save(routine), ExerciseRoutineDto.class);
        return new ResponseEntity<>(data, HttpStatus.CREATED);
    }

    @PutMapping("")
    public ResponseEntity<ExerciseRoutineDto> update(@RequestBody ExerciseRoutineDto routineDto) throws ResourceNotFoundException {
        if (routineDto.getId() == null || !exerciseRoutineService.existById(routineDto.getId())) {
            throw new ResourceNotFoundException("ExerciseRoutine not found");
        }

        ExerciseRoutine routine = modelMapper.map(routineDto, ExerciseRoutine.class);
        ExerciseRoutineDto data = modelMapper.map(exerciseRoutineService.save(routine), ExerciseRoutineDto.class);
        return new ResponseEntity<>(data, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable(value = "id") Long id) throws ResourceNotFoundException {
        if (id == null || !exerciseRoutineService.existById(id)) {
            throw new ResourceNotFoundException("ExerciseRoutine not found");
        }

        exerciseRoutineService.delete(id);
        return new ResponseEntity<>("ExerciseRoutine deleted", HttpStatus.OK);
    }
}
