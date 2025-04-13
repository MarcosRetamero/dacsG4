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

import javax.annotation.PostConstruct;

@Service
@Slf4j
public class ExerciseService {

    private static final int DEFAULT_LANGUAGE = 4; // idioma español
    private static final int DEFAULT_LIMIT = 85;   // cantidad máxima de elementos

    @Autowired
    private ApiClient apiClient;

    /**
     * Obtiene todos los ejercicios en español desde el endpoint /exercise-translation.
     */
    public List<ExerciseDTO> getExercises() {
        try {
            return apiClient.getExercises(DEFAULT_LIMIT, DEFAULT_LANGUAGE)
                    .getResults()
                    .stream()
                    .filter(e -> e.getLanguage() == DEFAULT_LANGUAGE) // ✅ filtro manual
                    .collect(Collectors.toList());
        } catch (Exception e) {
            log.error("error al obtener los ejercicios traducidos: {}", e.getMessage());
            throw new RuntimeException("fallo al obtener los ejercicios traducidos", e);
        }
    }

    /**
     * Test en el arranque para verificar si la API responde.
     */
    @PostConstruct
    public void testWgerApiDirecto() {
        System.out.println(">>>>> TEST WGER API DIRECTO");

        try {
            List<ExerciseDTO> ejercicios = apiClient.getExercises(5, DEFAULT_LANGUAGE).getResults();

            for (ExerciseDTO e : ejercicios) {
                if (e.getLanguage() == DEFAULT_LANGUAGE) { // ✅ filtro en test también
                    System.out.println("ID: " + e.getId());
                    System.out.println("Name: " + e.getName());
                    System.out.println("Description: " + e.getDescription());
                    System.out.println("ExerciseId: " + e.getExerciseId());
                    System.out.println("-----");
                }
            }

        } catch (Exception e) {
            System.err.println("❌ Error al llamar a la API de WGER: " + e.getMessage());
            e.printStackTrace();
        }
    }

    /**
     * Combina ejercicios traducidos con sus imágenes correspondientes por exerciseId.
     */
    public List<ExerciseWithImageDTO> getExercisesWithImages() {
        try {
            List<ExerciseDTO> exercises = apiClient.getExercises(DEFAULT_LIMIT, DEFAULT_LANGUAGE)
                    .getResults()
                    .stream()
                    .filter(e -> e.getLanguage() == DEFAULT_LANGUAGE) // ✅ filtro manual
                    .collect(Collectors.toList());

            List<ExerciseImageDTO> images = apiClient.getExerciseImages(DEFAULT_LIMIT).getResults();

            Map<Long, ExerciseImageDTO> imageMap = images.stream()
                    .filter(img -> img.getExerciseId() != null)
                    .collect(Collectors.toMap(
                            ExerciseImageDTO::getExerciseId,
                            Function.identity(),
                            (existing, replacement) -> existing
                    ));

            return exercises.stream()
                    .map(exercise -> {
                        ExerciseWithImageDTO dto = new ExerciseWithImageDTO();
                        dto.setExercise(exercise);
                        dto.setImage(imageMap.get(exercise.getExerciseId()));
                        return dto;
                    })
                    .collect(Collectors.toList());

        } catch (Exception e) {
            log.error("error al obtener ejercicios con imágenes: {}", e.getMessage());
            throw new RuntimeException("fallo al obtener ejercicios con imágenes", e);
        }
    }
}
