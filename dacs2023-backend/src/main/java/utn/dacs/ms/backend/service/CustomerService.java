package utn.dacs.ms.backend.service;

import java.util.List;
import java.util.Optional;

import utn.dacs.ms.backend.model.entity.Customer;

public interface CustomerService extends CommonService<Customer> {

	Optional<Customer> getById(String id);

	boolean existById(String id);

	void delete(String id);

}
