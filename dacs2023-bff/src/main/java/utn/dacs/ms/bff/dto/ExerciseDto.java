package utn.dacs.ms.bff.dto;

public class ExerciseDto {

    private Long id;
    private String name;
    private String description;
    private Integer reps;
    private Integer sets;
    private Integer routineId;
    private String image;
    
    // Getters and setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

	public Integer getReps() {
		return reps;
	}

	public void setReps(Integer reps) {
		this.reps = reps;
	}

	public Integer getSets() {
		return sets;
	}

	public void setSets(Integer sets) {
		this.sets = sets;
	}

	public Integer getRoutineId() {
		return routineId;
	}

	public void setRoutineId(Integer routineId) {
		this.routineId = routineId;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}
}
