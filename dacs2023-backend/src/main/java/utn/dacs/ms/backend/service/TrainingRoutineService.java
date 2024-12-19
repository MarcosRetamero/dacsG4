package utn.dacs.ms.backend.service;

import java.util.List;

import utn.dacs.ms.backend.model.entity.TrainingRoutine;

public interface TrainingRoutineService extends CommonService<TrainingRoutine> {

	List<TrainingRoutine> getAllTrainingRoutines();

	TrainingRoutine getTrainingRoutineById(Long id);

	TrainingRoutine createTrainingRoutine(TrainingRoutine trainingRoutine);

	TrainingRoutine updateTrainingRoutine(Long id, TrainingRoutine trainingRoutine);

	boolean deleteTrainingRoutine(Long id);
}
