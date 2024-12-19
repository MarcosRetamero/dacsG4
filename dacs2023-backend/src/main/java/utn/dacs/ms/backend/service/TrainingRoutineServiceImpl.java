package utn.dacs.ms.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import utn.dacs.ms.backend.model.entity.TrainingRoutine;
import utn.dacs.ms.backend.model.repository.TrainingRoutineRepository;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class TrainingRoutineServiceImpl implements TrainingRoutineService {

    @Autowired
    private TrainingRoutineRepository trainingRoutineRepository;

    // Obtener todos los TrainingRoutines
    @Override
    public List<TrainingRoutine> getAllTrainingRoutines() {
        return trainingRoutineRepository.findAll();
    }

    // Obtener TrainingRoutine por ID
    @Override
    public TrainingRoutine getTrainingRoutineById(Long id) {
        Optional<TrainingRoutine> routine = trainingRoutineRepository.findById(id);
        return routine.orElse(null);
    }

    // Crear un nuevo TrainingRoutine
    @Override
    public TrainingRoutine createTrainingRoutine(TrainingRoutine trainingRoutine) {
        return trainingRoutineRepository.save(trainingRoutine);
    }

    // Actualizar un TrainingRoutine
    @Override
    public TrainingRoutine updateTrainingRoutine(Long id, TrainingRoutine trainingRoutine) {
        if (!trainingRoutineRepository.existsById(id)) {
            return null;
        }
        trainingRoutine.setId(id);
        return trainingRoutineRepository.save(trainingRoutine);
    }

    // Eliminar un TrainingRoutine por ID
    @Override
    public boolean deleteTrainingRoutine(Long id) {
        if (!trainingRoutineRepository.existsById(id)) {
            return false;
        }
        trainingRoutineRepository.deleteById(id);
        return true;
    }

	@Override
	public Optional<TrainingRoutine> getById(Long id) {
		// TODO Auto-generated method stub
		return Optional.empty();
	}

	@Override
	public Boolean existById(Long id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<TrainingRoutine> getAll() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void delete(Long id) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public TrainingRoutine save(TrainingRoutine entity) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<TrainingRoutine> find(Map<String, Object> filter) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public TrainingRoutine getBy(Map<String, Object> filter) {
		// TODO Auto-generated method stub
		return null;
	}
}
