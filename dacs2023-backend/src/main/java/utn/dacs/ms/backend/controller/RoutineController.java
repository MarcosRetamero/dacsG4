package utn.dacs.ms.backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import utn.dacs.ms.backend.dto.RoutineDto;
import utn.dacs.ms.backend.service.RoutineService;

import java.util.List;

@RestController
@RequestMapping("/routines")
@RequiredArgsConstructor
public class RoutineController {

    private final RoutineService routineService;

    @GetMapping
    public List<RoutineDto> getAllRoutines() {
        return routineService.getAllRoutines();
    }
    
    @GetMapping("/customer/{customerId}") //METODO PARA ENCONTAR RUTINAS POR ID DE CUSTOMER
    public ResponseEntity<List<RoutineDto>> getRoutinesByCustomerId(@PathVariable String customerId) {
        List<RoutineDto> routines = routineService.getRoutinesByCustomerId(customerId);
        return ResponseEntity.ok(routines);
    }


    @GetMapping("/{id}")
    public ResponseEntity<RoutineDto> getRoutineById(@PathVariable Long id) {
        RoutineDto routineDto = routineService.getRoutineById(id);
        return routineDto != null ? ResponseEntity.ok(routineDto) : ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<RoutineDto> createRoutine(@RequestBody RoutineDto routineDto) {
        return ResponseEntity.ok(routineService.createRoutine(routineDto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<RoutineDto> updateRoutine(@PathVariable Long id, @RequestBody RoutineDto routineDto) {
        RoutineDto updatedRoutine = routineService.updateRoutine(id, routineDto);
        return updatedRoutine != null ? ResponseEntity.ok(updatedRoutine) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRoutine(@PathVariable Long id) {
        routineService.deleteRoutine(id);
        return ResponseEntity.noContent().build();
    }
}
