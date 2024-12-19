package utn.dacs.ms.bff.api.client;

import java.util.List;

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
    CustomerDto getCustomerById(@RequestParam("id") Long id);

    // Crear un nuevo cliente
    @PostMapping("/customer")
    CustomerDto createCustomer(@RequestBody CustomerDto customerDto);

    @GetMapping("/customer")
	List<CustomerDto> getAllCustomers();
    
    
    ///////// CLIENT PARA EXERCISE //////////

    @GetMapping("/exercise")
    List<ExerciseDto> getAllExercises();

    @GetMapping("/exercise/{exerciseId}")
    ExerciseDto getExerciseById(@PathVariable("exerciseId") Long exerciseId);

    @PostMapping("/exercise")
    ExerciseDto createExercise(@RequestBody ExerciseDto exerciseDto);

    @PutMapping("/exercise/{exerciseId}")
    ExerciseDto updateExercise(@PathVariable("exerciseId") Long exerciseId, @RequestBody ExerciseDto exerciseDto);
    
    
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
    List<HistoricalProgressDto> getHistoricalProgressByCustomerId(@PathVariable("customerId") Long customerId);

    // Método para crear un nuevo registro de progreso histórico
    @PostMapping("/historical-progress")
    HistoricalProgressDto createHistoricalProgress(@RequestBody HistoricalProgressDto historicalProgressDto);

    
    ///////// CLIENT PARA KEYCLOAK USER //////////
    
    // Obtener todos los usuarios de Keycloak
    @GetMapping("/keycloak/users")
    List<KeycloakUserDto> getAllKeycloakUsers();

    // Obtener un usuario de Keycloak por ID
    @GetMapping("/keycloak/user/{id}")
    KeycloakUserDto getKeycloakUserById(@PathVariable("id") Long id);

    // Crear un usuario de Keycloak
    @PostMapping("/keycloak/user")
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
}
