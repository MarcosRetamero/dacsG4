package utn.dacs.ms.backend.controller;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import utn.dacs.ms.backend.dto.TrainingPlanDto;
import utn.dacs.ms.backend.exceptions.ResourceNotFoundException;
import utn.dacs.ms.backend.model.entity.TrainingPlan;
import utn.dacs.ms.backend.service.TrainingPlanService;

@RestController
@RequestMapping(value = "/training-plan")
public class TrainingPlanController {

    @Autowired
    private TrainingPlanService trainingPlanService;

    @Autowired
    private ModelMapper modelMapper;

    @GetMapping("")
    public ResponseEntity<List<TrainingPlanDto>> getAll() {
        List<TrainingPlan> trainingPlans = trainingPlanService.getAll();
        List<TrainingPlanDto> data = trainingPlans.stream().map(trainingPlan -> modelMapper.map(trainingPlan, TrainingPlanDto.class))
                .collect(Collectors.toList());
        return new ResponseEntity<List<TrainingPlanDto>>(data, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TrainingPlanDto> getById(@PathVariable(value = "id") Long id) throws ResourceNotFoundException {
        Optional<TrainingPlan> trainingPlan = trainingPlanService.getById(id);

        if (trainingPlan.isEmpty()) {
            throw new ResourceNotFoundException("Training plan not found");
        }

        TrainingPlanDto data = modelMapper.map(trainingPlan.get(), TrainingPlanDto.class);
        return new ResponseEntity<TrainingPlanDto>(data, HttpStatus.OK);
    }

    @PostMapping("")
    public ResponseEntity<TrainingPlanDto> create(@RequestBody TrainingPlanDto trainingPlanDto) {
        TrainingPlan trainingPlan = modelMapper.map(trainingPlanDto, TrainingPlan.class);
        TrainingPlanDto data = modelMapper.map(trainingPlanService.save(trainingPlan), TrainingPlanDto.class);
        return new ResponseEntity<TrainingPlanDto>(data, HttpStatus.CREATED);
    }

    @PutMapping("")
    public ResponseEntity<TrainingPlanDto> update(@RequestBody TrainingPlanDto trainingPlanDto) throws ResourceNotFoundException {
        if (trainingPlanDto.getId() == null || !trainingPlanService.existById(trainingPlanDto.getId())) {
            throw new ResourceNotFoundException("Training plan not found");
        }

        TrainingPlan trainingPlan = modelMapper.map(trainingPlanDto, TrainingPlan.class);
        TrainingPlanDto data = modelMapper.map(trainingPlanService.save(trainingPlan), TrainingPlanDto.class);
        return new ResponseEntity<TrainingPlanDto>(data, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable(value = "id") Long id) throws ResourceNotFoundException {
        if (id == null || !trainingPlanService.existById(id)) {
            throw new ResourceNotFoundException("Training plan not found");
        }

        trainingPlanService.delete(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
