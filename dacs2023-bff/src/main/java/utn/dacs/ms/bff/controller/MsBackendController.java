package utn.dacs.ms.bff.controller;


import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.extern.slf4j.Slf4j;
import utn.dacs.ms.bff.dto.BuildInfoDTO;
import utn.dacs.ms.bff.dto.CustomerDto;  // DTO para Customer
import utn.dacs.ms.bff.dto.ExerciseDto;
import utn.dacs.ms.bff.dto.ExerciseRoutineDto;
import utn.dacs.ms.bff.dto.HistoricalProgressDto;
import utn.dacs.ms.bff.dto.KeycloakUserDto;
import utn.dacs.ms.bff.dto.RoutineDto;
import utn.dacs.ms.bff.dto.TrainerDto;
import utn.dacs.ms.bff.dto.TrainingPlanDto;
import utn.dacs.ms.bff.dto.TrainingRoutineDto;
import utn.dacs.ms.bff.service.MsApiBackendService;

@RestController
@RequestMapping("/backend")
@Slf4j
public class MsBackendController {

    @Autowired
    private MsApiBackendService apiBackendService;

    @GetMapping("/ping")
    public String ping() {
        return apiBackendService.ping();
    }
    
    @GetMapping("/version")
    public BuildInfoDTO version() {
        return apiBackendService.version();
    }
    /*
    @GetMapping("/reason")
    public List<ReasonDTO> getMotivos() {
    	return apiConectorService.getReason();
    }*/
   
    ////////// REQUEST PARA CUSTOMER ////////////
    
    @GetMapping("/customer/{customerId}")
    public CustomerDto getCustomerInfo(@PathVariable String customerId) {
        log.info("Obteniendo información para el cliente con ID: {}", customerId);
        return apiBackendService.getCustomerById(customerId);  // Llama al servicio para obtener la info del cliente.
    }
    
    @GetMapping("/customer")
    public List<CustomerDto> getAllCustomers() {
        log.info("Obteniendo lista de todos los clientes");
        return apiBackendService.getAllCustomers();  // Llama al servicio para obtener todos los clientes.
    }
    
    @PostMapping("/customer")
    public CustomerDto createCustomer(@RequestBody CustomerDto customerDto) {
        log.info("Creando un nuevo cliente: {}", customerDto);
        return apiBackendService.createCustomer(customerDto);  // Llama al servicio para crear el cliente.
    }
    
    @PutMapping("/customer/{id}/goal")
    public CustomerDto updateCustomerGoal(@PathVariable String id, @RequestBody Map<String, String> body) {
        return apiBackendService.updateCustomerGoal(id, body.get("goal"));
    }
    
    @PutMapping("/customer/{id}")
    public CustomerDto updateCustomer(@PathVariable String id, @RequestBody CustomerDto customerDto) {
        log.info("Actualizando cliente con ID: {}", id);
        return apiBackendService.updateCustomer(id, customerDto);
    }


    
    ////////// REQUEST PARA EXERCISE ////////////
    
    // Obtener todos los ejercicios
    @GetMapping("/exercise")
    public List<ExerciseDto> getAllExercises() {
        log.info("Obteniendo lista de todos los ejercicios");
        return apiBackendService.getAllExercises();
    }

    // Obtener un ejercicio por ID
    @GetMapping("/exercise/{exerciseId}")
    public ExerciseDto getExerciseById(@PathVariable Long exerciseId) {
        log.info("Obteniendo información para el ejercicio con ID: {}", exerciseId);
        return apiBackendService.getExerciseById(exerciseId);
    }

    // Crear un nuevo ejercicio
    @PostMapping("/exercise")
    public ExerciseDto createExercise(@RequestBody ExerciseDto exerciseDto) {
        log.info("Creando un nuevo ejercicio: {}", exerciseDto);
        return apiBackendService.createExercise(exerciseDto);
    }

    // Actualizar un ejercicio
    @PutMapping("/exercise/{exerciseId}")
    public ExerciseDto updateExercise(@PathVariable Long exerciseId, @RequestBody ExerciseDto exerciseDto) {
        log.info("Actualizando ejercicio con ID: {}", exerciseId);
        return apiBackendService.updateExercise(exerciseId, exerciseDto);
    }
    
    
 // Obtener ejercicios por routineId
    @GetMapping("/exercise/routine/{routineId}")
    public List<ExerciseDto> getExercisesByRoutineId(@PathVariable Integer routineId) {
        log.info("Obteniendo ejercicios para la rutina con ID: {}", routineId);
        return apiBackendService.getExercisesByRoutineId(routineId);
    }

    // Crear ejercicio en una rutina
    @PostMapping("/exercise/routine/{routineId}")
    public ExerciseDto createExerciseForRoutine(@PathVariable Integer routineId, @RequestBody ExerciseDto exerciseDto) {
        log.info("Creando ejercicio en la rutina con ID: {}", routineId);
        return apiBackendService.createExerciseForRoutine(routineId, exerciseDto);
    }

    
    
    ////////// REQUEST PARA EXERCISE ROUTINE ////////////
    
    // Ruta para obtener una rutina de ejercicios por ID
    @GetMapping("/exercise-routine/{id}")
    public ExerciseRoutineDto getExerciseRoutine(@PathVariable Long id) {
        return apiBackendService.getExerciseRoutineById(id);
    }

    // Ruta para obtener todas las rutinas de ejercicios
    @GetMapping("/exercise-routine")
    public List<ExerciseRoutineDto> getAllExerciseRoutines() {
        return apiBackendService.getAllExerciseRoutines();
    }

    // Ruta para crear una nueva rutina de ejercicios
    @PostMapping("/exercise-routine")
    public ExerciseRoutineDto createExerciseRoutine(@RequestBody ExerciseRoutineDto exerciseRoutineDto) {
        return apiBackendService.createExerciseRoutine(exerciseRoutineDto);
    }
    
    
    ////////// REQUEST PARA HISTORICAL PROGRESS ////////////

    // Ruta para obtener el progreso histórico por ID
    @GetMapping("/historical-progress/{id}")
    public HistoricalProgressDto getHistoricalProgress(@PathVariable Long id) {
        return apiBackendService.getHistoricalProgressById(id);
    }

    // Ruta para obtener todos los registros de progreso histórico de un cliente
    @GetMapping("/historical-progress/customer/{customerId}")
    public List<HistoricalProgressDto> getHistoricalProgressByCustomerId(@PathVariable String customerId) {
        return apiBackendService.getHistoricalProgressByCustomerId(customerId);
    }

    // Ruta para crear un nuevo registro de progreso histórico
    @PostMapping("/historical-progress")
    public HistoricalProgressDto createHistoricalProgress(@RequestBody HistoricalProgressDto historicalProgressDto) {
        return apiBackendService.createHistoricalProgress(historicalProgressDto);
    }
    
    @PutMapping("/historical-progress/customer/{customerId}")
    public HistoricalProgressDto updateLastHistoricalProgressByCustomerId(
            @PathVariable String customerId,
            @RequestBody HistoricalProgressDto progressDto) {
        
        log.info("Actualizando el último progreso histórico para el cliente con ID: {}", customerId);
        return apiBackendService.updateLastHistoricalProgressByCustomerId(customerId, progressDto);
    }

 
    
    ////////// REQUEST PARA KEYCLOAK USER ////////////
    
    // Ruta para obtener todos los usuarios de Keycloak
    @GetMapping("/keycloak")
    public List<KeycloakUserDto> getAllKeycloakUsers() {
        return apiBackendService.getAllKeycloakUsers();
    }

    // Ruta para obtener un usuario de Keycloak por ID
    @GetMapping("/keycloak/{id}")
    public KeycloakUserDto getKeycloakUser(@PathVariable Long id) {
        return apiBackendService.getKeycloakUserById(id);
    }

    // Ruta para crear un nuevo usuario de Keycloak
    @PostMapping("/keycloak")
    public KeycloakUserDto createKeycloakUser(@RequestBody KeycloakUserDto keycloakUserDto) {
        return apiBackendService.createKeycloakUser(keycloakUserDto);
    }
    
    
    ////////// REQUEST PARA TRAINER ////////////
    
 // Ruta para obtener un entrenador por ID
    @GetMapping("/trainer/{id}")
    public TrainerDto getTrainer(@PathVariable Long id) {
        return apiBackendService.getTrainerById(id);
    }

    // Ruta para obtener todos los entrenadores
    @GetMapping("/trainers")
    public List<TrainerDto> getAllTrainers() {
        return apiBackendService.getAllTrainers();
    }

    // Ruta para crear un nuevo entrenador
    @PostMapping("/trainer")
    public TrainerDto createTrainer(@RequestBody TrainerDto trainerDto) {
        return apiBackendService.createTrainer(trainerDto);
    }

    ////////// REQUEST PARA TRAINING PLAN ////////////
    
 // Ruta para obtener un plan de entrenamiento por ID
    @GetMapping("/training-plan/{id}")
    public TrainingPlanDto getTrainingPlan(@PathVariable Long id) {
        return apiBackendService.getTrainingPlanById(id);
    }

    // Ruta para obtener todos los planes de entrenamiento
    @GetMapping("/training-plan")
    public List<TrainingPlanDto> getAllTrainingPlans() {
        return apiBackendService.getAllTrainingPlans();
    }

    // Ruta para crear un nuevo plan de entrenamiento
    @PostMapping("/training-plan")
    public TrainingPlanDto createTrainingPlan(@RequestBody TrainingPlanDto trainingPlanDto) {
        return apiBackendService.createTrainingPlan(trainingPlanDto);
    }
    
 // Ruta para eliminar un plan de entrenamiento por ID
    @DeleteMapping("/training-plan/{id}")
    public void deleteTrainingPlan(@PathVariable Long id) {
        apiBackendService.deleteTrainingPlan(id);
    }

    ////////// REQUEST PARA TRAINING ROUTINE ////////////

 // Ruta para obtener una rutina de entrenamiento por ID
    @GetMapping("/training-routine/{id}")
    public TrainingRoutineDto getTrainingRoutine(@PathVariable Long id) {
        return apiBackendService.getTrainingRoutineById(id);
    }

    // Ruta para obtener todas las rutinas de entrenamiento
    @GetMapping("/training-routines")
    public List<TrainingRoutineDto> getAllTrainingRoutines() {
        return apiBackendService.getAllTrainingRoutines();
    }

    // Ruta para crear una nueva rutina de entrenamiento
    @PostMapping("/training-routine")
    public TrainingRoutineDto createTrainingRoutine(@RequestBody TrainingRoutineDto trainingRoutineDto) {
        return apiBackendService.createTrainingRoutine(trainingRoutineDto);
    }
    
    //////////REQUEST PARA ROUTINE (NO USAR)////////////
    
    @GetMapping("/routines/{id}")
    public RoutineDto getRoutine(@PathVariable Long id) {
        return apiBackendService.getRoutineById(id);
    }
    
    @GetMapping("/routines")
    public List<RoutineDto> getAllRoutines() {
        return apiBackendService.getAllRoutines();
    }
    
    @PostMapping("/routines")
    public RoutineDto createRoutine(@RequestBody RoutineDto routineDto) {
        return apiBackendService.createRoutine(routineDto);
    }
    
    @PutMapping("/routines/{id}")
    public RoutineDto updateRoutine(@PathVariable Long id, @RequestBody RoutineDto routineDto) {
        return apiBackendService.updateRoutine(id, routineDto);
    }
    
    @DeleteMapping("/routines/{id}")
    public void deleteRoutine(@PathVariable Long id) {
        apiBackendService.deleteRoutine(id);
    }
    
    
    /////// REQUEST PARA ROUTINES (USAR ESTE) ////////
    
    
 // Obtener rutinas por customerId
    @GetMapping("/routines/customer/{customerId}")
    public List<RoutineDto> getRoutinesByCustomerId(@PathVariable String customerId) {
        log.info("Obteniendo rutinas para el cliente con ID: {}", customerId);
        return apiBackendService.getRoutinesByCustomerId(customerId);  // Llama al servicio para obtener las rutinas por customerId
    }
    
}
