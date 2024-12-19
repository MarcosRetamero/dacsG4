package utn.dacs.ms.backend.service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import utn.dacs.ms.backend.model.entity.ExerciseRoutine;
import utn.dacs.ms.backend.model.repository.ExerciseRoutineRepository;

@Service
public class ExerciseRoutineServiceImpl implements ExerciseRoutineService {

    @Autowired
    private ExerciseRoutineRepository exerciseRoutineRepository;

    @Override
    public Optional<ExerciseRoutine> getById(Long id) {
        return exerciseRoutineRepository.findById(id);
    }

    @Override
    public List<ExerciseRoutine> getAll() {
        return exerciseRoutineRepository.findAll();
    }

    @Override
    public ExerciseRoutine save(ExerciseRoutine entity) {
        return exerciseRoutineRepository.save(entity);
    }

    @Override
    public void delete(Long id) {
        Optional<ExerciseRoutine> exerciseRoutine = getById(id);
        exerciseRoutine.ifPresent(exerciseRoutineRepository::delete);
    }

    @Override
    public Boolean existById(Long id) {
        return exerciseRoutineRepository.existsById(id);
    }

    @Override
    public List<ExerciseRoutine> find(Map<String, Object> filter) {
        throw new UnsupportedOperationException("No implementado");
    }

    @Override
    public ExerciseRoutine getBy(Map<String, Object> filter) {
        throw new UnsupportedOperationException("No implementado");
    }
}
