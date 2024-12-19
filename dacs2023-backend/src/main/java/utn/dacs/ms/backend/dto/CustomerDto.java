package utn.dacs.ms.backend.dto;

import utn.dacs.ms.backend.model.entity.Customer;

public class CustomerDto {

    private Long id;
    private Double actualWeight; // Corrigiendo el nombre para que coincida con la entidad
    private Integer stature;
    private Integer age;
    private String name;
    private Long trainingPlanId; // Cambié 'id_training_plan' por 'trainingPlanId' para mayor claridad
 	private Long assignedTrainerId; // Cambié 'assignedTrainer' por 'assignedTrainerId'
    private Long userId;


	public CustomerDto(Customer customer) {
        this.id = customer.getId();
        this.actualWeight = customer.getActualWeight(); // Asegúrate de que el getter sea 'getActualWeight'
        this.stature = customer.getStature();
        this.age = customer.getAge();
        this.name = customer.getName();
        this.trainingPlanId = (customer.getTrainingPlan() != null) ? customer.getTrainingPlan().getId() : null; // Asignar el ID del plan de entrenamiento
        this.assignedTrainerId = (customer.getAssignedTrainer() != null) ? customer.getAssignedTrainer().getId() : null; // Asignar el ID del entrenador
        this.userId = (customer.getUser() != null) ? customer.getUser().getId() : null; // Asignar el ID del usuario de Keycloak
	}
	
	
	public Customer toEntity() {
		Customer customer = new Customer ();
		customer.setId(this.id);
		customer.setActualWeight(this.actualWeight);
		customer.setStature(this.stature);
		customer.setAge(this.age);
		customer.setName(this.name);
		return customer;
	}


    // Getters and setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Double getActualWeight() {
        return actualWeight;
    }

    public void setActualWeight(Double actualWeight) {
        this.actualWeight = actualWeight;
    }

    public Integer getStature() {
        return stature;
    }

    public void setStature(Integer stature) {
        this.stature = stature;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getTrainingPlanId() {
        return trainingPlanId;
    }

    public Long getAssignedTrainerId() {
        return assignedTrainerId;
    }
    
    public void setTrainingPlanId(Long trainingPlanId) {
        this.trainingPlanId = trainingPlanId;
    }

    public void setAssignedTrainerId(Long assignedTrainerId) {
        this.assignedTrainerId = assignedTrainerId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }
}