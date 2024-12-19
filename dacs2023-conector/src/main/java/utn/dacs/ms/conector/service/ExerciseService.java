package utn.dacs.ms.conector.service;

import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lombok.extern.slf4j.Slf4j;
import utn.dacs.ms.conector.api.client.ApiClient;
import utn.dacs.ms.conector.dto.ExerciseDTO;
import utn.dacs.ms.conector.dto.ExerciseImageDTO;
import utn.dacs.ms.conector.dto.ExerciseWithImageDTO;

@Service
@Slf4j
public class ExerciseService {

    private static final int DEFAULT_LANGUAGE = 4; // idioma español
    private static final int DEFAULT_LIMIT = 85;  // cantidad máxima de elementos

    @Autowired
    private ApiClient apiClient;

    /**
     * obtiene todos los ejercicios en español según el límite definido.
     *
     * @return lista de objetos ExerciseDTO
     */
    public List<ExerciseDTO> getExercises() {
        try {
            return apiClient.getExercises(DEFAULT_LIMIT, DEFAULT_LANGUAGE).getResults();
        } catch (Exception e) {
            log.error("error al obtener los ejercicios: {}", e.getMessage());
            throw new RuntimeException("fallo al obtener los ejercicios", e);
        }
    }

    /**
     * obtiene todos los ejercicios junto con sus imágenes, relacionándolos por el campo exerciseBaseId.
     *
     * @return lista de objetos ExerciseWithImageDTO
     */
    public List<ExerciseWithImageDTO> getExercisesWithImages() {
        try {
            // obtiene ejercicios e imágenes desde la api externa
            List<ExerciseDTO> exercises = apiClient.getExercises(DEFAULT_LIMIT, DEFAULT_LANGUAGE).getResults();
            List<ExerciseImageDTO> images = apiClient.getExerciseImages(DEFAULT_LIMIT).getResults();

            // crea un mapa para asociar las imágenes por exerciseBaseId
            Map<Long, ExerciseImageDTO> imageMap = images.stream()
                    .collect(Collectors.toMap(ExerciseImageDTO::getExercise_base, Function.identity()));

            // combina ejercicios e imágenes
            return exercises.stream()
                    .map(exercise -> {
                        ExerciseWithImageDTO exerciseWithImage = new ExerciseWithImageDTO();
                        exerciseWithImage.setExercise(exercise);
                        exerciseWithImage.setImage(imageMap.get(exercise.getExercise_base())); // asigna imagen por idBase
                        return exerciseWithImage;
                    })
                    .collect(Collectors.toList());
        } catch (Exception e) {
            log.error("error al obtener ejercicios con imágenes: {}", e.getMessage());
            throw new RuntimeException("fallo al obtener ejercicios con imágenes", e);
        }
    }
}