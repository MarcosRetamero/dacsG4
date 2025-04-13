package utn.dacs.ms.bff.api.client;

import java.util.List;
import java.util.Map;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import utn.dacs.ms.bff.dto.CustomerDto;
import utn.dacs.ms.bff.dto.ExerciseDto;
import utn.dacs.ms.bff.dto.ExerciseRoutineDto;
import utn.dacs.ms.bff.dto.HistoricalProgressDto;
import utn.dacs.ms.bff.dto.KeycloakUserDto;
import utn.dacs.ms.bff.dto.RoutineDto;
import utn.dacs.ms.bff.dto.TrainerDto;
import utn.dacs.ms.bff.dto.TrainingPlanDto;
import utn.dacs.ms.bff.dto.TrainingRoutineDto;
import utn.dacs.ms.bff.dto.BuildInfoDTO;

@FeignClient(
    name = "msApiBackendClient",  
    url = "${feign.client.msApiBackendClient.url}" 
)
public interface MsApiBackendClient {

    @GetMapping("/ping")
    String ping();
    
    @GetMapping("/version")
    BuildInfoDTO version();
    
    //// METODO PARA LA AUTENTICACIÓN Y EL TOKEN JWT DE CADA USUARIO KEYCLOAK NUEVO
    
    @PostMapping("/save-user")
    String saveKeycloakUser(@RequestBody KeycloakUserDto userDto);
    
    ///////// METODOS PARA CUSTOMER //////////
    
    // Obtener un cliente por ID
    @GetMapping("/customer/{id}")
    CustomerDto getCustomerById(@RequestParam("id") String id);

    // Crear un nuevo cliente
    @PostMapping("/customer")
    CustomerDto createCustomer(@RequestBody CustomerDto customerDto);

    @GetMapping("/customer")
	List<CustomerDto> getAllCustomers();
    
    @PutMapping("/customer/{id}/goal")
    CustomerDto updateCustomerGoal(@PathVariable("id") String id, @RequestBody Map<String, String> request);
    
    @PutMapping("/customer/{id}")
    CustomerDto updateCustomer(@PathVariable String id, @RequestBody CustomerDto dto);
    
    
    ///////// CLIENT PARA EXERCISE //////////

    @GetMapping("/exercise")
    List<ExerciseDto> getAllExercises();

    @GetMapping("/exercise/{exerciseId}")
    ExerciseDto getExerciseById(@PathVariable("exerciseId") Long exerciseId);

    @PostMapping("/exercise")
    ExerciseDto createExercise(@RequestBody ExerciseDto exerciseDto);

    @PutMapping("/exercise/{exerciseId}")
    ExerciseDto updateExercise(@PathVariable("exerciseId") Long exerciseId, @RequestBody ExerciseDto exerciseDto);
    
 // Obtener ejercicios por routineId
    @GetMapping("/exercise/routine/{routineId}")
    List<ExerciseDto> getExercisesByRoutineId(@PathVariable("routineId") Integer routineId);

    // Crear ejercicio para una rutina específica
    @PostMapping("/exercise/routine/{routineId}")
    ExerciseDto createExerciseForRoutine(@PathVariable("routineId") Integer routineId, @RequestBody ExerciseDto exerciseDto);

    
    
    ///////// CLIENT PARA EXERCISE ROUTINE //////////
    
    // Método para obtener una rutina de ejercicios por ID
    @GetMapping("/exercise-routine/{id}")
    ExerciseRoutineDto getExerciseRoutineById(@PathVariable("id") Long id);

    // Método para obtener todas las rutinas de ejercicios
    @GetMapping("/exercise-routine")
    List<ExerciseRoutineDto> getAllExerciseRoutines();

    // Método para crear una nueva rutina de ejercicios
    @PostMapping("/exercise-routine")
    ExerciseRoutineDto createExerciseRoutine(@RequestBody ExerciseRoutineDto exerciseRoutineDto);
    
    
    ///////// CLIENT PARA HISTORICAL PROGRESS //////////

    // Método para obtener el progreso histórico por ID
    @GetMapping("/historical-progress/{id}")
    HistoricalProgressDto getHistoricalProgressById(@PathVariable("id") Long id);

    // Método para obtener todos los registros de progreso histórico de un cliente
    @GetMapping("/historical-progress/customer/{customerId}")
    List<HistoricalProgressDto> getHistoricalProgressByCustomerId(@PathVariable("customerId") String customerId);

    // Método para crear un nuevo registro de progreso histórico
    @PostMapping("/historical-progress")
    HistoricalProgressDto createHistoricalProgress(@RequestBody HistoricalProgressDto historicalProgressDto);
    
    @PutMapping("/historical-progress/customer/{customerId}")
    HistoricalProgressDto updateLastHistoricalProgressByCustomerId(
        @PathVariable("customerId") String customerId,
        @RequestBody HistoricalProgressDto progressDto
    );


    
    ///////// CLIENT PARA KEYCLOAK USER //////////
    
    // Obtener todos los usuarios de Keycloak
    @GetMapping("/keycloak")
    List<KeycloakUserDto> getAllKeycloakUsers();

    // Obtener un usuario de Keycloak por ID
    @GetMapping("/keycloak/{id}")
    KeycloakUserDto getKeycloakUserById(@PathVariable("id") Long id);

    // Crear un usuario de Keycloak
    @PostMapping("/keycloak")
    KeycloakUserDto createKeycloakUser(@RequestBody KeycloakUserDto keycloakUserDto);
    
    
    ///////// CLIENT PARA TRAINER //////////
    
    // Obtener un entrenador por ID
    @GetMapping("/trainer/{id}")
    TrainerDto getTrainerById(@PathVariable("id") Long id);

    // Obtener todos los entrenadores
    @GetMapping("/trainers")
    List<TrainerDto> getAllTrainers();

    // Crear un nuevo entrenador
    @PostMapping("/trainer")
    TrainerDto createTrainer(@RequestBody TrainerDto trainerDto);
    
    
    ///////// CLIENT PARA TRAINING PLAN //////////

    // Obtener un plan de entrenamiento por ID
    @GetMapping("/training-plan/{id}")
    TrainingPlanDto getTrainingPlanById(@PathVariable("id") Long id);

    // Obtener todos los planes de entrenamiento
    @GetMapping("/training-plan")
    List<TrainingPlanDto> getAllTrainingPlans();

    // Crear un nuevo plan de entrenamiento
    @PostMapping("/training-plan")
    TrainingPlanDto createTrainingPlan(@RequestBody TrainingPlanDto trainingPlanDto);
    
 // Eliminar un plan de entrenamiento por ID
    @DeleteMapping("/training-plan/{id}")
    void deleteTrainingPlan(@PathVariable("id") Long id);
    

    ///////// CLIENT PARA TRAINING ROUTINE //////////
    
 // Obtener una rutina de entrenamiento por ID
    @GetMapping("/training-routine/{id}")
    TrainingRoutineDto getTrainingRoutineById(@PathVariable("id") Long id);

    // Obtener todas las rutinas de entrenamiento
    @GetMapping("/training-routines")
    List<TrainingRoutineDto> getAllTrainingRoutines();

    // Crear una nueva rutina de entrenamiento
    @PostMapping("/training-routine")
    TrainingRoutineDto createTrainingRoutine(@RequestBody TrainingRoutineDto trainingRoutineDto);
    
    ///////// CLIENT PARA ROUTINE //////////

    @GetMapping("/routines/{id}")
    RoutineDto getRoutineById(@PathVariable("id") Long id);

    @GetMapping("/routines")
    List<RoutineDto> getAllRoutines();

    @PostMapping("/routines")
    RoutineDto createRoutine(@RequestBody RoutineDto routineDto);

    @PutMapping("/routines/{id}")
    RoutineDto updateRoutine(@PathVariable("id") Long id, @RequestBody RoutineDto routineDto);

    @DeleteMapping("/routines/{id}")
    void deleteRoutine(@PathVariable("id") Long id);

    @GetMapping("/routines/customer/{customerId}")
	List<RoutineDto> getRoutinesByCustomerId(@RequestParam("customerId") String customerId); /// PARA OBTENER RUTINAS POR ID DE CUSTOMER
    
    

}
