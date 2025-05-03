package utn.dacs.ms.backend.dto;

import lombok.Data;

public class RoutineDto {
    public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public String getRoutineName() {
		return routineName;
	}
	public void setRoutineName(String routineName) {
		this.routineName = routineName;
	}
	public Integer getDay() {
		return day;
	}
	public void setDay(Integer day) {
		this.day = day;
	}
	private Long id;
    private String userId;
    private String routineName;
    private Integer day;
}
