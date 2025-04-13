package utn.dacs.ms.backend.model.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import utn.dacs.ms.backend.model.entity.Routine;

import java.util.List;

@Repository
public interface RoutineRepository extends JpaRepository<Routine, Long> {

	List<Routine> findByUserId(String userId); 

}
