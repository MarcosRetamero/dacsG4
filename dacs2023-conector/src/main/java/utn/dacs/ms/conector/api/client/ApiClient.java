package utn.dacs.ms.conector.api.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import utn.dacs.ms.conector.dto.ExerciseDTO;
import utn.dacs.ms.conector.dto.ExerciseImageDTO;
import utn.dacs.ms.conector.dto.WgerApiResponse;

@FeignClient(
        name = "apiClient",
        url = "${feign.client.apiClient.url}"
)
public interface ApiClient {

    // obtener todos los ejercicios en español
    @GetMapping("/exercise")
    WgerApiResponse<ExerciseDTO> getExercises(@RequestParam("limit") int limit, @RequestParam("language") int language);

    // obtener todas las imágenes
    @GetMapping("/exerciseimage")
    WgerApiResponse<ExerciseImageDTO> getExerciseImages(@RequestParam("limit") int limit);
}