package utn.dacs.ms.backend.controller;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import utn.dacs.ms.backend.dto.ExerciseDto;
import utn.dacs.ms.backend.exceptions.ResourceNotFoundException;
import utn.dacs.ms.backend.model.entity.Exercise;
import utn.dacs.ms.backend.service.ExerciseService;

@RestController
@RequestMapping(value = "/exercise")
public class ExerciseController {

    @Autowired
    private ExerciseService exerciseService;

    @Autowired
    private ModelMapper modelMapper;

    @GetMapping("")
    public ResponseEntity<List<ExerciseDto>> getAll() {
        List<Exercise> exercises = exerciseService.getAll();
        List<ExerciseDto> data = exercises.stream().map(exercise -> modelMapper.map(exercise, ExerciseDto.class))
                .collect(Collectors.toList());
        return new ResponseEntity<List<ExerciseDto>>(data, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ExerciseDto> getById(@PathVariable(value = "id") Long id) throws ResourceNotFoundException {
        Optional<Exercise> exercise = exerciseService.getById(id);

        if (exercise.isEmpty()) {
            throw new ResourceNotFoundException("Exercise not found");
        }

        ExerciseDto data = modelMapper.map(exercise.get(), ExerciseDto.class);
        return new ResponseEntity<ExerciseDto>(data, HttpStatus.OK);
    }

    @PostMapping("")
    public ResponseEntity<ExerciseDto> create(@RequestBody ExerciseDto exerciseDto) {
        Exercise exercise = modelMapper.map(exerciseDto, Exercise.class);
        ExerciseDto data = modelMapper.map(exerciseService.save(exercise), ExerciseDto.class);
        return new ResponseEntity<ExerciseDto>(data, HttpStatus.CREATED);
    }

    @PutMapping("")
    public ResponseEntity<ExerciseDto> update(@RequestBody ExerciseDto exerciseDto) throws ResourceNotFoundException {
        if (exerciseDto.getId() == null || !exerciseService.existById(exerciseDto.getId())) {
            throw new ResourceNotFoundException("Exercise not found");
        }

        Exercise exercise = modelMapper.map(exerciseDto, Exercise.class);
        ExerciseDto data = modelMapper.map(exerciseService.save(exercise), ExerciseDto.class);
        return new ResponseEntity<ExerciseDto>(data, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable(value = "id") Long id) throws ResourceNotFoundException {
        if (id == null || !exerciseService.existById(id)) {
            throw new ResourceNotFoundException("Exercise not found");
        }

        exerciseService.delete(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
