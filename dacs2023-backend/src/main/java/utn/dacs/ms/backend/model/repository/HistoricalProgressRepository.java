package utn.dacs.ms.backend.model.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import utn.dacs.ms.backend.model.entity.HistoricalProgress;

@Repository
public interface HistoricalProgressRepository extends JpaRepository<HistoricalProgress, Long> {

	List<HistoricalProgress> findByCustomerid(String customerid);

}
