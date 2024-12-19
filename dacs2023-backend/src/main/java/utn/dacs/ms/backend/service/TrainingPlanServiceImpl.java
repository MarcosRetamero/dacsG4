package utn.dacs.ms.backend.service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import utn.dacs.ms.backend.model.entity.TrainingPlan;
import utn.dacs.ms.backend.model.repository.TrainingPlanRepository;

@Service
public class TrainingPlanServiceImpl implements TrainingPlanService {

    @Autowired
    private TrainingPlanRepository trainingPlanRepository;

    @Override
    public Optional<TrainingPlan> getById(Long id) {
        return trainingPlanRepository.findById(id);
    }

    @Override
    public List<TrainingPlan> getAll() {
        return trainingPlanRepository.findAll();
    }

    @Override
    public TrainingPlan save(TrainingPlan entity) {
        return trainingPlanRepository.save(entity);
    }

    @Override
    public void delete(Long id) {
        Optional<TrainingPlan> trainingPlan = getById(id);
        trainingPlan.ifPresent(trainingPlanRepository::delete);
    }

    @Override
    public Boolean existById(Long id) {
        return trainingPlanRepository.existsById(id);
    }

    @Override
    public List<TrainingPlan> find(Map<String, Object> filter) {
        throw new UnsupportedOperationException("No implementado");
    }

    @Override
    public TrainingPlan getBy(Map<String, Object> filter) {
        throw new UnsupportedOperationException("No implementado");
    }
}
