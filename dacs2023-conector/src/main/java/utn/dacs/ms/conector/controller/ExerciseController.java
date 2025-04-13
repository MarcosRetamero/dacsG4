package utn.dacs.ms.conector.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import utn.dacs.ms.conector.dto.ExerciseWithImageDTO;
import utn.dacs.ms.conector.dto.ExerciseDTO;
import utn.dacs.ms.conector.exceptions.BffException;
import utn.dacs.ms.conector.service.ExerciseService;

@RestController
@RequestMapping("/exercises")
public class ExerciseController {

    @Autowired
    private ExerciseService exerciseService;

    @GetMapping
    public ResponseEntity<List<ExerciseDTO>> getExercises() throws BffException {
        List<ExerciseDTO> exercises = exerciseService.getExercises();
        return new ResponseEntity<>(exercises, HttpStatus.OK);
    }

    @GetMapping("/with-images")
    public ResponseEntity<List<ExerciseWithImageDTO>> getExercisesWithImages() throws BffException {
        List<ExerciseWithImageDTO> exercisesWithImages = exerciseService.getExercisesWithImages();
        return new ResponseEntity<>(exercisesWithImages, HttpStatus.OK);
    }
}