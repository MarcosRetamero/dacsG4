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
    public Optional<Customer> getById(String id) {
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
    public void delete(String id) {
        customerRepository.deleteById(id);
    }

    @Override
    public boolean existById(String id) {
        return customerRepository.existsById(id);
    }

    
    // Método de búsqueda por filtros (puedes optimizar según necesidades)
    @Override
    public Customer getBy(Map<String, Object> filter) {
        if (filter.containsKey("id")) {
        	String id = (String) filter.get("id");
            return customerRepository.findById(id).orElse(null);
        }
        return null; // Solo filtra por ID en este caso
    }

	@Override
	public List<Customer> find(Map<String, Object> filter) {
		if (filter.containsKey("id")) {
			String id = (String) filter.get("id");
            return customerRepository.findById(id)
            	    .map(customer -> List.of(customer)) // Uso explícito de la lambda
            	    .orElseGet(List::of);
        }
        return customerRepository.findAll(); // Retorna todos los clientes si no hay filtro		
	}

	@Override
	public Optional<Customer> getById(Long id) {
	    throw new UnsupportedOperationException("Este método no está soportado, usa getById(String)");
	}

	@Override
	public Boolean existById(Long id) {
	    throw new UnsupportedOperationException("Este método no está soportado, usa existById(String)");
	}

	@Override
	public void delete(Long id) {
	    throw new UnsupportedOperationException("Este método no está soportado, usa delete(String)");
	}


 
}