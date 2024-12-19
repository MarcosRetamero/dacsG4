package utn.dacs.ms.bff.controller;


import java.util.List;

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
    public CustomerDto getCustomerInfo(@PathVariable Long customerId) {
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
    public List<HistoricalProgressDto> getHistoricalProgressByCustomerId(@PathVariable Long customerId) {
        return apiBackendService.getHistoricalProgressByCustomerId(customerId);
    }

    // Ruta para crear un nuevo registro de progreso histórico
    @PostMapping("/historical-progress")
    public HistoricalProgressDto createHistoricalProgress(@RequestBody HistoricalProgressDto historicalProgressDto) {
        return apiBackendService.createHistoricalProgress(historicalProgressDto);
    }
 
    
    ////////// REQUEST PARA KEYCLOAK USER ////////////
    
    // Ruta para obtener todos los usuarios de Keycloak
    @GetMapping("/keycloak/users")
    public List<KeycloakUserDto> getAllKeycloakUsers() {
        return apiBackendService.getAllKeycloakUsers();
    }

    // Ruta para obtener un usuario de Keycloak por ID
    @GetMapping("/keycloak/user/{id}")
    public KeycloakUserDto getKeycloakUser(@PathVariable Long id) {
        return apiBackendService.getKeycloakUserById(id);
    }

    // Ruta para crear un nuevo usuario de Keycloak
    @PostMapping("/keycloak/user")
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
}
