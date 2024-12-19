package utn.dacs.ms.backend.controller;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import utn.dacs.ms.backend.dto.TrainerDto;
import utn.dacs.ms.backend.exceptions.ResourceNotFoundException;
import utn.dacs.ms.backend.model.entity.Trainer;
import utn.dacs.ms.backend.service.TrainerService;

@RestController
@RequestMapping(value = "/trainer")
public class TrainerController {

    @Autowired
    private TrainerService trainerService;

    @Autowired
    private ModelMapper modelMapper;

    @GetMapping("")
    public ResponseEntity<List<TrainerDto>> getAll() {
        List<Trainer> trainers = trainerService.getAll();
        List<TrainerDto> data = trainers.stream().map(trainer -> modelMapper.map(trainer, TrainerDto.class))
                .collect(Collectors.toList());
        return new ResponseEntity<List<TrainerDto>>(data, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TrainerDto> getById(@PathVariable(value = "id") Long id) throws ResourceNotFoundException {
        Optional<Trainer> trainer = trainerService.getById(id);

        if (trainer.isEmpty()) {
            throw new ResourceNotFoundException("Trainer not found");
        }

        TrainerDto data = modelMapper.map(trainer.get(), TrainerDto.class);
        return new ResponseEntity<TrainerDto>(data, HttpStatus.OK);
    }

    @PostMapping("")
    public ResponseEntity<TrainerDto> create(@RequestBody TrainerDto trainerDto) {
        Trainer trainer = modelMapper.map(trainerDto, Trainer.class);
        TrainerDto data = modelMapper.map(trainerService.save(trainer), TrainerDto.class);
        return new ResponseEntity<TrainerDto>(data, HttpStatus.CREATED);
    }

    @PutMapping("")
    public ResponseEntity<TrainerDto> update(@RequestBody TrainerDto trainerDto) throws ResourceNotFoundException {
        if (trainerDto.getId() == null || !trainerService.existById(trainerDto.getId())) {
            throw new ResourceNotFoundException("Trainer not found");
        }

        Trainer trainer = modelMapper.map(trainerDto, Trainer.class);
        TrainerDto data = modelMapper.map(trainerService.save(trainer), TrainerDto.class);
        return new ResponseEntity<TrainerDto>(data, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable(value = "id") Long id) throws ResourceNotFoundException {
        if (id == null || !trainerService.existById(id)) {
            throw new ResourceNotFoundException("Trainer not found");
        }

        trainerService.delete(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
