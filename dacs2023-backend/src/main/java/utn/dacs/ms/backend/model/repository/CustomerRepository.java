package utn.dacs.ms.backend.model.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import utn.dacs.ms.backend.model.entity.Customer;

import java.util.List;
import java.util.Optional;

public interface CustomerRepository extends JpaRepository<Customer, Long> {

    Optional<Customer> findById(Long id);

    List<Customer> findByName(String name);

    // Si 'assignedTrainer' es una relación con la entidad 'Trainer'
    List<Customer> findByAssignedTrainer_Id(Long trainerId);

    // Si 'idTrainingPlan' es una relación con la entidad 'TrainingPlan'
    List<Customer> findByTrainingPlan_Id(Long trainingPlanId);

}