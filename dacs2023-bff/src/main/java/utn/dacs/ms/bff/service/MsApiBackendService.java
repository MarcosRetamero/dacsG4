package utn.dacs.ms.bff.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import lombok.extern.slf4j.Slf4j;
import utn.dacs.ms.bff.api.client.MsApiBackendClient;
import utn.dacs.ms.bff.dto.CustomerDto;
import utn.dacs.ms.bff.dto.ExerciseDto;
import utn.dacs.ms.bff.dto.ExerciseRoutineDto;
import utn.dacs.ms.bff.dto.HistoricalProgressDto;
import utn.dacs.ms.bff.dto.KeycloakUserDto;
import utn.dacs.ms.bff.dto.TrainerDto;
import utn.dacs.ms.bff.dto.TrainingPlanDto;
import utn.dacs.ms.bff.dto.TrainingRoutineDto;
import utn.dacs.ms.bff.dto.BuildInfoDTO;
import utn.dacs.ms.bff.exceptions.BffException;
import utn.dacs.ms.bff.exceptions.ErrorEnum;

@Service
@Slf4j
public class MsApiBackendService {

    @Autowired
    private MsApiBackendClient msApiBackendClient;

    public String ping() {
        try {
            return this.msApiBackendClient.ping();
        } catch (Exception e) {
            log.error("Error producido al solicitar un recurso a /backend/ping", e);
            throw new BffException(ErrorEnum.ERROR_API);
        }
    }

    public BuildInfoDTO version() {
        try {
            return this.msApiBackendClient.version();
        } catch (Exception e) {
            log.error("Error producido al solicitar un recurso a /backend/version", e);
            throw new BffException(ErrorEnum.ERROR_API);
        }
    }
    
    
    

    /////// MÉTODOS RELACIONADOS con el Customer /////////
    public CustomerDto getCustomerById(Long id) {
        try {
            return this.msApiBackendClient.getCustomerById(id); // Llamada al método Feign en el cliente Backend
        } catch (Exception e) {
            log.error("Error producido al obtener el cliente con id: {}", id, e);
            throw new BffException(ErrorEnum.ERROR_API);
        }
    }

    public CustomerDto createCustomer(CustomerDto customerDto) {
        try {
            return this.msApiBackendClient.createCustomer(customerDto); // Llamada al método Feign en el cliente Backend
        } catch (Exception e) {
            log.error("Error producido al crear el cliente: {}", customerDto, e);
            throw new BffException(ErrorEnum.ERROR_API);
        }
    }
    
    // Método para obtener todos los clientes
    public List<CustomerDto> getAllCustomers() {
        return this.msApiBackendClient.getAllCustomers(); // Llama al backend a través del cliente
    }
    
    
    /////// SERVICE RELACIONADOS CON EXERCISE /////////
    
 // Obtener todos los ejercicios
    public List<ExerciseDto> getAllExercises() {
        return msApiBackendClient.getAllExercises();
    }

    // Obtener un ejercicio por ID
    public ExerciseDto getExerciseById(Long exerciseId) {
        return msApiBackendClient.getExerciseById(exerciseId);
    }

    // Crear un nuevo ejercicio
    public ExerciseDto createExercise(ExerciseDto exerciseDto) {
        return msApiBackendClient.createExercise(exerciseDto);
    }

    // Actualizar un ejercicio
    public ExerciseDto updateExercise(Long exerciseId, ExerciseDto exerciseDto) {
        return msApiBackendClient.updateExercise(exerciseId, exerciseDto);
    }
    
    
    ////////// SERVICE PARA EXERCISE ROUTINE ////////////    
    
    // Método para obtener una rutina de ejercicios por ID
    public ExerciseRoutineDto getExerciseRoutineById(Long id) {
        return msApiBackendClient.getExerciseRoutineById(id);
    }

    // Método para obtener todas las rutinas de ejercicios
    public List<ExerciseRoutineDto> getAllExerciseRoutines() {
        return msApiBackendClient.getAllExerciseRoutines();
    }

    // Método para crear una nueva rutina de ejercicios
    public ExerciseRoutineDto createExerciseRoutine(ExerciseRoutineDto exerciseRoutineDto) {
        return msApiBackendClient.createExerciseRoutine(exerciseRoutineDto);
    }
    
    
    //////////SERVICE PARA HISTORICAL PROGRESS ////////////    
    
 // Método para obtener el progreso histórico por ID
    public HistoricalProgressDto getHistoricalProgressById(Long id) {
        return msApiBackendClient.getHistoricalProgressById(id);
    }

    // Método para obtener el progreso histórico de un cliente por su ID
    public List<HistoricalProgressDto> getHistoricalProgressByCustomerId(Long customerId) {
        return msApiBackendClient.getHistoricalProgressByCustomerId(customerId);
    }

    // Método para crear un nuevo registro de progreso histórico
    public HistoricalProgressDto createHistoricalProgress(HistoricalProgressDto historicalProgressDto) {
        return msApiBackendClient.createHistoricalProgress(historicalProgressDto);
    }
    
    
    //////////SERVICE PARA KEYCLOAK USER ////////////    
    
    // Obtener todos los usuarios de Keycloak
    public List<KeycloakUserDto> getAllKeycloakUsers() {
        return msApiBackendClient.getAllKeycloakUsers();
    }

    // Obtener un usuario de Keycloak por ID
    public KeycloakUserDto getKeycloakUserById(Long id) {
        return msApiBackendClient.getKeycloakUserById(id);
    }

    // Crear un nuevo usuario en Keycloak
    public KeycloakUserDto createKeycloakUser(KeycloakUserDto keycloakUserDto) {
        return msApiBackendClient.createKeycloakUser(keycloakUserDto);
    }
    
    //////////SERVICE PARA TRAINER ////////////    

    // Obtener un entrenador por ID
    public TrainerDto getTrainerById(Long id) {
        return msApiBackendClient.getTrainerById(id);
    }

    // Obtener todos los entrenadores
    public List<TrainerDto> getAllTrainers() {
        return msApiBackendClient.getAllTrainers();
    }

    // Crear un nuevo entrenador
    public TrainerDto createTrainer(TrainerDto trainerDto) {
        return msApiBackendClient.createTrainer(trainerDto);
    }
    
    //////////SERVICE PARA TRAINING PAN ////////////    

 // Obtener un plan de entrenamiento por ID
    public TrainingPlanDto getTrainingPlanById(Long id) {
        return msApiBackendClient.getTrainingPlanById(id);
    }

    // Obtener todos los planes de entrenamiento
    public List<TrainingPlanDto> getAllTrainingPlans() {
        return msApiBackendClient.getAllTrainingPlans();
    }

    // Crear un nuevo plan de entrenamiento
    public TrainingPlanDto createTrainingPlan(TrainingPlanDto trainingPlanDto) {
        return msApiBackendClient.createTrainingPlan(trainingPlanDto);
    }
    
	// Eliminar un plan de entrenamiento por ID
    public void deleteTrainingPlan(Long id) {
    	msApiBackendClient.deleteTrainingPlan(id);
    }
    
    
    //////////SERVICE PARA TRAINING ROUTINE ////////////    
    
 // Obtener una rutina de entrenamiento por ID
    public TrainingRoutineDto getTrainingRoutineById(Long id) {
        return msApiBackendClient.getTrainingRoutineById(id);
    }

    // Obtener todas las rutinas de entrenamiento
    public List<TrainingRoutineDto> getAllTrainingRoutines() {
        return msApiBackendClient.getAllTrainingRoutines();
    }

    // Crear una nueva rutina de entrenamiento
    public TrainingRoutineDto createTrainingRoutine(TrainingRoutineDto trainingRoutineDto) {
        return msApiBackendClient.createTrainingRoutine(trainingRoutineDto);
    }

}
