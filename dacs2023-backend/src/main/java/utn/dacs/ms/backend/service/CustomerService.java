package utn.dacs.ms.backend.service;

import java.util.List;

import utn.dacs.ms.backend.model.entity.Customer;

public interface CustomerService extends CommonService<Customer> {

	List<Customer> getCustomersByTrainingPlan(Long trainingPlanId);

	List<Customer> getCustomersByTrainer(Long trainerId);
}
