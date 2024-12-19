package utn.dacs.ms.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import utn.dacs.ms.backend.dto.CustomerDto;
import utn.dacs.ms.backend.model.entity.Customer;
import utn.dacs.ms.backend.service.CustomerService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/customer")
public class CustomerController {

    @Autowired
    private CustomerService customerService;

    // Obtener un cliente por su ID
    @GetMapping("/{id}")
    public ResponseEntity<CustomerDto> getCustomerById(@PathVariable Long id) {
        Optional<Customer> customer = customerService.getById(id);
        return customer.map(c -> ResponseEntity.ok(new CustomerDto(c)))
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    // Obtener todos los clientes
    @GetMapping
    public ResponseEntity<List<CustomerDto>> getAllCustomers() {
        List<Customer> customers = customerService.getAll();
        List<CustomerDto> customerDtos = customers.stream().map(CustomerDto::new).toList();
        return ResponseEntity.ok(customerDtos);
    }

    // Crear un nuevo cliente
    @PostMapping
    public ResponseEntity<CustomerDto> createCustomer(@RequestBody CustomerDto customerDto) {
        Customer customer = customerDto.toEntity();
        Customer createdCustomer = customerService.save(customer);
        CustomerDto createdCustomerDto = new CustomerDto(createdCustomer);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdCustomerDto);
    }

    // Actualizar un cliente
    @PutMapping("/{id}")
    public ResponseEntity<CustomerDto> updateCustomer(@PathVariable Long id, @RequestBody CustomerDto customerDto) {
        if (!customerService.existById(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        Customer customer = customerDto.toEntity();
        customer.setId(id);
        Customer updatedCustomer = customerService.save(customer);
        return ResponseEntity.ok(new CustomerDto(updatedCustomer));
    }

    // Eliminar un cliente
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCustomer(@PathVariable Long id) {
        if (!customerService.existById(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        customerService.delete(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
    
    // Obtener todos los clientes según su entrenador
    @GetMapping("/trainer/{trainerId}")
    public ResponseEntity<List<CustomerDto>> getCustomersByTrainer(@PathVariable Long trainerId) {
        List<Customer> customers = customerService.getCustomersByTrainer(trainerId);
        if (customers.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build(); // Devolver 404 si no se encuentran clientes
        }
        List<CustomerDto> customerDtos = customers.stream()
                .map(CustomerDto::new)
                .toList();
        return ResponseEntity.ok(customerDtos);
    }

    // Obtener todos los clientes según su plan de entrenamiento
    @GetMapping("/training-plan/{trainingPlanId}")
    public ResponseEntity<List<CustomerDto>> getCustomersByTrainingPlan(@PathVariable Long trainingPlanId) {
        List<Customer> customers = customerService.getCustomersByTrainingPlan(trainingPlanId);
        if (customers.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build(); // Devolver 404 si no se encuentran clientes
        }
        List<CustomerDto> customerDtos = customers.stream()
                .map(CustomerDto::new)
                .toList();
        return ResponseEntity.ok(customerDtos);
    }
}