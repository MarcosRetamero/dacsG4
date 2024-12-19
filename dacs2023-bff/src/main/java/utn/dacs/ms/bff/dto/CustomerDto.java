package utn.dacs.ms.bff.dto;

public class CustomerDto {

    private Long id;
    private Double actualWeight; 
    private Integer stature;
    private Integer age;
    private String name;
    private Long trainingPlanId; 
 	private Long assignedTrainerId;
    private Long userId;
    private Double imc;	

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

    public Double getImc() {
        return imc;
    }

    public void setImc(Double imc) {
		this.imc = imc;
	} 
}