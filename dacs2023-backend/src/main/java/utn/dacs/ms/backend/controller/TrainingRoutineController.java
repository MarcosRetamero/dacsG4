package utn.dacs.ms.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import utn.dacs.ms.backend.model.entity.TrainingRoutine;
import utn.dacs.ms.backend.service.TrainingRoutineService;

import java.util.List;

@RestController
@RequestMapping("/training-routine")
public class TrainingRoutineController {

    @Autowired
    private TrainingRoutineService trainingRoutineService;

    // Obtener todos los TrainingRoutines
    @GetMapping
    public ResponseEntity<List<TrainingRoutine>> getAllTrainingRoutines() {
        List<TrainingRoutine> routines = trainingRoutineService.getAllTrainingRoutines();
        return new ResponseEntity<>(routines, HttpStatus.OK);
    }

    // Obtener TrainingRoutine por ID
    @GetMapping("/{id}")
    public ResponseEntity<TrainingRoutine> getTrainingRoutineById(@PathVariable Long id) {
        TrainingRoutine routine = trainingRoutineService.getTrainingRoutineById(id);
        if (routine == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(routine, HttpStatus.OK);
    }

    // Crear un nuevo TrainingRoutine
    @PostMapping
    public ResponseEntity<TrainingRoutine> createTrainingRoutine(@RequestBody TrainingRoutine trainingRoutine) {
        TrainingRoutine createdRoutine = trainingRoutineService.createTrainingRoutine(trainingRoutine);
        return new ResponseEntity<>(createdRoutine, HttpStatus.CREATED);
    }

    // Actualizar un TrainingRoutine
    @PutMapping("/{id}")
    public ResponseEntity<TrainingRoutine> updateTrainingRoutine(@PathVariable Long id, @RequestBody TrainingRoutine trainingRoutine) {
        TrainingRoutine updatedRoutine = trainingRoutineService.updateTrainingRoutine(id, trainingRoutine);
        if (updatedRoutine == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(updatedRoutine, HttpStatus.OK);
    }

    // Eliminar un TrainingRoutine por ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTrainingRoutine(@PathVariable Long id) {
        boolean isDeleted = trainingRoutineService.deleteTrainingRoutine(id);
        if (isDeleted) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
