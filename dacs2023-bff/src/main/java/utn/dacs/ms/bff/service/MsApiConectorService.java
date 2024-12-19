package utn.dacs.ms.bff.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import lombok.extern.slf4j.Slf4j;
import utn.dacs.ms.bff.api.client.MsApiConectorClient;
import utn.dacs.ms.bff.dto.BuildInfoDTO;
import utn.dacs.ms.bff.dto.ExerciseDto;
import utn.dacs.ms.bff.dto.ExerciseWithImageDto;
import utn.dacs.ms.bff.exceptions.BffException;
import utn.dacs.ms.bff.exceptions.ErrorEnum;

import java.util.List;

@Service
@Slf4j
public class MsApiConectorService {

	@Autowired
    private MsApiConectorClient msApiConectorClient;
	
	
    public String ping() {
        try {
            return this.msApiConectorClient.ping();
        } catch (Exception e) {
           log.error("Error producido al solicitar un recurso a /conector/ping", e);
            throw new BffException(ErrorEnum.ERROR_API);
        }
    }
    
    public BuildInfoDTO version() {
        try {
            return this.msApiConectorClient.version();
        } catch (Exception e) {
            log.error("Error producido al solicitar un recurso a /conector/version", e);
            throw new BffException(ErrorEnum.ERROR_API);
        }
    }    
    
    // Nuevo método para obtener la lista de ejercicios
    public List<ExerciseDto> getExercises() {
        try {
            return this.msApiConectorClient.getExercises();
        } catch (Exception e) {
            log.error("Error producido al solicitar los ejercicios desde /conector/exercises", e);
            throw new BffException(ErrorEnum.ERROR_API);
        }
    }
    
    public List<ExerciseWithImageDto> getExercisesWithImages() {
        try {
            return this.msApiConectorClient.getExercisesWithImages();
        } catch (Exception e) {
            log.error("Error en /exercises/with-images", e);
            throw new BffException(ErrorEnum.ERROR_API);
        }
    }
 
}
