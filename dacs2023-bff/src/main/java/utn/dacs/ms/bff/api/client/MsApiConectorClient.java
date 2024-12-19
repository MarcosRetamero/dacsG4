package utn.dacs.ms.bff.api.client;

import java.util.List;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import utn.dacs.ms.bff.dto.ExerciseDto;
import utn.dacs.ms.bff.dto.ExerciseWithImageDto;
import utn.dacs.ms.bff.dto.BuildInfoDTO;

@FeignClient(
    name = "msApiConectorClient", 
    url = "${feign.client.msApiConectorClient.url}"
)
public interface MsApiConectorClient {

    @GetMapping("/ping")
    String ping();
    
    @GetMapping("/version")
    BuildInfoDTO version();

 // ENDPOINTS para obtener EJERCICIOS de la API WGER
    @GetMapping("/exercises")
    List<ExerciseDto> getExercises(); // <-- Endpoint para obtener la lista de ejercicios
    
    @GetMapping("/exercises/with-images")
    List<ExerciseWithImageDto> getExercisesWithImages();
}
