package utn.dacs.ms.backend.model.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import utn.dacs.ms.backend.model.entity.Exercise;

@Repository
public interface ExerciseRepository extends JpaRepository<Exercise, Long> {
	
    List<Exercise> findByRoutineid(Integer routineid); // Spring JPA lo infiere por nombre de método


}
