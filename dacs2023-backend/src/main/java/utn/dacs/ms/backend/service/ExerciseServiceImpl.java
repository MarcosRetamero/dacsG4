package utn.dacs.ms.backend.service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import utn.dacs.ms.backend.model.entity.Exercise;
import utn.dacs.ms.backend.model.repository.ExerciseRepository;

@Service
public class ExerciseServiceImpl implements ExerciseService {

    @Autowired
    private ExerciseRepository exerciseRepository;

    @Override
    public Optional<Exercise> getById(Long id) {
        return exerciseRepository.findById(id);
    }

    @Override
    public List<Exercise> getAll() {
        return exerciseRepository.findAll();
    }

    @Override
    public Exercise save(Exercise entity) {
        return exerciseRepository.save(entity);
    }

    @Override
    public void delete(Long id) {
        Optional<Exercise> exercise = getById(id);
        exercise.ifPresent(exerciseRepository::delete);
    }

    @Override
    public Boolean existById(Long id) {
        return exerciseRepository.existsById(id);
    }

    @Override
    public List<Exercise> find(Map<String, Object> filter) {
        throw new UnsupportedOperationException("No implementado");
    }

    @Override
    public Exercise getBy(Map<String, Object> filter) {
        throw new UnsupportedOperationException("No implementado");
    }
}
