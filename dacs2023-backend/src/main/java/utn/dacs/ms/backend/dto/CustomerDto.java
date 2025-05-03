package utn.dacs.ms.backend.dto;

import utn.dacs.ms.backend.model.entity.Customer;

public class CustomerDto {

    private String id;
    private Float actualWeight; // Corrigiendo el nombre para que coincida con la entidad
    private Integer stature;
    private Integer age;
    private String name;
    private String goal;
    private String email;
    
    public CustomerDto() {
    }
    
	public CustomerDto(Customer customer) {
        this.id = customer.getId();
        this.actualWeight = customer.getActualWeight(); // Asegúrate de que el getter sea 'getActualWeight'
        this.stature = customer.getStature();
        this.age = customer.getAge();
        this.name = customer.getName();
        this.email = customer.getEmail();
        this.goal = customer.getGoal();
	}
	
	
	public Customer toEntity() {
		Customer customer = new Customer ();
		customer.setId(this.id);
		customer.setActualWeight(this.actualWeight);
		customer.setStature(this.stature);
		customer.setAge(this.age);
		customer.setName(this.name);
		customer.setEmail(this.email);
		customer.setGoal(this.goal);
		return customer;
	}


    // Getters and setters

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Float getActualWeight() {
        return actualWeight;
    }

    public void setActualWeight(Float actualWeight) {
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