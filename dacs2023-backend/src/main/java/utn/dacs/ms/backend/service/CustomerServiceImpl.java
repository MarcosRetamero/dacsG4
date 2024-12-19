package utn.dacs.ms.backend.service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import utn.dacs.ms.backend.model.entity.Customer;
import utn.dacs.ms.backend.model.repository.CustomerRepository;

@Service
public class CustomerServiceImpl implements CustomerService {

    private final CustomerRepository customerRepository;

    @Autowired
    public CustomerServiceImpl(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    @Override
    public Optional<Customer> getById(Long id) {
        return customerRepository.findById(id);
    }

    @Override
    public List<Customer> getAll() {
        return customerRepository.findAll();
    }

    @Override
    public Customer save(Customer entity) {
        return customerRepository.save(entity);
    }

    @Override
    public void delete(Long id) {
        customerRepository.deleteById(id);
    }

    @Override
    public Boolean existById(Long id) {
        return customerRepository.existsById(id);
    }

    @Override
    public List<Customer> getCustomersByTrainer(Long trainerId) {
        return customerRepository.findByAssignedTrainer_Id(trainerId);
    }

    @Override
    public List<Customer> getCustomersByTrainingPlan(Long trainingPlanId) {
        return customerRepository.findByTrainingPlan_Id(trainingPlanId);
    }

    // Método de búsqueda por filtros (puedes optimizar según necesidades)
    @Override
    public Customer getBy(Map<String, Object> filter) {
        if (filter.containsKey("id")) {
            Long id = (Long) filter.get("id");
            return customerRepository.findById(id).orElse(null);
        }
        return null; // Solo filtra por ID en este caso
    }

	@Override
	public List<Customer> find(Map<String, Object> filter) {
		if (filter.containsKey("id")) {
            Long id = (Long) filter.get("id");
            return customerRepository.findById(id)
            	    .map(customer -> List.of(customer)) // Uso explícito de la lambda
            	    .orElseGet(List::of);
        }
        return customerRepository.findAll(); // Retorna todos los clientes si no hay filtro		
	}    
}