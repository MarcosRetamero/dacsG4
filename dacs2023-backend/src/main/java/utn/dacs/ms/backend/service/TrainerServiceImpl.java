package utn.dacs.ms.backend.service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import utn.dacs.ms.backend.model.entity.Trainer;
import utn.dacs.ms.backend.model.repository.TrainerRepository;

@Service
public class TrainerServiceImpl implements TrainerService {

    @Autowired
    private TrainerRepository trainerRepository;

    @Override
    public Optional<Trainer> getById(Long id) {
        return trainerRepository.findById(id);
    }

    @Override
    public List<Trainer> getAll() {
        return trainerRepository.findAll();
    }

    @Override
    public Trainer save(Trainer entity) {
        return trainerRepository.save(entity);
    }

    @Override
    public void delete(Long id) {
        Optional<Trainer> trainer = getById(id);
        trainer.ifPresent(trainerRepository::delete);
    }

    @Override
    public Boolean existById(Long id) {
        return trainerRepository.existsById(id);
    }

    @Override
    public List<Trainer> find(Map<String, Object> filter) {
        throw new UnsupportedOperationException("No implementado");
    }

    @Override
    public Trainer getBy(Map<String, Object> filter) {
        throw new UnsupportedOperationException("No implementado");
    }
}
