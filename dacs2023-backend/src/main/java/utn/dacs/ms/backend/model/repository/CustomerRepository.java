package utn.dacs.ms.backend.model.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import utn.dacs.ms.backend.model.entity.Customer;

import java.util.List;
import java.util.Optional;

public interface CustomerRepository extends JpaRepository<Customer, String> {


    List<Customer> findByName(String name);

	Optional<Customer> findById(String id);


}