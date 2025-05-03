package utn.dacs.ms.bff.dto;

public class CustomerDto {

    private String id;
    private Double actualWeight; 
    private Integer stature;
    private Integer age;
    private String name;	
    private String email;
    private String goal;

    // Getters and setters

    public String getId() {
        return id;
    }

    public void setId(String id) {
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

  
	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getGoal() {
		return goal;
	}

	public void setGoal(String goal) {
		this.goal = goal;
	} 
}