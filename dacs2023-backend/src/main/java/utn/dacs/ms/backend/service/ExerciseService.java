package utn.dacs.ms.backend.service;

import java.util.List;

import utn.dacs.ms.backend.model.entity.Exercise;

public interface ExerciseService extends CommonService<Exercise> {
	List<Exercise> getByRoutineId(Integer routineId);

}
